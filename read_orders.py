"""Read new rows from the "MI Tech Orders" Google Sheet using a service account.

Setup (see SHEETS_SETUP.md for the full walkthrough):
  1. Put your service account key file at the path in GOOGLE_APPLICATION_CREDENTIALS.
  2. Copy .env.example to .env and fill in SPREADSHEET_ID.
  3. pip install -r requirements.txt
  4. python read_orders.py

The script remembers the last row it has seen (in .last_row_state.json) and
prints only rows added since the previous run, so you can run it on a schedule
(cron, Task Scheduler, etc.) to pick up new orders.
"""

import json
import os
from pathlib import Path

from dotenv import load_dotenv
from google.oauth2 import service_account
from googleapiclient.discovery import build

load_dotenv()

SPREADSHEET_ID = os.environ["SPREADSHEET_ID"]
CREDENTIALS_FILE = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "service_account.json")
SHEET_NAME = os.environ.get("SHEET_NAME", "Sheet1")

# Read-only scope: the service account can view the sheet but never modify it.
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

STATE_FILE = Path(__file__).with_name(".last_row_state.json")

COLUMNS = ["Date", "Customer Name", "Phone", "Item", "Qty", "Price per unit", "Total"]


def get_sheets_service():
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_FILE, scopes=SCOPES
    )
    return build("sheets", "v4", credentials=credentials)


def load_last_row() -> int:
    """Row number (1-based, including the header) of the last row already processed."""
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text()).get("last_row", 1)
    return 1  # row 1 is the header, so start reading from row 2


def save_last_row(row: int) -> None:
    STATE_FILE.write_text(json.dumps({"last_row": row}))


def fetch_new_rows():
    service = get_sheets_service()
    last_row = load_last_row()

    # Columns A-G match: Date, Customer Name, Phone, Item, Qty, Price per unit, Total
    range_ = f"{SHEET_NAME}!A{last_row + 1}:G"
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=range_)
        .execute()
    )
    rows = result.get("values", [])

    if rows:
        save_last_row(last_row + len(rows))

    # Pad short rows so every record has all 7 fields
    return [dict(zip(COLUMNS, row + [""] * (len(COLUMNS) - len(row)))) for row in rows]


def main():
    new_orders = fetch_new_rows()
    if not new_orders:
        print("No new orders.")
        return

    print(f"{len(new_orders)} new order(s):")
    for order in new_orders:
        print(
            f"  {order['Date']} | {order['Customer Name']} | {order['Phone']} | "
            f"{order['Item']} x{order['Qty']} @ {order['Price per unit']} = {order['Total']}"
        )


if __name__ == "__main__":
    main()

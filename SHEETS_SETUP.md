# Google Sheets API access with a service account

Step-by-step setup so `read_orders.py` can read new rows from the
**MI Tech Orders** sheet (columns: Date, Customer Name, Phone, Item, Qty,
Price per unit, Total).

A **service account** is a robot Google account with its own email address.
Your script authenticates as that robot using a private key file — no browser
login, no OAuth consent screen — and you grant it access to the sheet simply
by sharing the sheet with its email address.

## 1. Create a Google Cloud project

1. Go to <https://console.cloud.google.com/> and sign in.
2. Click the project dropdown (top bar) → **New Project**.
3. Name it something like `mi-tech-orders` and click **Create**, then make
   sure the new project is selected in the dropdown.

## 2. Enable the Google Sheets API

1. In the left menu go to **APIs & Services → Library**.
2. Search for **Google Sheets API**.
3. Open it and click **Enable**.

## 3. Create the service account

1. Go to **APIs & Services → Credentials**.
2. Click **+ Create Credentials → Service account**.
3. Name it e.g. `sheets-reader` — the ID becomes an email like
   `sheets-reader@mi-tech-orders.iam.gserviceaccount.com`.
4. Click **Create and Continue**. You can skip the optional "Grant access"
   steps (project roles are not needed just to read a shared sheet) — click
   **Done**.

## 4. Download the JSON key

1. On the **Credentials** page, click your new service account.
2. Open the **Keys** tab → **Add Key → Create new key**.
3. Choose **JSON** and click **Create**. A `.json` file downloads.
4. Save it into this project folder as `service_account.json`.

> ⚠️ **This file is a secret.** Anyone holding it can act as the service
> account. It is already listed in `.gitignore` — never commit it, email it,
> or paste it into chat. If it ever leaks, delete the key in the Keys tab and
> create a new one.

## 5. Share the sheet with the service account

The service account can only see sheets explicitly shared with it:

1. Open the JSON file and copy the `client_email` value
   (e.g. `sheets-reader@mi-tech-orders.iam.gserviceaccount.com`).
2. Open **MI Tech Orders** in Google Sheets → **Share**.
3. Paste that email, set the role to **Viewer** (read-only is all the script
   needs), untick "Notify people", and click **Share/Send**.

## 6. Configure and run the script

1. Get the spreadsheet ID from the sheet's URL — the long string between
   `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit#gid=0`
2. Copy `.env.example` to `.env` and fill it in:

   ```ini
   SPREADSHEET_ID=your-spreadsheet-id-here
   GOOGLE_APPLICATION_CREDENTIALS=service_account.json
   SHEET_NAME=Sheet1   # change if your tab has a different name
   ```

3. Install dependencies and run:

   ```bash
   pip install -r requirements.txt
   python read_orders.py
   ```

The first run prints every existing order row; each later run prints only
rows added since the previous run (progress is tracked in
`.last_row_state.json`). Run it on a schedule (cron / Task Scheduler) to poll
for new orders.

## Troubleshooting

| Error | Fix |
| --- | --- |
| `403 The caller does not have permission` | The sheet isn't shared with the service account's `client_email` — redo step 5. |
| `404 Requested entity was not found` | Wrong `SPREADSHEET_ID` — recopy it from the URL. |
| `Unable to parse range: Sheet1!...` | Your tab isn't named `Sheet1` — set `SHEET_NAME` in `.env` to the tab's actual name. |
| `Google Sheets API has not been used in project ...` | The API isn't enabled — redo step 2 (it can take a minute or two to activate). |

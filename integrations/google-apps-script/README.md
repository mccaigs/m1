# McCaigs Lead Tracking Webhook

This Google Apps Script receives website contact enquiries and Project Builder submissions, appends them to the matching spreadsheet tab, and emails `mccaigsgroup@gmail.com`.

## Spreadsheet Setup

Create or open the McCaigs Lead Tracking spreadsheet with these tabs:

1. `Contact Enquiries`
2. `Project Builder Submissions`

The script adds the expected header row when a tab is empty. If a tab already has headers, they must exactly match the arrays in `Code.gs`.

## Install

1. Open the McCaigs Lead Tracking spreadsheet.
2. Choose **Extensions > Apps Script**.
3. Replace the editor contents with `Code.gs`.
4. Save the project as `McCaigs Lead Tracking Webhook`.
5. Select and run `authorize` once from the editor.
6. Approve the requested Spreadsheet and Mail permissions.

## Deploy

1. Choose **Deploy > New deployment**.
2. Select **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Deploy and complete the Google authorisation prompts.
6. Copy the deployed URL ending in `/exec`.
7. Add it to the website's server-only environment configuration:

```env
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Do not prefix the variable with `NEXT_PUBLIC_`.

After changing `Code.gs`, create a new deployment version or edit the existing deployment to use the new version.

## Supported Payloads

- `contact_enquiry`
- `project_builder_submission`

The webhook also accepts the original nested `contact-enquiry-v1` payload during migration.

Successful requests return:

```json
{ "ok": true }
```

Invalid or failed requests return:

```json
{ "ok": false, "error": "..." }
```

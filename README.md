# Portfolio

## Contact Form to Google Sheet Setup

1. Create a Google Sheet with headers in row 1:
	 - `name`
	 - `email`
	 - `message`
	 - `submittedAt`

2. In Google Apps Script, add this code and replace `Sheet1` with your sheet tab name:

```javascript
function doPost(e) {
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
	sheet.appendRow([
		e.parameter.name || '',
		e.parameter.email || '',
		e.parameter.message || '',
		e.parameter.submittedAt || new Date().toISOString()
	]);

	return ContentService
		.createTextOutput(JSON.stringify({ success: true }))
		.setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as Web App:
	 - Execute as: `Me`
	 - Who has access: `Anyone`
	 - Copy the Web App URL

4. Paste the URL in the contact form tag inside [index.html](index.html):

```html
<form id="contactForm" data-sheet-url="YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL">
```

After this, form submissions from your portfolio will be sent to your Google Sheet.
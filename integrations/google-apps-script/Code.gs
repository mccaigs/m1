var NOTIFICATION_EMAIL = "mccaigsgroup@gmail.com";

var CONTACT_SHEET = "Contact Enquiries";
var PROJECT_BUILDER_SHEET = "Project Builder Submissions";

var CONTACT_HEADERS = [
  "Created At",
  "Status",
  "Name",
  "Email",
  "Company",
  "Project Type",
  "Budget Range",
  "Timeline",
  "Message",
  "Source",
  "Consent",
  "Convex ID",
  "Follow-up Notes",
  "Next Action",
  "Priority",
];

var PROJECT_BUILDER_HEADERS = [
  "Created At",
  "Status",
  "Name",
  "Email",
  "Company",
  "Industry",
  "Problem",
  "Problem Detail",
  "Desired Outcome",
  "Desired Outcome Detail",
  "Project Type",
  "Recommended Route",
  "Project Shape",
  "Indicative Budget",
  "Estimated Timeline",
  "Urgency",
  "Summary",
  "Source",
  "Convex ID",
  "Follow-up Notes",
  "Next Action",
  "Priority",
];

function authorize() {
  SpreadsheetApp.getActiveSpreadsheet();
  MailApp.getRemainingDailyQuota();
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing request body.");
    }

    var payload = JSON.parse(e.postData.contents);
    var payloadType = getPayloadType_(payload);

    if (payloadType === "contact_enquiry") {
      handleContactEnquiry_(payload);
    } else if (payloadType === "project_builder_submission") {
      handleProjectBuilderSubmission_(payload);
    } else {
      return jsonResponse_({
        ok: false,
        error: "Unsupported payload type.",
      });
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    var errorMessage = safeErrorMessage_(error);
    console.error("McCaigs lead webhook failed: " + errorMessage);
    return jsonResponse_({
      ok: false,
      error: errorMessage,
    });
  }
}

function handleContactEnquiry_(payload) {
  var contact = normaliseContactPayload_(payload);
  var sheet = getSheet_(CONTACT_SHEET, CONTACT_HEADERS);
  var row = [
    contact.createdAt,
    "New",
    contact.name,
    contact.email,
    contact.company,
    contact.projectType,
    contact.budgetRange,
    contact.timeline,
    contact.message,
    contact.source,
    contact.consent,
    contact.convexRecordId,
    "",
    "Review submission",
    "Medium",
  ];

  appendRow_(sheet, row);
  sendNotificationEmail_(
    "New McCaigs Contact Enquiry",
    "A new contact enquiry has been received.",
    payload,
  );
}

function handleProjectBuilderSubmission_(payload) {
  var submission = normaliseProjectBuilderPayload_(payload);
  var sheet = getSheet_(PROJECT_BUILDER_SHEET, PROJECT_BUILDER_HEADERS);
  var row = [
    submission.createdAt,
    "New",
    submission.name,
    submission.email,
    submission.company,
    submission.industry,
    submission.problem,
    submission.problemDetail,
    submission.desiredOutcome,
    submission.desiredOutcomeDetail,
    submission.projectType,
    submission.recommendedRoute,
    submission.projectShape,
    submission.indicativeBudget,
    submission.estimatedTimeline,
    submission.urgency,
    submission.summary,
    submission.source,
    submission.convexRecordId,
    "",
    "Review submission",
    "Medium",
  ];

  appendRow_(sheet, row);
  sendNotificationEmail_(
    "New McCaigs Project Builder Submission",
    "A new Project Builder submission has been received.",
    payload,
  );
}

function normaliseContactPayload_(payload) {
  var enquiry = payload.enquiry || payload;
  var qualification = payload.qualification || {};

  return {
    createdAt: valueOrBlank_(payload.createdAt || payload.submittedAt),
    name: valueOrBlank_(enquiry.name),
    email: valueOrBlank_(enquiry.email),
    company: valueOrBlank_(enquiry.company),
    projectType: valueOrBlank_(enquiry.projectType),
    budgetRange: valueOrBlank_(enquiry.budgetRange),
    timeline: valueOrBlank_(enquiry.timeline),
    message: valueOrBlank_(enquiry.message),
    source: valueOrBlank_(payload.source || qualification.source),
    consent: booleanLabel_(
      enquiry.consent !== undefined
        ? enquiry.consent
        : qualification.consentGranted,
    ),
    convexRecordId: valueOrBlank_(
      payload.convexRecordId || payload.convexId,
    ),
  };
}

function normaliseProjectBuilderPayload_(payload) {
  return {
    createdAt: valueOrBlank_(payload.createdAt),
    name: valueOrBlank_(payload.name),
    email: valueOrBlank_(payload.email),
    company: valueOrBlank_(payload.company),
    industry: valueOrBlank_(payload.industry),
    problem: valueOrBlank_(payload.problem),
    problemDetail: valueOrBlank_(payload.problemDetail),
    desiredOutcome: valueOrBlank_(payload.desiredOutcome),
    desiredOutcomeDetail: valueOrBlank_(payload.desiredOutcomeDetail),
    projectType: valueOrBlank_(payload.projectType),
    recommendedRoute: valueOrBlank_(payload.recommendedRoute),
    projectShape: valueOrBlank_(payload.projectShape),
    indicativeBudget: valueOrBlank_(payload.indicativeBudget),
    estimatedTimeline: valueOrBlank_(payload.estimatedTimeline),
    urgency: valueOrBlank_(payload.urgency),
    summary: valueOrBlank_(payload.summary),
    source: valueOrBlank_(payload.source),
    convexRecordId: valueOrBlank_(
      payload.convexRecordId || payload.convexId,
    ),
  };
}

function getPayloadType_(payload) {
  if (payload.type) {
    return payload.type;
  }

  // Supports the contact route's original nested payload during rollout.
  if (payload.enquiry && payload.version === "contact-enquiry-v1") {
    return "contact_enquiry";
  }

  return "";
}

function getSheet_(sheetName, expectedHeaders) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error(
      "No active spreadsheet. Create this script from the spreadsheet.",
    );
  }

  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  ensureHeaders_(sheet, expectedHeaders);
  return sheet;
}

function ensureHeaders_(sheet, expectedHeaders) {
  var currentColumnCount = Math.max(
    sheet.getLastColumn(),
    expectedHeaders.length,
  );
  var currentHeaders = sheet
    .getRange(1, 1, 1, expectedHeaders.length)
    .getDisplayValues()[0];

  if (currentHeaders.join("|") !== expectedHeaders.join("|")) {
    sheet.getRange(1, 1, 1, currentColumnCount).clearContent();
    sheet
      .getRange(1, 1, 1, expectedHeaders.length)
      .setValues([expectedHeaders]);
  }

  sheet.setFrozenRows(1);
}

function appendRow_(sheet, row) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    sheet.appendRow(
      row.map(function (value) {
        return safeCellValue_(value);
      }),
    );
  } finally {
    lock.releaseLock();
  }
}

function sendNotificationEmail_(subject, introduction, payload) {
  var lines = [
    introduction,
    "",
    "Submitted fields",
    "----------------",
  ];
  var flattened = [];

  flattenObject_(payload, "", flattened);
  flattened.forEach(function (field) {
    lines.push(formatFieldLabel_(field.path) + ": " + field.value);
  });

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: lines.join("\n"),
    name: "McCaigs Lead Tracking",
  });
}

function flattenObject_(value, path, output) {
  if (
    value === null ||
    value === undefined ||
    typeof value !== "object"
  ) {
    output.push({
      path: path || "value",
      value: valueOrBlank_(value),
    });
    return;
  }

  if (Array.isArray(value)) {
    output.push({
      path: path || "value",
      value: value.join(", "),
    });
    return;
  }

  Object.keys(value).forEach(function (key) {
    var nextPath = path ? path + "." + key : key;
    flattenObject_(value[key], nextPath, output);
  });
}

function formatFieldLabel_(path) {
  return path
    .replace(/\./g, " / ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, function (character) {
      return character.toUpperCase();
    });
}

function safeCellValue_(value) {
  var normalised = valueOrBlank_(value);
  if (typeof normalised !== "string") {
    return normalised;
  }

  return /^[=+\-@]/.test(normalised) ? "'" + normalised : normalised;
}

function valueOrBlank_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

function booleanLabel_(value) {
  if (value === true) {
    return "Yes";
  }
  if (value === false) {
    return "No";
  }
  return valueOrBlank_(value);
}

function safeErrorMessage_(error) {
  return error && error.message ? error.message : "Unknown error";
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

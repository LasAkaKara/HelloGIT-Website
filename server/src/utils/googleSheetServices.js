// utils/googleSheetServices.js
import { google } from "googleapis";
import fs from "fs/promises";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const CREDENTIALS_PATH = "./credentials.json";
const TOKEN_PATH = "./token.json";

export async function authorizeGoogle() {
  const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH));
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const token = JSON.parse(await fs.readFile(TOKEN_PATH));

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}

export async function fetchParsedSheet(auth, spreadsheetId, range) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });

  const [headers, ...rows] = res.data.values;

  if (!headers || !rows.length) return [];

  return rows.map((row) => {
    const record = {};
    headers.forEach((key, i) => {
      record[key.trim()] = row[i]?.trim() || "";
    });
    return record;
  });
}

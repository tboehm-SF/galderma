import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface VarInfo {
  set: boolean;
  need: string;
}

export async function GET() {
  const vars: Record<string, VarInfo> = {
    SF_ACCESS_TOKEN: {
      set: !!process.env.SF_ACCESS_TOKEN,
      need: "A Salesforce session token used to authenticate API calls. Required for Option 1 (Direct Access Token) auth method. Pair with SF_INSTANCE_URL.",
    },
    SF_INSTANCE_URL: {
      set: !!process.env.SF_INSTANCE_URL,
      need: "The base URL of your Salesforce org (e.g. https://myorg.my.salesforce.com). Required for Option 1 and Option 2 auth. Tells the app which Salesforce org to connect to.",
    },
    SF_CLIENT_ID: {
      set: !!process.env.SF_CLIENT_ID,
      need: "The Connected App Consumer Key. Required for Option 2 (OAuth Client Credentials) auth. Pair with SF_CLIENT_SECRET + SF_INSTANCE_URL.",
    },
    SF_CLIENT_SECRET: {
      set: !!process.env.SF_CLIENT_SECRET,
      need: "The Connected App Consumer Secret. Required for Option 2 (OAuth Client Credentials) auth. Pair with SF_CLIENT_ID + SF_INSTANCE_URL.",
    },
    SF_USERNAME: {
      set: !!process.env.SF_USERNAME,
      need: "A Salesforce username for login. Required for Option 3 (Username-Password) auth. Pair with SF_PASSWORD.",
    },
    SF_PASSWORD: {
      set: !!process.env.SF_PASSWORD,
      need: "The Salesforce user's password. Required for Option 3 (Username-Password) auth. Pair with SF_USERNAME.",
    },
    SF_SECURITY_TOKEN: {
      set: !!process.env.SF_SECURITY_TOKEN,
      need: "Salesforce security token appended to the password. Optional for Option 3 — only needed if your org enforces IP restrictions and the Heroku IP is not allowlisted.",
    },
    SF_LOGIN_URL: {
      set: !!process.env.SF_LOGIN_URL,
      need: "The Salesforce login endpoint. Optional for Option 3 — defaults to https://login.salesforce.com. Set to https://test.salesforce.com for sandboxes.",
    },
  };

  // Determine which auth methods are fully configured
  const option1 = vars.SF_ACCESS_TOKEN.set && vars.SF_INSTANCE_URL.set;
  const option2 = vars.SF_CLIENT_ID.set && vars.SF_CLIENT_SECRET.set && vars.SF_INSTANCE_URL.set;
  const option3 = vars.SF_USERNAME.set && vars.SF_PASSWORD.set;

  const authStatus = option1
    ? "✅ Option 1 ready (Direct Access Token)"
    : option2
      ? "✅ Option 2 ready (OAuth Client Credentials)"
      : option3
        ? "✅ Option 3 ready (Username-Password)"
        : "❌ No complete auth method configured";

  // Build missing vars hint
  const missing: string[] = [];
  if (!option1 && !option2 && !option3) {
    if (vars.SF_ACCESS_TOKEN.set && !vars.SF_INSTANCE_URL.set) {
      missing.push("SF_INSTANCE_URL — you have the access token but the app doesn't know which Salesforce org to connect to");
    }
    if (vars.SF_USERNAME.set && !vars.SF_PASSWORD.set) {
      missing.push("SF_PASSWORD — you have the username but no password to authenticate with");
    }
    if (vars.SF_CLIENT_ID.set && !vars.SF_CLIENT_SECRET.set) {
      missing.push("SF_CLIENT_SECRET — you have the client ID but need the secret to complete OAuth");
    }
    if (missing.length === 0) {
      missing.push("Set at least one complete pair: (SF_ACCESS_TOKEN + SF_INSTANCE_URL) or (SF_CLIENT_ID + SF_CLIENT_SECRET + SF_INSTANCE_URL) or (SF_USERNAME + SF_PASSWORD)");
    }
  }

  return NextResponse.json({
    status: option1 || option2 || option3 ? "ok" : "misconfigured",
    time: new Date().toISOString(),
    authStatus,
    missing: missing.length > 0 ? missing : undefined,
    vars,
    nodeEnv: process.env.NODE_ENV,
  });
}

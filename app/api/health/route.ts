import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    time: new Date().toISOString(),
    env: {
      hasSfAccessToken: !!process.env.SF_ACCESS_TOKEN,
      hasSfInstanceUrl: !!process.env.SF_INSTANCE_URL,
      hasSfClientId: !!process.env.SF_CLIENT_ID,
      hasSfUsername: !!process.env.SF_USERNAME,
      hasSfPassword: !!process.env.SF_PASSWORD,
      nodeEnv: process.env.NODE_ENV,
    },
  });
}

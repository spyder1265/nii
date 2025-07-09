import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import path from "path";
import fs from "fs";

const PROPERTY_ID = process.env.GA_PROPERTY_ID;
const KEY_PATH = path.join(process.cwd(), "config/nii-ga-service-account.json");

function getServiceAccountCredentials() {
  if (fs.existsSync(KEY_PATH)) {
    return JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));
  }
  if (process.env.GA_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GA_SERVICE_ACCOUNT_JSON);
  }
  throw new Error("No GA service account credentials found");
}

const EVENT_LABELS: Record<string, string> = {
  page_view: "Page Views",
  click: "Button Clicks",
  form_submit: "Form Submissions",
  scroll: "Scroll Depth",
  video_start: "Video Start",
  video_progress: "Video Progress",
  video_complete: "Video Complete",
  user_engagement: "User Engagement",
  add_to_cart: "Add to Cart",
  remove_from_cart: "Remove from Cart",
  modal_open: "Modal Open",
  modal_close: "Modal Close",
  hover: "Hover",
  copy: "Copy Text",
  share: "Share Content",
  onboarding_step: "Onboarding Step",
  // Add more custom events as needed
};

export async function GET(req: NextRequest) {
  try {
    const credentials = getServiceAccountCredentials();
    const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "totalUsers" },
        { name: "userEngagementDuration" },
        { name: "eventCount" },
      ],
      dimensions: [{ name: "eventName" }, { name: "country" }],
    });

    const eventCounts: Record<string, number> = {};
    const customEvents: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    let pageViews = 0,
      totalUsers = 0,
      engagement = 0,
      totalEvents = 0,
      userEngagement = 0;

    response.rows?.forEach((row) => {
      const eventName = row.dimensionValues?.[0]?.value;
      const country = row.dimensionValues?.[1]?.value;
      const eventCount = Number(row.metricValues?.[3]?.value || 0);
      if (eventName) {
        if (EVENT_LABELS[eventName]) {
          eventCounts[eventName] = (eventCounts[eventName] || 0) + eventCount;
        } else {
          customEvents[eventName] = (customEvents[eventName] || 0) + eventCount;
        }
      }
      if (country)
        countryCounts[country] = (countryCounts[country] || 0) + eventCount;
    });

    // Get overall metrics from the first row (for summary)
    if (response.rows?.[0]) {
      pageViews = Number(response.rows[0].metricValues?.[0]?.value || 0);
      totalUsers = Number(response.rows[0].metricValues?.[1]?.value || 0);
      engagement = Number(response.rows[0].metricValues?.[2]?.value || 0);
      totalEvents = Number(response.rows[0].metricValues?.[3]?.value || 0);
      userEngagement = eventCounts["user_engagement"] || 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        pageViews,
        totalUsers,
        engagement,
        totalEvents,
        eventCounts,
        customEvents,
        countryCounts,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

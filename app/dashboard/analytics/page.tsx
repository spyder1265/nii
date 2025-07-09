"use client";
import { useEffect, useState } from "react";

interface AnalyticsData {
  total: number;
  active: number;
  archived: number;
}

interface GAData {
  pageViews: number;
  totalUsers: number;
  engagement: number;
  totalEvents: number;
  eventCounts: Record<string, number>;
  customEvents: Record<string, number>;
  countryCounts: Record<string, number>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ga, setGA] = useState<GAData | null>(null);
  const [gaError, setGAError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/projects/analytics");
        const result = await res.json();
        if (result.success) setData(result.data);
        else setError(result.error || "Failed to fetch analytics");
      } catch (e) {
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchGA = async () => {
      try {
        const res = await fetch("/api/ga/summary");
        const result = await res.json();
        if (result.success) setGA(result.data);
        else setGAError(result.error || "Failed to fetch Google Analytics");
      } catch (e) {
        setGAError("Failed to fetch Google Analytics");
      }
    };
    fetchGA();
  }, []);

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen text-white'>
        <div className='w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  if (error) return <div className='p-10 text-red-400'>{error}</div>;
  if (!data) return null;

  return (
    <div className='p-4 sm:p-8 max-w-6xl mx-auto'>
      <h1 className='text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-white tracking-tight'>
        Project & Site Analytics
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-10'>
        <div className='bg-gradient-to-br from-blue-800 to-blue-600 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-blue-700/40'>
          <div className='text-4xl sm:text-6xl font-extrabold text-blue-100 drop-shadow mb-2'>
            {data.total}
          </div>
          <div className='text-base sm:text-lg text-blue-100 font-semibold'>
            Total Projects
          </div>
        </div>
        <div className='bg-gradient-to-br from-green-800 to-green-600 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-green-700/40'>
          <div className='text-4xl sm:text-6xl font-extrabold text-green-100 drop-shadow mb-2'>
            {data.active}
          </div>
          <div className='text-base sm:text-lg text-green-100 font-semibold'>
            Active Projects
          </div>
        </div>
        <div className='bg-gradient-to-br from-yellow-700 to-yellow-500 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-yellow-600/40'>
          <div className='text-4xl sm:text-6xl font-extrabold text-yellow-100 drop-shadow mb-2'>
            {data.archived}
          </div>
          <div className='text-base sm:text-lg text-yellow-100 font-semibold'>
            Archived Projects
          </div>
        </div>
      </div>
      <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-white'>
        Google Analytics (last 7 days)
      </h2>
      <div className='mb-8 p-4 bg-blue-950/80 border border-blue-800 rounded-lg text-blue-100'>
        <strong>Note:</strong> <br />
        <span className='block mt-1'>
          <span className='font-semibold'>Project counts</span> (Total, Active,
          Archived) are from your database and show the{" "}
          <span className='font-semibold'>current state</span> of your projects.
        </span>
        <span className='block mt-1'>
          <span className='font-semibold'>Event counts</span> (e.g.,
          Archive/Unarchive Project) are from Google Analytics and show{" "}
          <span className='font-semibold'>how many times</span> those actions
          were performed, <span className='font-semibold'>not</span> the number
          of projects in each state.
        </span>
      </div>
      {gaError && <div className='text-red-400 mb-4'>{gaError}</div>}
      {ga ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-10'>
            <div className='bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-blue-900/40'>
              <div className='text-3xl sm:text-5xl font-extrabold text-blue-100 drop-shadow mb-2'>
                {ga.pageViews}
              </div>
              <div className='text-base sm:text-lg text-blue-100 font-semibold'>
                Page Views
              </div>
            </div>
            <div className='bg-gradient-to-br from-green-900 to-green-700 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-green-900/40'>
              <div className='text-3xl sm:text-5xl font-extrabold text-green-100 drop-shadow mb-2'>
                {ga.totalUsers}
              </div>
              <div className='text-base sm:text-lg text-green-100 font-semibold'>
                Total Users
              </div>
            </div>
            <div className='bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-purple-900/40'>
              <div className='text-3xl sm:text-5xl font-extrabold text-purple-100 drop-shadow mb-2'>
                {ga.engagement}
              </div>
              <div className='text-base sm:text-lg text-purple-100 font-semibold'>
                User Engagement (sec)
              </div>
            </div>
            <div className='bg-gradient-to-br from-pink-900 to-pink-700 rounded-xl p-6 sm:p-8 text-center shadow-lg border border-pink-900/40'>
              <div className='text-3xl sm:text-5xl font-extrabold text-pink-100 drop-shadow mb-2'>
                {ga.totalEvents}
              </div>
              <div className='text-base sm:text-lg text-pink-100 font-semibold'>
                Total Events
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-10'>
            <div className='bg-gray-900/90 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-800'>
              <h3 className='text-lg sm:text-xl font-bold text-white mb-4'>
                Event Breakdown
              </h3>
              {ga &&
              Object.keys(ga.eventCounts).length === 0 &&
              Object.keys(ga.customEvents).length === 0 ? (
                <div className='text-gray-400'>No events tracked.</div>
              ) : (
                <>
                  <ul className='space-y-2'>
                    {Object.entries(ga?.eventCounts || {}).map(
                      ([event, count]) => (
                        <li
                          key={event}
                          className='flex justify-between border-b border-gray-800 pb-1 last:border-b-0'
                        >
                          <span className='capitalize text-gray-200'>
                            {(() => {
                              switch (event) {
                                case "page_view":
                                  return "Page Views";
                                case "click":
                                  return "Button Clicks";
                                case "form_submit":
                                  return "Form Submissions";
                                case "scroll":
                                  return "Scroll Depth";
                                case "video_start":
                                  return "Video Start";
                                case "video_progress":
                                  return "Video Progress";
                                case "video_complete":
                                  return "Video Complete";
                                case "user_engagement":
                                  return "User Engagement";
                                case "add_to_cart":
                                  return "Add to Cart";
                                case "remove_from_cart":
                                  return "Remove from Cart";
                                case "modal_open":
                                  return "Modal Open";
                                case "modal_close":
                                  return "Modal Close";
                                case "hover":
                                  return "Hover";
                                case "copy":
                                  return "Copy Text";
                                case "share":
                                  return "Share Content";
                                case "onboarding_step":
                                  return "Onboarding Step";
                                default:
                                  return event.replace(/_/g, " ");
                              }
                            })()}
                          </span>
                          <span className='font-bold text-blue-200'>
                            {count}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                  {Object.keys(ga?.customEvents || {}).length > 0 && (
                    <>
                      <h4 className='text-md font-semibold text-white mt-6 mb-2'>
                        Custom & Other Events
                      </h4>
                      <ul className='space-y-2'>
                        {Object.entries(ga?.customEvents || {}).map(
                          ([event, count]) => (
                            <li
                              key={event}
                              className='flex justify-between border-b border-gray-800 pb-1 last:border-b-0'
                            >
                              <span className='capitalize text-gray-400'>
                                {event.replace(/_/g, " ")}
                              </span>
                              <span className='font-bold text-blue-200'>
                                {count}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </>
              )}
            </div>
            <div className='bg-gray-900/90 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-800'>
              <h3 className='text-lg sm:text-xl font-bold text-white mb-4'>
                Top Locations
              </h3>
              {Object.entries(ga.countryCounts).length === 0 ? (
                <div className='text-gray-400'>No location data.</div>
              ) : (
                <ul className='space-y-2'>
                  {Object.entries(ga.countryCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([country, count]) => (
                      <li
                        key={country}
                        className='flex justify-between border-b border-gray-800 pb-1 last:border-b-0'
                      >
                        <span className='text-gray-200'>{country}</span>
                        <span className='font-bold text-green-200'>
                          {count}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='text-gray-400'>Loading Google Analytics data...</div>
      )}
    </div>
  );
}

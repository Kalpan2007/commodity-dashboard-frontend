"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useCommodityData } from "@/hooks/useCommodityData";

// ApexCharts must be loaded client-side only (uses `window`)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FILTER_OPTIONS = [
  { key: "daily", label: "Daily" },
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
];

/**
 * Format date for x-axis based on interval.
 */
function formatXAxisLabel(dateStr, interval) {
  const date = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (interval === "yearly") {
    return date.getUTCFullYear().toString();
  }
  if (interval === "daily") {
    // Show Month Day (e.g. "Jun 21")
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
  }
  // monthly: show "Jun 26" style (Month Year)
  const shortYear = date.getUTCFullYear().toString().slice(-2);
  return `${months[date.getUTCMonth()]} ${shortYear}`;
}

export default function CommodityChart() {
  const [activeFilter, setActiveFilter] = useState("monthly");
  const { data, isLoading, isError, error } = useCommodityData(activeFilter);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoize chart config to prevent unnecessary re-renders
  const chartOptions = useMemo(() => {
    if (!data) return {};

    let rawCategories = data.dates.map((d) =>
      formatXAxisLabel(d, activeFilter)
    );

    // On mobile screens, skip rendering alternate labels to prevent clumping
    const categories = isMobile
      ? rawCategories.map((cat, idx) => {
          if (activeFilter === "daily") {
            // Show every 5th day label on mobile (0, 5, 10, 15, 20, 25, 30)
            return idx % 5 === 0 ? cat : "";
          }
          // Show every 6th month/year label on mobile (0, 6, 12, 18, 24)
          return idx % 6 === 0 ? cat : "";
        })
      : rawCategories;

    return {
      chart: {
        type: "area",
        height: 400,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "Arial, Helvetica, sans-serif",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 600,
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#22D3EE"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.05,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#22D3EE",
              opacity: 0.4,
            },
            {
              offset: 100,
              color: "#22D3EE",
              opacity: 0.02,
            },
          ],
        },
      },
      xaxis: {
        type: "category",
        categories,
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "11px",
          },
          rotate: -45,
          rotateAlways: true,
          maxHeight: 80,
          hideOverlappingLabels: true,
          trim: false,
        },
        axisBorder: { show: true, color: "#E5E7EB" },
        axisTicks: { show: true, color: "#E5E7EB" },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
          formatter: (val) => {
            if (val >= 1000 || val <= -1000) {
              return `${(val / 1000).toFixed(0)} k`;
            }
            return val.toFixed(0);
          },
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 0,
        padding: {
          left: 15,
          right: 20,
        },
      },
      tooltip: {
        x: { show: true },
        y: {
          formatter: (val) => val.toFixed(2),
          title: {
            formatter: () => "Index: ",
          },
        },
        marker: { show: true },
      },
      markers: {
        size: 0,
        hover: { size: 6 },
        colors: ["#22D3EE"],
        strokeColors: "#fff",
        strokeWidth: 2,
      },
      colors: ["#22D3EE"],
    };
  }, [data, activeFilter, isMobile]);

  const series = useMemo(() => {
    if (!data) return [];
    return [
      {
        name: "Commodity Index",
        data: data.values,
      },
    ];
  }, [data]);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex justify-end mb-2 gap-2">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter.key
                ? "bg-[#2563EB] text-white shadow-sm"
                : "border-2 border-[#2563EB] text-[#2563EB] bg-white hover:bg-blue-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="min-h-[400px]">
        {isLoading && (
          <div className="flex items-center justify-center h-[400px]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#22D3EE]" />
              <span className="text-sm text-gray-500">Loading chart data...</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center px-4">
              <div className="text-red-500 mb-2">
                <svg
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <p className="text-sm text-red-600 font-medium">
                Failed to load chart data
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {error?.message || "Please check if the backend server is running."}
              </p>
              <button
                onClick={() => setActiveFilter(activeFilter)}
                className="mt-3 text-sm text-[#2563EB] hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {!isLoading && !isError && data && (
          <Chart
            options={chartOptions}
            series={series}
            type="area"
            height={400}
            width="100%"
          />
        )}
      </div>
    </div>
  );
}

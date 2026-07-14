import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Axios instance configured for the FastAPI backend.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 20s
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch commodity data from the FastAPI backend.
 * @param {"daily" | "monthly" | "yearly"} interval
 * @returns {Promise<{name: string, interval: string, unit: string, data: Array<{date: string, value: number}>}>}
 */
export async function fetchCommodityData(interval = "monthly") {
  const { data } = await apiClient.get("/api/commodities", {
    params: { interval },
  });
  return data;
}

export default apiClient;

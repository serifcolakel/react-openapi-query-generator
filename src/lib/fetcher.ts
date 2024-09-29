import { getErrorMessage } from "@/helpers/error";

const ignoredBodyMethods = ["GET", "HEAD"];

export async function fetcher(
  url: string | URL | Request,
  options?: RequestInit
) {
  try {
    const startTimer = Date.now();

    const body =
      options?.body && !ignoredBodyMethods.includes(options.method || "")
        ? options.body
        : undefined;

    const res = await fetch(url, {
      ...options,
      body,
    });

    const data = await res.json();

    const endTimer = Date.now();

    return {
      data,
      status: res.status,
      statusText: res.statusText,
      parsedHeaders: Object.fromEntries(res.headers),
      success: res.ok,
      responseTime: endTimer - startTimer,
    };
  } catch (error) {
    return {
      data: JSON.stringify(error),
      status: 500,
      statusText: getErrorMessage(error, "Failed to fetch"),
      parsedHeaders: {},
      success: false,
      responseTime: 0,
    };
  }
}

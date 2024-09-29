import { fetcher } from "@/lib/fetcher";
import { TestResult } from "./test";

export type RequestInfo = {
  result?: Awaited<ReturnType<typeof fetcher>>;
  testResults: TestResult[];
};

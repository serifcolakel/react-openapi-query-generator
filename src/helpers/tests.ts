import { fetcher } from "@/lib/fetcher";
import { Handler, Requester, TestResult } from "@/types";

const blackList: string[] = [
  "process",
  "require",
  "global",
  "module",
  "eval",
  "Function",
  "db",
  "prisma",
];

class TestExecutor {
  testResults: TestResult[] = [];

  result: Awaited<ReturnType<typeof fetcher>>;

  handlers: Handler;

  message: string;

  constructor(result: Awaited<ReturnType<typeof fetcher>>, handlers: Handler) {
    this.result = result;
    this.handlers = handlers;
    this.message = "";
  }

  executeTest(test: string): TestResult[] {
    blackList.forEach((blackListItem) => {
      if (test.includes(blackListItem)) {
        throw new Error(`ReferenceError: ${blackListItem} is not defined`);
      }
    });

    const requester: Requester = {
      test: (message, callback) => {
        if (!callback) {
          throw new Error(
            "Requester test function requires a callback function"
          );
        }

        this.message = message;

        callback();
      },
      response: {
        to: {
          have: {
            status: (status) => {
              const passed = status === this.result.status;

              const result = {
                expected: status,
                actual: this.result.status,
                passed,
                resultMessage: this.message,
              };

              if (!passed) {
                result.resultMessage = `${this.message} | AssertionError: Expected status code to be ${status}, but got ${this.result.status}`;
              }

              this.testResults.push(result);
            },
          },
        },
        data: this.result.data,
        status: this.result.status,
        responseTime: this.result.responseTime,
      },
      environment: {
        set: (key, value) => {
          this.handlers.environment.set(key, value);
        },
        replace: (key, value) => {
          this.handlers.environment.replace(key, value);
        },
        get: (key) => {
          return this.handlers.environment.get(key);
        },
        unset: (key) => {
          this.handlers.environment.unset(key);
        },
      },
      helpers: {
        isEqual: (value, expected) => {
          const passed = value === expected;

          const result = {
            expected,
            actual: value,
            passed,
            resultMessage: this.message,
          };

          if (!passed) {
            result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be equal to ${expected}`;
          }

          this.testResults.push(result);
        },
      },
      expect: (value) => {
        return {
          to: {
            be: {
              below: (expected) => {
                const passed = Number(value) < expected;

                const result = {
                  expected,
                  actual: value,
                  passed,
                  resultMessage: this.message,
                };

                if (!passed) {
                  result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be below ${expected}`;
                }

                this.testResults.push(result);
              },
              above: (expected) => {
                const passed = Number(value) > expected;

                const result = {
                  expected,
                  actual: value,
                  passed,
                  resultMessage: this.message,
                };

                if (!passed) {
                  result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be above ${expected}`;
                }

                this.testResults.push(result);
              },
              equal: (expected) => {
                const passed = value === expected;

                const result = {
                  expected,
                  actual: value,
                  passed,
                  resultMessage: this.message,
                };

                if (!passed) {
                  result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be equal to ${expected}`;
                }

                this.testResults.push(result);
              },
            },
            not: {
              be: {
                below: (expected) => {
                  const passed = Number(value) >= expected;

                  const result = {
                    expected,
                    actual: value,
                    passed,
                    resultMessage: this.message,
                  };

                  if (!passed) {
                    result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be above or equal to ${expected}`;
                  }

                  this.testResults.push(result);
                },
                above: (expected) => {
                  const passed = Number(value) <= expected;

                  const result = {
                    expected,
                    actual: value,
                    passed,
                    resultMessage: this.message,
                  };

                  if (!passed) {
                    result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be below or equal to ${expected}`;
                  }

                  this.testResults.push(result);
                },
                equal: (expected) => {
                  const passed = value !== expected;

                  const result = {
                    expected,
                    actual: value,
                    passed,
                    resultMessage: this.message,
                  };

                  if (!passed) {
                    result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be different from ${expected}`;
                  }

                  this.testResults.push(result);
                },
              },
            },
          },
        };
      },
    };

    // Override Global or Database functions for security reasons, add more if needed
    window.console.clear = () => {};

    // Execute the test
    const testFunction = new Function("requester", test);

    testFunction(requester);

    return this.testResults;
  }
}

export const executeTests = async (
  test: string,
  result: Awaited<ReturnType<typeof fetcher>>,
  handlers: Handler
) => {
  const executor = new TestExecutor(result, handlers);

  return executor.executeTest(test);
};

/**
 * @description: Requester type
 */
export type Requester = {
  test: (message: string, callback: () => void) => void;
  expect: (value: unknown) => {
    to: {
      be: {
        below: (value: number) => void;
        above: (value: number) => void;
        equal: (value: unknown) => void;
      };
      not: {
        be: {
          below: (value: number) => void;
          above: (value: number) => void;
          equal: (value: unknown) => void;
        };
      };
    };
  };
  response: {
    to: {
      have: {
        status: (status: number) => void;
      };
    };
    data: unknown;
    status: number;
    responseTime: number;
  };
  environment: {
    set: (key: string, value: unknown) => void;
    replace: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    unset: (key: string) => void;
  };
  helpers: {
    isEqual: (value: unknown, expected: unknown) => void;
  };
};

/**
 * @description: Test Handler type
 */
export type Handler = {
  environment: {
    set: (key: string, value: unknown) => void;
    replace: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    unset: (key: string) => void;
  };
};

/**
 * @description: Test result type
 */
export type TestResult = {
  expected: unknown;
  actual: unknown;
  passed: boolean;
  resultMessage: string;
};

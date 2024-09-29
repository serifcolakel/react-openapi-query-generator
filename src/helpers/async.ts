/**
 * @description A utility function that resolves a promise after a specified time.
 * @param ms - The time to sleep in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

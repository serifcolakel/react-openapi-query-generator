export const getErrorMessage = (
  error: unknown,
  initialMessage = "An error occurred"
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return initialMessage;
};

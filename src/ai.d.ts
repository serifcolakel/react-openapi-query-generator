export interface AITextSessionOptions {
  maxTokens: number;
  temperature: number;
  tokensLeft: number;
  tokensSoFar: number;
  topK: number;
}

export interface AITextSession {
  prompt(input: string): Promise<string>;
  promptStreaming(input: string): AsyncIterable<string>;
  destroy(): void;
}

export interface Capabilities {
  available: "readily" | "after-download" | "no";
  defaultTemperature: number;
  defaultTopK: number;
  maxTopK: number;
}

declare global {
  interface Window {
    ai: {
      assistant: {
        capabilities: () => Promise<Capabilities>;
        create: (
          options?: Partial<AITextSessionOptions>
        ) => Promise<AITextSession>;
      };
    };
  }
}

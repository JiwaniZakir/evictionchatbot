/**
 * Smoke test — verifies that the App component mounts without throwing.
 *
 * The Chatbot component instantiates the OpenAI client at render time
 * (using `new OpenAI(...)`) and imports prompt.txt as a Vite asset URL.
 * Both are mocked here so the test can run in a Node/jsdom environment
 * without real API credentials or a Vite dev server.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the openai package. OpenAI is used as a constructor (new OpenAI(...)),
// so the mock must expose a real class or a regular function, not an arrow fn.
vi.mock("openai", () => {
  class OpenAI {
    constructor() {
      this.chat = {
        completions: {
          create: vi.fn(),
        },
      };
    }
  }
  return { OpenAI };
});

// Mock the prompt.txt asset import (Vite normally resolves it as a URL string).
vi.mock("../prompt.txt", () => ({ default: "/mock-prompt.txt" }));

import App from "../App.jsx";

describe("App", () => {
  it("renders without crashing and shows the chatbot heading", () => {
    render(<App />);
    expect(screen.getByText(/Chat with EVITA/i)).toBeInTheDocument();
  });
});

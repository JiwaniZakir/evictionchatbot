/**
 * Smoke test — verifies that the App component mounts without throwing.
 *
 * The Chatbot component now calls /api/chat via fetch (server-side proxy)
 * instead of instantiating the OpenAI client directly in the browser.
 * Only the prompt.txt asset import needs to be mocked so the test can run
 * in a Node/jsdom environment without a Vite dev server.
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the prompt.txt asset import (Vite normally resolves it as a URL string).
vi.mock("../prompt.txt", () => ({ default: "/mock-prompt.txt" }));

import App from "../App.jsx";

describe("App", () => {
  it("renders without crashing and shows the chatbot heading", () => {
    render(<App />);
    expect(screen.getByText(/Chat with EVITA/i)).toBeInTheDocument();
  });
});

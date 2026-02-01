import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useThumbly } from "./useThumbly";
import { ThumblyClient, ThumblyDriver } from "@thumbly/core";

describe("useThumbly", () => {
  let client: ThumblyClient;
  let mockDriver: ThumblyDriver;

  beforeEach(() => {
    localStorage.clear();
    mockDriver = {
      submitVote: vi.fn().mockResolvedValue(undefined),
    } as unknown as ThumblyDriver;

    // Create a real client with a mock driver
    // This ensures 'instanceof ThumblyClient' returns true
    client = new ThumblyClient({
      surveyId: "test-survey",
      driver: mockDriver,
    });

    // We can still spy on the client methods if we want to ensure the hook calls them
    vi.spyOn(client, "vote");
    vi.spyOn(client, "hasVoted").mockReturnValue(false);
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useThumbly(client));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.hasVoted).toBe(false);
  });

  it("should update state when voting", async () => {
    const { result } = renderHook(() => useThumbly(client));

    await act(async () => {
      await result.current.vote(1);
    });

    expect(client.vote).toHaveBeenCalledWith(1);
    expect(result.current.hasVoted).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle errors", async () => {
    const error = new Error("Vote failed");
    // We mock the implementation of the spy, not the original method on the prototype
    vi.mocked(client.vote).mockRejectedValue(error);

    const { result } = renderHook(() => useThumbly(client));

    await act(async () => {
      await result.current.vote(1);
    });

    expect(result.current.error).toBe(error);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasVoted).toBe(false);
  });

  it("should call callbacks passed via config", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useThumbly({
        surveyId: "test-survey",
        driver: mockDriver,
        onSuccess,
      }),
    );

    await act(async () => {
      await result.current.vote(1);
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});

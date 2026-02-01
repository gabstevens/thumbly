import { useState, useCallback, useEffect } from "react";
import { ThumblyClient, ThumblyConfig } from "@thumbly/core";

export function useThumbly(config: ThumblyConfig | ThumblyClient) {
  const [client] = useState(() => {
    return config instanceof ThumblyClient ? config : new ThumblyClient(config);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setHasVoted(client.hasVoted());
  }, [client]);

  const vote = useCallback(
    async (optionIndex: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await client.vote(optionIndex);
        setHasVoted(true);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [client, config],
  );

  return { vote, isLoading, error, hasVoted };
}

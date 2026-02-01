"use client";

import { createContext, useContext, ReactNode } from "react";
import { useThumbly } from "../hooks/useThumbly";
import { ThumblyConfig } from "@thumbly/core";

interface ThumblyContextType {
  vote: (index: number) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  hasVoted: boolean;
}

const ThumblyContext = createContext<ThumblyContextType | null>(null);

export const useThumblyContext = () => {
  const context = useContext(ThumblyContext);
  if (!context) throw new Error("useThumblyContext must be used within ThumblyRoot");
  return context;
};

export const ThumblyRoot = ({ children, ...config }: { children: ReactNode } & ThumblyConfig) => {
  const thumbly = useThumbly(config);

  return <ThumblyContext.Provider value={thumbly}>{children}</ThumblyContext.Provider>;
};

export const ThumblyOption = ({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(ThumblyContext);
  if (!context) throw new Error("ThumblyOption must be used within ThumblyRoot");

  const { vote, isLoading, hasVoted } = context;

  return (
    <button onClick={() => void vote(index)} disabled={isLoading || hasVoted} className={className} type="button">
      {children}
    </button>
  );
};

export const Thumbly = {
  Root: ThumblyRoot,
  Option: ThumblyOption,
};

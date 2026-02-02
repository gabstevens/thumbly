"use client";

import { createContext, useContext, ReactNode, ComponentProps } from "react";
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

export interface ThumblyOptionProps extends ComponentProps<"button"> {
  index: number;
}

export const ThumblyOption = ({ index, onClick, disabled, className, children, ...props }: ThumblyOptionProps) => {
  const context = useContext(ThumblyContext);
  if (!context) throw new Error("ThumblyOption must be used within ThumblyRoot");

  const { vote, isLoading, hasVoted } = context;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      void vote(index);
    }
  };

  return (
    <button
      type="button"
      className={className}
      disabled={disabled || isLoading || hasVoted}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const Thumbly = {
  Root: ThumblyRoot,
  Option: ThumblyOption,
};

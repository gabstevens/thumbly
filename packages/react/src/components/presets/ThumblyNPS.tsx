"use client";

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";

export type ThumblyNPSProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  labels?: [ReactNode, ReactNode, ReactNode];
  successMessage?: ReactNode;
};

const NPSContent = ({
  className,
  style,
  labels = ["🙁", "😐", "🙂"],
  successMessage = "Thanks for your feedback!",
}: Omit<ThumblyNPSProps, keyof ThumblyConfig>) => {
  const { hasVoted } = useThumblyContext();

  if (hasVoted)
    return (
      <div className={className} style={style}>
        {successMessage}
      </div>
    );

  return (
    <div className={className} style={style}>
      <Thumbly.Option index={1}>{labels[0]}</Thumbly.Option>
      <Thumbly.Option index={2}>{labels[1]}</Thumbly.Option>
      <Thumbly.Option index={3}>{labels[2]}</Thumbly.Option>
    </div>
  );
};

export const ThumblyNPS = ({ className, style, labels, successMessage, ...config }: ThumblyNPSProps) => {
  return (
    <Thumbly.Root {...config}>
      <NPSContent className={className} style={style} labels={labels} successMessage={successMessage} />
    </Thumbly.Root>
  );
};

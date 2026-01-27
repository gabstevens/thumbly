"use client";

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";

export type ThumblyBinaryProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  labels?: [ReactNode, ReactNode];
  successMessage?: ReactNode;
};

const BinaryContent = ({
  className,
  style,
  labels = ["👍", "👎"],
  successMessage = "Thanks for your feedback!",
}: Omit<ThumblyBinaryProps, keyof ThumblyConfig>) => {
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
    </div>
  );
};

export const ThumblyBinary = ({ className, style, labels, successMessage, ...config }: ThumblyBinaryProps) => {
  return (
    <Thumbly.Root {...config}>
      <BinaryContent className={className} style={style} labels={labels} successMessage={successMessage} />
    </Thumbly.Root>
  );
};

"use client";

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";
import { getTheme, ThemeName } from "../../themes";

export type ThumblyBinaryProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  labels?: [ReactNode, ReactNode];
  successMessage?: ReactNode;
  theme?: ThemeName;
};

const BinaryContent = ({
  className,
  style,
  labels = ["👍", "👎"],
  successMessage = "Thanks for your feedback!",
  theme: themeName = "minimal",
}: Omit<ThumblyBinaryProps, keyof ThumblyConfig>) => {
  const { hasVoted } = useThumblyContext();
  const theme = getTheme(themeName);

  if (hasVoted)
    return (
      <div
        className={`thumbly-root thumbly-success ${className || ""}`}
        style={{ ...theme.root, ...theme.successMessage, ...style }}
      >
        {successMessage}
      </div>
    );

  return (
    <div className={`thumbly-root ${className || ""}`} style={{ ...theme.root, ...style }}>
      <Thumbly.Option index={1} className="thumbly-option" style={theme.option}>
        {labels[0]}
      </Thumbly.Option>
      <Thumbly.Option index={2} className="thumbly-option" style={theme.option}>
        {labels[1]}
      </Thumbly.Option>
    </div>
  );
};

export const ThumblyBinary = ({ className, style, labels, successMessage, theme, ...config }: ThumblyBinaryProps) => {
  return (
    <Thumbly.Root {...config}>
      <BinaryContent
        className={className}
        style={style}
        labels={labels}
        successMessage={successMessage}
        theme={theme}
      />
    </Thumbly.Root>
  );
};

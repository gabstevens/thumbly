"use client";

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";
import { getTheme, ThemeName } from "../../themes";

export type ThumblyNPSProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  labels?: [ReactNode, ReactNode, ReactNode];
  successMessage?: ReactNode;
  theme?: ThemeName;
};

const NPSContent = ({
  className,
  style,
  labels = ["🙁", "😐", "🙂"],
  successMessage = "Thanks for your feedback!",
  theme: themeName = "minimal",
}: Omit<ThumblyNPSProps, keyof ThumblyConfig>) => {
  const { hasVoted } = useThumblyContext();
  const theme = getTheme(themeName);

  if (hasVoted)
    return (
      <div className={className} style={{ ...theme.root, ...theme.successMessage, ...style }}>
        {successMessage}
      </div>
    );

  return (
    <div className={className} style={{ ...theme.root, ...style }}>
      <Thumbly.Option index={1} style={theme.option}>
        {labels[0]}
      </Thumbly.Option>
      <Thumbly.Option index={2} style={theme.option}>
        {labels[1]}
      </Thumbly.Option>
      <Thumbly.Option index={3} style={theme.option}>
        {labels[2]}
      </Thumbly.Option>
    </div>
  );
};

export const ThumblyNPS = ({ className, style, labels, successMessage, theme, ...config }: ThumblyNPSProps) => {
  return (
    <Thumbly.Root {...config}>
      <NPSContent className={className} style={style} labels={labels} successMessage={successMessage} theme={theme} />
    </Thumbly.Root>
  );
};

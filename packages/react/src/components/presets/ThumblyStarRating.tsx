"use client";

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";

export type ThumblyStarRatingProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  icon?: ReactNode;
  count?: number;
  successMessage?: ReactNode;
};

const StarRatingContent = ({
  className,
  style,
  icon = "⭐",
  count = 5,
  successMessage = "Thanks for voting!",
}: Omit<ThumblyStarRatingProps, keyof ThumblyConfig>) => {
  const { hasVoted } = useThumblyContext();

  if (hasVoted)
    return (
      <div className={className} style={style}>
        {successMessage}
      </div>
    );

  return (
    <div className={className} style={style}>
      {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
        <Thumbly.Option key={i} index={i}>
          {icon}
        </Thumbly.Option>
      ))}
    </div>
  );
};

export const ThumblyStarRating = ({
  className,
  style,
  icon,
  count,
  successMessage,
  ...config
}: ThumblyStarRatingProps) => {
  return (
    <Thumbly.Root {...config}>
      <StarRatingContent
        className={className}
        style={style}
        icon={icon}
        count={count}
        successMessage={successMessage}
      />
    </Thumbly.Root>
  );
};

import React, { ReactNode } from "react";
import { Thumbly, useThumblyContext } from "../headless";
import { ThumblyConfig } from "@thumbly/core";
import { getTheme, ThemeName } from "../../themes";

export type ThumblyStarRatingProps = ThumblyConfig & {
  className?: string;
  style?: React.CSSProperties;
  icon?: ReactNode;
  count?: number;
  successMessage?: ReactNode;
  theme?: ThemeName;
};

const StarRatingContent = ({
  className,
  style,
  icon = "⭐",
  count = 5,
  successMessage = "Thanks for your feedback!",
  theme: themeName = "minimal",
}: Omit<ThumblyStarRatingProps, keyof ThumblyConfig>) => {
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
      {Array.from({ length: count }).map((_, i) => (
        <Thumbly.Option key={i} index={i + 1} style={theme.option}>
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
  theme,
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
        theme={theme}
      />
    </Thumbly.Root>
  );
};

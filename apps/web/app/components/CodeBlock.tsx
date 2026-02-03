"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = "typescript", showLineNumbers = false }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={prism}
      showLineNumbers={showLineNumbers}
      customStyle={{
        borderRadius: "4px",
      }}
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
};

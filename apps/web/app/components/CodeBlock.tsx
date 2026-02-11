"use client";

import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock = ({ code, language = "typescript", showLineNumbers = false, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div
      className={cn(
        "not-prose group relative rounded-xl overflow-hidden border border-border/50 bg-slate-950 shadow-sm my-4",
        className,
      )}
    >
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-white/5 p-1.5 text-white/50 opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100"
        title="Copy code"
      >
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          background: "transparent", // Background handled by wrapper
          fontSize: "0.875rem",
          lineHeight: "1.6",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

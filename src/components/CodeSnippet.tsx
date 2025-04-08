
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  title: string;
  language: string;
  code: string;
  className?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  language,
  code,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("code-snippet group", className)}>
      <div className="code-snippet-header">
        <div className="flex items-center gap-2">
          <div className="code-snippet-dots">
            <span className="code-snippet-dot bg-red-500"></span>
            <span className="code-snippet-dot bg-yellow-500"></span>
            <span className="code-snippet-dot bg-green-500"></span>
          </div>
          <span className="opacity-70">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-muted text-xs">{language}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
          </Button>
        </div>
      </div>
      
      <pre className="text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;

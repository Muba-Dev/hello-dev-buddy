
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DocReferenceProps {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

const DocReference: React.FC<DocReferenceProps> = ({
  title,
  description,
  tags,
  url,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:border-devpurple-300 hover:shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <span>View Docs</span>
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocReference;

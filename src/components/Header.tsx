
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Code, ListTodo } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-card border-b border-border py-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-10 bg-devblue-600 text-white rounded-md flex items-center justify-center">
            <Code size={20} />
          </div>
          <h1 className="text-xl font-semibold">Dev Buddy</h1>
        </div>
        
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Button variant="ghost" className="flex items-center gap-2">
                <Code size={16} />
                <span>Snippets</span>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>Docs</span>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="flex items-center gap-2">
                <ListTodo size={16} />
                <span>Tasks</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

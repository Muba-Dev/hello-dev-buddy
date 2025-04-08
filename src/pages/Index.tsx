
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import CodeSnippet from '@/components/CodeSnippet';
import DocReference from '@/components/DocReference';
import TaskTracker from '@/components/TaskTracker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, BookOpen, ListTodo } from "lucide-react";

const Index = () => {
  const reactHookCode = `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`;

  const tailwindCode = `const Button = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  
  return (
    <button className={\`\${baseClasses} \${variants[variant]}\`}>
      {children}
    </button>
  );
};`;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-devblue-600 to-devpurple-500 bg-clip-text text-transparent">
            Welcome to Dev Buddy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your ultimate companion for development tasks and references
          </p>
        </div>

        <Tabs defaultValue="snippets" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="snippets" className="flex items-center gap-2">
              <Code size={16} />
              <span>Code Snippets</span>
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListTodo size={16} />
              <span>Task Tracker</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="snippets" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Useful Code Snippets</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <CodeSnippet 
                title="React Hooks Example" 
                language="jsx" 
                code={reactHookCode} 
                className="animate-code-glow"
              />
              <CodeSnippet 
                title="Tailwind Component" 
                language="jsx" 
                code={tailwindCode} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="docs" className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Documentation References</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <DocReference
                title="React Documentation"
                description="Official React documentation with guides, API references, and examples."
                tags={["React", "JavaScript", "Frontend"]}
                url="https://reactjs.org/docs/getting-started.html"
              />
              <DocReference
                title="TypeScript Handbook"
                description="The TypeScript Handbook is a comprehensive guide to the TypeScript language."
                tags={["TypeScript", "JavaScript", "Static Types"]}
                url="https://www.typescriptlang.org/docs/"
              />
              <DocReference
                title="Tailwind CSS"
                description="Rapidly build modern websites without ever leaving your HTML."
                tags={["CSS", "Utility-First", "Styling"]}
                url="https://tailwindcss.com/docs"
              />
              <DocReference
                title="Node.js Documentation"
                description="Official documentation for Node.js, a JavaScript runtime."
                tags={["Node.js", "JavaScript", "Backend"]}
                url="https://nodejs.org/en/docs/"
              />
              <DocReference
                title="Next.js Documentation"
                description="The React framework for production with hybrid static & server rendering."
                tags={["Next.js", "React", "Framework"]}
                url="https://nextjs.org/docs"
              />
              <DocReference
                title="Git Documentation"
                description="Documentation for Git, the distributed version control system."
                tags={["Git", "Version Control", "DevOps"]}
                url="https://git-scm.com/doc"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListTodo size={18} />
                  <span>Development Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaskTracker />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;

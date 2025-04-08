
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Learn React Hooks", completed: false },
    { id: "2", text: "Build a portfolio project", completed: false },
    { id: "3", text: "Study TypeScript advanced types", completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    toast.success('Task added');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task removed');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask}>
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No tasks yet. Add one to get started!
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item group">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.text}
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskTracker;

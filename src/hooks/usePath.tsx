import React from "react";
import { useLocalStorage } from "react-use";

export interface UsePathReturn {
  push: (path: string) => void;
  pop: () => void;
  currentPath: string[];
}

// Utilising a LIFO stack structure here to manage the pathing
export const usePath = (options: { initial: string[] }): UsePathReturn => {
  const [path, setPath] = React.useState<string[]>(options.initial);

  return {
    push: (path: string) => setPath((prev) => [...prev, path]),
    // If there is zero, or 1 elements in the path, pressing the back should do nothing
    pop: () => setPath((prev) => (prev.length <= 1 ? prev : prev.slice(0, -1))),
    currentPath: path ?? [],
  };
};

import _ from "lodash";
import React from "react";
import { useLocalStorage } from "react-use";
import {} from "../App";

export type FileSystem = {
  [path: string]: FileOrFolder;
};

export type FileOrFolder = string | FileSystem;

export interface UseFileSystemReturn {
  files: FileSystem;
  addFile: (path: string[], name: string, contents?: FileOrFolder) => void;
  addFolder: (path: string[], name: string, contents?: FileOrFolder) => void;
}

export const useFileSystem = (options: {
  key: string;
  root: string;
}): UseFileSystemReturn => {
  const [files, setFiles, remove] = useLocalStorage<FileSystem>(options.key, {
    [options.root]: {},
  });

  const add = React.useCallback(
    (path: string[], name: string, contents?: FileOrFolder) => {
      const fileName = [...path, name].join(".");

      setFiles((prevFiles) =>
        prevFiles
          ? _.set(prevFiles, fileName, contents)
          : _.set({}, fileName, contents)
      );
    },
    [setFiles]
  );

  const addFile = React.useCallback(
    (path: string[], name: string, contents?: FileOrFolder) => {
      add(path, name, contents);
    },
    [add]
  );

  const addFolder = React.useCallback(
    (path: string[], name: string, contents?: FileOrFolder) =>
      add(path, name, contents),
    [add]
  );

  return {
    files: files ?? {},
    addFile,
    addFolder,
  };
};

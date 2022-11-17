import { FaRegFile, FaRegFolder } from "react-icons/fa";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { FileOrFolder } from "../hooks/useFileSystem";
import _ from "lodash";
import { IconButton } from "./IconButton";

export const isFile = (fileOrFolder: FileOrFolder): fileOrFolder is string =>
  typeof fileOrFolder === "string";

export const FileSystemView = (props: {
  fileOrFolder: FileOrFolder;
  path: string[];
  onClickFile: (name: string) => void;
  onClickFolder: (name: string) => void;
}) => {
  const { fileOrFolder, path, onClickFile, onClickFolder } = props;

  if (!isFile(fileOrFolder)) {
    return (
      <HStack
        border="1px solid gray"
        borderRadius="md"
        p={4}
        w="full"
        spacing={6}
      >
        {_.map(fileOrFolder, (fileOrFolder, pathKey) => {
          return (
            <FileOrFolderView
              key={pathKey}
              name={pathKey}
              path={path}
              fileOrFolder={fileOrFolder}
              onClickFile={onClickFile}
              onClickFolder={onClickFolder}
            />
          );
        })}
      </HStack>
    );
  }

  return (
    <Box w="full" border="1px solid gray" borderRadius="md" p={4}>
      <FileOrFolderView
        name={_.last(path) ?? ""}
        path={path}
        fileOrFolder={fileOrFolder}
        onClickFile={onClickFile}
        onClickFolder={onClickFolder}
      />
    </Box>
  );
};

export const FileOrFolderView = (props: {
  fileOrFolder: FileOrFolder;
  name: string;
  path: string[];
  onClickFile: (name: string) => void;
  onClickFolder: (name: string) => void;
}) => {
  const { fileOrFolder, name, onClickFile, onClickFolder, path } = props;
  const pathMatchesName = _.last(path) === name;

  if (!isFile(fileOrFolder)) {
    return <Folder name={name} onClick={onClickFolder} />;
  }

  // If the last element of the path array matches the current name, we have clicked a file
  // and want to view its contents, rather then pushing to the path stack
  if (pathMatchesName) {
    return <Text>{fileOrFolder}</Text>;
  }

  return <File name={name} onClick={onClickFile} />;
};

export const FileAndFolderCount = (props: {
  fileCount: number;
  folderCount: number;
}) => {
  const { fileCount, folderCount } = props;
  return (
    <Flex>
      <HStack>
        <Text>Total files:</Text>
        <Text>{fileCount} files</Text>
        <Text>{folderCount} folders</Text>
      </HStack>
    </Flex>
  );
};

export const File = (props: {
  name: string;
  onClick: (name: string) => void;
}) => {
  const { name, onClick } = props;

  return (
    <Flex onDoubleClick={() => onClick(name)} flexDir="column" align="start">
      <IconButton name={name} icon={<FaRegFile size={30} />} />
      <Text>{name}</Text>
    </Flex>
  );
};

export const Folder = (props: {
  name: string;
  onClick: (name: string) => void;
}) => {
  const { name, onClick } = props;

  return (
    <Flex onDoubleClick={() => onClick(name)} flexDir="column" align="start">
      <IconButton name={name} icon={<FaRegFolder size={30} />} />
      <Text>{name}</Text>
    </Flex>
  );
};

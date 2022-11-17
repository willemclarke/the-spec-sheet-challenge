import React from "react";
import {
  ButtonGroup,
  Divider,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import { AddFileControl } from "./components/AddFileControl";
import { FileSystem, useFileSystem } from "./hooks/useFileSystem";
import { AddFolderControl } from "./components/AddFolderControl";
import { FileSystemView } from "./components/FileSystem";
import { usePath } from "./hooks/usePath";
import { Nav } from "./components/Nav";

const INITIAL_PATH = "Home";

export const App = () => {
  const {
    isOpen: isAddFileModalOpen,
    onOpen: onAddFileModalOpen,
    onClose: onAddFileModalClose,
  } = useDisclosure();
  const {
    isOpen: isAddFolderModalOpen,
    onOpen: onAddFolderModalOpen,
    onClose: onAddFolderModalClose,
  } = useDisclosure();

  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const path = usePath({ initial: [INITIAL_PATH] });
  const fileSystem = useFileSystem({ key: "filesystem", root: INITIAL_PATH });

  const onClickFile = React.useCallback(
    (name: string) => {
      path.push(name);
    },
    [path.push]
  );

  const onClickFolder = React.useCallback(
    (name: string) => {
      path.push(name);
    },
    [path.push]
  );

  // we only want to compute the filtering of the files/folders if the searchTerm changes, fileSystem changes
  // or path changes, if the searchTerm is "", we short curcuit out and return the values
  const filteredFileSystem = React.useMemo(() => {
    const currentPath = path.currentPath.join(".");
    const valuesAtPath = _.get(fileSystem.files, currentPath);

    if (_.isEmpty(searchTerm)) {
      return valuesAtPath;
    }

    const matchingFiles = _.pickBy(valuesAtPath, (_, key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    ) as FileSystem;

    return matchingFiles;
  }, [searchTerm, fileSystem, path]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      mt="12"
      flexDir="column"
      w="100%"
    >
      <Text as="b" fontSize="xl" my="4">
        THE SPEC SHEET - FILE EXPLORER CHALLENGE
      </Text>
      <Flex flexDir="column" w="40%">
        <Input
          mt="2"
          placeholder="Search"
          w="96"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup my="4">
          <AddFileControl
            isOpen={isAddFileModalOpen}
            onOpen={onAddFileModalOpen}
            onClose={onAddFileModalClose}
            path={path.currentPath}
            fileSystem={fileSystem}
          />
          <AddFolderControl
            isOpen={isAddFolderModalOpen}
            onOpen={onAddFolderModalOpen}
            onClose={onAddFolderModalClose}
            path={path.currentPath}
            fileSystem={fileSystem}
          />
        </ButtonGroup>
        <Divider my={2} />
        <Nav path={path} />
        <Divider my={2} />
        <FileSystemView
          fileOrFolder={filteredFileSystem}
          path={path.currentPath}
          onClickFolder={onClickFolder}
          onClickFile={onClickFile}
        />
      </Flex>
    </Flex>
  );
};

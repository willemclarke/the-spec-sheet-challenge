import React from "react";
import {
  ButtonGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
} from "@chakra-ui/react";
import { Button } from "./Button";
import { UseFileSystemReturn } from "../hooks/useFileSystem";
import { useToast } from "../hooks/useToast";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  path: string[];
  fileSystem: UseFileSystemReturn;
}

export const AddFileControl = (props: Props) => {
  const { isOpen, onOpen, onClose, path, fileSystem } = props;
  const { successToast } = useToast();

  const [name, setName] = React.useState<string>("");
  const [contents, setContents] = React.useState<string>("");

  const onAddFile = React.useCallback(() => {
    fileSystem.addFile(path, name, contents);
    setName("");
    setContents("");
    onClose();
    successToast("File added successfully");
  }, [fileSystem, path, name, contents, onClose, setName, setContents]);

  return (
    <>
      <Button
        title="Add new file"
        variant="outline"
        onClick={onOpen}
        colorScheme="blue"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel htmlFor="name" mt="2">
              File contents
            </FormLabel>
            <Input
              id="name"
              placeholder="File content goes here"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button title="Cancel" onClick={onClose} />
              <Button
                title="Create"
                mr={3}
                type="submit"
                onClick={onAddFile}
                colorScheme="blue"
              />
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

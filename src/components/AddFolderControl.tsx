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

export const AddFolderControl = (props: Props) => {
  const { isOpen, onOpen, onClose, path, fileSystem } = props;
  const [name, setName] = React.useState<string>("");
  const { successToast } = useToast();

  const onAddFolder = React.useCallback(() => {
    fileSystem.addFolder(path, name, {});
    setName("");
    onClose();
    successToast("Folder added successfully");
  }, [fileSystem, path, name, onClose, setName]);

  return (
    <>
      <Button
        title="Add new folder"
        variant="outline"
        onClick={onOpen}
        colorScheme="blue"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button title="Cancel" onClick={onClose} />
              <Button
                title="Create"
                mr={3}
                type="submit"
                onClick={onAddFolder}
                colorScheme="blue"
              />
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

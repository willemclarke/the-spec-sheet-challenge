import { IconButton as ChakraIconButton } from "@chakra-ui/react";

interface Props {
  name: string;
  icon: JSX.Element;
}

export const IconButton = (props: Props) => {
  return (
    <ChakraIconButton
      aria-label="add-file"
      icon={props.icon}
      w="14"
      h="14"
      colorScheme="blue"
    >
      {props.name}
    </ChakraIconButton>
  );
};

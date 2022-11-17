import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  title: string;
  onClick?: () => void;
}

export const Button = (props: Props) => {
  const { title, onClick, ...rest } = props;

  return (
    <ChakraButton onClick={onClick} {...rest}>
      {title}
    </ChakraButton>
  );
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { UsePathReturn } from "../hooks/usePath";

interface Props {
  path: UsePathReturn;
}

export const Nav = (props: Props) => {
  const { path } = props;

  return (
    <Flex w="100%">
      <Breadcrumb>
        {path.currentPath.map((fragment, idx) => (
          <BreadcrumbItem key={idx}>
            <Text>{fragment}</Text>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Spacer mx={4} />
      <Link onClick={path.pop}>Back</Link>
    </Flex>
  );
};

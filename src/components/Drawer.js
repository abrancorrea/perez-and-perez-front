import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const AppDrawer = ({ isOpen, onClose }) => {
  const btnRef = React.useRef();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Flex my={4}>
            <Button w="100%" onClick={onClose} variant="ghost" as={Link} to="/">
              Clientes
            </Button>
          </Flex>
          <Flex my={4}>
            <Button w="100%" onClick={onClose} variant="ghost" as={Link} to="/fixes">
              Reparaciones
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AppDrawer;

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";

const Header = ({ onOpenDrawer }) => {
  return (
    <Box bg="tomato" w="100%" p={4} color="white">
      <Flex alignItems="center">
        <IconButton
          variant="link"
          colorScheme="white"
          fontSize="20px"
          mr={30}
          onClick={onOpenDrawer}
          icon={<HamburgerIcon />}
        />
        <Heading size="md">Perez & Perez</Heading>
      </Flex>
    </Box>
  );
};

export default Header;

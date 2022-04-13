import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const TableTitle = ({ disabled, title, onClickBtn, btnTitle }) => (
  <Flex justifyContent="space-between">
    <Box width={{ sm: "auto" }}>
      <Heading size="lg">{title}</Heading>
    </Box>
    <Box width={{ sm: "auto" }}>
      <Button
        onClick={onClickBtn}
        leftIcon={<AddIcon />}
        disabled={disabled}
        colorScheme="blue"
        borderRadius="50px"
        size="md"
        minW="150px"
      >
        {btnTitle}
      </Button>
    </Box>
  </Flex>
);

export default TableTitle;

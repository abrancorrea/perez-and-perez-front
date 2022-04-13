import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

const LoadingTable = () => {
  return (
    <Flex justifyContent="space-around">
      <Skeleton w="30%" mx={2} height="20px" />
      <Skeleton w="30%" mx={2} height="20px" />
      <Skeleton w="30%" mx={2} height="20px" />
    </Flex>
  );
};

export default LoadingTable;

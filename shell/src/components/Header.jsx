import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      gap="2em"
      padding="1.5rem"
      bg="blue"
      color="white"
    >
      <Box>
        <Link style={{ color:"white", fontSize: 16}} to="/">Users</Link>
      </Box>
      <Box>
        <Link style={{ color:"white", fontSize: 16}} to="/tickets">Tickets</Link>
      </Box>
      <Box >
        <Link style={{ color:"white", fontSize: 16}}  to="/purchases">Purchases</Link>
      </Box>
    </Flex>
  );
};

export default Header;

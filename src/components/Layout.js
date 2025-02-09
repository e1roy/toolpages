import React from "react";
import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  const bg = useColorModeValue("gray.50", "gray.400");
  const triangleBg = useColorModeValue("orange.100", "blue.900");
  const buttonColor = useColorModeValue("blue.600", "blue.200");

  return (
    <Box bg={bg} minH="100vh" position="relative">
      <Box
        position="fixed"
        top={0}
        left={0}
        width="60px"
        height="60px"
        clipPath="polygon(0 0, 0 100%, 100% 0)"
        bg={triangleBg}
        transition="all 0.3s"
        _hover={{
          width: "70px",
          height: "70px",
        }}
      >
        <Link to="/">
          <IconButton
            icon={<ChevronLeftIcon />}
            variant="unstyled"
            color={buttonColor}
            position="absolute"
            top="3px"
            left="2px"
            size="sm"
            aria-label="Home"
            _hover={{
              transform: "scale(1.1)",
            }}
            transition="all 0.2s"
          />
        </Link>
      </Box>
      <Box pt={4}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;

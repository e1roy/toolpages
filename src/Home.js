import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useColorModeValue,
  SlideFade,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TimeIcon, DragHandleIcon } from '@chakra-ui/icons';

function Home() {
  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box bg={bg} minH="100vh" py={16}>
      <Container maxW="container.lg">
        <SlideFade in={true} offsetY="20px">
          <Box textAlign="center" mb={12}>
            <Heading as="h1" size="3xl" color={color} mb={4}>
              Tool Pages
            </Heading>
            <Text fontSize="xl" color={color} opacity={0.8}>
              A collection of useful tools to help with your daily tasks
            </Text>
          </Box>

          <SimpleGrid columns={[1, null, 2]} spacing={8} px={4}>
            <Link to="/diff" style={{ width: '100%' }}>
              <Button
                h="120px"
                w="100%"
                colorScheme="blue"
                variant="outline"
                leftIcon={<DragHandleIcon boxSize={6} />}
                fontSize="xl"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  bg: useColorModeValue("blue.50", "blue.900"),
                }}
                transition="all 0.2s"
              >
                Diff Checker
              </Button>
            </Link>
            <Link to="/time" style={{ width: '100%' }}>
              <Button
                h="120px"
                w="100%"
                colorScheme="green"
                variant="outline"
                leftIcon={<TimeIcon boxSize={6} />}
                fontSize="xl"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                  bg: useColorModeValue("green.50", "green.900"),
                }}
                transition="all 0.2s"
              >
                Time Converter
              </Button>
            </Link>
          </SimpleGrid>
        </SlideFade>
      </Container>
    </Box>
  );
}

export default Home;

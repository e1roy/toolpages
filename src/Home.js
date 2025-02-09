import React from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  const bg = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bg} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="center">
          <Heading as="h1" size="3xl" color={color}>
            Tool Pages
          </Heading>
          <VStack spacing={4}>
            <Link to="/diff">
              <Button colorScheme="blue" size="lg">
                Go to Diff Tool
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Home;

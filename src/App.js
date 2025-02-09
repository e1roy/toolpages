import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Diff from './pages/DiffEditor';
import Time from './pages/TimeCalculator';
import Layout from './components/Layout';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

function App() {
  const bg = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <ChakraProvider>
      <Router basename="/toolpages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/diff" element={<Diff />} />
            <Route path="/time" element={<Time />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

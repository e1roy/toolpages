import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DiffEditor from './DiffEditor';
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
    <Router basename="/toolpages">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diff" element={<DiffEditor />} />
      </Routes>
    </Router>
  );
}

export default App;

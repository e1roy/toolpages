import React, { useState, useRef } from "react";
import { MonacoDiffEditor } from "react-monaco-editor";
import {
  Box,
  Heading,
  HStack,
  Button,
  useColorModeValue,
  useToast,
  Select,
} from "@chakra-ui/react";

function DiffEditor() {
  const [original, setOriginal] = useState("text1");
  const [value, setValue] = useState("text2");
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const toast = useToast();

  const editorOptions = {
    renderSideBySide: true,
    enableSplitViewResizing: true,
    originalEditable: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    folding: true,
    lineNumbers: true,
    wordWrap: "on",
    theme: useColorModeValue("vs", "vs-dark"),
    renderIndicators: true,
    renderMarginRevertIcon: true
  };

  const languages = [
    { value: "plaintext", label: "Plain Text" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (newValue, e) => {
    setValue(newValue);
  };

  const handleOriginalChange = (newValue, e) => {
    setOriginal(newValue);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleClear = () => {
    setOriginal("");
    setValue("");

    if (editorRef.current) {
      editorRef.current.getModel().original.setValue("");
      editorRef.current.getModel().modified.setValue("");
    }

    // toast({
    //   title: "已清空全部内容",
    //   description: "左右两侧的代码已被清空",
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    // });
  };

  const handleSample = () => {
    const sampleOriginal = `function hello() {\n  console.log("Hello");\n}`;
    const sampleModified = `function hello() {\n  console.log("Hello World");\n  return true;\n}`;
    
    setOriginal(sampleOriginal);
    setValue(sampleModified);

    // toast({
    //   title: "已加载示例代码",
    //   status: "success",
    //   duration: 2000,
    //   isClosable: true,
    // });
  };

  return (
    <Box bg={bg} minH="100vh" py={0}>
      <Box px={0} height="10vh">
        <HStack width="full" justify="space-between" px={4} py={2}>
          <HStack spacing={4} hidden={true}>
            <Select
              size="sm"
              value={language}
              onChange={handleLanguageChange}
              width="200px"
              bg={useColorModeValue("white", "gray.700")}
              _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
              sx={{
                "& option": {
                  bg: useColorModeValue("white", "gray.700"),
                },
                "& option:hover": {
                  bg: useColorModeValue("blue.50", "blue.700"),
                },
                "& option:checked": {
                  bg: useColorModeValue("blue.50", "blue.600"),
                  color: useColorModeValue("blue.600", "white"),
                }
              }}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Select>
          </HStack>
          <HStack>
          </HStack>
          <HStack>
            <Button size="sm" onClick={handleSample} colorScheme="blue">
              加载示例
            </Button>
            <Button size="sm" onClick={handleClear} colorScheme="red">
              清空
            </Button>
          </HStack>
        </HStack>

        <Box
          width="full"
          height="95vh"
          borderWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="lg"
          overflow="hidden"
        >
          <MonacoDiffEditor
            original={original}
            value={value}
            options={editorOptions}
            onChange={handleChange}
            language= "javascript"
            height="100%"
            editorDidMount={handleEditorDidMount}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DiffEditor;

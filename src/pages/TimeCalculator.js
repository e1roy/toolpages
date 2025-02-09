import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  Card,
  CardBody,
  IconButton,
  HStack,
  Divider,
  useToast,
  Icon,
  Grid,
  GridItem,
  CardHeader,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const TimeBlock = ({ onDelete, index }) => {
  const [timestamp, setTimestamp] = useState("");
  const [timeCalculations, setTimeCalculations] = useState([
    { days: 0, hours: 0 },
  ]);
  const [readableDate, setReadableDate] = useState("");
  const toast = useToast();

  const formatDate = (date) => {
    const weekMap = {
      Monday: "星期一",
      Tuesday: "星期二",
      Wednesday: "星期三",
      Thursday: "星期四",
      Friday: "星期五",
      Saturday: "星期六",
      Sunday: "星期日",
    };

    const dateStr = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    return `${dateStr} ${weekMap[weekday]}`;
  };

  const formatDateForInput = (date) => {
    if (!date || isNaN(new Date(date).getTime())) return "";
    const d = new Date(date);
    // Get local ISO string
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleTimestampChange = (value) => {
    setTimestamp(value);
    if (value) {
      try {
        let ts = parseInt(value);
        if (ts < 10000000000) ts *= 1000;
        // Create date in local timezone
        const date = new Date(ts);
        if (!isNaN(date.getTime())) {
          setReadableDate(date);
          calculateAllDates(ts, timeCalculations);
        } else {
          setReadableDate(null);
          resetCalculations();
        }
      } catch {
        setReadableDate(null);
        resetCalculations();
      }
    } else {
      setReadableDate(null);
      resetCalculations();
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (!isNaN(selectedDate.getTime())) {
      // Set time to 00:00:00 if user only changed the date
      if (selectedDate.getHours() === 0 && 
          selectedDate.getMinutes() === 0 && 
          selectedDate.getSeconds() === 0) {
        selectedDate.setHours(0, 0, 0, 0);
      }
      const ts = selectedDate.getTime();
      setTimestamp(String(Math.floor(ts)));
      setReadableDate(selectedDate);
      calculateAllDates(ts, timeCalculations);
    } else {
      setTimestamp("");
      setReadableDate(null);
      resetCalculations();
    }
  };

  // Add this function to get today's date at midnight
  const getTodayAtMidnight = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return formatDateForInput(today);
  };

  const resetCalculations = () => {
    setTimeCalculations(
      timeCalculations.map((calc) => ({
        ...calc,
        result: "",
      }))
    );
  };

  const calculateAllDates = (ts, calculations) => {
    const newCalcs = calculations.map((calc) => {
      const newDate = new Date(
        ts + (calc.days * 24 + calc.hours) * 60 * 60 * 1000
      );
      return {
        ...calc,
        result: formatDate(newDate),
      };
    });
    setTimeCalculations(newCalcs);
  };

  const handleTimeChange = (index, field, value) => {
    const newValue = parseInt(value) || 0;
    const newCalcs = [...timeCalculations];
    newCalcs[index] = {
      ...newCalcs[index],
      [field]: newValue
    };

    // // 如果有输入值且是最后一个计算块，自动添加新的空白计算块
    // if ((newValue > 0 || newCalcs[index].days > 0 || newCalcs[index].hours > 0) && 
    //     index === timeCalculations.length - 1) {
    //   newCalcs.push({
    //     days: 0,
    //     hours: 0,
    //     result: ''
    //   });
    // }

    // 清理空的计算块，但保留至少一个
    if (newCalcs.length > 1) {
      const cleanedCalcs = newCalcs.filter((calc, idx) => {
        if (idx === newCalcs.length - 1) return true; // 保留最后一个
        return calc.days !== 0 || calc.hours !== 0; // 保留有值的块
      });
      setTimeCalculations(cleanedCalcs);

      if (timestamp) {
        let ts = parseInt(timestamp);
        if (ts < 10000000000) ts *= 1000;
        calculateAllDates(ts, cleanedCalcs);
      }
    } else {
      setTimeCalculations(newCalcs);
      
      if (timestamp) {
        let ts = parseInt(timestamp);
        if (ts < 10000000000) ts *= 1000;
        calculateAllDates(ts, newCalcs);
      }
    }
  };

  const removeCalculation = (index) => {
    if (timeCalculations.length > 1) {
      const newCalcs = timeCalculations.filter((_, i) => i !== index);
      setTimeCalculations(newCalcs);
      if (timestamp) {
        let ts = parseInt(timestamp);
        if (ts < 10000000000) ts *= 1000;
        calculateAllDates(ts, newCalcs);
      }
    }
  };

  return (
    <Card
      width="100%"
      variant="outline"
      boxShadow="md"
      borderRadius="lg"
      bg="white">
      <CardHeader fontWeight="bold">
        <HStack justify="space-between" mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            时间计算 #{index + 1}
          </Text>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete(index)}
            size="sm"
            colorScheme="red"
            variant="ghost"
          />
        </HStack>
      </CardHeader>
      <CardBody px={6} py={1}>
        <VStack spacing={4} align="stretch">
          {/* 时间戳转换部分 */}
          <VStack
            align="start"
            spacing={3}
            p={4}
            bg="gray.50"
            borderRadius="md">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              时间戳转换:
            </Text>
            <Grid
              templateColumns="180px 40px minmax(400px, 1fr)"
              gap={3}
              alignItems="center">
              <Input
                placeholder="输入Unix时间戳"
                value={timestamp}
                onChange={(e) => handleTimestampChange(e.target.value)}
                bg="white"
              />
              <Icon
                as={ArrowForwardIcon}
                color="gray.500"
                justifySelf="center"
              />
              <HStack spacing={2} flex={1}>
                <Input
                  type="datetime-local"
                  value={formatDateForInput(readableDate)}
                  onChange={handleDateChange}
                  placeholder="选择日期和时间"
                  defaultValue={getTodayAtMidnight()}
                  bg="white"
                  size="md"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
                  sx={{
                    '&::-webkit-calendar-picker-indicator': {
                      cursor: 'pointer'
                    },
                    '&::-webkit-datetime-edit': {
                      paddingLeft: '1rem'
                    }
                  }}
                />
                {readableDate && (
                  <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
                    {formatDate(new Date(readableDate))}
                  </Text>
                )}
              </HStack>
            </Grid>
          </VStack>

          {/* 时间计算部分 */}
          <VStack
            align="start"
            spacing={3}
            p={4}
            bg="gray.50"
            borderRadius="md">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              增减时间计算:
            </Text>
            {timeCalculations.map((calc, calcIndex) => (
              <Grid
                key={calcIndex}
                templateColumns="180px 40px minmax(400px, 1fr)"
                gap={3}
                alignItems="center">
                <HStack spacing={2}>
                  <NumberInput 
                    min={0} 
                    value={String(calc.days)} 
                    size="sm" 
                    width="70px"
                    onChange={(valueString) => handleTimeChange(calcIndex, "days", valueString)}
                  >
                    <NumberInputField
                      placeholder="天"
                      bg="white"
                    />
                  </NumberInput>
                  <Text fontSize="sm">天</Text>
                  <NumberInput
                    min={0}
                    max={23}
                    value={String(calc.hours)}
                    size="sm"
                    width="70px"
                    onChange={(valueString) => handleTimeChange(calcIndex, "hours", valueString)}
                  >
                    <NumberInputField
                      placeholder="时"
                      bg="white"
                    />
                  </NumberInput>
                  <Text fontSize="sm">时</Text>
                  {timeCalculations.length > 1 && (
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => removeCalculation(calcIndex)}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                    />
                  )}
                </HStack>
                <Icon
                  as={ArrowForwardIcon}
                  color="gray.500"
                  justifySelf="center"
                />
                <Input
                  value={calc.result || ""}
                  isReadOnly
                  placeholder="计算后的时间"
                  bg="white"
                />
              </Grid>
            ))}
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

const TimeCalculator = () => {
  const [blocks, setBlocks] = useState([0]);

  const addBlock = () => {
    setBlocks([...blocks, blocks.length]);
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        {blocks.map((_, index) => (
          <TimeBlock key={index} index={index} onDelete={removeBlock} />
        ))}
        <Button
          leftIcon={<AddIcon />}
          onClick={addBlock}
          colorScheme="green"
          variant="solid"
          width="100%"
          py={6}>
          添加新的时间计算块
        </Button>
      </VStack>
    </Box>
  );
};

export default TimeCalculator;

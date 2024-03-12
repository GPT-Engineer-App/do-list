import React, { useState } from "react";
import { Box, Heading, VStack, Input, IconButton, HStack, Text, useToast, Container, UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Error",
        description: "Todo can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} mt={10}>
        <Heading>Todo App</Heading>
        <HStack w="100%">
          <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a todo" />
          <IconButton aria-label="Add todo" icon={<FaPlus />} onClick={handleAddTodo} />
        </HStack>
        <Box w="100%" p={5} borderWidth="1px" borderRadius="lg">
          <UnorderedList styleType="none" m={0}>
            {todos.map((todo) => (
              <ListItem key={todo.id} my={2}>
                <HStack justify="space-between">
                  <Text>{todo.text}</Text>
                  <IconButton icon={<FaTrash />} aria-label="Delete todo" onClick={() => handleRemoveTodo(todo.id)} />
                </HStack>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;

import React, {useState} from "react";
import {
  Input,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
} from "@chakra-ui/react";
export default function TechnologiesInput() {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Handle change in input field
  const handleChange = (e: any) => setInputValue(e.target.value);

  // Handle key press in input field
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // Prevent form submission if wrapped in a form
      e.preventDefault();
      // Add skill to array
      setSkills([...skills, inputValue.trim()]);
      // Clear input field
      setInputValue("");
    }
  };

  // Remove skill from array
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Input
        placeholder="Enter skills and press Enter"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Wrap spacing={2} marginY={4}>
        {skills.map((skill, index) => (
          <Tag size="lg" key={index} borderRadius="full">
            <TagLabel>{skill}</TagLabel>
            <TagCloseButton onClick={() => removeSkill(index)} />
          </Tag>
        ))}
      </Wrap>
    </Box>
  );
}

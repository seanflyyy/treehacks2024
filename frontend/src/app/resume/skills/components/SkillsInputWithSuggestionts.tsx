import React, {useState} from "react";
import {
  Input,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import {ISkills} from "@/redux/slice/details";

const SkillsInputWithSuggestions = ({
  skillArr,
  onChange,
}: {
  skillArr: string[];
  onChange: (skills: string[]) => void;
}) => {
  const allSkills = [
    "Node.js",
    "React",
    "Angular",
    "Vue.js",
    "Django",
    "Flask",
    "Ruby on Rails",
    "ASP.NET Core",
    "Spring Boot",
    "Laravel",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Cassandra",
    "Redis",
    "Elasticsearch",
    "GraphQL",
    "Apollo",
    "Kubernetes",
    "Docker",
    "AWS",
    "Google Cloud Platform",
    "Azure",
    "Heroku",
    "Firebase",
    "Terraform",
    "Ansible",
    "Jenkins",
    "CircleCI",
    "Travis CI",
    "GitLab CI/CD",
    "GitHub Actions",
    "Selenium",
    "Puppeteer",
    "Jest",
    "Mocha",
    "Chai",
    "Cypress",
    "Webpack",
    "Babel",
    "TypeScript",
    "Sass",
    "LESS",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "Ant Design",
    "VueX",
    "Redux",
    "Nginx",
    "Apache",
    "IIS",
    "Gunicorn",
    "PM2",
    "Varnish",
    "HAProxy",
    "RabbitMQ",
    "Apache Kafka",
    "Socket.IO",
    "WebRTC",
    "GraphQL Subscriptions",
    "Electron",
    "React Native",
    "Flutter",
    "Ionic",
    "Cordova",
    "Xamarin",
    "Unity",
    "Unreal Engine",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "D3.js",
    "Three.js",
    "OpenGL",
    "Vulkan",
    "WebGL",
    "Swift",
    "Kotlin",
    "Java",
    "C#",
    "PHP",
    "Python",
    "Ruby",
    "Go",
    "Rust",
    "C++",
    "C",
    "Solidity",
    "WebAssembly",
    "OpenCV",
    "Arduino",
    "Raspberry Pi",
  ]; // Example skills
  const [skills, setSkills] = useState<string[]>(skillArr);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Handle change in input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      setSuggestions(
        allSkills.filter((skill) =>
          skill.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle key press in input field for adding skills with Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Prevent form submission if wrapped in a form
      addSkill(inputValue.trim());
    }
  };

  // Add skill to array and reset suggestions and input
  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      onChange([...skills, skill]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  // Remove skill from array
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
    onChange(skills.filter((_, i) => i !== index));
  };

  // Render skill as a tag
  const renderSkillTag = (skill: string, index: number) => (
    <Tag size="lg" key={index} borderRadius="full">
      <TagLabel>{skill}</TagLabel>
      <TagCloseButton onClick={() => removeSkill(index)} />
    </Tag>
  );

  return (
    <Box>
      <Wrap spacing={2} mb={8}>
        {skills.map(renderSkillTag)}
      </Wrap>
      <Divider />
      <Input
        placeholder="Enter skills and press Enter"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        mt={8}
      />
      <Stack spacing={1} mt={2} zIndex={10}>
        {suggestions.map((suggestion, index) => (
          <Text
            key={index}
            p={2}
            cursor="pointer"
            _hover={{bg: "gray.100"}}
            onClick={() => addSkill(suggestion)}
          >
            {suggestion}
          </Text>
        ))}
      </Stack>
    </Box>
  );
};

export default SkillsInputWithSuggestions;

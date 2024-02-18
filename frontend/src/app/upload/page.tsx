"use client";

import {
  Heading,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Text,
  Divider,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/navigation";

const UploadResume = () => {
  const router = useRouter();

  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    console.log("submitting");
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      router.push("/resume");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <Container maxW="container.md">
      <Flex alignItems="center" justifyContent={"center"} height="100vh">
        <VStack spacing={5}>
          <Heading size="xl">Upload Your Resume</Heading>
          <Input type="file" onChange={handleFileChange} accept=".pdf" />
          <Button onClick={handleSubmit}>Upload</Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default UploadResume;

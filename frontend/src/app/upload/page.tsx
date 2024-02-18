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
import {BACKEND_URL} from "@/contants";
// import Link from "next/link";
import {Provider, useDispatch} from "react-redux";
import {
  setDetails,
  setEducation,
  setExperience,
  setProject,
  setSkill,
} from "@/redux/slice/details";
import store from "@/redux/store";

const UploadResume = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      const data = response.data[0].data;
      console.log("uploaded data is", data);
      // Update redux state
      dispatch(setDetails(data.details));
      dispatch(setEducation(data.education));
      dispatch(setExperience(data.experience));
      dispatch(setProject(data.projects));
      dispatch(setSkill(data.skills));

      router.push("/resume/details");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <Provider store={store}>
      <Container maxW="container.md">
        <Flex alignItems="center" justifyContent={"center"} height="100vh">
          <VStack spacing={8}>
            <Heading size="xl">Upload Your Resume</Heading>
            <Input type="file" onChange={handleFileChange} accept=".pdf" />
            <HStack justifyContent={"flex-start"} width={"full"}>
              <Flex width={"full"} justifyContent={"flex-start"}>
                <Button onClick={handleSubmit} width="full">
                  Upload
                </Button>
              </Flex>
              <Flex width={"full"} justifyContent={"flex-start"}>
                <Button
                  variant="link"
                  width="full"
                  onClick={() => router.push("/resume/details")}
                >
                  Skip
                </Button>
              </Flex>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Provider>
  );
};

export default UploadResume;

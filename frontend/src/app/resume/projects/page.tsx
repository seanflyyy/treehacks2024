"use client";
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Container,
  Flex,
  Grid,
  Textarea,
  Divider,
  Spacer,
  Box,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import Year from "@/app/components/Date/Year";
import Month from "@/app/components/Date/Month";
import AutoResizingTextarea from "@/app/components/TextArea/AutoResizingTextArea";
import ProjectsForm from "./components/ProjectsForm";
import {useState} from "react";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState([0]);

  const onClick = () => {
    router.push("/skills");
  };

  return (
    <Container maxW="container.md" p={0}>
      <Flex
        h={{base: "auto"}}
        py={[0, 10, 20]}
        direction={{base: "column-reverse", md: "row"}}
      >
        <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
          <VStack spacing={3} alignItems="flex-start">
            <Heading size="2xl">Project Experience Details</Heading>
            <Text>Build your resume (4 of 5)</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            {projects.map((_, index) => {
              return (
                <ProjectsForm
                  key={index}
                  title={`Project ${index + 1}`}
                  hasDivider={index === projects.length - 1 ? false : true}
                />
              );
            })}
            <GridItem colSpan={1}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => setProjects((oldArray) => [...oldArray, 0])}
              >
                Add Project
              </Button>
            </GridItem>
            <GridItem colSpan={1} w="full">
              <Flex
                height="100%"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="blue"
                  onClick={onClick}
                  alignSelf={"flex-end"}
                >
                  Save and Continue
                </Button>
              </Flex>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </Container>
  );
}

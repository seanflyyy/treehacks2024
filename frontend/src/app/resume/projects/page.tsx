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
import {useDispatch, useSelector} from "react-redux";
import {IProjects, setProject} from "@/redux/slice/details";

export default function Projects() {
  const router = useRouter();
  const dispatch = useDispatch();
  const project: IProjects[] = useSelector(
    (state: any) => state.details.projects
  );

  const [projects, setProjects] = useState(project);

  console.log(projects);

  const updateProject = (updatedProject: any, id: string) => {
    setProjects((oldArray) => {
      // Create a duplicate of the array
      const newArray = [...oldArray];
      // Update the specific index with the updated experience
      const index = newArray.findIndex((project) => project.id === id);
      // Return the new array
      newArray[index] = updatedProject;

      return newArray;
    });
  };

  const removeProject = (id: string) => {
    setProjects((oldArray) => {
      let counter = 0;
      const newArray = [...oldArray];
      while (newArray[counter].id !== id) {
        counter++;
      }
      newArray.splice(counter, 1);
      return [...newArray];
    });
  };

  const onClick = () => {
    dispatch(setProject(projects));
    router.push("/resume/skills");
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
            {projects.map((project, index) => {
              return (
                <ProjectsForm
                  key={project.id}
                  title={`Project ${index + 1}`}
                  hasDivider={index === projects.length - 1 ? false : true}
                  project={project}
                  onChange={(project: IProjects) =>
                    updateProject(project, project.id)
                  }
                  onDelete={() => removeProject(project.id)}
                />
              );
            })}
            <GridItem colSpan={1} mt={10}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  const templateProject: IProjects = {
                    id: `${projects.length + 1}`,
                    title: "",
                    description: [],
                    technologies: [],
                  };
                  setProjects((oldArray) => [...oldArray, templateProject]);
                }}
              >
                Add Job Experience
              </Button>
            </GridItem>
            <GridItem colSpan={1} mt={10}>
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

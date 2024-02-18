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
import ExperienceForm from "./components/ExperienceForm";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IExperience, Resume, setExperience} from "@/redux/slice/details";

export default function Experience() {
  const router = useRouter();
  const dispatch = useDispatch();
  const experience: IExperience[] = useSelector(
    (state: any) => state.details.experience
  );

  const [experiences, setExperiences] = useState<IExperience[]>(experience);

  const updateExperience = (updatedExperience: IExperience, id: string) => {
    setExperiences((oldArray) => {
      // Create a duplicate of the array
      const newArray = [...oldArray];
      // Update the specific index with the updated experience
      const index = newArray.findIndex((experience) => experience.id === id);
      // Return the new array
      newArray[index] = updatedExperience;

      return newArray;
    });
  };

  const removeExperience = (id: string) => {
    // console.log("index is", id);
    setExperiences((oldArray) => {
      let counter = 0;
      const newArray = [...oldArray];
      while (newArray[counter].id !== id) {
        counter++;
      }
      newArray.splice(counter, 1);
      return [...newArray];
    });
  };

  // const [experience, setExperience] = useState([0]);

  const onClick = () => {
    // console.log("completed experiences", experiences);
    dispatch(setExperience(experiences));
    router.push("/resume/projects");
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
            <Heading size="2xl">Job Experience Details</Heading>
            <Text>Build your resume (3 of 5)</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            {experiences.map((experience, index) => {
              return (
                <ExperienceForm
                  key={experience.id}
                  title={`Experience ${index + 1}`}
                  hasDivider={index === experiences.length - 1 ? false : true}
                  // update experience corresponding to that specific index
                  experience={experience}
                  onChange={(experience: IExperience) =>
                    updateExperience(experience, experience.id)
                  }
                  onDelete={() => removeExperience(experience.id)}
                />
              );
            })}
            <GridItem colSpan={1} mt={10}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => {
                  const templateExperience: IExperience = {
                    company: "",
                    position: "",
                    dates: "",
                    responsibilities: [],
                    id: Math.random().toString(36).substr(2, 9),
                  };
                  setExperiences((oldArray) => [
                    ...oldArray,
                    templateExperience,
                  ]);
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

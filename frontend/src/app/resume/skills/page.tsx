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
  FormControl,
  FormLabel,
  Input,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import Year from "@/app/components/Date/Year";
import Month from "@/app/components/Date/Month";
import AutoResizingTextarea from "@/app/components/TextArea/AutoResizingTextArea";
import {useState} from "react";
import SkillsInputWithSuggestions from "./components/SkillsInputWithSuggestionts";
import {useDispatch, useSelector} from "react-redux";
import {ISkills, setSkill} from "@/redux/slice/details";

export default function Skills() {
  const router = useRouter();
  const dispatch = useDispatch();
  const skills: ISkills = useSelector((state: any) => state.details.skills);
  const [currSkills, setCurrSkills] = useState(skills.skills);

  const onClick = () => {
    dispatch(setSkill(currSkills));
    router.push("/home");
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
            <Heading size="2xl">Skills Details</Heading>
            <Text>Build your resume (5 of 5)</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <Text>Your skills will appear here</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <SkillsInputWithSuggestions
                skillArr={currSkills}
                onChange={(skills: string[]) => setCurrSkills(skills)}
              />
            </GridItem>
            <GridItem colSpan={2} mt={10}>
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

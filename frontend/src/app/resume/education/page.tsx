"use client";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Select,
  Checkbox,
  Button,
  useBreakpointValue,
  Container,
  Flex,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import Year from "@/app/components/Date/Year";
import Month from "@/app/components/Date/Month";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {IEducation, setEducation} from "@/redux/slice/details";

export default function Education() {
  const router = useRouter();
  const education: IEducation = useSelector(
    (state: any) => state.details.education
  );
  const dispatch = useDispatch();

  const [level, setLevel] = useState(education.level_of_education);
  const [field, setField] = useState(education.field_of_study);
  const [school, setSchool] = useState(education.school);
  const [location, setLocation] = useState(education.school_location);
  const [fromMonth, setFromMonth] = useState();
  const [fromYear, setFromYear] = useState();
  const [toMonth, setToMonth] = useState();
  const [toYear, setToYear] = useState();

  const onClick = () => {
    const payload = {
      level_of_education: level,
      field_of_study: field,
      school: school,
      school_location: location,
      from_date: `${fromMonth} ${fromYear}`,
      to_date: `${toMonth} ${toYear}`,
    };
    dispatch(setEducation(payload));
    router.push("/resume/experience");
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
            <Heading size="2xl">Personal Details</Heading>
            <Text>Build your resume (2 of 5)</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Level of education</FormLabel>
                <Select
                  required
                  placeholder="Level of education"
                  defaultValue={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Field of study</FormLabel>
                <Input
                  placeholder="Field of study"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>School</FormLabel>
                <Input
                  placeholder="School"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  placeholder="Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>
            </GridItem>
            {/* <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>School location</FormLabel>
                <Input placeholder="School Location" value={location} />
              </FormControl>
            </GridItem> */}
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>From</FormLabel>
                <Month
                  onChange={(e) => setFromMonth(e.target.value)}
                  value={fromMonth}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel opacity={0}>Year</FormLabel>
                <Year
                  startYear={2023}
                  defaultValue={fromYear}
                  onChange={(e) => setFromYear(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>To</FormLabel>
                <Month
                  onChange={(e) => setToMonth(e.target.value)}
                  value={toMonth}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel opacity={0}>Year</FormLabel>
                <Year
                  startYear={2024}
                  defaultValue={toYear}
                  onChange={(e) => setToYear(e.target.value)}
                />
              </FormControl>
            </GridItem>
            {/* <GridItem colSpan={1} alignItems={"end"}>
              <Button colorScheme="blue" onClick={onClick}>
                Save and Continue
              </Button>
            </GridItem> */}
            <GridItem colSpan={2} w="full" mt={10}>
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

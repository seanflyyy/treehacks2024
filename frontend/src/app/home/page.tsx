"use client";

import {
  Center,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import {useState} from "react";
import JobPosting from "./components/JobPosting";
import {useRouter} from "next/navigation";
import {SearchIcon} from "@chakra-ui/icons";

export default function Home() {
  const [jobs, setJobs] = useState<
    {
      title: string;
      description: string[];
      companyName: string;
    }[]
  >([
    {
      title: "Software Engineer",
      description: [
        "Developed and maintained web applications",
        "Worked with a team to deliver features",
        "Worked with a team to deliver features",
      ],
      companyName: "Google",
    },
  ]);
  const router = useRouter();

  return (
    <Container maxW="container.md" p={0}>
      <Flex
        h={{base: "auto"}}
        py={[0, 10, 20]}
        direction={{base: "column-reverse", md: "row"}}
      >
        <VStack spacing={5}>
          <VStack>
            <Heading>We fine tune resumes and cover letters</Heading>
            <Heading>to get you the job you want</Heading>
          </VStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="Search For Job" />
          </InputGroup>
          {jobs.map((job, index) => {
            return <JobPosting key={index} {...job} />;
          })}
        </VStack>
      </Flex>
    </Container>
  );
}

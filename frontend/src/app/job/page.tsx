"use client";

import {
  Card,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import DownloadPDF from "./components/DownloadPDF";
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";

export default function JobPosting() {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('search')) // Logs "search"

  const description = [
    "Developed and maintained web applications",
    "Worked with a team to deliver features",
    "Worked with a team to deliver features",
  ];

  return (
    <Container maxW="container.md" p={0}>
      <Flex
        h={{base: "auto"}}
        py={[0, 10, 20]}
        direction={{base: "column-reverse", md: "row"}}
      >
        <VStack spacing={20}>
          <VStack align="start" w="full" spacing={4}>
            <Heading size="xl">{searchParams.get("title")}</Heading>
            <Text size="2xl" color="gray.700">
              {searchParams.get("companyName")}
            </Text>
            <VStack spacing={2} align={"start"}>
              {description.map((text: string, index: number) => (
                <Text key={index} size="md">
                  {`• ${text}`}
                </Text>
              ))}
            </VStack>
          </VStack>
          {/* <Card> */}
          <HStack p={6} spacing={10}>
            <VStack spacing={5}>
              <Heading size="lg">Your Fine Tuned Resume</Heading>
              <DownloadPDF filePath="resume" />
            </VStack>
            <Divider orientation="vertical" />
            <VStack spacing={5}>
              <Heading size="lg">Your Fine Tuned Cover Letter</Heading>
              <DownloadPDF filePath="coverLetter" />
            </VStack>
          </HStack>
          {/* </Card> */}
        </VStack>
        {/* <VStack height="100vh" justifyContent="center"> */}
        {/* </VStack> */}
      </Flex>
    </Container>
  );
}

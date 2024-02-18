"use client";

import Image from "next/image";
import {Link} from "@chakra-ui/next-js";
import {Button, Heading, Text, VStack} from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack height="100vh" justifyContent="center">
      <Heading size="2xl" fontWeight="bold">
        Tune.ai
      </Heading>
      <Text fontSize="xl" color="gray.500" mb={"10px"}>
        Generate a resume and cover letter fine tuned for the job you want.
      </Text>
      <Link href="/upload">
        <Button>Get Started</Button>
      </Link>
    </VStack>
  );
}

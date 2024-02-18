"use client";

import {Flex, Container} from "@chakra-ui/react";
import Details from "./details";
import Cart from "./cart";

const Resume = () => (
  <Container maxW="container.md" p={0}>
    <Flex
      h={{base: "auto", md: "100vh"}}
      py={[0, 10, 20]}
      direction={{base: "column-reverse", md: "row"}}
    >
      <Details />
      {/* <Cart /> */}
    </Flex>
  </Container>
);

export default Resume;

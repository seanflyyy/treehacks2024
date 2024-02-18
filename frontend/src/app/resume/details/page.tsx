"use client";
import {IDetails, Resume, setDetails} from "@/redux/slice/details";
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
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function Details() {
  const router = useRouter();
  const details: IDetails = useSelector((state: any) => state.details.details);
  const dispatch = useDispatch();

  const [name, setName] = useState(details.name);
  const [email, setEmail] = useState(details.email);
  const [phone, setPhone] = useState(details.phone);
  const [linkedin, setLinkedin] = useState(details.linkedin);
  const [github, setGithub] = useState(details.github);
  const [website, setWebsite] = useState(details.website);

  const onClick = () => {
    const payload = {
      name,
      email,
      phone,
      linkedin,
      github,
      website,
    };
    dispatch(setDetails(payload));
    router.push("/resume/education");
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
            <Text>Build your resume (1 of 5)</Text>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder={"Name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>LinkedIn</FormLabel>
                <InputGroup>
                  <InputLeftAddon>https://</InputLeftAddon>
                  <Input
                    placeholder="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>GitHub</FormLabel>
                <InputGroup>
                  <InputLeftAddon>https://</InputLeftAddon>
                  <Input
                    placeholder="github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <InputGroup>
                  <InputLeftAddon>https://</InputLeftAddon>
                  <Input
                    placeholder="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
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

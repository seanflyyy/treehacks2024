import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function JobPosting({
  title,
  description,
  companyName,
}: {
  title: string;
  description: string[];
  companyName: string;
}) {
  return (
    <Card key={title} w="100%" cursor="pointer" _hover={{bg: "gray.50"}}>
      <Link
        href={{
          pathname: "/job",
          query: {
            title: title,
            description: description,
            companyName: companyName,
          },
        }}
      >
        <CardHeader>
          <HStack flex={1}>
            <Heading size="md">{title}</Heading>
            <Spacer />
            <Heading size="md"> {companyName}</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          {description.map((text: string, index: number) => (
            <Text key={index}>{`• ${text}`}</Text>
          ))}
        </CardBody>
      </Link>
    </Card>

    // <VStack
    //   onClick={onClick}
    //   borderWidth={1}
    //   w="full"
    //   justifyContent={"flex-start"}
    // >
    //   <HStack>
    //     <Text fontWeight="bold">{title}</Text>
    //     <Flex />
    //     <Text>{companyName}</Text>
    //   </HStack>
    //   {description.map((text: string, index: number) => (
    //     <Text key={index}>{`• ${text}`}</Text>
    //   ))}
    // </VStack>
  );
}

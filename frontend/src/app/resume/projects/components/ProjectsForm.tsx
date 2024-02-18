"use client";
import {
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import Year from "@/app/components/Date/Year";
import Month from "@/app/components/Date/Month";
import AutoResizingTextarea from "@/app/components/TextArea/AutoResizingTextArea";
import TechnologiesInput from "./ProjectsForm/Technologies";

export default function ProjectsForm({
  title,
  hasDivider = true,
}: {
  title: string;
  hasDivider?: boolean;
}) {
  return (
    <>
      <GridItem colSpan={2}>
        <Heading fontSize="lg">{title}</Heading>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Project Title</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Technologies</FormLabel>
          <TechnologiesInput />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel flexWrap={"wrap"}>Description</FormLabel>
          <AutoResizingTextarea />
        </FormControl>
      </GridItem>
      {hasDivider && (
        <GridItem colSpan={2}>
          <Divider />
        </GridItem>
      )}
    </>
  );
}

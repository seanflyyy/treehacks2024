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

export default function ExperienceForm({
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
          <FormLabel>Job title</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Company</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>City, State</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>From</FormLabel>
          <Month />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel opacity={0}>Year</FormLabel>
          <Year startYear={2023} />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>To</FormLabel>
          <Month />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel opacity={0}>Year</FormLabel>
          <Year startYear={2024} />
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

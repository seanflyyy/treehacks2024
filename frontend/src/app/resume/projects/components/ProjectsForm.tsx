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
import {IProjects} from "@/redux/slice/details";
import {useState} from "react";

export default function ProjectsForm({
  title,
  hasDivider = true,
  project,
  onChange,
  onDelete,
}: {
  title: string;
  hasDivider?: boolean;
  project: IProjects;
  onChange: (project: IProjects) => void;
  onDelete: () => void;
}) {
  const {
    title: projectTitle,
    technologies,
    description,
    id,
  } = project || {
    title: "",
    technologies: [],
    description: "",
  };

  const [currTitle, setCurrTitle] = useState(projectTitle);
  const [currTechnologies, setCurrTechnologies] = useState(technologies);
  const [currDescription, setCurrDescription] = useState(description);

  console.log("project is", project);

  return (
    <>
      <GridItem colSpan={2}>
        <Heading fontSize="lg">{title}</Heading>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Project Title</FormLabel>
          <Input
            placeholder=""
            value={currTitle}
            onChange={(e) => {
              setCurrTitle(e.target.value);
              onChange({
                id,
                description: currDescription,
                technologies: currTechnologies,
                title: e.target.value,
              });
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Technologies</FormLabel>
          <TechnologiesInput
            onChange={(technologies: string[]) => {
              setCurrTechnologies(technologies);
              onChange({
                id,
                description: currDescription,
                technologies,
                title: currTitle,
              });
            }}
            values={currTechnologies}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel flexWrap={"wrap"}>Description</FormLabel>
          <AutoResizingTextarea
            text={currDescription}
            onChange={(description: string[]) => {
              setCurrDescription(description);
              onChange({
                id,
                description: description,
                technologies: currTechnologies,
                title: currTitle,
              });
            }}
          />
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

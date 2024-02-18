"use client";
import {
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Text,
  Heading,
  Divider,
  Flex,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import Year from "@/app/components/Date/Year";
import Month from "@/app/components/Date/Month";
import AutoResizingTextarea from "@/app/components/TextArea/AutoResizingTextArea";
import {IExperience} from "@/redux/slice/details";
import {useState} from "react";
import {DeleteIcon} from "@chakra-ui/icons";

export default function ExperienceForm({
  title,
  experience,
  hasDivider = true,
  onChange,
  onDelete,
}: {
  title: string;
  experience: IExperience;
  hasDivider?: boolean;
  onChange: (experience: IExperience) => void;
  onDelete: () => void;
}) {
  const {position, company, dates, responsibilities, id} = experience || {
    position: "",
    company: "",
    dates: "",
    responsibilities: "",
  };

  const [currPosition, setCurrPosition] = useState(position);
  const [currCompany, setCurrCompany] = useState(company);
  const [currDates, setCurrDates] = useState(dates);
  const [currResponsibilities, setCurrResponsibilities] =
    useState(responsibilities);

  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");

  return (
    <>
      <GridItem colSpan={2}>
        <Flex>
          <Heading fontSize="lg">{title}</Heading>
          <Spacer />
          <IconButton
            aria-label="delete"
            variant="outline"
            onClick={onDelete}
            icon={<DeleteIcon />}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Job title</FormLabel>
          <Input
            placeholder=""
            value={currPosition}
            onChange={(e) => {
              setCurrPosition(e.target.value);
              onChange({
                position: e.target.value,
                company: currCompany,
                dates: currDates,
                responsibilities: currResponsibilities,
                id,
              });
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Company</FormLabel>
          <Input
            placeholder=""
            value={company}
            onChange={(e) => {
              setCurrCompany(e.target.value);
              onChange({
                position: currPosition,
                company: e.target.value,
                dates: currDates,
                responsibilities: currResponsibilities,
                id,
              });
            }}
          />
        </FormControl>
      </GridItem>
      {/* <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input
            placeholder=""
            onChange={(e) => {
              onChange({
                position,
                company,
                dates: e.target.value,
                responsibilities,
              });
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel>City, State</FormLabel>
          <Input placeholder="" />
        </FormControl>
      </GridItem> */}
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel>From</FormLabel>
          <Month
            value={fromMonth}
            onChange={(e) => setFromMonth(e.target.value)}
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
          <Month value={toMonth} onChange={(e) => setToMonth(e.target.value)} />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
        <FormControl>
          <FormLabel opacity={0}>Year</FormLabel>
          <Year
            startYear={2024}
            defaultValue={toYear}
            onChange={(e) => {
              setToYear(e.target.value);
              onChange({
                position: currPosition,
                company: currCompany,
                dates: `${fromMonth} ${fromYear} - ${toMonth} ${e.target.value}`,
                responsibilities: currResponsibilities,
                id,
              });
            }}
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={2}>
        <FormControl>
          <FormLabel flexWrap={"wrap"}>Description</FormLabel>
          <AutoResizingTextarea
            text={responsibilities}
            onChange={(e) => {
              setCurrResponsibilities(e);
              onChange({
                position: currPosition,
                company: currCompany,
                dates: currDates,
                responsibilities: e,
                id,
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

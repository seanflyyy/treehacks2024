import {Select} from "@chakra-ui/react";

export default function Month({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <Select placeholder="Month" onChange={onChange} defaultValue={value}>
      <option key="January" value="January">
        January
      </option>
      <option key="February" value="February">
        February
      </option>
      <option key="March" value="March">
        March
      </option>
      <option key="April" value="April">
        April
      </option>
      <option key="May" value="May">
        May
      </option>
      <option key="June" value="June">
        June
      </option>
      <option key="July" value="July">
        July
      </option>
      <option key="August" value="August">
        August
      </option>
      <option key="September" value="September">
        September
      </option>
      <option key="October" value="October">
        October
      </option>
      <option key="November" value="November">
        November
      </option>
      <option key="December" value="December">
        December
      </option>
    </Select>
  );
}

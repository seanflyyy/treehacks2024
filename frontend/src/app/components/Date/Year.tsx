import {Select} from "@chakra-ui/react";

export default function Year({
  startYear,
  defaultValue,
  onChange,
}: {
  startYear: number;
  defaultValue: string;
  onChange: (e: any) => void;
}) {
  return (
    <Select placeholder="Year" defaultValue={defaultValue} onChange={onChange}>
      {Array.from({length: 30}, (_, i) => startYear - i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );
}

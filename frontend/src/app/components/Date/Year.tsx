import {Select} from "@chakra-ui/react";

export default function Year({
  startYear,
  onSelect,
}: {
  startYear: number;
  onSelect?: (year: number) => void;
}) {
  return (
    <Select placeholder="Year">
      {Array.from({length: 30}, (_, i) => startYear - i).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );
}

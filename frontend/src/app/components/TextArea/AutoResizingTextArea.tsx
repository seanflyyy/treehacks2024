import React, {useState, useRef, useEffect} from "react";
import {Textarea} from "@chakra-ui/react";

const AutoResizingTextarea = ({
  text = [""],
  onChange,
}: {
  text: string[];
  onChange: (text: string[]) => void;
}) => {
  text = text.length === 0 ? [""] : text;

  const [value, setValue] = useState(text.join("\n"));
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Add type annotation to useRef

  // Adjust the textarea height based on its content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto"; // Temporarily shrink to auto to get the correct scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
  };

  // Adjust height on value change
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <Textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        adjustHeight(); // Adjust height every time the user types
      }}
      ref={textareaRef}
      placeholder="Type here..."
      resize="none" // Optionally disable manual resize
      overflow="hidden" // Hide the overflow to prevent scrollbars
      minH="150px" // Make sure there's no minimum height
    />
  );
};

export default AutoResizingTextarea;

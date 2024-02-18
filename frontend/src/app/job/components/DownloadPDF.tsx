import React from "react";
import {Button} from "@chakra-ui/react";
import {BACKEND_URL} from "@/contants";

function DownloadPDF({filePath}: {filePath: string}) {
  const handleDownload = () => {
    window.location.href = `${BACKEND_URL}/${filePath}`; // Update the URL based on your Flask app's location
  };

  return (
    <Button colorScheme="teal" onClick={handleDownload}>
      Download PDF
    </Button>
  );
}

export default DownloadPDF;

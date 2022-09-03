import { Box } from "@mui/material";
import React from "react";
import OptionBar from "../atoms/Optionbar";
import OptionCount from "../atoms/OptionCount";

interface OptionProgressProps {
  title: string;
  count: number;
  progress: number;
}

function OptionProgress({ title, count, progress }: OptionProgressProps) {
  return (
    <Box sx={{ flex: 1 }}>
      <OptionCount title={"title"} count={count} />
      <Box>
        <OptionBar value={progress} />
      </Box>
    </Box>
  );
}

export default OptionProgress;

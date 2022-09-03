import { Toolbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

function PaginationController() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems='center'>
      <Toolbar />
      <Pagination size="large" count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}

export default PaginationController;

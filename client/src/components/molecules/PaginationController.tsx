import { Toolbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaginationController({ totalPages }: { totalPages: number }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (value > 1) {
      navigate(`.?page=${value}`);
    } else {
      navigate(`.`);
    }
  };

  return (
    <Stack spacing={2} alignItems='center'>
      <Toolbar />
      <Pagination
        size='large'
        count={totalPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}

PaginationController.defaultProps = {
  totalPages: 1,
};

export default PaginationController;

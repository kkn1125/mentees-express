import { Toolbar } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

function PaginationController({
  totalPages,
  handleLoading,
}: {
  totalPages: number;
  handleLoading?: () => void;
}) {
  const navigate = useNavigate();
  const query = useQuery();

  const [page, setPage] = useState(Number(query.page));
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
        onChange={(e, v) => {
          handleLoading();
          handleChange(e, v);
        }}
      />
    </Stack>
  );
}

PaginationController.defaultProps = {
  totalPages: 1,
};

export default PaginationController;

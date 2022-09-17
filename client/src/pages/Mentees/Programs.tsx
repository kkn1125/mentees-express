import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PaginationController from "../../components/molecules/PaginationController";
import ProgramCard from "../../components/molecules/ProgramCard";
import { CommentContext } from "../../contexts/CommentProvider";
import { ProductContext } from "../../contexts/ProductProvider";
import useQuery from "../../hooks/useQuery";

const limit = 5;

function Programs() {
  const query = useQuery();
  const comments = useContext(CommentContext);
  const products = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productList = useMemo(
    () =>
      products.length > 0 ? (
        products
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((contents, idx) => (
            <ProgramCard
              key={idx}
              contents={contents}
              idx={idx}
              comments={comments.filter(
                (comment) =>
                  comment.pnum === contents.num && comment.type === "products"
              )}
            />
          ))
      ) : (
        <Alert severity='warning'>등록된 프로그램이 없습니다.</Alert>
      ),
    [query, products]
  );

  useEffect(() => {
    setLoading(false);
  }, [location.search]);

  useEffect(() => {
    const { page } = query;
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [location.search]);

  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Stack direction='row' justifyContent='flex-end' sx={{ gap: 1, mb: 3 }}>
        <Button
          component={Link}
          to='/mentees/form'
          variant='contained'
          color='success'>
          프로그램 등록하기
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 3,
        }}>
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          productList
        )}
      </Stack>

      <PaginationController
        handleLoading={handleLoading}
        totalPages={Math.ceil(products.length / limit)}
      />
    </Container>
  );
}

export default Programs;

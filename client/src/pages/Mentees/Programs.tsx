import { Alert, Button, Container, Stack, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginationController from "../../components/molecules/PaginationController";
import ProgramCard from "../../components/molecules/ProgramCard";
import { CommentContext } from "../../contexts/CommentProvider";
import { ProductContext } from "../../contexts/ProductProvider";
import { queryStringToObject } from "../../utils/tools";

const limit = 5;

function Programs() {
  const locate = useLocation();
  const comments = useContext(CommentContext);
  const products = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);

  const productList = useMemo(
    () =>
      products.length > 0 ? (
        products
          .slice(currentPage - 1, currentPage * limit)
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
    [currentPage, products]
  );

  useEffect(() => {
    const query = queryStringToObject(locate.search);
    const { page } = query;
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [location.href]);

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
        {productList}
      </Stack>

      <PaginationController totalPages={Math.ceil(products.length / limit)} />
    </Container>
  );
}

export default Programs;

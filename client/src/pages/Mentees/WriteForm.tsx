import { Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

interface WriteFormprops {
  mode: "create" | "update";
}

function WriteForm({ mode }: WriteFormprops) {
  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
			{mode}
    </Container>
  );
}

WriteForm.defaultProps = {
  mode: "create",
};

export default WriteForm;

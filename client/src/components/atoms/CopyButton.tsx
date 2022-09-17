import LinkIcon from "@mui/icons-material/Link";
import { Button, SvgIcon, Tooltip } from "@mui/material";
import React from "react";

function CopyButton({ url }: { url: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${url}`).then(
      () => {
        console.debug("copy!");
      },
      () => {
        console.debug("failed!");
      }
    );
  };
  return (
    <Tooltip title='복사' placement='right'>
      <Button
        onClick={handleCopy}
        variant='contained'
        sx={{ minWidth: 30, px: 1, backgroundColor: "#353535" }}>
        <SvgIcon fontSize='small'>
          <LinkIcon />
        </SvgIcon>
      </Button>
    </Tooltip>
  );
}

export default CopyButton;

import Dialog from "@mui/material/Dialog";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import IconError from "@/components/Message/images/error.svg";
import IconSuccess from "@/components/Message/images/success.svg";
import IconInfo from "@/components/Message/images/info.svg";
import IconWarn from "@/components/Message/images/warn.svg";

export const messageTheme = createTheme({
  components: {
    MuiSnackbar: {
      styleOverrides: {
        root: {
          marginTop: "30px",
          marginLeft: "122px",

          "& .MuiSnackbarContent-root": {
            minWidth: "0",
          },
        },
      },
    },
  },
});

export const MessageContent = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

  i {
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    flex-shrink: 0;
  }

  span:first-child {
    margin-right: 12px;
  }
`;

export const TypeIcon = styled.i`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-size: 100%;

  &.error {
    background-image: url(${IconError});
  }

  &.success {
    background-image: url(${IconSuccess});
  }

  &.warn {
    background-image: url(${IconWarn});
  }

  &.info {
    background-image: url(${IconInfo});
  }
`;

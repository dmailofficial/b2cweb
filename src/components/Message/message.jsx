import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
// import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { withRouter, useParams } from "react-router-dom";
 
import { messageTheme, MessageContent, TypeIcon } from "./css";

export const Types = ["info", "success", "error", "warn", "loading"];

const BaseMessage = (props) => {
  const {
    type,
    msg,
    close,
    delayTime = 5000,
  } = props;

  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (type !== 'loading') {
          setOpen(false)
          setTimeout(() => {
            close()
          }, 1000);
        }
      }, delayTime);
    }
  }, [isOpen])

  if (type && !Types.includes(type)) {
    console.error("type '${type} is invalid");
  }

  let Icon = null
  if (Types.includes(type)) {
    Icon = type === 'loading' ? <CircularProgress size={20} /> : <TypeIcon className={`${type}`}></TypeIcon>
  }
  const message = type === 'loading' ? (msg || 'loading...') : msg
  const content = <MessageContent>
    {Icon}
    <span>{message}</span>
  </MessageContent>

  return (
    <ThemeProvider theme={messageTheme}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        message={content}
        // onClose={handleClose}
        // TransitionComponent={state.Transition}
        // key={state.Transition.name}
      />
    </ThemeProvider>
  );
};

export default BaseMessage;

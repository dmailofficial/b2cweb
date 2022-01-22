import React, { useEffect, useState, useCallback, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import styled  from 'styled-components';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from './css'

const DialogWrapper = styled.div`
  padding: 16px 32px 24px;
  color: #1D1D1F;
  position: relative;

  .title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }

  .content {
    margin-top: 25px;
    font-size: 14px;
  }

  .form {
    margin-top: 25px;
    display: flex;
    align-items: center;

    input {
      flex: 1;
      height: 24px;
      line-height: 24px;
      padding: 12px 15px;
      box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
      border-radius: 3px;
      border: 1px solid #E4E4E4;
      font-size: 14px;

      &::placeholder {
        color: rgba(29, 29, 31, 0.5);
      }
    }

    .error {
      border-color: rgba(255, 102, 51, 0.8);
      box-shadow: 0px 0 5px 0px rgba(255, 102, 51, 0.5);
    }

    a {
      margin-left: 16px;
      color: #4C72FF;
    }
  }

  .actions {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close {
    position: absolute;
    right: 16px;
    top: 16px;
    width: 24px;
    height: 24px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAACB0lEQVRoBe1YQW7CMBBMKkpPVX8QQOJltP1OQeqhUgWVOPZPSK3yg4pLoZXcHRyTKLIxuzY9baRgE3tnZ2ZJYlMUeqgD6oA6oA6oA+qAOvC/Dkyn05vcGaWYV1wiVTVe7/e/X9TOjTElN74/HxiEtSDMLbXv/fHYdxYBuATylLSpQPlW1x8PZVmaWCLfuCU/WRaFmWGccH6Gw8HtZrPZ+eb7rrEq0AC/tEBmVlWTpaQSffLApGuvHPKIYVWgSUIlb13DNYJhVcJHnoth8woEIDCFQEqsI91t2RVwwRIikhiXL9SKBQCQQ4gzN0TWdz1JwLkiLkUe+ZMFxERgPPWmB0boyCIA4CGXbWL7nLd93hPLxoQ/swlACr+IbvK85IGcVQAAwyLyk0c+1psYAfLDiJYbsXxZKxB2/0hjVdefj9K10xGl08kmIEB+1eS6b3Pm/SkNWmB5L0QebgOVlsloGhGHBSDuFfEqFmDuSK7AKfLup+Kfk6cSSQI4xDhznbvntGIBEkKSmJgIkYAUIimxPjFsATkI5MBwYtgvMnqiPNP79rCHtSD8mxE3N/bS2IU5IsAcjSZP7ffzeqwKNJv6LTl4LSXfpdWvBAnb0ab+jrsv7mJG+/jrg849nQsQiAZEJlgR4znhfdO5jkzPMyz9E+pU9ktgnsqnY+qAOqAOqAPqgDqgDpADf7cZjtTwgYNQAAAAAElFTkSuQmCC) no-repeat center;
    background-size: 100%;
    cursor: pointer;
    transition: transform 0.6s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }
`

export default function AlertDialog({ open, setOpen, receive, errorIndex }) {
  const [id, setId] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null)

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    receive && receive(id)
  };

  const onchange = (ev) => {
    const id = ev.target.value
    setId(id)
    if (id) {
      setError(false)
    }
  }

  useEffect(() => {
    !open && setTimeout(() => {
      setId('')
    }, 400);
  }, [open])

  useEffect(() => {
    if (errorIndex) {
      setError(true)
      inputRef.current && inputRef.current.focus && inputRef.current.focus()
    }
  }, [errorIndex])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogWrapper>
        <div className="title">Receive Mailbox alias NFT</div>
        <div className="content">
          <div className="text">Please enter your Principal ID of your Plug wallet to receive NFT. We recommend using Plug wallet. Please make sure the ID is correct and usable, otherwise you will lose your NFT domain account</div>
          <div className="form">
            <input ref={inputRef} type="text" placeholder="Please enter the 53-bit Principal ID of your PLUG wallet" value={id} onChange={onchange} className={error ? 'error' : ''} />
            <a href="">How to get?</a>
          </div>
        </div>
        <div className="actions">
          <Button type="primary" onClick={onConfirm}>Confirm</Button>
        </div>
        <div className="close" onClick={handleClose}></div>
      </DialogWrapper>
    </Dialog>
  );
}
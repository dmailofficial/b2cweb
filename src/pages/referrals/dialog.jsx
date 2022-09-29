import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
// https://github.com/mui-org/material-ui
import Dialog from '@mui/material/Dialog';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from '@mui/icons-material/Clear';

import TableTopInvites from './tableTopInvites'
import WithdrawalsRecord from './withdrawalsRecord'
import { Button, SuccessToast } from './css'

export const darkDialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }
        },
        paper: {
          maxWidth: 'none',
          padding: 0,
          // boxShadow: '0 0 5px 5px rgba(0, 0, 0, .4)',
          background: "#333",
        },
      },
    },
  }
})

export const DialogWrapper = styled.div`
  min-width: 310px;
  padding: 16px 32px 24px;
  color: #1D1D1F;
  position: relative;

  &.alert-dialog {
    padding-bottom: 30px;

    .title {
      padding-top: 20px;
    }
  }

  &.top-referres-dialog-wrapper {
    min-width: 900px;
    padding: 0;
    color: #cecece;

    .title {
      padding: 0 20px;
      height: 50px;
      background: #444;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-weight: bold;

      svg {
        cursor: pointer;
        transition: transform 0.6s ease;
  
        &:hover {
          transform: rotate(180deg);
        }
      }
    }

    .content {
      padding-bottom: 18px;
    }
  }

  &.withdrawals-record-wrapper {
    width: 1100px;
  }

  .title {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    &.center {
      justify-content: center;
    }

    i {
      margin-right: 20px;
      width: 24px;
      height: 24px;
      background-size: 100%;
    }

    .error {
      background-image: url(data:image/png;base64,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);
    }
  }

  .content {
    font-size: 14px;
    line-height: 22px;
    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
  }

  .form {
    margin-top: 25px;
    display: flex;
    align-items: center;
    position: relative;

    input {
      flex: 1;
      height: 24px;
      line-height: 24px;
      padding: 12px 15px;
      box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
      border-radius: 3px;
      border: 1px solid #E4E4E4;
      font-size: 14px;
      transition: all 0.4s ease;

      &::placeholder {
        color: rgba(29, 29, 31, 0.5);
      }
    }

    .error {
      border-color: rgba(224, 32, 32, 0.8);
      box-shadow: 0px 0 5px 0px rgba(224, 32, 32, 0.5);
    }

    .focus {
      border-color: rgba(76, 114, 255, 0.8);
      box-shadow: 0px 0 5px 0px rgba(76, 114, 255, 0.5);
    }

    a {
      margin-left: 16px;
      color: #4C72FF;
    }

    .errorTip {
      display: flex;
      visibility: hidden;
      align-items: center;
      position: absolute;
      left: 0;
      top: 100%;
      margin-top: 8px;
      line-height: 22px;
      color: #E02020;
      font-size: 16px;

      &.show {
        visibility: visible;
      }

      i {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAD8ElEQVRYCcVXS2hTQRSdeWkqJuAiUpHSNuZhQSyIIIKCYF0pgn9ciW51XdyJVSuuBPcu3CiuhPoB0V0FkVakIGpF1IamKUX8ZCEkou3LeM7tTB2TvNhFUx8kc9+de+85c+d3n1ZLfExfX3uxXN5T1fqgMmaz0rpTK9VJd6PULHSz0L0NjHnQnU6P6ImJX0sJjRjNn899fesr5fIggp8AyJrm1rZX6++wvZ1Kp4fWTUx8auYTS8Bs3LiqGEXnjDEDGGHaDwKnktF6RkbNDmbDmC7YZWrsylrra92JxBX98eNPv8/JDQnYUd+F0Q7PMK+C4FYikbjX9eHDS6f325ne3q1RFB1W1epJkAm9vjFk40ijbNQRKOZyW6pKPcTIuySA1l/QDmUzmet6fHzOCxormm3bktOl0hmQOI8sddAQmZgJtN7fnc+/9h3/IsCR/6hUXiyCKzUK5kcbMfeDxMk2k8Po30kbklidSm334y0S4JwX5uefwE7SDuM7PYnEybi5A0mNlO9G+7VncvINARo9jDsdRbdgd9z2j2Xb2vpd3MA5ccFBdnM+2gycPoVc7kY0Pz9ioujVVBiecHFqWwIxFvSjtm+HxZJXIcBUgeGAaDDnTLtjaJ3qGmRIRoR51lh0x+oMPAVjMSbmgOsJy8IMEJOyEOA+RyC31f65d+mI59FCI3P72MlxLecd832Z/cSSswWy5glXqFS+gNYaGOR71q7dtJTVbvr722aKxQPYMZ+zk5PP4oB9veyOb9/egUCIbHzPplIdenrDhr0IIiMAgYvZqalLvtNyy4UwvGiq1QuMi/TvC+RstyiJZPL+cgPWxuNB5nTEDpD6zVRg9KW4E845+C0Wkp7K5c7yR9nvayYTg1hiA+w2zEUnSCg525t51vQVw3AX/K5SDfk5mqc1JrGv9h7JEDsAG7lSEWw21qNBBxaSbCN2+XID03qVxSL24kFUb7UymgDsF0bOqVipx2IRm4tQCPA+XzF8hwXsAAvhLYHBJsP7vNUkiEEswWEJxxrOgUox4V5a1PoYxA5YQPJYFDxWMigmWoStJDYwJD4wiR1I9YoCkkqkJiyUSqdbRcBWSaHEByaxZRviqhzCnixb4EF3VS4nEbnyWaLhIRYxKQsBuSpRvVKBXdGBq3KYlYy8x/0lk+MIVOVPQY4zo56xGJOx+Y5a4pory4QAlSyd0YxRxrNTyqgmJLLv3+dVe3svfyIv+NX9u5KMMW3nmMWSVwzgz8M0/bei1NFYrrLcLuZBL+3/LssdCWYCc1b/YaLUTdYMcde2fJjMzR1CnFPcUS4e2qV/mDgnzt1/+zRzJNjabKz8x6lPgnKrPs9/A4u9GtN2YnfzAAAAAElFTkSuQmCC);
        background-size: 100%;
      }
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

export const Success = ({ text, setText, time }) => {
  useEffect(() => {
    if (text) {
      setTimeout(() => {
        setText('')
      }, time || 2500);
    }
  }, [text])

  return (
    <>
      {!text ? null : (
        <SuccessToast>
          <i></i>
          <span>{text}</span>
        </SuccessToast>
      )}
    </>
  )
}

export const Alert = ({ info, setInfo }) => {
  const handleClose = () => setInfo(null)

  return (
    <Dialog
      open={!!info}
      onClose={handleClose}
    >
      {!info ? null : (
        <DialogWrapper className="alert-dialog">
          <div className={`title ${info.isError || info.isSuccess ? '' : 'center'}`}>
            {info.isError ? <i className="error"></i> : null}
            {/* {info.isSuccess ? <i className="success"></i> : null} */}
            <span>{info.title}</span>
          </div>
          {!info.content ? null : (
            <div className="content">
              {info.content}
            </div>
          )}
          <div className="actions">
            <Button type="primary" onClick={handleClose}>{info.okText || 'OK'}</Button>
          </div>
          {/* <div className="close" onClick={handleClose}></div> */}
        </DialogWrapper>
      )}
    </Dialog>
  )
}

export const WithdrawalsRecordDialog = ({ visible, setVisible, channelId, tokenType }) => {
  const onClose = () => setVisible(false)

  return (
    <ThemeProvider theme={darkDialogTheme}>
      <Dialog
        open={visible}
        onClose={onClose}
      >
        <DialogWrapper className='top-referres-dialog-wrapper withdrawals-record-wrapper'>
          <div className="title">
            <span style={{ width: '24px' }}></span>
            <span>Withdraw record</span>
            <ClearIcon onClick={onClose} />
          </div>
          <div className="content">
            <WithdrawalsRecord
              tokenType={tokenType}
              channelId={channelId}
            />
          </div>
          {/* <div className="actions">
            <Button type="primary" onClick={onClose}>Ok</Button>
          </div> */}
        </DialogWrapper>
      </Dialog>
    </ThemeProvider>
  );
}

const TopReferresDialog = ({ visible, setVisible, data }) => {
  const onClose = () => setVisible(false)

  return (
    <ThemeProvider theme={darkDialogTheme}>
      <Dialog
        open={visible}
        onClose={onClose}
      >
        <DialogWrapper className='top-referres-dialog-wrapper'>
          <div className="title">
            <span style={{ width: '24px' }}></span>
            <span>Top referrers</span>
            <ClearIcon onClick={onClose} />
          </div>
          <div className="content">
            <TableTopInvites data={data} />
          </div>
          {/* <div className="actions">
            <Button type="primary" onClick={onClose}>Ok</Button>
          </div> */}
        </DialogWrapper>
      </Dialog>
    </ThemeProvider>
  );
}

export default TopReferresDialog

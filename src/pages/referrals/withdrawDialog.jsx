import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import BigNumber from "bignumber.js";

import { withdraw } from './api'
import { getNetwork } from './utils'
import { Button } from './css'
import Identity from '@/static/images/presale/ICP@3x.png'

export const isPrincipalIdFn = (id) => /^([a-z0-9]{5}\-){10}[a-z0-9]{3}$/g.test(id);

const flex = `display: flex;`;
const flexAlign = `${flex}; align-items: center;`;

const dialogTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
          }
        },
        paper: {
          maxWidth: 'none',
          padding: 0,
          // boxShadow: '0 0 5px 5px rgba(0, 0, 0, .4)',
        },
      },
    },
  }
})


const DialogWrapper = styled.div`
  width: 800px;
  padding: 16px 32px 24px;
  color: #1D1D1F;
  position: relative;

  .title {
    height: 50px;
    display: flex;
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
`

export const USDT = 'data:image/png;base64,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'

export const BUSD = "data:image/png;base64,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"

const Withdrawal = styled.div`
  font-size: 16px;
  color: #333333;

  .action {
    ${flex};
    justify-content: center;
    margin-top: 35px;

    a {
      width: 230px;
      line-height: 50px;
      background: #333333;
      border-radius: 8px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #FFFFFF;
      cursor: pointer;

      &:hover {
        background: #454545;
      }

      &.disabled {
        cursor: not-allowed;

        &:hover {
          background: #333333;
        }
      }
    }
  }

  .desc {
    margin-top: 20px;
    color: #FF563F;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }

  .form {
    .item {
      ${flexAlign};
      margin-bottom: 30px;
    }
    .label {
      width: 150px;
      margin-right: 18px;
      text-align: right;
    }
    .value {
      ${flexAlign};
      position: relative;
    }

    .error {
      display: none;
      position: absolute;
      top: 100%;
      margin-top: 3px;
      margin-left: 16px;
      font-size: 14px;
      color: #B00000;
    }

    .has-error {
      .error {
        display: block;
      }

      .input {
        border-color: #B00000;
        color: #B00000;
      }
    }

    a {
      margin-left: 20px;
      color: #FF563F;
      cursor: pointer;
    }

    .input {
      line-height: 20px;
      font-size: 16px;
      box-sizing: border-box;
      border: 1px solid #EEEEEE;
      border-radius: 8px;

      &::placeholder {
        color: #999;
      }
    }

    .address {
      input {
        width: 600px;
        padding: 15px;
      }
    }

    .withdrawal {
      ${flexAlign};
      width: 300px;
      height: 50px;
      padding: 15px 8px 15px 15px;

      input {
        flex: 1;
        border: none;
      }

      span {
        color: #333333;
      }
    }

    .select {
      ${flexAlign};
      flex-wrap: wrap;
      color: #333;

      p {
        ${flexAlign};
        margin-right: 50px;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }
      }

      .radio {
        ${flexAlign};
        justify-content: center;
        width: 18px;
        height: 18px;
        margin-right: 10px;
        box-sizing: border-box;
        border: 2px solid #333333;
        border-radius: 50%;
      }

      .disabled {
        cursor: not-allowed;

        .radio {
          border-color: #e5e5e5;
        }
      }

      .selected {
        .radio {
          border-color: #333333;
          
          &::after {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #333333;
          }
        }
      }

      .pay-icon {
        width: 22px;
        height: 22px;
        margin-right: 5px;
        background-size: 100%;
      }

      .icp {
        width: 27px;
        height: 13px;
        background-image: url(${Identity});
      }
    
      .usdt {
        background-image: url(${USDT});
      }
    
      .busd {
        background-image: url(${BUSD});
      }

    }
  }
`

export const tokenTypeList = [
  {
    name: 'BNBChain/USDT',
    type: 'usdt',
  },
  {
    name: 'BNBChain/BUSD',
    type: 'busd',
  },
  {
    name: 'DFINITY/ICP',
    type: 'icp',
  }
]

const feeMap = {
  usdt: {
    coin: 1,
    unit: 'USDT',
  },
  busd: {
    coin: 1,
    unit: 'BUSD',
  },
  icp: {
    coin: 0.1,
    unit: 'ICP'
  }
}

const WithdrawDialog = ({ loading, loginAddress, reFetchData, channelId, payTypeSelect, visible, setVisible, tokenType, available, data }) => {
  const onClose = () => setVisible(false)

  const [errors, setErrors] = useState({
    address: '',
    amount: '',
  })
  const errorsRef = useRef({...errors})
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const amountRef = useRef('')

  const onAddressInput = (ev) => {
    _setErrors('address', '')
    const value = ev.target.value
    setAddress(value)
  }
  const onAmountInput = (ev) => {
    _setErrors('amount', '')
    const value = ev.target.value
    if (value !== '' && !/^[\.\d]+$/.test(value)) {
      return
    }
    amountRef.current = value
    setAmount(value)
  }

  const _setErrors = (key, value) => {
    const data = { ...errorsRef.current }
    data[key] = value
    errorsRef.current = data
    setErrors({ ...data })
  }
  const checkAmountValid = () => {
    try {
      const num = +(amountRef.current)
      if (isNaN(num)) {
        _setErrors('amount', 'Please enter a valid numeric value')
      } else if (num > available) {
        _setErrors('amount', 'Insufficient balance')
      } else if (num - feeMap[tokenType].coin <= 0) { 
        _setErrors('amount', `Minimal ${feeMap[tokenType].coin} ${feeMap[tokenType].unit}`)
      } else {
        _setErrors('amount', '')
      }
    } catch (error) {
      _setErrors('amount', 'Please enter a valid numeric value')
    }
  }
  const checkAddressValid = (type, isTypeChange = false) => {
    if (!address.trim().length) {
      if (isTypeChange) {
        _setErrors('address', "")
        return
      }
      _setErrors('address', "The withdrawal address format is wrong")
      return 
    }
    const _payType = typeof type === 'string' ? type : tokenType
    if (!_payType) {
      return
    }
    if (_payType === 'icp') {
      if (!isPrincipalIdFn(address)) {
        _setErrors('address', "The withdrawal address format is wrong")
        return
      }
    } else if (address.indexOf('0x') !== 0) {
      _setErrors('address', "The withdrawal address format is wrong")
      return
    }
    _setErrors('address', "")
  }

  const onWithdrawalAll = () => {
    const amount = Math.max(available, 0)
    amountRef.current = amount
    setAmount(amount)
    checkAmountValid()
  }

  const toWithdrawal = async () => {
    checkAmountValid()
    checkAddressValid()
    if (Object.values(errorsRef.current).filter(error => !!error).length) {
      return
    }
    const _address = process.env.NODE_ENV === "development" ? '0xBAB174033c9e8B8a129e8fce58495F2Cfa4A5A3b' : loginAddress
    const coin = new BigNumber(+amount).minus(feeMap[tokenType].coin).toNumber()
    const success = await withdraw(_address, channelId, address, getNetwork(tokenType), feeMap[tokenType].coin, coin)
    if (success) {
      setVisible(false)
      reFetchData()
    }
  }

  const onSelectPayType = (type) => {
    setAmount('')
    payTypeSelect(type)()
    checkAddressValid(type, true)
    _setErrors('amount', '')
  }

  useEffect(() => {
    if (!visible) {
      setAmount('')
    }
  }, [visible])

  return (
    <ThemeProvider theme={dialogTheme}>
      <Dialog
        open={visible}
        onClose={onClose}
      >
        <DialogWrapper className='top-referres-dialog-wrapper'>
          <div className="title">
            <span style={{ width: '24px' }}></span>
            <span>Initiate a withdrawal</span>
            <ClearIcon onClick={onClose} />
          </div>
          <div className="content">
            <Withdrawal>
              <div className="form">
                <div className="item">
                  <div className="label">Address</div>
                  <div className={`value address ${errors.address ? 'has-error' : ''}`}>
                    <input className="input" type="text" value={address} onInput={onAddressInput} onBlur={checkAddressValid} placeholder={`Please enter the ${tokenType === 'icp' ? 'DFINITY' : 'BNB'} Chain wallet address.`} />
                    <div className="error">{errors.address}</div>
                  </div>
                </div>
                <div className="item">
                  <div className="label">Network/Coin</div>
                  <div className="value select">
                    {tokenTypeList.map(({ name, type }) => (
                      <p onClick={() => onSelectPayType(type)} className={`${tokenType === type ? 'selected' : ''}`} key={type}>
                        <span className="radio"></span>
                        <i className={`pay-icon ${type}`}></i>
                        <span className="text">{name}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="item">
                  <div className="label">Withdraw amount</div>
                  <div className={`value ${errors.amount ? 'has-error' : ''}`}>
                    <div className="withdrawal input">
                      <input type="text" value={amount} onInput={onAmountInput} onBlur={checkAmountValid} placeholder={`Minimal ${feeMap[tokenType].coin}`} />
                      <span>{feeMap[tokenType].unit}</span>
                    </div>
                    <a onClick={onWithdrawalAll}>Max</a>
                    <div className="error">{errors.amount}</div>
                  </div>
                </div>
                <div className="item">
                  <div className="label">Balance</div>
                  <div className="value">
                    {available} {feeMap[tokenType].unit}
                  </div>
                </div>
                <div className="item">
                  <div className="label">Network fee</div>
                  <div className="value">
                    {feeMap[tokenType].coin} {feeMap[tokenType].unit}
                  </div>
                </div>
                <div className="item">
                  <div className="label">Receive amount</div>
                  <div className="value">
                    {Math.max(new BigNumber(amount).minus(feeMap[tokenType].coin).toNumber() || 0, 0)} {feeMap[tokenType].unit}
                  </div>
                </div>
              </div>
              <div className="action">
                <a onClick={toWithdrawal} className={loading || !!Object.values(errorsRef.current).filter(error => !!error).length ? 'disabled' : '' }>Ok</a>
              </div>
              <div className="desc">The withdrawal request will be processed within 48 hours, you can check the withdrawal status and transaction hash in the withdrawal record. Please make sure that the withdrawal address is correct, or you shall be responsible for any non-receipt and loss arising therefrom.</div>
            </Withdrawal>
          </div>
        </DialogWrapper>
      </Dialog>
    </ThemeProvider>
  );
}

export default WithdrawDialog

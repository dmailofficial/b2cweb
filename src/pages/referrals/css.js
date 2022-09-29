import styled, { keyframes } from "styled-components";

import icpIcon from "@/static/images/presale/ICP@3x.png";
import usdtIcon from "@/static/images/presale/USDT@3x.png";
import questionIcon from "@/static/images/question.png";
import twitterIcon from "@/static/images/twitter.png";

const redNormal = `#FF6633`;
const redBright = `#cf4517`;

const flex = `display: flex;`;
const flexAlign = `${flex}; align-items: center;`;
const flexBetween = `${flexAlign};justify-content: space-between;`;
const flexJustBetween = `${flex}; justify-content: space-between;`;
const font500 = `font-weight: 500;`;
const font14 = "font-size: 14px;";

export const Info = styled.div`
  padding: 45px;
  line-height: 22px;
  background: #252527;
  // box-shadow: 0 0 5px 3px rgb(0, 0, 0, 30%);
  border-radius: 8px;

  ul {
    display: flex;
    // flex: 1;
  }

  li {
    ${flexAlign};
    flex-direction: column;
    flex: 1;
    // justify-content: center;
    font-size: 14px;

    &:first-child {
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    p,
    div {
      ${flexAlign};
    }

    .btns {
      a {
        font-weight: 600;
        padding: 0 30px;
        line-height: 40px;
        border-radius: 7px;
        cursor: pointer;
        color: #fff;
        font-size: 14px;

        i {
          vertical-align: middle;
        }
      }

      .withdraw {
        margin-bottom: 15px;
        background: #FF563F;
      }

      .disabled {
        background: #666;
      }

      .share {
        background: #299DED;

        i {
          width: 18px;
          height: 15px;
          display: inline-block;
          margin-right: 10px;
          cursor: pointer;
          background: url(${twitterIcon});
          background-size: 100%;
        }
      }
    }

    & > div {
      margin-bottom: 30px;
    }

    div {
      font-weight: 600;

      span {
        margin-right: 5px;
      }

      a {
        color: #3e94f5;
        cursor: pointer;
      }

      .copy {
        color: #8ebbff;
        cursor: pointer;
      }

      .icon-question {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
        background: url(${questionIcon});
        background-size: 100%;
      }
    }

    .usdt {
      margin-bottom: 15px;
      align-items: baseline;
      font-weight: 600;
    }

    .coin {
      font-size: 24px;
      color: #f3c788;
      line-height: 28px;
      margin-right: 10px;
    }

    .unit {
      font-size: 12px;
    }

    .view {
      color: #ff6633;
      cursor: pointer;
    }
  }
`;

export const Tip = styled.div`
  padding: 12px 18px;
  background: #252527;
  line-height: 20px;
  color: #fff;

  p {
    flex: 1;
  }

  .item {
    font-size: 13px;
    text-indent: 1.2em;
  }
`;

const statusMap = {
  success: "#6DD400",
  ing: "#FF9800",
  close: "#969696",
};

const buttonMap = {
  normal: {
    color: "#1D1D1F",
    bgColor: "#fff",
  },
  disabled: {
    color: "rgba(255, 255, 255, 0.3)",
    bgColor: "rgba(255, 102, 51, 0.3)",
    cursor: "not-allowed",
  },
  primary: {
    color: "#fff",
    bgColor: redNormal,
    hoverBgColor: redBright,
  },
  ghost: {
    color: redNormal,
    bgColor: "transparent",
    bdColor: redNormal,
  },
};

const getButtonStyle = (type, styleName) => {
  return type in buttonMap && styleName in buttonMap[type]
    ? buttonMap[type][styleName]
    : "";
};

export const Button = styled.a`
  width: 100px;
  line-height: 32px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0px 8px 29px 0px rgba(0, 5, 58, 0.05);
  box-sizing: border-box;
  background: ${(props) =>
    getButtonStyle(props.type, "bgColor") || "transparent"};
  color: ${(props) => getButtonStyle(props.type, "color")};
  border: 1px solid
    ${(props) => getButtonStyle(props.type, "bdColor") || "none"};
  cursor: ${(props) => getButtonStyle(props.type, "cursor") || "pointer"};
  transition: background 0.4s ease;

  &:not([type="disabled"]):hover {
    background: ${(props) =>
      getButtonStyle(props.type, "hoverBgColor") || redNormal};
    color: ${(props) => getButtonStyle(props.type, "hoverColor") || "#fff"};
  }
`;

export const SuccessToast = styled.div`
  ${flexAlign};
  justify-content: center;
  padding: 0 32px;
  min-width: 200px;
  position: fixed;
  left: 50%;
  top: 40%;
  height: 46px;
  transform: translateX(-50%) translateY(-50%);
  background: #ffffff;
  box-shadow: 0px 16px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 16px;
  color: #1d1d1f;

  i {
    margin-right: 8px;
    width: 14px;
    height: 14px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHKADAAQAAAABAAAAHAAAAABkvfSiAAADN0lEQVRIDb1WTUhUURT+7htLa5GRRGCLEKnUcVFRUJCpCwmihWAgRNCiRRt/0iRaiFi6yAjSmdoEEUEERYWboCgIc5EQVJtxRiJcZYtQrIXlz7zXd65zH68386aZUbowc+/9zs/3zr3n3nsUcmjtMey3gGbHQZ2jsJMm5SmzGeXgq1IYt4HRaBgf/+VOZVMg0SkqDJJobzY9IyPxlAP0kviJwfx9RsKeBCqWknhIosN+g1zmJJ7YGMLpG1WY9uunEbbHUQ8bT+GgzK+c11xhFhZaotUY89r9RajJknhFhQ1epTWMlxFCk5fUJZRlXEzi/Zoj838dIy0O4ZBZXibfapM9W3cycc2t0b5TPJpQsrHQBEn5ydqJb+EQJU3IdR3MapGHkL7mM6kbDiWHmmF/yKSUL8bjcG9TCboWfmGUtg1p9goHLIbYnCYoAFAWbo/U4NxQJX4UleIEyV/43QiXxfWt8wvynfOrhyI1aCMJLxqg9CdC9Fvi9yNcVupu9Msge0EHrey/pAk9AOV9jOyygS5MY+sc9FluMJjphUuSxlzEBgeJvlsKjZEwHpcU4Ridxl2hZ0Dj7kgtBgzU/hnb7QW8kaw0mK8vF8JM7f5wGJ9EcL0KM04x6vkRei4YxzZ/50dqcVPm0i4lUK4WMUayfatI+j8/3BHCGb+IRj2dk+g1eHQ3I96MRpJMcK2TNDzL6O8Y+cVJ7Pq9grfcwGqDZeop/2bJe5ZJaNsYIOk1IxuuwPw2oIlkx0fCeGDw7jj2LNkYp7NKgwX1+u3sjOGK7aAvSIkR3WIGdjA6nYFevY5J1PJleU3BDi8eNGZeXLXkpQ5S0LiDNkZ6t99ZvZWMblcCB/kJY7mSiZ1wcYWAjhgS3Lfsr7rCo7IanOlXWOGqHCXRc9psEftcGldoivtepbOUxm6CBBo7aJ2L4VlnHCe5BS/zIROfhkNHKACjfEcnQedHVApukt2M7og4cM+h1CBMkNmCvQYZ0qf2nZK7hPpFZg1CfDnItgB8mSG1mNde7F1CmejagzXIukQqq+WrZ9IIDanUIPpWEaCAJrbiw1s8GTdu0hjA2/+3QthLKmOpCrj261Lq/wErxgDpBZfMRQAAAABJRU5ErkJggg==);
    background-size: 100%;
  }
`;

export const Circle = styled.i`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => statusMap[props.type] || ""};
`;

export const Wrapper = styled.div`
  margin: 24px 0;
  color: #fff;
  font-family: Roboto-Regular, Roboto;
`;

export const ToolBar = styled.div`
  margin: 0 32px;
  ${flexBetween};

  .left {
    ${flexAlign};
    cursor: pointer;

    i {
      width: 24px;
      height: 24px;
      display: block;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAPxQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////WPWlFQAAAFN0Uk5TAAECAwQFBgcJCgsNDxETFhgZHh8kKisvNDY3OTo8QUVKTlNYXWNobnN4f4SLlpmeoKGjqKytsra3urvAxMjM0NPV2uDm6+zx8/T29/j5+vv8/f6XEM5HAAAAwUlEQVQYGe3B6ToCARiG4ZeRNUSIFluWkK2ULKPsWRLznP+5OIAm1/f98G/uW4mEQz48C+Sw3oU12W2+w/2UzLZ70J6X2U4fwlmZ7f3AzYzMKhG0JmV2CDTGZVYFamOyGjkGTkZlFZwDl8VCnIxiVBnuI6dBV/yhrEG5ZyC8iHWUUoyVJ3hZlcPSI7yW5LD4AG8bcsh04HNLDnN38FWWQ/oWvnflMH0N0b4cJpoQHcghVYdoWQ7BKd0FuZSySiT+2y+WFjbBWvCCrwAAAABJRU5ErkJggg==);
      background-size: 100%;
    }

    span {
      ${font500};
      margin-left: 8px;
      font-size: 20px;
    }
  }

  .right {
    ${flexAlign};

    span {
      ${font14};
      color: ${redNormal};
      border: 2px solid ${redNormal};
      border-radius: 2px;
      line-height: 48px;
      padding: 0 45px;
    }

    a {
      width: 180px;
      height: 48px;
      background: ${redNormal};
      color: #ffffff;
      margin-left: 24px;
      line-height: 48px;
      box-shadow: 0px 8px 29px 0px rgb(0 5 58 / 5%);
      border-radius: 3px;
      font-size: 14px;
      font-family: Roboto-Regular, Roboto;
      font-weight: bold;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: ${redBright};
      }
    }
  }
  @media screen and (max-width: 750px) {
    margin: 0 15px;
    .left {
      span {
        margin-left: 4px;
        font-size: 16px;
      }
    }
  }
`;

export const Content = styled.div`
  margin: 24px 32px 0;
  // padding: 24px;

  // background: rgba(255, 255, 255, 0.04);
  // box-shadow: 0px 8px 11px 0px rgba(0, 0, 0, 0.02);
  // border-radius: 6px;

  .orders {
    margin-left: 32px;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 750px) {
    margin: 24px 15px 0;
    padding: 0px;
  }

  .table-wrapper {
    margin-top: 18px;
    padding: 22px;
    background: #252527;
    border-radius: 5px;
  }

  .tokens {
    ${flexBetween};
    margin-bottom: 15px;
    font-size: 14px;

    p {
      ${flexAlign};
    }

    .raInput {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 14px;
      border: 2px solid #9b9b9b;

      &.checked {
        border: 2px solid #ff6633;
        span {
          background-color: #ff6633;
        }
      }

      span {
        margin-right: 0;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: none;
        display: inline-block;
        vertical-align: middle;
      }
    }

    .select {
      ${flexAlign};

      p {
        margin-right: 25px;
        cursor: pointer;
      }

      & > span {
        margin-right: 25px;
      }

      .raInput {
        margin-right: 10px;
      }
    }

    .text {
      margin-right: 28px;

      i {
        width: 20px;
        height: 20px;
        background-size: 100%;
        display: inline-block;
        margin-left: 8px;
        vertical-align: middle;
      }

      .icp {
        width: 22px;
        height: 11px;
        background-image: url(${icpIcon});
      }

      .usdt {
        background-image: url(${usdtIcon});
      }
    }
  }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`;

export const TableChunk = styled.div`
  color: #fff;
  box-shadow: inset 0px -1px 0px 0px #414142;
  overflow-x: auto;
  min-height: 470px;

  &.withdrawals-record {
    box-shadow: none;
    tr {
      th:first-child, td:first-child {
        padding-left: 40px;
      }
      th:last-child, td:last-child {
        padding-right: 40px;
      }
    }
    .state {
      ${flexAlign};
      i {
        width: 6px;
        height: 6px;
        margin-right: 4px;
        border-radius: 50%;
      }
      &.withdrawing i {
        background-color: #FF563F;
      }
      &.completed i {
        background-color: #55CADB;
      }
      &.failed {
        i {
          background-color: #999;
        }
        svg {
          font-size: 14px;
          font-weight: normal;
          color: #fff;
          border: 1px solid #fff;
          border-radius: 50%;
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }

  &.top-invites {
    overflow: visible;
    min-width: 500px;
    padding: 0 30px;
    min-height: 0;
    flex: 1;
    box-shadow: none;
    // position: relative;
    // padding-top: 42px;

    .table {
      height: 460px;
      overflow-y: auto;
    }

    tr:last-child {
      td {
        border: none;
      }
    }

    // th {
    //   padding: 0 12px;
    // }

    .thead {
      padding: 0 130px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
      z-index: 10;
      color: #999;
    }

    td {
      height: auto;
      padding: 12px 0px;
      line-height: 26px;
      font-size: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: none;
    }

    .channel_id {
      padding-left: 60px;
    }

    .order_count {
      padding-right: 72px;
    }

    .ranking {
      padding-left: 20px;
    }

    .total {
      padding-right: 20px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  &.loading {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }

    &::after {
      content: "";
      animation: ${rotateAnimation} 1.6s linear infinite;
      position: absolute;
      width: 64px;
      height: 64px;
      left: 50%;
      top: 50%;
      margin: -32px 0 0 -32px;
      background: url(data:image/png;base64,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);
      background-size: 100%;
    }
  }

  thead {
    height: 48px;
    background: #2a2a2c;
  }

  th,
  td {
    ${font14};
    border: none;
    text-align: center;
  }

  td {
    padding: 12px;
    box-shadow: inset 0px -1px 0px 0px #414142;
    height: 40px;
    line-height: 22px;
  }

  th {
    padding: 0 16px;
    color: #8e8e8f;
  }

  .status {
    ${flexAlign};

    i {
      margin-right: 8px;
    }
  }

  .break-word {
    word-break: break-word;
    max-width: 260px;
    display: inline-block;
  }
`;
export const NoDataWraper = styled.div`
  ${flexAlign};
  justify-content: center;
  height: 470px;

  img {
    width: 76px;
  }

  .no-data-text a {
    color: #4c72ff;
  }

  p {
    line-height: 28px;
    text-align: center;
    color: #929293;

    &:first-child {
      margin-top: 5px;
    }
  }
`;

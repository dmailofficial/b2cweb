import Message from "@/components/Message/index";

export const payBaseUrl = "https://pay.dmail.ai";

const isPro = window.location.host === "dmail.ai";
export const emailHost = isPro
  ? "evyc3-ziaaa-aaaak-aam5a-cai.ic0.app"
  : "ofbzl-tqaaa-aaaak-aav5q-cai.ic0.app";
export const emailLogin = `https://${emailHost}/inbox`;

export const copyTextToClipboard = (text, successText) => {
  if (!navigator.clipboard) {
    const success = fallbackCopyTextToClipboard(text);
    const msg = success ? successText || "Copy success" : "Copy failed";
    Message[success ? "success" : "error"](msg);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      Message.success(successText || "Copy success");
    },
    function (err) {
      Message.error("Copy failed");
    }
  );
};

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let success = false;
  try {
    var successful = document.execCommand("copy");
    if (successful) {
      success = true;
    }
  } catch (err) {
    success = false;
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
  return success;
}

export const remainDecimal = (num, digits = 2) => {
  const n = Math.pow(10, digits);
  return Math.round(+num * n) / n;
};

export const remainDecimalByString = (num, digits = 2) => {
  if (!/^[0-9]+.?[0-9]*$/.test(num + "")) {
    return num;
  }
  const n = Math.pow(10, digits);
  return Math.round(+num * n) / n;
};

export const shortPrincipalId = (principalId, isPid = true) => {
  return principalId.slice(0, isPid ? 9 : 5) + "****" + principalId.slice(isPid ? -6 : -5);
};

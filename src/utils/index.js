import Message from "@/components/Message/index";

export const payBaseUrl = "https://pay.dmail.ai";

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

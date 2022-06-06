import React, { createElement } from "react";
import { render, createPortal } from "react-dom";
import BaseMessage, { Types } from './message'

function initOptions(options) {
  if (typeof options === 'string') {
    return {
      msg: options
    }
  } else if (typeof options !== 'object' || typeof options.msg !== 'string') {
    console.error('The options is invalid! Please check it!')
    return {
      msg: 'Unknown error',
    }
  }

  return options
}

/* 
 * how to use:
 *
 * Type info、success、error、warn:
 ** Message.success('Send success')
 ** Message.error('Send failed')
 * 
 * Type loading: 
 ** const close = Message.loading('this is loading')
 ** new Promise(resole => setTimeout(resolve, 3000)) // after request(or others), proactive close 
 ** close()
*/

// TODO: destory the Message; show animation!
const Message = (options) => {
  const _options = initOptions(options)
  const close = _options.close = () => render(null, div);
  const div = document.createElement('div');
  document.body.appendChild(div)
  render(<BaseMessage {..._options} />, div)
  // loading type how to setOpen when close?
  return close
}

Types.forEach((type) => {
  Message[type] = (options) => {
    const _options = initOptions(options)
    return Message({
      ..._options,
      type,
    })
  }
})

export default Message
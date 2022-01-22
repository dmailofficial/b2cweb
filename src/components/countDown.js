import { useCallback, useEffect, useRef, useState } from "react"

const fixDigit = (num, digit = 2) => {
  const len = `${num}`.length
  const fixStr = len < digit ? new Array(digit - len).fill('0').join('') : ''
  return `${fixStr}${num}`
}

const getHMS = (time, splitStr) => {
  const hour = Math.floor(time / 3600)
  const leftTime = time % 3600
  const min = Math.floor(leftTime / 60)
  const second = time % 60
  return `${fixDigit(hour)}${splitStr}${fixDigit(min)}${splitStr}${fixDigit(second)}`
}

const getSecond = (hour, min, second) => {
  return hour * 3600 + min * 60 + second
}

// correctRequest must return promise, and the promise must resolve number/string
const useCountDown = (min = 0, hour = 0, second = 0, correctGap = 5 * 60, correctRequest = null, splitStr = ':') => {
  const [countDownEnd, setCountDownEnd] = useState(false)
  const [time, setTime] = useState(getSecond(hour, min, second))
  const timeRef = useRef(0)
  const [showTime, setShowTime] = useState('--:--:--')
  const correctTimeRef = useRef(0)
  const stoRef = useRef(0)

  // if time changed, reset all
  useEffect(() => {
    correctTimeRef.current = 0
    setTime(getSecond(hour, min, second))
  }, [min, hour, second])

  useEffect(() => {
    const _time = time <= 0 ? 0 : time
    timeRef.current = _time
    setShowTime(getHMS(_time, splitStr))
  }, [time])

  const fn = useCallback(() => {
    if (timeRef.current <= 0) {
      setCountDownEnd(true)
      clearTimeout(stoRef.current)
      return
    } else {
      setTime(timeRef.current - 1)
      correctTimeRef.current += 1
    }
    // correct the time after correctGap past
    if (typeof correctRequest === 'function' && correctTimeRef.current >= correctGap) {
      try {
        correctRequest().then((time) => {
          ['number', 'string'].includes(typeof time) && setTime(+time)
        })
      } catch (error) {
        console.error(error)
      }
      correctTimeRef.current = 0
    }
    stoRef.current = setTimeout(() => {
      fn()
    }, 1000);
  }, [])

  useEffect(() => {
    fn()
  }, [])

  return [showTime, countDownEnd]
}

// compatible the class component
export const CompatibleClassCountDown = ({ endCallback, min = 0, hour = 0, second = 0, correctGap = 5 * 60, correctRequest = null, splitStr = ':' }) => {
  const [showTime, countDownEnd] = useCountDown(min, hour, second, correctGap, correctRequest, splitStr)

  useEffect(() => {
    countDownEnd && typeof endCallback === 'function' && endCallback()
  }, [countDownEnd])

  return (
    <>
      {showTime}
    </>
  )
}

export default useCountDown 
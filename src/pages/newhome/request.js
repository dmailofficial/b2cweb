import axios from '@/utils/axios';

const baseUrl = 'https://pay.dmail.ai'

export const subscribeNews = async (email) => {
  try {
    return axios({
      url: `${baseUrl}/sublist`,
      data: {
        email
      },
      method: 'post',
    }).then((res) => {
      const { code, data, message, success } = res.data
      return { code, success, msg: message, data }
    })
  } catch (error) {
    return { success: false, msg: error, data: null }
  }
}
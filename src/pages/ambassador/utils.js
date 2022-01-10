import axios from '@/utils/axios';

const baseUrl = 'https://pay.dmail.ai'
export const submit = async (data) => {
    try {
      return axios({
        url: `${baseUrl}/ambassador`,
        data: data,
        method: 'post',
        // errorTitle: '',
      }).then((res) => {
        const { code, data, message, success } = res.data
        return { code, success, msg: message, data }
      })
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  }
import axios from '@/utils/axios';

const baseUrl = 'https://pay.dmail.ai'
// const baseUrl = 'https://testmail.dmail.ai'

const plugShim = (address, data) => {
  if(data.address.indexOf('-')>0){
    data = {
      ...data,
      is_verify: true
    }
  }
  return data;
}

export const searchEmail = async (key) => {
  try {
    return axios({
      url: `${baseUrl}/products`,
      data: {
        key
      },
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

export const getEmailInfo = async (key) => {
  return axios({
    url: `${baseUrl}/products/detail`,
    data: {
      key
    },
    method: 'post',
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

// data {address}
export const blockEmail = async (data) => {
  try {
    return axios({
      url: `${baseUrl}/lockdomain`,
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

// data {address, product_name, jwt}
// export const blockEmail = async (data) => {
//   data = plugShim(data.address, data)
//   try {
//     return axios({
//       url: `${baseUrl}/lockdomain`,
//       data: data,
//       method: 'post',
//       // errorTitle: '',
//     }).then((res) => {
//       const { code, data, message, success } = res.data
//       return { code, success, msg: message, data }
//     })
//   } catch (error) {
//     return { success: false, msg: error, data: null }
//   }
// }

// data {address,address,product_name }
export const getIcpPrice = async (data) => {
  // data = plugShim(data.address, data)
  return axios({
    url: `${baseUrl}/icpprice`,
    data: data,
    method: 'post',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const login = async (address) => {
  return axios({
    url: `${baseUrl}/login`,
    method: 'post',
    data: {
      address,
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const verifySign = async (address, signature) => {
  return axios({
    url: `${baseUrl}/auth`,
    method: 'post',
    data: {
      address,
      signature,
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const detectTransferIsSuccess = async (hash, address, price, product_name, jwt, network = '56', channel_id, wallet_name) => {
  let data = {
    address, price, product_name, tx: hash, jwt, network, channel_id, wallet_name
    // address, price, product_name, tx: `${hash}`, jwt, network, channel_id
  }
  data = plugShim(data.address, data)

  return axios({
    url: `${baseUrl}/transfer`,
    // url: `${baseUrl}/api2/v2/tradeTrans/createTradeTrans`,
    method: 'post',
    data: data
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const checkProductLockInfo = async (product_name) => {
  return axios({
    url: `${baseUrl}/timer/${product_name}`,
    method: 'get',
  }).then((res) => {
    try {
      const { address, code, message, success, ttl } = res.data
      return { address, code, msg: message, success, ttl }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const getEvents = async () => {
  return axios({
    url: `${baseUrl}/events`,
    method: 'get',
  }).then((res) => {
    try {
      const { data, code, message, success } = res.data
      return { data, code, message, success }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}


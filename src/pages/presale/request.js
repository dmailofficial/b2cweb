import axios from '@/utils/axios';

const baseUrl = 'https://pay.dmail.ai'

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

// data {address, product_name, jwt}
export const blockEmail = async (data) => {
  data = plugShim(data.address, data)
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

export const getDetail = async (email) => {
  return axios({
    url: `${baseUrl}/products`,
    method: 'post',
    data:{
      key : email
    }
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

// data {address,address,product_name }
export const getIcpPrice = async (data) => {
  data = plugShim(data.address, data)
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

export const detectTransferIsSuccess = async (hash, address, price, product_name, jwt, network = '56') => {
  let data = {
    address, price, product_name, tx: hash, jwt, network
  }
  data = plugShim(data.address, data)

  return axios({
    url: `${baseUrl}/transfer`,
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

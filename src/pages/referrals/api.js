import axios from "@/utils/axios";
import Message from "@/components/Message/index";

const baseURL = 'https://ic.dmail.ai/api/v4'
// const baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.0.100:8888' : 'https://ic.dmail.ai/api/v4/'

export const withdraw = async (org_address, channel_id, dst_address, network, fee, real_withdraw) => {
  try {
    const res = await axios({
      url: `${baseURL}/withdraw/createWithdraw`,
      method: "post",
      data: {
        org_address,
        channel_id,
        dst_address,
        network,
        fee,
        real_withdraw,
      },
    });
    const { msg, success } = res.data;
    if (success) {
      Message.success('Withdraw successful')
      return success
    } else {
      Message.error(msg || 'Withdraw failed')
      return false
    }
  } catch (error) {
    return false
  }
};

export const getChannelPrice = async (network, channel_id) => {
  try {
    const res = await axios({
      url: `${baseURL}/withdraw/getChannelCurrnentPrice`,
      method: "post",
      data: {
        channel_id,
        network,
      },
    });
    const { msg, data } = res.data;
    if (data && 'balance' in data) {
      return data.balance || 0
    } else {
      return 0
    }
  } catch (error) {
    console.error("getChannelCurrnentPrice", error);
    return 0
  }
};

export const getRecordList = async (channel_id, page, pageSize) => {
  try {
    const res = await axios({
      url: `${baseURL}/withdraw/getWithdrawList`,
      method: "get",
      params: {
        channel_id,
        // network,
        page, pageSize
      }
    });
    const { msg, data: { list, total } } = res.data;
    return {
      list,
      total
    }
  } catch (error) {
    console.error("getWithdrawList", error);
    return {
      list: [],
      total: 0
    }
  }
};

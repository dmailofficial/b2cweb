import axios from '@/utils/axios';
import { payBaseUrl } from '../utils/index'

export const getAddress = async (jwt) => {
    try {
        const res = await axios({
            url: `${payBaseUrl}/walletaddress`,
            method: 'post',
            data: {
                jwt,
                ...(process.env.NODE_ENV === 'development' ? { is_verify: true } : {})
            },
        })
        const { code, data, totalPages, message, success } = res.data
        if (success && data && data.erc && data.icp) {
            return data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}
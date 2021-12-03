import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `/`,
});

axiosInstance.defaults.timeout = 120000;

axiosInstance.interceptors.response.use(
  res => {
    // if (res.config.method === 'get' && res.status !== 200 || (res.config.method === 'post' && res.status !== 201)) {
    //   // notification.error({
    //     // message: `${res.data.errorTitle}请求失败`,
    //   // });

    //   return Promise.reject(res);
    // } else if (!res.data.success && res.data.code === '-1') {
    //   // notification.error({
    //     // message: `${res.data.errorTitle}错误：${res.data.msg}`,
    //   // });

    //   return Promise.reject(res);
    // } else if (!res.data.success && res.data.code === '401') {
    //   // window.location.href = __LoginHost;
    // } else if (!res.data.success && res.data.code === '9') {
    //   // router.push('/ErrorPage?code=403');
    // }
    return res;
  },
  error => {
    if (error.code == 'ECONNABORTED' && error.message.includes('15000ms')) {
      return Promise.reject(error);
    }

    if (error.code == 'ECONNABORTED') {
      // notification.error({
        // message: `请求超时`,
      // });
      return Promise.reject(error);
    }

    // if (error.response.status == 408) {
    //   return Promise.reject(error);
    // }

    // if (error.response.status > 400) {
    //   // notification.error({
    //     // message: `请求出错了。${error.response.status}`,
    //   // });
    // } else {
    //   // router.push('/ErrorPage?code=500');
    //   // notification.error({
    //     // message: `请求出错了。`,
    //   // });
    // }
    return Promise.reject(error);
  }
);

export default function (config) {
  if (config.errorTitle) {
    if (!config.transformResponse) {
      config.transformResponse = [];
    }
    Array.isArray(config.transformResponse) &&
      config.transformResponse.push(data => ({
        ...JSON.parse(data),
        errorTitle: config.errorTitle,
      }));
  }

  return axiosInstance(config).catch(function (res) {
    return res;
  });
}

import { useEffect, useRef, useState } from 'react';
import { api } from '@/api/api';
import axios, { AxiosRequestConfig, Canceler } from 'axios';

function useRequest(axiosConfig?: AxiosRequestConfig) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<any>(null);
  let previousRequest = useRef<any>(null);
  useEffect(() => {
    previousRequest.current = null;
    if (axiosConfig) {
      handleRequest(axiosConfig);
    }
  }, []);

  async function run(config: AxiosRequestConfig) {
    return handleRequest(config);
  }

  async function handleRequest(config: AxiosRequestConfig) {
    if (previousRequest.current) {
      previousRequest.current?.cancel('取消前一个请求');
    }
    setLoading(true);
    const { CancelToken } = axios;
    const source = CancelToken.source();
    previousRequest.current = source;
    return api({
      ...config,
      cancelToken: source.token,
    })
      .then((_res) => {
        previousRequest.current = null;
        setData(_res);
        return _res;
      })
      .catch((_err) => {
        if (axios.isCancel(_err)) {
          setTimeout(() => {
            setLoading(true);
          });
          console.log('请求已被取消：', _err.message);
        }
        previousRequest.current = null;

        setErr(err);
        return _err;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { loading, err, data, run };
}

export default useRequest;

import { useEffect, useRef, useState } from 'react';
import { api } from '@/api/api';
import axios, { AxiosRequestConfig } from 'axios';

function useRequest(axiosConfig?: AxiosRequestConfig) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<any>(null);
  let previousRequest = useRef<any>(null);
  let isCancel = false;
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
      previousRequest.current = null;
    }
    setLoading(true);
    if (!previousRequest.current) {
      const { CancelToken } = axios;
      previousRequest.current = CancelToken.source();
    }

    return api({
      ...config,
      cancelToken: previousRequest.current.token,
    })
      .then((_res) => {
        setData(_res);
        return _res;
      })
      .catch((_err) => {
        if (axios.isCancel(_err)) {
          isCancel = true;
          setTimeout(() => {
            setLoading(true);
          });
          console.log('请求已被取消：', _err.message);
        }
        setErr(err);
        return _err;
      })
      .finally(() => {
        if (!isCancel) {
          setLoading(false);
        }
      });
  }

  return { loading, err, data, run };
}

export default useRequest;

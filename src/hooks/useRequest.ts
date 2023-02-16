import React, { useEffect, useRef, useState } from 'react';
import { api } from '@/api/api';
import axios, { AxiosRequestConfig } from 'axios';
// interface useAxiosProps {}

function useRequest(axiosConfig?: AxiosRequestConfig) {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState<any>(null);

  useEffect(() => {
    if (axiosConfig) {
      handleRequest(axiosConfig);
    }
  }, []);
  async function run(config: AxiosRequestConfig) {
    return handleRequest(config);
  }

  async function handleRequest(config: AxiosRequestConfig) {
    setLoading(true);
    return api(config)
      .then((_res) => {
        setRes(res);
        return _res;
      })
      .catch((_err) => {
        setErr(err);
        return _err;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { loading, err, res, run };
}
export default useRequest;

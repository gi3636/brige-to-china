import { useCallback, useEffect, useRef, useState } from 'react';
export const useWsWorker = () => {
  const worker = useRef(null) as any;

  useEffect(() => {
    if (!worker.current) {
      console.log('import.meta.url', import.meta.url);
      worker.current = new SharedWorker('/js/wsWorker.js', {
        credentials: 'same-origin',
        type: 'module',
      });
      worker.current.port.onmessage = (ev) => {
        console.log('ev', ev);
      };
    }
  }, []);

  const sendData = (data: any) => {
    console.log('发送消息', data);
    worker.current.port.postMessage(data);
  };

  return {
    sendData,
  };
};

export default useWsWorker;

/**
 * 由于next.js会有服务端渲染，node.js没有window对象，所以需要判断
 */
function useStorageListener() {
  function listen(key, callback: (e: StorageEvent) => void) {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === key) {
          callback(e);
        }
      });
    }
  }

  return {
    listen,
  };
}

export default useStorageListener;

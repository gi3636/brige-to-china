/**
 * 由于next.js会有服务端渲染，node.js没有window对象，所以需要判断
 */
function useLocalStorage() {
  function getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }
  function setItem(key: string, obj: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, obj);
    }
  }
  return {
    getItem,
    setItem,
  };
}

export default useLocalStorage;

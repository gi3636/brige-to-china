import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import zh from '@/language/zh.json';
import en from '@/language/en.json';
import useLocalStorage from '@/hooks/useLocalStorage';
function useLanguage() {
  const { locale, push } = useRouter();
  const { getItem, setItem } = useLocalStorage();
  const t = useMemo(() => (locale === 'en' ? en : zh), [locale]);

  useEffect(() => {
    // 必须在useEffect中判断，要不然初始化渲染是因为不知道具体要走哪个判断就会报错
    // 详情看 https://nextjs.org/docs/messages/react-hydration-error
    const defaultLocale = getItem('language') || locale;
    if (defaultLocale !== locale) {
      changeLocale(defaultLocale);
    }
  }, [locale]);

  function changeLanguage(locale) {
    changeLocale(locale);
    // 存储本地
    setItem('language', locale);
  }

  function changeLocale(locale = 'en') {
    push('/', '/', { locale: locale });
  }

  return {
    t,
    changeLanguage,
  };
}

export default useLanguage;

import React, { useState } from 'react';
import styles from './index.module.scss';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { useRouter } from 'next/router';
import { emitter, EmitterType } from '@/utils/app-emitter';

const SearchBar: React.FunctionComponent = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const { pathname, query } = router;
  // 当 input 的内容改变时触发
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setKeyword(text);
  };

  const handleSearch = () => {
    console.log('搜索', keyword);
    if (pathname === '/search') {
      router.push(`/search?keyword=${keyword}`, undefined, { shallow: true });
      emitter.fire(EmitterType.searchQuestion, keyword);
    } else {
      router.push(`/search?keyword=${keyword}`);
    }
  };
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <input value={keyword} onChange={handleChange} placeholder='搜索' className={styles.input} onKeyDown={onEnter} />
      <div className={styles.icon} onClick={handleSearch}>
        <SearchIcon width={15} height={15} color='#8590A6' />
      </div>
    </div>
  );
};

export default SearchBar;

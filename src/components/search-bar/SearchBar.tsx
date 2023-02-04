import React, { useState } from 'react';
import styles from './index.module.scss';
import { SearchIcon } from '@/components/icons/SearchIcon';

const SearchBar: React.FunctionComponent = () => {
  const [text, setText] = useState('');

  // 当 input 的内容改变时触发
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setText(text);
  };

  return (
    <div className={styles.container}>
      <input value={text} onChange={handleChange} placeholder='搜索' className={styles.input} />
      <div className={styles.icon}>
        <SearchIcon width={15} height={15} color='#8590A6' />
      </div>
    </div>
  );
};

export default SearchBar;

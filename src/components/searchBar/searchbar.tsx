import React ,{useState}from 'react';
import styles from './index.module.scss';
import { SearchIcon } from '@/components/icons/SearchIcon';

const SearchBar: React.FunctionComponent = () => {
    const [query, setQuery] = useState("");

    // 当 input 的内容改变时触发
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setQuery(enteredName);
    };
    return (
        <div className={styles.container}>
            <input
                value={query}
                onChange={inputHandler}
                placeholder="搜索"
                className={styles.input}
            />

        <div className={styles.icon}><SearchIcon width={15} height={15} color='#8590A6'/></div>

    </div>
    );
};

export default SearchBar;

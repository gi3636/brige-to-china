import React, { useState } from 'react';
import styles from './index.module.scss';
import { SearchIcon} from '@/components/icons/SearchIcon';
import data from './data.json';
import {CloseOutlined} from "@ant-design/icons/lib";


function SearchBar(){
    const [text, setText] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    // 当 input 的内容改变时触发
    const handleChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchText);
        });
        if(searchText ===""){
            setFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
        setFilteredData(newFilter);
        setText(searchText);
  };

    const clearInput = () => {
        setFilteredData([]);
        setText("");
    }
  return (
    <div className={styles.container}>
      <input type="search" value={text} onChange={handleChange} placeholder='搜索' className={styles.input} />
      <div className={styles.icon}>
          {filteredData.length === 0 ?(
            <SearchIcon width={15} height={15} color='#8590A6' />)
          : (
              <CloseOutlined width={15} height={15} id={styles.clrButton} onClick={clearInput} />
              )
          }
      </div>

        {text.length != 0 && (
        <div className={styles.dataResult}>
            {filteredData.slice(0,7).map((value ) => {
                return (
                    <ul className={styles.dataitem} key={value.name}>
                        <li>{value.name}</li>
                    </ul>
                );
             })}
        </div>
        )}
    </div>
  );
}

export default SearchBar;



import React from 'react';
import styles from './index.module.scss';

interface PaginationProps {
  page: number;
  totalPage: number;
  total: number;
  prevPageClick: () => void;
  nextPageClick: () => void;
}

function Pagination({ page, totalPage, prevPageClick, nextPageClick }: PaginationProps) {
  return (
    <div className={styles.pageContainer}>
      {page > 1 ? (
        <div className={styles.pageItem} onClick={prevPageClick}>
          上一页
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.page}>{page}</div>
      {totalPage > page ? (
        <div className={styles.pageItem} onClick={nextPageClick}>
          下一页
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Pagination;

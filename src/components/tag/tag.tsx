import React from 'react';
import styles from './index.module.scss';

interface Props {
  title: string;
  onClick?: () => void;
}
function Tag({ title, onClick }: Props) {
  const handleClick = () => {
    console.log('click');
    onClick && onClick();
  };
  return (
    <div className={styles.tag} onClick={handleClick}>
      <div className={styles.content}>{title}</div>
      <div className={styles.rightArrow}> </div>
    </div>
  );
}

export default Tag;

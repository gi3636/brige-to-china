import React, { useEffect, useMemo } from 'react';
import useRequest from '@/hooks/useRequest';
import { getUserAction } from '@/api/user';
import styles from './index.module.scss';
import { Divider } from 'antd';
import { formatToDateTime } from '@/utils';
function UserAction({ userId }) {
  console.log('user', userId);
  const { run, loading } = useRequest();
  const [actionList, setActionList] = React.useState([] as any[]);

  useEffect(() => {
    run(getUserAction({ userId, currentPage: 1, pageSize: 10 })).then((res) => {
      if (res.code != 200) return;
      setActionList(res?.data);
    });
  }, []);

  const navigateTo = (item) => {
    if (item?.objectType == 1) {
      window.open(`/questions/${item?.question?.id}`, '_blank');
    } else if (item?.objectType == 2) {
      window.open(`/user/${item?.user?.id}`, '_blank');
    }
  };
  const convertContent = (item) => {
    // 1 是问题
    if (item?.objectType == 1) {
      return (
        <div>
          {item.actionName}了
          <span className={styles.title} onClick={navigateTo.bind(null, item)}>
            问题—{item?.question?.title}
          </span>
        </div>
      );
    } else if (item?.objectType == 2) {
      return (
        <div>
          {item.actionName}了
          <span className={styles.title} onClick={navigateTo.bind(null, item)}>
            用户-{item?.user?.nickname}
          </span>
        </div>
      );
    }
    return <div>111</div>;
  };
  const renderAction = useMemo(() => {
    console.log('actionList', actionList);
    return actionList?.map((item) => {
      return (
        <>
          <div key={item?.id} className={styles.actionItem}>
            {convertContent(item)}
            <div className={styles.date}>{formatToDateTime(item?.createdTime)}</div>
          </div>
          <Divider />
        </>
      );
    });
  }, [actionList]);

  return <div className={styles.container}>{renderAction}</div>;
}

export default UserAction;

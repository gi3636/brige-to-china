import React, { useEffect } from 'react';
import styles from './id.module.scss';
import Image from 'next/image';
import type { TabsProps } from 'antd';
import { Form, message, Modal, Tabs } from 'antd';
import { useRouter } from 'next/router';
import useRequest from '@/hooks/useRequest';
import { editUserInfo, getUserDetail } from '@/api/user';
import { GetServerSideProps } from 'next';
import { convertFileUrl } from '@/utils';
import { uploadFile } from '@/api/file';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/store/user/slice';
import ProForm from '@/components/pro-form';
import { fields } from '@/pages/user/tableData';

function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = React.useState({} as any);
  const { run, loading } = useRequest();
  const { run: runFile, loading: loadingFile } = useRequest();
  const form = Form.useForm()[0];
  const [openEditModal, setOpenEditModal] = React.useState(false);
  useEffect(() => {
    run(getUserDetail({ id })).then((res) => {
      if (res.code == 200) {
        setUserDetail(res.data);
      }
    });
  }, []);
  const handleUploadImage = (file) => {
    return new Promise((resolve, reject) => {
      //限制图片大小5M
      if (file.size > 5 * 1024 * 1024) {
        message.error('图片大小不能超过5M');
        return;
      }
      if (file) {
        let formData = new FormData();
        formData.append('file', file);
        runFile(uploadFile(formData))
          .then((res) => {
            message.success('上传成功');
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };

  const handleChangeAvatar = async (event) => {
    let file = event.target.files[0];
    let { data } = (await handleUploadImage(file)) as any;
    if (data?.path) {
      run(editUserInfo({ avatar: data?.path })).then((res) => {
        if (res.code == 200) {
          setUserDetail({ ...userDetail, avatar: data?.path });
          dispatch(updateUser({ avatar: data?.path }));
          message.success('头像更新成功');
        }
      });
    }
  };
  const handleUploadCover = async (event) => {
    let file = event.target.files[0];
    let { data } = (await handleUploadImage(file)) as any;
    if (data?.path) {
      run(editUserInfo({ cover: data?.path })).then((res) => {
        if (res.code == 200) {
          dispatch(updateUser({ cover: data?.path }));
          setUserDetail({ ...userDetail, cover: data?.path });
          message.success('封面更新成功');
        }
      });
    }
  };
  const handleOpenEditModal = () => {
    form.setFieldsValue(userDetail);
    setOpenEditModal(true);
  };

  const handleEditUserInfo = () => {
    form.validateFields().then((values) => {
      run(editUserInfo(values)).then((res) => {
        if (res.code == 200) {
          setOpenEditModal(false);
          setUserDetail({ ...userDetail, ...values });
          message.success('更新成功');
        }
      });
    });
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `动态 1`,
      children: `Content of Tab Pane 1`,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.coverBox}>
            <Image
              style={{ borderRadius: '10px 10px 0 0' }}
              src={convertFileUrl(
                userDetail.cover || 'https://thumb.photo-ac.com/56/564d7708097fcf9e3afc35d896da492d_t.jpeg',
              )}
              alt=''
              width={1200}
              height={250}
            />
            {userDetail?.id == user?.id ? (
              <div className={styles.editCoverBox}>
                <input type='file' accept='image/*' onChange={handleUploadCover} className={styles.fileInput} />
                <div className={styles.editCoverBtn}>更换封面</div>
              </div>
            ) : null}
          </div>
          <div className={styles.userDetailBox}>
            <div>
              <div className={styles.username}>{userDetail?.nickname}</div>
              <div className={styles.description}>
                <span>个人简介：</span>
                {userDetail.description || '暂无简介'}
              </div>
              {/*<div className={styles.tag}>标签</div>*/}
            </div>
            <div className={styles.follow}>关注 {userDetail?.followCount || 0}</div>
            <div className={styles.fans}>粉丝 {userDetail?.fansCount || 0}</div>
            {userDetail?.id == user?.id ? (
              <div className={styles.editBtn} onClick={handleOpenEditModal}>
                编辑个人资料
              </div>
            ) : null}
          </div>
          <div className={styles.userAvatar}>
            <Image
              style={{ borderRadius: '50%' }}
              src={convertFileUrl(userDetail.avatar)}
              alt=''
              width={180}
              height={180}
            />
            {userDetail?.id == user?.id ? (
              <div className={styles.uploadAvatar}>
                <input type='file' accept='image/*' onChange={handleChangeAvatar} className={styles.fileInput} />
                <div className={styles.uploadAvatarBtn}>更换头像</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.userActionContainer}>
          <div className={styles.userActionTab}>
            <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
          </div>
        </div>
      </div>
      <Modal
        title='编辑资料'
        confirmLoading={loading}
        open={openEditModal}
        onCancel={setOpenEditModal.bind(null, false)}
        onOk={handleEditUserInfo}>
        <ProForm fields={fields} form={form} />
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const id = params?.id;
  return {
    props: {
      id: id,
    },
  };
};

export default UserDetailPage;

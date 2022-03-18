import styled, { createGlobalStyle } from 'styled-components';
import { Button } from 'antd';
import PostCard from '../../components/PostCard';

export const AlignRightButton = styled(Button)`
  float: right;
`;

export const TabAlignCenter = createGlobalStyle`
  .ant-tabs-nav-wrap {
    margin-top: 10px;
  }
  .ant-list-bordered {
    margin-bottom: 20px;
  }
  .ant-card-meta {
    min-height: 100px;
  }
`;

export const ProfilePost = styled(PostCard)`
  margin-right: 10px;
  width: 300px;
  height: 100%;
  img {
    height: 200px;
    object-fit: cover;
  }
`;
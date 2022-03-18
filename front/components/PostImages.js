import { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

import styles from '../assets/styles/component/postImage.module.css';
const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom =useCallback(() => {
    setShowImageZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        { showImageZoom && <ImagesZoom images={images} onClose={onZoom} /> }
      </>
    )
  } else if (images.length === 2) {
    return (
      <>
        <div>
          <img role='presentation' width='50%' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
          <img role='presentation' width='50%' src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        </div>
        { showImageZoom && <ImagesZoom images={images} onClose={onZoom} /> }
      </>
    )
  }

  return (
    <>
      <img role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src}  width="50%" onClick={onZoom} />
      <div
        role='presentation'
        className={styles.presentation}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br/>
        {images.length - 1}
          개의 사진 더보기
      </div>
      { showImageZoom && <ImagesZoom images={images} onClose={onZoom} /> }
    </>
  )
};

PostImages.prototype = {
  className: PropTypes.element,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
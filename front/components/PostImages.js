import { useState, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  // 함수 호출이 ``로도 가능하기 때문에 styled component 사용방법이 저럼

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
      <div>
        <img role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src}  width="50%"  onClick={onZoom} />
        <div
          role='presentation'
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br/>
          {images.length - 1}
            개의 사진 더보기
        </div>
      </div>
      { showImageZoom && <ImagesZoom images={images} onClose={onZoom} /> }
    </>
  )
};

PostImages.prototype = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
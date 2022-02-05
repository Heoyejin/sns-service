import { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  return (
    <Overlay>
      {/* Global style 적용 */}
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}></CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick 
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {
              images.map((v) => (
                <div key={v.src}>
                  <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
                </div>
              ))
            }
          </Slick>
          <Indicator>
            <div>
              { currentSlide + 1}
              { ' ' }
              /
              { images.length }
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  )
};

ImagesZoom.proptypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
import React from 'react';
import './ImageGallery.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
    if (images.length > 0)
    
    return (
      <ul className="ImageGallery">
        {images.map((image, index) => (
          <ImageGalleryItem key={image.id + index} image={image} onClick={() => onImageClick(image)} />
        ))}
      </ul>
    );
  };  
  
export default ImageGallery;

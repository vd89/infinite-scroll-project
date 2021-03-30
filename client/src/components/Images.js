/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';

const Images = () => {
  const [images, setImages] = useState([]);
  const [count] = useState(30);
  const [start] = useState(1);

  const effect = async () => {
    const { data } = await axios.get(`/api/photos?start=${start}&count=${count}`);
    setImages(data.response.results);
  };

  useEffect(() => {
    effect();
  }, []);

  const fetchImages = () => {
    setTimeout(async () => {
      const { data } = await axios.get(`/api/photos?start=${start + count}&count=${count}`);
      setImages(images.concat(data.response.results));
    }, 1500);
  };
  return (
    <div className='images'>
      <InfiniteScroll dataLength={images.length} next={fetchImages} hasMore={true} loader={<h4>Loading....</h4>}>
        {images.map((image) => (
          <Image key={image.id} image={image} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Images;

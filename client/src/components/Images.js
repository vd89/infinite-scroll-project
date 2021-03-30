import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from './Image';

const Images = () => {
  const [images, setImages] = useState([]);
  const [count, setCount] = useState(30);
  const [start, setStart] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const effect = async () => {
    const { data } = await axios.get(`/api/photos?start=${start}&count=${count}`);
    console.log(data);
    setImages(data.response.results);
  };
  console.log(images);

  useEffect(() => {
    effect();
  }, []);

  const fetchImages = () => {
    setTimeout(async () => {
      const { data } = await axios.get(`/api/photos?start=${start + count}&count=${count}`);
      console.log(data.response.results);
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

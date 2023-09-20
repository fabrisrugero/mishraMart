"use client"

import Image from 'next/image';
import SimpleImageSlider from "react-simple-image-slider";

const images = [
    { url: "/sliderImg1.jpg" },
    { url: "/sliderImg2.jpg" },
    { url: "/sliderImg3.jpg" },
    { url: "/sliderImg4.jpg" },
]

const ImageSlider = () => {
    return (
        <div className=''>
            <SimpleImageSlider
                width={'100%'}
                height={'100%'}
                images={images}
                showBullets={true}
                showNavs={false}
                loop={true}
                autoPlay={true}
                autoPlayDelay={4}
                slideDuration={1}
            />
        </div>
    )
}

export default ImageSlider
import React from 'react';
import { Swiper, SwiperSlide, } from "swiper/react";
import styles from './arrow.module.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import ViewStoryModal from '../../../components/Modal/ViewStoryModal/ViewStoryModal';

const StoryContainer = ({ story }) => {
    console.log(story.img);
    return (
        <div className='w-full mx-auto h-36 flex gap-2 justify-center' >
            {/* {
                (story && Array.isArray(story) && story.length > 0) &&
                story.map((data, _idx) => (
                    <div key={_idx} className='rounded-lg mt-10'>
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination]}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 2</SwiperSlide>
                            <SwiperSlide>Slide 3</SwiperSlide>
                            <SwiperSlide>Slide 4</SwiperSlide>
                            ...
                        </Swiper>
                    </div>
                ))
            } */}
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination]}
                slidesPerView={5}
                spaceBetween={50}
                navigation
                scrollbar={{ draggable: true }}
            >
                {
                    story && Array.isArray(story) && story.length > 0 &&
                    story.map((data, _idx) => (
                        <div key={_idx}>
                            <SwiperSlide><ViewStoryModal image = {data.img}/></SwiperSlide>
                        </div>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default StoryContainer;


//   <div className='w-full rounded-[20px] '>
//                         <Swiper
//                             slidesPerView={1}
//                             spaceBetween={5}
//                             loop={true}
//                             navigation={{ prevEl: `.${styles['swiper1-button-prev']}`, nextEl: `.${styles['swiper1-button-next']}` }}
//                             autoplay={{
//                                 delay: 1500,
//                                 disableOnInteraction: false,
//                             }}

//                             breakpoints={{
//                                 320: {
//                                     slidesPerView: 2,
//                                     spaceBetween: 5,
//                                 },
//                                 375: {
//                                     slidesPerView: 3,
//                                     spaceBetween: 5,
//                                 },
//                                 500: {
//                                     slidesPerView: 3,
//                                     spaceBetween: 5,
//                                 },
//                                 600: {
//                                     slidesPerView: 4,
//                                     spaceBetween: 5,
//                                 },
//                                 768: {
//                                     slidesPerView: 6,
//                                     spaceBetween: 5,
//                                 },
//                                 900: {
//                                     slidesPerView: 7,
//                                     spaceBetween: 5,
//                                 },
//                                 1120: {
//                                     slidesPerView: 8,
//                                     spaceBetween: 3,
//                                 },
//                                 1270: {
//                                     slidesPerView: 8,
//                                     spaceBetween: 3,
//                                 },
//                                 1320: {
//                                     slidesPerView: 8,
//                                     spaceBetween: 3,
//                                 },
//                                 1400: {
//                                     slidesPerView: 10,
//                                     spaceBetween: 3,
//                                 },
//                                 1600: {
//                                     slidesPerView: 12,
//                                     spaceBetween: 3,
//                                 },
//                             }}
//                             className="mySwiper w-full "


//                         >


//                             {
//                                 story.map((data, _idx) => (<SwiperSlide
//                                     key={_idx}>
//                                     <div className='w-64 h-36'>

//                                         <img src={data?.img} alt=""  className='w-full h-full object-contain'/>
//                                     </div>
//                                 </SwiperSlide>)
//                                 )}

//                         </Swiper>
//                     </div>

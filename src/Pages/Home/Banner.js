import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Banner = () => {

    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/banner');
            const data = await res.json();
            return data;
        }
    });

    console.log(banners)

    return (
        <div className="carousel w-full">
            {
                banners.map((banner, index) => (
                    <div id={`slide${banner._id}`} className="carousel-item relative w-full" key={banner.id}>
                        {/* <img src={banner.img} className="w-full" /> */}
                        <div className='carousel-img'>
                            <img src={banner.img} alt="" className="w-full rounded-xl" />
                        </div>

                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${banner._id}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${banner._id}`} className="btn btn-circle">❯</a>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Banner;
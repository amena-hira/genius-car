import React from 'react';

const BannerItem = ({slide}) => {
    const {id, image, prev, next} = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={image} className='w-full rounded-lg' alt="" />
                </div>
                
                <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                    <h1 className='text-6xl font-bold text-white'>
                        Affordable <br />
                        price for car <br />
                        servicing
                    </h1>
                </div>
                <div className="absolute w-3/5 flex justify-end transform -translate-y-1/2 left-24 top-1/2">
                    <p className='text-xl font-bold text-white'>
                    There are many variations of passages of  available, but the majority have suffered alteration in some form
                    </p>
                </div>
                <div className="absolute w-3/5 flex transform -translate-y-1/2 left-24 top-2/3">
                    <button className="btn btn-warning mr-5">Warning</button>
                    <button className="btn btn-outline btn-warning">Warning</button>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a> 
                    <a href={`#slide${next}`} className="btn btn-circle">❯</a>
                </div>
                
            </div> 
    );
};

export default BannerItem;
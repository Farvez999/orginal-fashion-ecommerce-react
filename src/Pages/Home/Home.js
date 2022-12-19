import React from 'react';
import Banner from './Banner';
import Category from './Category/Category';

const Home = () => {
    return (
        <div className='p-2'>
            <Banner></Banner>
            <Category></Category>
        </div>
    );
};

export default Home;
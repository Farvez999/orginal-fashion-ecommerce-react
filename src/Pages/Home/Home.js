import React from 'react';
import Banner from './Banner';
import Category from './Category/Category';
import Product from './Products/Product';

const Home = () => {
    return (
        <div className='p-2'>
            <Banner></Banner>
            <Category></Category>
            <Product></Product>
        </div>
    );
};

export default Home;
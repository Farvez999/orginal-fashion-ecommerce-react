import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from './ProductsCard';

const Product = () => {

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://used-products-resale-server-vert.vercel.app/advertise`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    // console.log(advertise)

    return (
        <section className='mt-12'>
            <div>
                <div>
                    <h4 className='text-center text-base text-4xl text-primary'>Advertise</h4>
                    <h4 className='text-4xl text-center text-base text-black'>Advertise Products</h4>
                </div>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products?.map(product => <ProductsCard
                        key={product._id}
                        product={product}
                    ></ProductsCard>)
                }
            </div>
        </section>
    );
};

export default Product;
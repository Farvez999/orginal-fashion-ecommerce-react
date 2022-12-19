import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoriesCard from './CategoriesCard';

const Category = () => {

    const { data: categories = [], refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category');
            const data = await res.json();
            return data;
        }
    });

    console.log(categories)

    return (
        <div className='mt-24'>
            <div>
                <h4 className='text-center text-base text-4xl text-primary'>Categories</h4>
                <h4 className='text-4xl text-center text-base text-black'>Categories We Provide</h4>
            </div>
            <div className='grid mt-4 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {
                    categories.map(categorie => <CategoriesCard
                        key={categorie._id}
                        categorie={categorie}
                    ></CategoriesCard>)
                }
            </div>
        </div>
    );
};

export default Category;
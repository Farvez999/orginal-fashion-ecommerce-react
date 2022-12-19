import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const MyBanner = () => {

    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/banner');
            const data = await res.json();
            return data;
        }
    });

    console.log(banners)

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful.')
                    refetch();
                }
            })
    }

    return (
        <div className='p-2'>
            <h2 className="text-4xl font-bold text-center my-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Heading</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            banners.map((banner, i) => <tr key={banner._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-16 rounded">
                                            <img src={banner.img} alt="Tailwind-CSS-Avatar-component" />
                                        </div>
                                    </div></td>
                                <td>{banner.bannerTitle}</td>
                                <td>{banner.bannerHeading}</td>
                                <td><button className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBanner;
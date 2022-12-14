import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyProduct = () => {

    const { user } = useContext(AuthContext)
    console.log(user)
    const [isloader, setIsloader] = useState(false)

    const navigate = useNavigate()

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/products/${user.email}`, {
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



    const handleDelete = product => {
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${product.title} deleted successfully`)
                }
            })
    }


    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='p-2'>
            <h3 className="text-3xl mb-5 text-center">My Product : {products?.length}</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Discount Price</th>
                            <th>Product Status</th>
                            {/* <th>Advertise Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={product.img} alt="" />
                                    </div>
                                </div></td>
                                <td>{product.title}</td>
                                <td>{product.discountPrice}</td>
                                {
                                    product.paid ? <td className='text-red-600'>{'sold'}</td> : <td className='text-green-600'>{'aviable'}</td>
                                }
                                {/* {

                                    product.paid ? <td className='text-red-600'>{'sold'}</td> :
                                        product.advertise ?
                                            <td><button className="btn btn-outline btn-error btn-xs" onClick={() => removeAdvertise(product._id)}>remove advertise</button></td>

                                            :

                                            <td><button className="btn  btn-primary btn-xs" onClick={() => addAdvertise(product._id)}>add advertise</button></td>

                                } */}
                                <td>
                                    <label onClick={() => handleDelete(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* {
                deletingDoctor && <ConfirmastionModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                >
                </ConfirmastionModal>
            } */}
        </div>
    );
};

export default MyProduct;
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddCategory = () => {

    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loader, setLoader] = useState(false)
    const [isloader, setIsloader] = useState(false)
    const [author, setAuthor] = useState({});
    const email = user?.email;

    const navigate = useNavigate()

    const onSubmit = (data) => {
        setIsloader(true)
        const imageHostKey = process.env.REACT_APP_IMAGE_BB_KEY;


        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=38006c4afdc7abba01808128c4346be2`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const category = {
                        img: imgData.data.url,
                        categoryTitle: data.categoryTitle,
                        author: author,
                    }

                    fetch(`http://localhost:5000/addCategory`, {
                        method: 'POST',
                        headers: {

                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(category)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                console.log(data);
                                setIsloader(false)
                                toast.success('Your Category Added Successfully')
                                navigate('/dashboard')
                            }
                        })
                        .catch(error => { toast.error(error.message); setIsloader(false) })
                }
            });


    }
    if (loader) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="card-body p-2">
                <h1 className='text-4xl font-bold text-center my-4'>Add A Category</h1>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category Name</span>
                        </label>
                        <input type="text" placeholder="Category Name" {...register("categoryTitle", {
                            required: "Name is required"

                        })} className="input input-bordered" />
                    </div>


                    <div className="form-control mt-5">
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Select category image</label>
                        <input className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                            type="file"
                            {...register("img", {
                                required: "img is required",
                            })}
                            id="formFile" />

                    </div>


                    <div className="form-control mt-6">
                        <button type='submit' className={isloader ? 'btn btn-neutral loading' : 'btn btn-neutral'}>
                            {isloader ? 'Loading' : 'Add Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
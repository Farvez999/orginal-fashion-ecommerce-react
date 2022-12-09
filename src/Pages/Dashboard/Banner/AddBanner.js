import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddBanner = () => {

    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loader, setLoader] = useState(false)
    const [isloader, setIsloader] = useState(false)
    const [author, setAuthor] = useState({});
    const email = user?.email;

    const navigate = useNavigate()


    useEffect(() => {
        setLoader(true)
        fetch(`http://localhost:5000/users/${email}`)
            .then(res => res.json())
            .then(data => { return (setAuthor(data), setLoader(false)) })
    }, [email])

    console.log(author)


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

                    const banner = {
                        img: imgData.data.url,
                        bannerTitle: data.bannerTitle,
                        bannerHeading: data.bannerHeading,
                        bannerDescription: data.bannerDescription,
                        author: author,
                    }

                    fetch(`http://localhost:5000/addBanner`, {
                        method: 'POST',
                        headers: {

                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(banner)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                console.log(data);
                                setIsloader(false)
                                toast.success('Your Banner Added Successfully')
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
                <h1 className='text-4xl font-bold text-center my-4'>Add A Banner</h1>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Banner Name</span>
                        </label>
                        <input type="text" placeholder="Product Name" {...register("bannerTitle", {
                            required: "Name is required"

                        })} className="input input-bordered" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Banner Heading</span>
                        </label>
                        <input type="text" placeholder="Banner Heading" {...register("bannerHeading", {
                            required: "Banner Heading is required"

                        })} className="input input-bordered" />
                    </div>


                    <div className="form-control mt-5">
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">select Product image</label>
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

                    <div className="form-control mt-5">
                        <label className="label">
                            <span className="label-text inline-block mb-2 text-gray-700">Banner Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered h-24" {...register("bannerDescription")} placeholder="Banner Description..."></textarea>
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

export default AddBanner;
import React from 'react';

const ProductsCard = ({ product }) => {

    const { _id, description, discountPrice, img, originalPrice, title } = product;
    console.log(product);
    return (
        <section>

            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img className='h-60' src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>

                    <hr></hr>
                    <div className='flex justify-between'>
                        <p className='font-bold text-blue-700'>Resale Price : ${discountPrice}</p>
                        <p className=' text-red-600'>Orginal Price : ${originalPrice}</p>
                    </div>

                    <div className="card-actions justify-end">
                        <label
                            // onClick={handleWishlist}
                            htmlFor="booking-modal"
                            className="btn btn-secondary"
                        >WishList</label>
                        <label
                            // onClick={() => setModelProduct(product)}
                            htmlFor="booking-modal"
                            className="btn btn-primary"
                        >Book Now</label>
                    </div>

                </div>
            </div>
            {/* {
                modelProduct &&
                <BookingModal
                    modelProduct={modelProduct}
                    setModelProduct={setModelProduct}
                ></BookingModal>
            } */}
        </section>
    );
};

export default ProductsCard;
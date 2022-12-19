import React from 'react';

const CategoriesCard = ({ categorie }) => {
    const { _id, img, categoryTitle } = categorie;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-2 pt-2">
                <img src={img} alt="img" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{categoryTitle}</h2>
            </div>
        </div>
    );
};

export default CategoriesCard;
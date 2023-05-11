/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const { _id, title, img, price } = service;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{title}</h2>
        <p className="font-bold text-orange-500">Price: ${price}</p>
      </div>
      <div className="card-actions mx-auto -mt-5 p-3">
        <Link to={`/book/${_id}`}><button className="btn btn-primary">Book Now</button></Link>
      </div>
    </div>
  );
};

export default ServiceCard;

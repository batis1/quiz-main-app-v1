import React, { useState } from "react";
import Tutor_card from "./Tutor_card.js";
import "./Tutor.css";
import ImgCart from "./imagesTest/profile-picture.jpg";
import { Input } from "antd";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
// import { ThumbDown } from "@mui/icons-material";

const Tutor = () => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(Tutor_card);
  const listItems = Tutor_card.map((item) => (
    <div className="card-tutor" key={item.id}>
      <div className="card_img">
        <img src={ImgCart} />
      </div>
      <div className="card-tutor_header">
        <h2 className="card-tutor_header-h2">{item.product_name}</h2>
        <p className="card-tutor_header-p">{item.description}</p>
        <p className="price">
          {item.price}
          <span className="card-tutor_header-span">{item.currency}</span>
        </p>
        <div>{/* <ThumbDown /> */}</div>
        <div className="btn-cart-tutor">View Details</div>
      </div>
    </div>
  ));
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="tutor-container">
      <div className="tutor-link">
        <Link to="/becomeTutor">
          <span>Do you want to become a tutor?</span>
        </Link>
      </div>

      <Input className="form-input" placeholder="search for tutor by name..." />
      <div className="tutor-main_content">
        {/* <h3>Headphones</h3> */}
        {listItems}
        <h1 className="loading-h1" style={{ paddingLeft: "50%" }}>
          loading..
        </h1>
      </div>
    </div>
  );
};
export default Tutor;

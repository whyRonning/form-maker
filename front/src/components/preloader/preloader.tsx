import React from "react";
import preloader from "../../accets/img/preloader.webp";
export let Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloader} alt="preloader" />
    </div>
  );
};

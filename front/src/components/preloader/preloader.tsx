import React from "react";

type props = {
  isPreloaderVision: boolean;
  preloader: string;
};
export let Preloader = (props: props) => {
  return (
    <div className={props.isPreloaderVision ? "preloader" : "preloader hidden"}>
      <img src={props.preloader} alt="" />
    </div>
  );
};

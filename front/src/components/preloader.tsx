import React from "react";

type props = {
    isPreloaderVision: boolean,
    preloader: string
}
export let Preloader:React.FC<props> = React.memo((props) => {
    return (
        <div className={props.isPreloaderVision ? "preloader" : "preloader hidden"}>
            <img src={props.preloader} alt=""/>
        </div>
    );
});

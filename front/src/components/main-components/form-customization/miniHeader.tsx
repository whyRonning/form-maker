import React from "react";
type props={
    stateOfHeader:number,
    stateOfHeaderAC:(num:number)=>void,
    isAuth:boolean
}
export let MiniHeader = (props:props) => {
  return (
    <div className="mini-header">
      <div
        className={
          props.stateOfHeader === 1
            ? "slider-1 slider"
            : props.stateOfHeader === 2
            ? "slider-2 slider"
            : "slider-3 slider"
        }
      />
      <div>
        <p onClick={ ()=>props.stateOfHeaderAC(1)}>
          Шаблоны
        </p>
        <div />
      </div>
      <div>
        <p onClick={()=>props.stateOfHeaderAC(2)}>
          Настройки
        </p>
        <div />
      </div>
      <div style={{ backgroundColor: props.isAuth ? "" : "#c2c1c0" }}>
        <button
          disabled={!props.isAuth}
          onClick={()=>props.stateOfHeaderAC(3)}
          style={{ cursor: props.isAuth ? "pointer" : "not-allowed" }}
        >
          Пользовательские <br /> шаблоны
        </button>
      </div>
    </div>
  );
};

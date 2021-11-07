import React from "react";
export let MiniHeader = React.memo((props) => {
  let handler = (e) => {
    props.stateOfHeaderAC(e.target.getAttribute("name"));
  };
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
        <p name="1" onClick={handler}>
          Шаблоны
        </p>
        <div />
      </div>
      <div>
        <p name="2" onClick={handler}>
          Настройки
        </p>
        <div />
      </div>
      <div style={{ backgroundColor: props.isAuth ? "" : "#c2c1c0" }}>
        <button
          name="3"
          disabled={props.isAuth ? false : true}
          onClick={handler}
          style={{ cursor: props.isAuth ? "pointer" : "not-allowed" }}
        >
          Пользовательские <br /> шаблоны
        </button>
      </div>
    </div>
  );
});

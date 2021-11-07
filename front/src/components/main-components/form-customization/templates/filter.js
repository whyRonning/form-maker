import React from "react";
export let Filter = React.memo((props) => {
  let options = [
    "Форма обратной связи",
    "Подписка на рассылку",
    "Заказ звонка",
    "Оформление заказа"
  ];
  let optionsWrapper = options.map((e, i) => {
    return (
      <div key={i}>
        <input type={"checkbox"} onClick={props.handler} id={e} name={e} />
        <label htmlFor={e}>{e}</label>
      </div>
    );
  });
  return (
    <div className="filter">
      <div onClick={props.VisionFilter}>Фильтр</div>
      <div
        className={
          !props.isFilterVision ? "filterBoxes hidden " : "filterBoxes shown "
        }
      >
        {optionsWrapper}
      </div>
    </div>
  );
});

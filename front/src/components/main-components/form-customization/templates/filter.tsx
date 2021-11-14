import React from "react";
type propsType= {
    FiltersAC: (name: string) => void,
    VisionFilter:()=>void,
    isFilterVision:boolean,
}

export let Filter = React.memo((props:propsType) => {
  let options = [
    "Форма обратной связи",
    "Подписка на рассылку",
    "Заказ звонка",
    "Оформление заказа"
  ];
  let optionsWrapper = options.map((e, i) => {
    return (
      <div key={i}>
        <input type={"checkbox"} onClick={()=>props.FiltersAC(e)} id={e} name={e} />
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

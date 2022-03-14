import React from "react";
type propsType = {
  FiltersAC: (name: string) => void;
  VisionFilter: () => void;
  isFilterVision: boolean;
};

export const Filter = React.memo((props: propsType) => {
  const options = [
    "Форма обратной связи",
    "Подписка на рассылку",
    "Заказ звонка",
    "Оформление заказа",
  ];
  const optionsWrapper = options.map((e, i) => {
    return (
      <div key={i}>
        <input
          type={"checkbox"}
          onClick={() => props.FiltersAC(e)}
          id={e}
          name={e}
        />
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

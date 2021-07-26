import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDa } from "./hooks";
export let SeeingFields = React.memo((props) => {
  let changeInputIndex = () => {
    props.changeInput(props.index);
  };

  let { st, setSt } = useDa(props.index);
  useEffect(() => {
    setSt({ [props.index]: true });
  }, [props.index, setSt]);
  let DeleteField = async () => {
    setSt({ [props.index]: !st[props.index] });
    await setTimeout(() => {
      props.ChangeDeleteFieldAC(props.index);
    }, 100);
  };

  return (
    <div
      className={
        st[props.index] ? "ItemsOfInputs shown" : "ItemsOfInputs hidden"
      }
    >
      <div>
        <p>{props.inputs.name}</p>
      </div>

      <div className="IconsOfInputs">
        <FontAwesomeIcon onClick={DeleteField} icon="times"></FontAwesomeIcon>
      </div>

      <div className="IconsOfInputs">
        <FontAwesomeIcon
          onClick={changeInputIndex}
          icon="cogs"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
});

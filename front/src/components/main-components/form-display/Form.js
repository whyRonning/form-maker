import React from "react";
import {FormInput} from "../FormInput";
import {HtmlCreatorBlock} from "../get-code/HtmlCreatorBlock";

export let Form = React.memo((props) => {
    let sub = (e) => {
        e.preventDefault();
    };
    if (props.inputs) {
        let inputsKeys = Object.keys(props.inputs);
        let InputsCreator = inputsKeys.map((e, i) => {
            return (<FormInput key={i} labelsPosition={props.labelsPosition} i={i} numOfFields={props.numOfFields}
                               type={props.inputs[inputsKeys[i]].type || "text"}
                               name={props.inputs[inputsKeys[i]].name || ""}
                               placeholder={props.inputs[inputsKeys[i]].placeholder || ""}
                               fieldDescription={props.inputs[inputsKeys[i]].fieldDescription || ""}
                               descriptionPosition={props.inputs[inputsKeys[i]].descriptionPosition || ""}
                               width={props.inputs[inputsKeys[i]].width || 20}
                               height={props.inputs[inputsKeys[i]].height || 5}
                               descriptionColor={props.descriptionColor}/>);
        });
        return (
            <>
                <div className="formBlock" style={{backgroundColor: props.generalBackgroundColor}}>
                    <form onSubmit={sub} className="form" style={{
                        color: props.textColor,
                        backgroundColor: props.formBackgroundColor,
                        width: props.formWidth + "%",
                        marginTop: props.formMarginTop + "vh"
                    }}>
                        <h1 className="FormTitle" style={{color: props.titleColor}}>{props.title || "Заголовок"}</h1>
                        <div className="wrapperOfInputsCreator"
                             style={{gridTemplateColumns: props.labelsPosition === "left" || props.numOfFields === 1 ? "1fr" : "1fr 1fr"}}>{InputsCreator}</div>
                        <button type="submit" onMouseOver={props.changeStyles} onMouseLeave={props.revertStyles}
                                style={{
                                    height: props.buttHeight + "vh",
                                    width: props.buttWidth + "vw",
                                    color: props.buttTextColor,
                                    backgroundColor: props.buttColor
                                }}>
                            Отправить
                        </button>
                    </form>
                </div>
                <HtmlCreatorBlock generalBackgroundColor={props.generalBackgroundColor}
                                  formBackgroundColor={props.formBackgroundColor} titleColor={props.titleColor}
                                  descriptionColor={props.descriptionColor}
                                  textColor={props.textColor} buttColor={props.buttColor}
                                  buttTextColor={props.buttTextColor} formMarginTop={props.formMarginTop}
                                  formWidth={props.formWidth} buttHeight={props.buttHeight}
                                  buttWidth={props.buttWidth} numOfFields={props.numOfFields} title={props.title}
                                  labelsPosition={props.labelsPosition} inputs={props.inputs}
                                  stateOfForm={props.stateOfForm} changeState={props.changeState}/>
            </>
        );
    } else {
        return (
            <>
                <form action="" method="post"/>
            </>
        );
    }
});

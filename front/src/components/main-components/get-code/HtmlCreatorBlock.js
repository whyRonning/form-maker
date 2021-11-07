import React from "react";
import {HtmlCreator} from "./HtmlCreator";

export let HtmlCreatorBlock=(props)=>(
    <div className={props.stateOfForm ? "CodeBlock hidden" : "CodeBlock shown"}>
        <div className="Code">
            <p className="cancel" onClick={props.changeState}>×</p>
            <p style={{whiteSpace: "pre-line"}}>
                <HtmlCreator generalBackgroundColor={props.generalBackgroundColor}
                             formBackgroundColor={props.formBackgroundColor} titleColor={props.titleColor}
                             descriptionColor={props.descriptionColor}
                             textColor={props.textColor} buttColor={props.buttColor}
                             buttTextColor={props.buttTextColor} formMarginTop={props.formMarginTop}
                             formWidth={props.formWidth} buttHeight={props.buttHeight}
                             buttWidth={props.buttWidth} numOfFields={props.numOfFields} title={props.title}
                             labelsPosition={props.labelsPosition} inputs={props.inputs}/>
            </p>
        </div>
        <div onClick={props.changeState} className="modal"/>
    </div>
)
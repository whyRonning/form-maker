import React from "react";
import {FormContainer} from "./main-components/form-display/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MiniHeaderSwitchContainer} from "./main-components/form-customization/MiniHeaderSwitchContainer";

type props = {
    isFillingVision: boolean,
    generalBackgroundColor: string,
    ChangeFillingVisionAC: () => void
}
export const Main = (props:props) => {
        return (
            <>
                <div onClick={props.ChangeFillingVisionAC}
                     className={props.isFillingVision ? "icon-angles-shown" : "icon-angles-hidden"}>
                    <FontAwesomeIcon className="icon-left"
                                     icon={props.isFillingVision ? "angle-double-right" : "angle-double-left"} size="lg"/>
                </div>
                <div className="output-closed-body" style={{backgroundColor: props.generalBackgroundColor}}>
                    <div className={props.isFillingVision ? "output-closed-s" : "output-opened-ss"}>
                        <FormContainer/>
                    </div>
                </div>
                <div className={props.isFillingVision ? "input-closed-sss" : "input-opened-ssss"}>
                    <MiniHeaderSwitchContainer/>
                </div>
            </>
        );
    };

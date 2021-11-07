import {connect} from "react-redux";
import {Preloader} from "./preloader";
import {GlobalState} from "../../store/store";
import preloader from "../../accets/img/preloader.webp";

type MapStateToPropsType = {
    isPreloaderVision: boolean,
    preloader: string
}
let MapStateToProps = (state: GlobalState): MapStateToPropsType => {
    return {
        isPreloaderVision: state.authReducer.isPreloaderVision,
        preloader: preloader
    };
};
export let PreloaderContainer = connect(MapStateToProps)(Preloader);

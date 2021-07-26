import rerender from "react-test-renderer"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import store from "./store/store";
import {AppContainer} from "./AppContainer";
it("check App",()=>{
    let tree=rerender.create(<button>Отправить</button>).toJSON()
    expect(tree).toMatchSnapshot()
})
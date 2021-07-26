type dataType={
  stateOfHeader:number
}
let data:dataType = {
  stateOfHeader: 1
};
export let menuReducer = (state = data, action:any) => {
  switch (action.type) {
    case "stateOfHeader": {
      return { ...state, stateOfHeader: Number(action.stateOfHeader) };
    }
    default: {
      return { ...state };
    }
  }
};
type stateOfHeaderACType={
  type:string,
  stateOfHeader:number
}
export let stateOfHeaderAC = (stateOfHeader:number):stateOfHeaderACType => ({
  type: "stateOfHeader",
  stateOfHeader
});

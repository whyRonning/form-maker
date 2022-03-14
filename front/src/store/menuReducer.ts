type dataType = {
  stateOfHeader: number;
};
export const data: dataType = {
  stateOfHeader: 1,
};
export const menuReducer = (
  state = data,
  action: ReturnType<typeof stateOfHeaderAC>
) => {
  switch (action.type) {
    case "stateOfHeader": {
      return { ...state, stateOfHeader: Number(action.stateOfHeader) };
    }
    default: {
      return { ...state };
    }
  }
};
type stateOfHeaderACType = {
  type: string;
  stateOfHeader: number;
};
export const stateOfHeaderAC = (stateOfHeader: number): stateOfHeaderACType => ({
  type: "stateOfHeader",
  stateOfHeader,
});

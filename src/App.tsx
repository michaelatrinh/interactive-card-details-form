import React, { useEffect, useReducer } from "react";
import "./styles/App.scss";
import BgMobile from "./images/bg-main-mobile.png";

import Form from "./components/form";
import { invalidMsgs } from "./components/form";
import Cards from "./components/cards";
import { CardProps } from "./components/cards";

const initialState: CardProps = {
  name: "",
  number: "0000 0000 0000 0000",
  eMM: 0,
  eYY: 0,
  cvc: 0,
};

export const mutatedState = {
  newState: initialState,
};

const ACTIONS = {
  CHANGE_NAME: "updateName",
  CHANGE_NUMBER: "updateNumber",
  CHANGE_MM: "updateMM",
  CHANGE_YY: "updateYY",
  CHANGE_CVC: "updateCVC",
};

function reducer(state: string | number, action: any) {
  switch (action.type) {
    case "updateName":
      return (mutatedState.newState.name = action.payload.name);
    case "updateNumber":
      if (isNaN(action.payload.number))
        invalidMsgs.invalidNumber = "Wrong format, numbers only";
      if (!isNaN(action.payload.number)) {
        invalidMsgs.invalidNumber = "";
        return (mutatedState.newState.number = action.payload.number);
      }
      break;
    case "updateMM":
      if (isNaN(action.payload.eMM) || action.payload.eMM > 12)
        invalidMsgs.invalidExpiry = "Invalid month";
      if (!isNaN(action.payload.eMM) && action.payload.eMM < 13) {
        invalidMsgs.invalidExpiry = "";
        return (mutatedState.newState.eMM = action.payload.eMM);
      }
      break;
    case "updateYY":
      if (isNaN(action.payload.eYY) || action.payload.eYY < 22)
        invalidMsgs.invalidExpiry = "Invalid year";
      if (!isNaN(action.payload.eYY) && action.payload.eYY > 21) {
        invalidMsgs.invalidExpiry = "";
        return (mutatedState.newState.eYY = action.payload.eYY);
      }
      break;
    case "updateCVC":
      return (mutatedState.newState.cvc = action.payload.cvc);
    default:
      return state;
  }
}

function handleSubmit() {
  return null;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {}, [state]);

  return (
    <>
      <img
        src={BgMobile}
        alt="bg"
        style={{
          position: "absolute",
          zIndex: -1,
        }}
      />

      <Cards />

      <Form
        handleSubmit={handleSubmit}
        onChangeName={(e) =>
          dispatch({
            type: ACTIONS.CHANGE_NAME,
            payload: { name: e.target.value },
          })
        }
        onChangeNumber={(e) =>
          dispatch({
            type: ACTIONS.CHANGE_NUMBER,
            payload: { number: e.target.value },
          })
        }
        onChangeMM={(e) =>
          dispatch({
            type: ACTIONS.CHANGE_MM,
            payload: { eMM: e.target.value },
          })
        }
        onChangeYY={(e) =>
          dispatch({
            type: ACTIONS.CHANGE_YY,
            payload: { eYY: e.target.value },
          })
        }
        onChangeCVC={(e) =>
          dispatch({
            type: ACTIONS.CHANGE_CVC,
            payload: { cvc: e.target.value },
          })
        }
      />
    </>
  );
}

export default App;

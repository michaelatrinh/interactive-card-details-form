import React, { useReducer } from "react";
import "./App.scss";
import BgMobile from "./images/bg-main-mobile.png";

type CardInfo = {
  name: string;
  number: number;
  eMM: number;
  eYY: number;
  cvc: number;
};

const initialState: CardInfo = {
  name: "",
  number: 0,
  eMM: 0,
  eYY: 0,
  cvc: 0,
};

const mutatedState = {
  newState: initialState,
};

const invalidMsgs = {
  invalidName: "",
  invalidNumber: "",
  invalidExpiry: "",
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

  return (
    <>
      <img src={BgMobile} alt="bg" />
      <form onSubmit={handleSubmit} className="formWrapper">
        <label className="inputLayout">
          <span>CARDHOLDER NAME</span>
          <input
            type="text"
            placeholder="e.g. Jane Appleseed"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_NAME,
                payload: { name: e.target.value },
              })
            }
          />
        </label>

        <label className="inputLayout">
          <span>CARD NUMBER</span>
          <input
            type="text"
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength={16}
            pattern="\d*"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.CHANGE_NUMBER,
                payload: { number: e.target.value },
              })
            }
          />
          <span>{invalidMsgs.invalidNumber} &nbsp;</span>
        </label>

        <div className="bottomInputLayout">
          <label className="bottomInputLayout-exp">
            <span>EXP. DATE {"(MM/YY)"}</span>
            <div className="bottomInputLayout-exp-inputs">
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                pattern="^[0][1-9]$|^[1][0-2]$"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.CHANGE_MM,
                    payload: { eMM: e.target.value },
                  })
                }
              />
              <input
                type="text"
                placeholder="YY"
                maxLength={2}
                pattern="^[2-9][2-9]$|^[3-9][0-9]$"
                onChange={(e) =>
                  dispatch({
                    type: ACTIONS.CHANGE_YY,
                    payload: { eYY: e.target.value },
                  })
                }
              />
            </div>
            <span>{invalidMsgs.invalidExpiry} &nbsp;</span>
          </label>

          <label className="bottomInputLayout-cvc">
            <span>CVC</span>
            <input
              type="text"
              placeholder="e.g. 123"
              maxLength={3}
              pattern="\d*"
              onChange={(e) =>
                dispatch({
                  type: ACTIONS.CHANGE_CVC,
                  payload: { cvc: e.target.value },
                })
              }
            />
          </label>
        </div>

        <input type="submit" className="confirmBtn" value="Confirm" />
      </form>
    </>
  );
}

export default App;

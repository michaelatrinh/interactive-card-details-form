import React, { useEffect, useReducer, useState } from "react";
import "./styles/App.scss";
import BgMobile from "./images/bg-main-mobile.png";
import BgDesktop from "./images/bg-main-desktop.png";

import Form from "./components/form";
import { invalidMsgs } from "./components/form";
import Cards from "./components/cards";
import { CardProps } from "./components/cards";
import ThankYou from "./components/thankYou";

const initialState: CardProps = {
  name: "JANE APPLESEED",
  number: "0000 0000 0000 0000",
  eMM: "00",
  eYY: "00",
  cvc: "000"
};

export const mutatedState = {
  newState: initialState
};

const ACTIONS = {
  CHANGE_NAME: "updateName",
  CHANGE_NUMBER: "updateNumber",
  CHANGE_MM: "updateMM",
  CHANGE_YY: "updateYY",
  CHANGE_CVC: "updateCVC"
};

function reducer(state: string | number, action: any) {
  switch (action.type) {
    case "updateName":
      let uppercaseName = action.payload.name.toUpperCase();
      return (mutatedState.newState.name = uppercaseName);
    case "updateNumber":
      if (isNaN(action.payload.number))
        invalidMsgs.invalidNumber = "Wrong format, numbers only";
      if (!isNaN(action.payload.number)) {
        invalidMsgs.invalidNumber = "";

        let v: string = action.payload.number
          .replace(/\s+/g, "")
          .replace(/[^0-9]/gi, "");
        let matches: RegExpMatchArray | null = v.match(/\d{1,16}/g);
        let match: string = (matches && matches[0]) || "";
        let parts: string[] = [];

        for (let i: number = 0, len = match.length; i < len; i += 4) {
          parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
          return (mutatedState.newState.number = parts.join(" "));
        } else {
          return state;
        }
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setConfirmed(true);
  }

  useEffect(() => {
    if (window.innerWidth === 1440) setIsDesktop(true);
  }, []);

  return (
    <React.Fragment>
      {isDesktop ? (
        <img
          src={BgDesktop}
          alt="bg"
          style={{
            position: "absolute",
            left: 0,
            zIndex: -1
          }}
        />
      ) : (
        <img
          src={BgMobile}
          alt="bg"
          style={{
            position: "absolute",
            zIndex: -1
          }}
        />
      )}

      <Cards />

      {confirmed ? (
        <ThankYou handleBtnClick={() => window.location.reload()} />
      ) : (
        <Form
          handleSubmit={(e) => handleSubmit(e)}
          onChangeName={(e) =>
            dispatch({
              type: ACTIONS.CHANGE_NAME,
              payload: { name: e.target.value }
            })
          }
          onChangeNumber={(e) =>
            dispatch({
              type: ACTIONS.CHANGE_NUMBER,
              payload: { number: e.target.value }
            })
          }
          onChangeMM={(e) =>
            dispatch({
              type: ACTIONS.CHANGE_MM,
              payload: { eMM: e.target.value }
            })
          }
          onChangeYY={(e) =>
            dispatch({
              type: ACTIONS.CHANGE_YY,
              payload: { eYY: e.target.value }
            })
          }
          onChangeCVC={(e) =>
            dispatch({
              type: ACTIONS.CHANGE_CVC,
              payload: { cvc: e.target.value }
            })
          }
        />
      )}
    </React.Fragment>
  );
}

export default App;

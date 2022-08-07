import React from "react";
import scss from "../cards/cards.module.scss";
import CardLogo from "../../images/card-logo.svg";
import CardFront from "../../images/bg-card-front.png";
import CardBack from "../../images/bg-card-back.png";
import { mutatedState } from "../../App";

export type CardProps = {
  name: string;
  number: string | number;
  eMM: number;
  eYY: number;
  cvc: number;
};

function Cards() {
  return (
    <div className={scss.cardsWrapper}>
      <div className={scss.cardFront}>
        <img src={CardFront} alt="CardF" />
        <img src={CardLogo} alt="Card-Logo" />
        <span className={scss.creditCardNumber}>
          {mutatedState.newState.number}
        </span>
      </div>
      <div></div>
    </div>
  );
}

export default Cards;

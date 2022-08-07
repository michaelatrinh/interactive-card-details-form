import React from "react";
import scss from "../cards/cards.module.scss";
import CardLogo from "../../images/card-logo.svg";
import CardFront from "../../images/bg-card-front.png";
import CardBack from "../../images/bg-card-back.png";
import { mutatedState } from "../../App";

export type CardProps = {
  name: string;
  number: string | number;
  eMM: string | number;
  eYY: string | number;
  cvc: string | number;
};

function Cards() {
  return (
    <div className={scss.cardsWrapper}>
      {/* Front Card */}
      <div className={scss.cardFrontWrapper}>
        <div className={scss.cardFront}>
          <img src={CardFront} alt="CardF" />
          <img src={CardLogo} alt="Card-Logo" />
          <span className={scss.creditCardNumber}>
            {mutatedState.newState.number}
          </span>
          <span className={scss.creditCardName}>
            {mutatedState.newState.name}
          </span>
          <span className={scss.creditCardMMYY}>
            {mutatedState.newState.eMM}/{mutatedState.newState.eYY}
          </span>
        </div>
      </div>
      {/* Back Card */}
      <div className={scss.cardBackWrapper}>
        <div className={scss.cardBack}>
          <img src={CardBack} alt="CardB" />
          <span className={scss.creditCardCVC}>
            {mutatedState.newState.cvc}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cards;

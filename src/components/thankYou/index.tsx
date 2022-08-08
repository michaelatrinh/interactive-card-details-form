import React from "react";
import scss from "../thankYou/thankYou.module.scss";
import CompleteIcon from "../../images/icon-complete.svg";

interface ThankYouProps {
  handleBtnClick: () => void;
}

// e: React.MouseEvent<HTMLButtonElement, MouseEvent>

function ThankYou({ handleBtnClick }: ThankYouProps) {
  return (
    <div className={scss.wrapper}>
      <div className={scss.flexWrap}>
        <img src={CompleteIcon} alt="Check-Mark" />
        <h1>THANK YOU!</h1>
        <p>We've added your card details</p>
        <button onClick={handleBtnClick}>Continue</button>
      </div>
    </div>
  );
}

export default ThankYou;

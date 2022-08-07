import React from "react";

type CardInfo = {
  name: string;
  cardNum: number;
  expiryMM: number;
  expiryYY: number;
  cvc: number;
};

export default function Form({
  name,
  cardNum,
  expiryMM,
  expiryYY,
  cvc,
}: CardInfo): JSX.Element {
  return (
    <form action="/">
      <label htmlFor="cardholder-name">CARDHOLDER NAME</label>
      <input
        type="text"
        id="cardholder-name"
        name="cardholder-name"
        value={name}
      />
    </form>
  );
}

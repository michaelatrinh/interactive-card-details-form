import React from "react";
import scss from "../form/form.module.scss";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMM: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeYY: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCVC: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const invalidMsgs = {
  invalidName: "",
  invalidNumber: "",
  invalidExpiry: ""
};

function Form({
  handleSubmit,
  onChangeName,
  onChangeNumber,
  onChangeMM,
  onChangeYY,
  onChangeCVC
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className={scss.formWrapper}>
      <label className={scss.inputLayout}>
        <span>CARDHOLDER NAME</span>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          onChange={onChangeName}
        />
      </label>

      <label className={scss.inputLayout}>
        <span>CARD NUMBER</span>
        <input
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          maxLength={16}
          pattern="\d*"
          onChange={onChangeNumber}
        />
        <span>{invalidMsgs.invalidNumber}</span>
      </label>

      <div className={scss.bottomInputLayout}>
        <label className={scss.bottomInputLayout_exp}>
          <span>EXP. DATE {"(MM/YY)"}</span>
          <div className={scss.bottomInputLayout_exp_inputs}>
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              pattern="^[0][1-9]$|^[1][0-2]$"
              onChange={onChangeMM}
            />
            <input
              type="text"
              placeholder="YY"
              maxLength={2}
              pattern="^[2-9][2-9]$|^[3-9][0-9]$"
              onChange={onChangeYY}
            />
          </div>
          <span>{invalidMsgs.invalidExpiry}</span>
        </label>

        <label className={scss.bottomInputLayout_cvc}>
          <span>CVC</span>
          <input
            type="text"
            placeholder="e.g. 123"
            maxLength={3}
            pattern="\d*"
            onChange={onChangeCVC}
          />
        </label>
      </div>

      <input type="submit" className={scss.confirmBtn} value="Confirm" />
    </form>
  );
}

export default Form;

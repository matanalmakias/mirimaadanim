import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";
import cateringService from "./../../../services/catering/catering.service";

const Catering = () => {
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [fourthStep, setFourthStep] = useState(false);

  const [stepResults, setStepResults] = useState({
    firstStep: null,
    secondStep: null,
    thirdStep: null,
    fourthStep: null,
  });

  const locations = [`באר שבע והסביבה`, "גוש דן", "שפלה"];
  const getCateringFromServer = () => {
    cateringService.getCateringProcess(stepResults);
  };
  return (
    <div>
      {firstStep && (
        <FirstStep
          setStepResults={setStepResults}
          locations={locations}
          setFirstStep={setFirstStep}
          setSecondStep={setSecondStep}
        />
      )}
      {secondStep && (
        <SecondStep
          setStepResults={setStepResults}
          setSecondStep={setSecondStep}
          setThirdStep={setThirdStep}
        />
      )}
      {thirdStep && (
        <ThirdStep
          setStepResults={setStepResults}
          setThirdStep={setThirdStep}
          setFourthStep={setFourthStep}
          getCateringFromServer={getCateringFromServer}
        />
      )}
      {fourthStep && <FourthStep setStepResults={setStepResults} />}
    </div>
  );
};

export default Catering;

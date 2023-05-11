import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import FourthStep from "./steps/FourthStep";
import cateringService from "./../../../services/catering/catering.service";
import FifthStep from "./steps/FifthStep";

const Catering = () => {
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [thirdStep, setThirdStep] = useState(false);
  const [fourthStep, setFourthStep] = useState(false);
  const [fifthStep, setFifthStep] = useState(false);

  const [stepResults, setStepResults] = useState({
    firstStep: null,
    secondStep: null,
    thirdStep: null,
    fourthStep: null,
    fifthStep: null,
  });
  useEffect(() => {
    console.log(stepResults);
  }, [stepResults]);
  const backBtn = (setCurrentState, setPreviousState) => {
    setCurrentState((s) => !s);
    setPreviousState((s) => !s);
  };
  const locations = [`באר שבע והסביבה`, "גוש דן", "שפלה"];
  const getCateringFromServer = () => {
    cateringService.getCateringProcess(stepResults);
  };
  return (
    <div>
      {firstStep && (
        <FirstStep
          setStepResults={setStepResults}
          backBtn={backBtn}
          locations={locations}
          setFirstStep={setFirstStep}
          setSecondStep={setSecondStep}
        />
      )}
      {secondStep && (
        <SecondStep
          backBtn={backBtn}
          setFirstStep={setFirstStep}
          setStepResults={setStepResults}
          setSecondStep={setSecondStep}
          setThirdStep={setThirdStep}
        />
      )}
      {thirdStep && (
        <ThirdStep
          setSecondStep={setSecondStep}
          backBtn={backBtn}
          setStepResults={setStepResults}
          setThirdStep={setThirdStep}
          setFourthStep={setFourthStep}
        />
      )}
      {fourthStep && (
        <FourthStep
          setFifthStep={setFifthStep}
          setThirdStep={setThirdStep}
          setFourthStep={setFourthStep}
          backBtn={backBtn}
          setStepResults={setStepResults}
          getCateringFromServer={getCateringFromServer}
        />
      )}
      {fifthStep && (
        <FifthStep
          setFifthStep={setFifthStep}
          setFourthStep={setFourthStep}
          stepResults={stepResults}
          backBtn={backBtn}
          getCateringFromServer={getCateringFromServer}
        />
      )}
    </div>
  );
};

export default Catering;

import { useEffect, useState } from "react";
import "./styles.css";
import { tenureData } from "./utils/constants";
import TextInputs from "./components/text-inputs";

function App() {
  const [cost, setCost] = useState(0);
  const [interestRate, setInterestRate] = useState(10);
  const [processing, setProcessing] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calculateEmi = (dp) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (cost <= 0) return;

    const loanAmnt = cost - dp;
    const interest = interestRate / 100;
    const year = tenure / 12;

    const EMI =
      (loanAmnt * interest * (1 + interest) ** year) /
      ((1 + interest) ** year - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) {
      return;
    }

    const downpaymentPercentage = 100 - (emi / calculateEmi(0)) * 100;
    return Number((downpaymentPercentage / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (cost <= 0) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const updateEmi = (e) => {
    if (cost <= 0) return;

    let dp = Number(e.target.value);
    setDownPayment(dp);
    let emi = Number(calculateEmi(dp));
    setEmi(emi);
  };

  const updateDownpayment = (e) => {
    if (cost <= 0) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  return (
    <>
      <h1>EMI Calculator</h1>
      <div className="App">
        <TextInputs title={"Total Cost"} state={cost} setState={setCost} />
        <TextInputs
          title={"Interest Rate (in %)"}
          state={interestRate}
          setState={setInterestRate}
        />
        <TextInputs
          title={"Processing Fee (in %)"}
          state={processing}
          setState={setProcessing}
        />

        <span className="title">Down Payment</span>
        <input
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          className="slider"
          onChange={(e) => {
            updateEmi(e);
          }}
        />
        <label>Total-Downpayment $ {downPayment}</label>

        <span className="title">Loan Per Month</span>
        <input
          type="range"
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          value={emi}
          className="slider"
          onChange={(e) => {
            updateDownpayment(e);
          }}
        />
        <label>Total-EMI $ {emi}</label>

        <div>
          <span style={{ marginBottom: "20px" }} className="title">
            Tenure
          </span>
          <div className="tenureContainer">
            {tenureData.map((t) => {
              return (
                <button
                  className={`tenure ${t === tenure ? "selected" : ""}`}
                  onClick={() => setTenure(t)}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

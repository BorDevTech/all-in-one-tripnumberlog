import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { fireDB, auth } from "./../assets/Firebase/firebase.config";
import { useNavigate } from "react-router-dom";

interface Props {
  isAuth: boolean;
}

const CreateTransaction = ({ isAuth }: Props) => {
  const [isSpecific, setIsSpecific] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState(Date);
  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionCardUsed, setTransactionCardUsed] = useState(0);

  const transactionCollectionRef = collection(fireDB, "transactions");

  let navigate = useNavigate();

  const createTransaction = async () => {
    await addDoc(transactionCollectionRef, {
      transactionTitle,
      transactionDate,
      transactionAmount,
      transactionCardUsed,
      createdBy: {
        name: auth.currentUser?.displayName,
        UID: auth.currentUser?.uid,
      },
    });
    navigate("/");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <h1>CreateTransaction</h1>
      <div>
        <h3>
          <label htmlFor="transactionTitle">Title:</label>
        </h3>
        <input
          type="text"
          id="transactionTitle"
          placeholder="paid for ..."
          onChange={(e) => setTransactionTitle(e.target.value)}
        />
      </div>
      <h3>
        <label
          htmlFor={
            isSpecific === true ? "transactionDate" : "transactionDateSpecific"
          }
        >
          Date Paid:
        </label>
      </h3>
      <div>
        <button
          onClick={() => {
            setIsSpecific(!isSpecific);
          }}
        >
          specific?
        </button>
        {isSpecific === false ? (
          <>
            <input
              type="date"
              id="transactionDate"
              placeholder="MM/DD/YYYY "
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </>
        ) : (
          <>
            <input
              type="datetime-local"
              id="transactionDateSpecific"
              placeholder="MM/DD/YYY HH:MM AM/PM"
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </>
        )}
      </div>
      <div>
        <h3>
          <label htmlFor="transactionAmount">Amount Paid:</label>
        </h3>
        <input
          type="number"
          id="transactionAmount"
          placeholder="0.00"
          step={0.01}
          onChange={(e) => setTransactionAmount(e.target.valueAsNumber)}
        />
      </div>
      <div>
        <h3>
          <label htmlFor="transactionCardUsed">Card Used:</label>
        </h3>
        <input
          type="number"
          pattern="[0-9]*"
          id="transactionCardUsed"
          placeholder="1234"
          onChange={(e) => setTransactionCardUsed(e.target.valueAsNumber)}
        />
      </div>
      <button onClick={createTransaction}>Submit Transaction</button>
    </>
  );
};
export default CreateTransaction;

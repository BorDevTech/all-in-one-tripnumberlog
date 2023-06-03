import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { auth, fireDB } from "../assets/Firebase/firebase.config";

interface Props {
  isAuth: boolean;
}

const Home: FC<Props> = ({ isAuth }: Props) => {
  const [transactionList, setTransactionList] = useState<
    {
      id: string;
      transactionTitle: string;
      transactionAmount: number;
      transactionDate: string;
      transactionCardUsed: number;
      createdBy: { name: string; UID: string };
    }[]
  >([]);

  const transactionCollectionRef = collection(fireDB, "transactions");

  const deleteTransaction = async (id: string) => {
    const transactionDoc = doc(fireDB, "transactions", id);
    await deleteDoc(transactionDoc);
    window.location.reload();
  };
  useEffect(() => {
    console.log("Effect called");
    const getTransactions = async () => {
      const data = await getDocs(transactionCollectionRef);
      setTransactionList(
        data.docs.map((doc) => ({
          id: doc.id,
          transactionTitle: doc.data().transactionTitle,
          transactionAmount: doc.data().transactionAmount,
          transactionDate: doc.data().transactionDate,
          transactionCardUsed: doc.data().transactionCardUsed,
          createdBy: {
            name: doc.data().createdBy.name,
            UID: doc.data().createdBy.UID,
          },
        }))
      );
    };

    getTransactions();
  }, []);

  return (
    <div>
      <table className="table table-dark table-striped">
        <colgroup>
          <col span={20} />
        </colgroup>
        <thead>
          <tr>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">name</th>
            <th scope="col">Date</th>
            <th scope="col">Card Used</th>
            <th scope="col">id</th>
          </tr>
          {transactionList.map((trx) => {
            let {
              id,
              transactionTitle,
              transactionAmount,
              transactionDate,
              transactionCardUsed,
              createdBy: { name, UID },
            } = trx;
            return (
              <tr key={id} style={{ border: "1px  solid black" }}>
                <td>{transactionTitle}</td>
                <td>{"$" + transactionAmount}</td>
                <td>{name}</td>
                <td>{transactionDate}</td>
                <td>{transactionCardUsed}</td>
                <td>{id}</td>
                <td>
                  <div>
                    {isAuth && UID === auth.currentUser?.uid && (
                      <button
                        onClick={() => {
                          deleteTransaction(id);
                        }}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Home;

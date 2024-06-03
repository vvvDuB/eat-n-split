import { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ user, onSplitBill }) => {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSplitBill = (e) => {
    e.preventDefault();

    if (!bill) return;

    console.log({
      totale: bill,
      "le tue spese": paidByUser,
      "chi paga": whoIsPaying,
      "totale di chi paga": paidByUser,
    });

    onSplitBill(
      whoIsPaying === "user"
        ? Math.abs(bill - paidByUser) === 0
          ? bill
          : bill - paidByUser
        : -paidByUser
    );
  };

  return (
    <form onSubmit={handleSplitBill} className="form-split-bill">
      <h2>Split a bill with {user.name}</h2>
      <label> Bill value</label>
      <input
        type="text"
        value={bill}
        onClick={() => setBill(0)}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onClick={() => setPaidByUser(0)}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label>{user.name}'s expense</label>
      <input type="text" disabled value={Math.abs(bill - paidByUser)} />
      <label>Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value={"you"}>You</option>
        <option value={"friend"}>{user.name}</option>
      </select>
      <Button>Dividi</Button>
    </form>
  );
};

export default FormSplitBill;

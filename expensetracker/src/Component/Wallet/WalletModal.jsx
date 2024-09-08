import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const WalletModal = forwardRef((props, ref) => {
  const balanceRef = useRef(null);
  const [incomeAmount, setIncomeAmount] = useState(""); // To track input value

  useImperativeHandle(ref, () => ({
    open: () => {
      if (balanceRef.current) {
        balanceRef.current.showModal();
      }
    },
    close: () => {
      if (balanceRef.current) {
        balanceRef.current.close();
      }
    }
  }));

  const handleAddBalance = (e) => {
    e.preventDefault();
    if (incomeAmount && !isNaN(incomeAmount)) {
      props.onAddBalance(Number(incomeAmount)); // Call parent's function to update balance
      setIncomeAmount(""); // Clear input after submission
    }
  };

  return (
    <dialog ref={balanceRef}>
      <h3>Add Balance</h3>
      <form onSubmit={handleAddBalance}>
        <input
          type="number"
          placeholder="Income Amount"
          value={incomeAmount}  //two-way-binding
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <button type="submit">Add Balance</button>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
      </form>
    </dialog>
  );
});

export default WalletModal;

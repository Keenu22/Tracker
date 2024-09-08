import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ExpensesModal = forwardRef((props, ref) => {
  const dialogRef = useRef(null); // Ref for the dialog
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [date, setDate] = useState("");

  // Expose the open and close methods to the parent component
  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    close: () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    }
  }));

  const handleAddExpenses = (e) => {
    e.preventDefault();
    if (title && price && selectCategory && date) {
      props.onAddExpense(title, Number(price), selectCategory, date); // Call parent's function to update balance
      // Clear inputs after submission
      setTitle("");
      setPrice("");
      setSelectCategory("");
      setDate("");
    }
  };

  return (
    <dialog ref={dialogRef}>
      <h3>Add Expenses</h3>
      <form onSubmit={handleAddExpenses}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <input
          type="text"
          placeholder="Select Category"
          onChange={(e) => setSelectCategory(e.target.value)}
          value={selectCategory}
        />
        <input
          type="text"
          placeholder="dd/mm/yy"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <button type="submit">Add Expense</button>
        <button type="button" onClick={() => props.onClose()}>
          Cancel
        </button>
      </form>
    </dialog>
  );
});

export default ExpensesModal;

import { forwardRef, useImperativeHandle, useRef } from "react";

const TransactionModal = forwardRef((props, ref) => {
  const editRef = useRef(null);

  // Exposing open and close methods to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    open: () => {
      if (editRef.current) {
        editRef.current.showModal(); // Show the dialog modal
      }
    },
    close: () => {
      if (editRef.current) {
        editRef.current.close(); // Close the dialog modal
      }
    }
  }));

  return (
    <dialog ref={editRef}>
      <h3>Edit Expenses</h3>
      <form>
        <input placeholder="Title" />
        <input placeholder="Price" />
        <input placeholder="Select Category" />
        <input placeholder="dd/mm/yyyy" />
        <button type="submit">Add Expense</button>
        <button type="button" onClick={props.onClose}>Cancel</button>
      </form>
    </dialog>
  );
});

export default TransactionModal;

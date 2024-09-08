import React, { useRef, useState } from 'react';
import closeIcon from "../../assets/closeIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import foodIcon from "../../assets/food.svg";
import movieIcon from "../../assets/movie.svg";
import travelIcon from "../../assets/travel.svg";
import Pagination from './Pagination';
import TransactionModal from './TransactionModal';
import './TransactionsBody.css';

const TransactionsBody = ({ transactions, onTransactionModalShow, onDeleteTransaction }) => {
  const transRef = useRef(null); // Define the ref for the modal
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate indices for slicing data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Function to open the edit modal
  const handleEditOpen = () => {
    if (transRef.current) {
      transRef.current.open(); // Call the open method on the modal ref
    }
    if (typeof onTransactionModalShow === 'function') {
      onTransactionModalShow(true); // Notify parent that the modal is open
    }
  };

  // Function to close the edit modal
  const handleEditClose = () => {
    if (transRef.current) {
      transRef.current.close(); // Call the close method on the modal ref
    }
    if (typeof onTransactionModalShow === 'function') {
      onTransactionModalShow(false); // Notify parent that the modal is closed
    }
  };

   const handleDelete = (id) => {
    if (typeof onDeleteTransaction === 'function') {
      onDeleteTransaction(id); // Call the delete handler passed from the parent
    }
  };

  

  return (
    <div className='TransactionBody'>
      <div className='transactionBodyUpper'>
        <div className='transactionPage'>
          {currentTransactions.map((transaction, index) => (
            <div 
              key={`${transaction.id}-${index}-${currentPage}`} 
              className='transactionItem'
            >
              <img 
                src={
                  transaction.category === "food" ? foodIcon :
                  transaction.category === "entertainment" ? movieIcon :
                  transaction.category === "travel" ? travelIcon :
                  null
                } 
                alt={transaction.category} 
                className='transactionIcon'
              />
              <div className="transactionText">
                <h3>{transaction.name}</h3>
                <p>{transaction.date}</p>
              </div>
              <div className="management">
                <p className='price'>Rs.{transaction.price}</p>
                <div>
                  <button className='close'>
                    <img src={closeIcon} alt="Close" width="24" height="24" onClick={() => handleDelete(transaction.id)}  style={{ cursor: 'pointer' }} />
                  </button>
                  <button className='edit'>
                    <img 
                      src={editIcon} 
                      alt="Edit" 
                      width="24" 
                      height="24" 
                      onClick={handleEditOpen} 
                      style={{ cursor: 'pointer' }} 
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='transactionBodyLower'>
        <Pagination 
          totalItems={transactions.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />
      </div>
      <TransactionModal ref={transRef} onClose={handleEditClose} />
    </div>
  );
};

export default TransactionsBody;

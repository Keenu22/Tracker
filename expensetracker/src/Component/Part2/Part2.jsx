import React from 'react';
import TopExpenseHeader from '../TopExpensesHead/TopExpenseHeader';
import TransactionHeader from '../TransactionHeader/TransactionHeader';
import './Part2.css';

export default function Part2({ onTransactionModalShow, transactions,onDeleteTransaction }) {
  return (
    <div className="part2">
      <TransactionHeader onTransactionModalShow={onTransactionModalShow} transactions={transactions} 
      onDeleteTransaction={onDeleteTransaction}/>
      <TopExpenseHeader  transactions={transactions}/>
      {/* You can use the transactions prop here if needed */}
    </div>
  );
}

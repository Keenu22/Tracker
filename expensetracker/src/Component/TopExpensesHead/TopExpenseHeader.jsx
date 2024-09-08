import React from 'react';
//styles
//styles
import TopExpenses from '../TopExpenses/TopExpenses';
import "./TopExpenseHead.css";

const TopExpenseHeader = ({transactions}) => {
    return (
        <div className='Transactions'>
            <h2>Top Expenses</h2>
          <TopExpenses transactions={transactions}/>
        </div>
    );
};

export default TopExpenseHeader;
import React from 'react';
import leftArrow from "../../assets/leftArrow (1).svg";
import rightArrow from "../../assets/rightArrow (1).svg";
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className='pagination'>
            {/* Previous Button */}
            <button 
                onClick={handlePrevious} 
                disabled={currentPage === 1}
                className='paginationButton'
            >
                <img src={leftArrow} alt="Previous" width="24" height="24" />
            </button>
            
            {/* Current Page */}
            <div className='active'>
                {currentPage}
            </div>

            {/* Next Button */}
            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                className='paginationButton'
            >
                <img src={rightArrow} alt="Next" width="24" height="24" />
            </button>
        </div>
    );
};

export default Pagination;

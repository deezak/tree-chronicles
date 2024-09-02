import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './PaginationControls.css'; // Import your CSS file if needed for additional styling

const PaginationControls = ({ currentPage, noOfPages, handlePageChange }) => {
    return (
        <Stack spacing={2} className="pagination-controls">
            <Pagination
                count={noOfPages}
                page={currentPage}
                onChange={(event, value) => handlePageChange(value)}
                // variant="outlined"
                sx={{
                    '& .MuiPaginationItem-root': {
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: "var(--grey-accent) !important"
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'white',
                        color: '#black', // Change the selected page color as needed
                        borderColor: 'white',
                        '&:hover': {
                            backgroundColor: "var(--magic-yellow) !important",                        },
                    },
                    '& .MuiPaginationItem-previousNext': {
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: "var(--grey-accent) !important"
                        },
                    }
                }}
            />
        </Stack>
    );
};

export default PaginationControls;

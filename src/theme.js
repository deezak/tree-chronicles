// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiPagination: {
            styleOverrides: {
                root: {
                    '& .MuiPaginationItem-root': {
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            color: 'white',
                        },
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'white',
                        color: '#3f51b5', // Selected page color
                        borderColor: 'white',
                    },
                    '& .MuiPaginationItem-previousNext': {
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                            borderColor: 'white',
                            color: 'white',
                        },
                    }
                }
            }
        }
    }
});

export default theme;

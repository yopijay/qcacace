// Libraries
import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1440,
            xl: 2560
        }
    },
    palette: {
        primary: {
            main: '#204c6f',
            light: '#d1fffc',
            dark: '#0099cc',
            contrastText: '#212b36'
        },
        secondary: {
            main: '#7635dc',
            light: '#ebd6fd',
            dark: '#3d00a9',
            contrastText: '#ffffff'
        },
        error: {
            main: '#ff3030',
            light: '#ffe3d5',
            dark: '#c30006',
            contrastText: '#ffffff'
        },
        warning: {
            main: '#fda92d',
            light: '#fef4d4',
            dark: '#c57a00',
            contrastText: '#212b36'
        },
        info: {
            main: '#2065d1',
            light: '#d1e9fc',
            dark: '#003c9f',
            contrastText: '#ffffff'
        },
        success: {
            main: '#00ab55',
            light: '#c8facd',
            dark: '#007a29',
            contrastText: '#ffffff'
        },
        excel: {
            main: '#1b8a0d'
        },
        pdf: {
            main: '#e17055'
        },
        text: {
            primary: '#212b36',
            secondary: '#637381',
            disabled: '#919eab'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'Gilroy Light'
        ],
        fontSize: 13
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: 'none'
                    },
                    '&:after': {
                        borderBottom: 'none'
                    },
                    '&.Mui-disabled:before': {
                        borderBottom: 'none'
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none'
                    }
                }
            }
        }
    }
});

export const input = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1440,
            xl: 2560
        }
    },
    palette: {
        primary: {
            main: '#1ccaff',
            light: '#d1fffc',
            dark: '#0099cc',
            contrastText: '#212b36'
        },
        secondary: {
            main: '#7635dc',
            light: '#ebd6fd',
            dark: '#3d00a9',
            contrastText: '#ffffff'
        },
        error: {
            main: '#ff3030',
            light: '#ffe3d5',
            dark: '#c30006',
            contrastText: '#ffffff'
        },
        warning: {
            main: '#fda92d',
            light: '#fef4d4',
            dark: '#c57a00',
            contrastText: '#212b36'
        },
        info: {
            main: '#2065d1',
            light: '#d1e9fc',
            dark: '#003c9f',
            contrastText: '#ffffff'
        },
        success: {
            main: '#00ab55',
            light: '#c8facd',
            dark: '#007a29',
            contrastText: '#ffffff'
        },
        excel: {
            main: '#1b8a0d'
        },
        pdf: {
            main: '#e17055'
        },
        text: {
            primary: '#212b36',
            secondary: '#637381',
            disabled: '#919eab'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'Gilroy Light'
        ],
        fontSize: 13
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: 'none'
                    },
                    '&:after': {
                        borderBottom: 'none'
                    },
                    '&.Mui-disabled:before': {
                        borderBottom: 'none'
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none'
                    }
                },
                input: {
                    textTransform: 'uppercase'
                }
            }
        }
    }
});
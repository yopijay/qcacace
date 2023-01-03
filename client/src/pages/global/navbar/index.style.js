export const appbar = {
    backgroundFilter: 'blur(2px)',
    backgroundColor: '#1B4168',
    boxShadow: 'none',
    padding: '10px 0',
    maxHeight: '120px',
    overflow: 'hidden'
}

export const mainLink = {
    textDecoration: 'none',
    backgroundColor: '#1b4168',
    boxShadow: 1, 
    borderRadius: '7px', 
    padding: '10px 15px',
    color: '#ffffff',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': { backgroundColor: '#14304d' }
}

export const link = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#ffffff',
    transition: 'transform .2s',
    cursor: 'pointer',
    display: { xs: 'none', sm: 'block' },
    '&:hover': { 
        color: '#07bc0c',
        transform: 'scale(1.1)'
    }
}

export const activeLink = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#07bc0c',
    transition: 'transform .2s',
    cursor: 'pointer',
    transform: 'scale(1.1)'
}

export const burger = {
    display: { xs: 'flex', md: 'none' },
    color: '#728ca1',
    transition: 'transform 0.2s',
    '&:hover': { color: '#204c6f' }
}
export const appbar = {
    backgroundFilter: 'blur(2px)',
    backgroundColor: '#fffbf6eb',
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
    textDecoration: 'none',
    color: '#212b36',
    transition: 'transform .2s',
    cursor: 'pointer',
    textTransform: 'uppercase',
    '&:hover': { transform: 'scale(1.1)' }
}

export const activeLink = {
    textDecoration: 'none',
    color: '#212b36',
    transition: 'transform .2s',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transform: 'scale(1.1)'
}
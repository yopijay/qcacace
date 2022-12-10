export const swipe = {
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: 280,
        backgroundColor: '#ffffff',
        backdropFilter: 'blur(10px)',
        '&::-webkit-scrollbar': { display: 'none' }
    }
}

export const greeting = {
    fontFamily: 'Tommy',
    fontSize: '115%',
    color: '#64a93e',
}

export const brand = {
    fontFamily: 'Tommy Bold',
    fontSize: '160%',
    color: '#204c6f'
}

export const link = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#212b36',
    transition: 'transform .2s',
    cursor: 'pointer',
    padding: '3px 0',
    '&:hover': { 
        color: '#204c6f',
        transform: 'scale(1.1)'
    }
}

export const activeLink = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#204c6f',
    transition: 'transform .2s',
    cursor: 'pointer',
    transform: 'scale(1.1)'
}
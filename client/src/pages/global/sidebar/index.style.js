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
    color: '#7e7b44',
}

export const brand = {
    fontFamily: 'Tommy Bold',
    fontSize: '160%',
    color: '#371615'
}

export const link = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#212b36',
    transition: 'transform .2s',
    cursor: 'pointer',
    padding: '3px 0',
    '&:hover': { 
        color: '#d0915c',
        transform: 'scale(1.1)'
    }
}

export const activeLink = {
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#d0915c',
    transition: 'transform .2s',
    cursor: 'pointer',
    transform: 'scale(1.1)'
}
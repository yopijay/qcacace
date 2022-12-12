export const swipe = {
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: 280,
        backgroundColor: '#ffffff',
        backdropFilter: 'blur(10px)',
        height: '100vh',
        '&::-webkit-scrollbar': { display: 'none' }
    }
}

export const sidebar = {
    padding: '80px 0 20px 0',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%',
    display: {
        xs: 'none',
        lg: 'flex'
    },
    overflow: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
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
    fontSize: {
        lg: '95%',
    },
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#212b36',
    transition: 'transform .2s',
    cursor: 'pointer',
    padding: '3px 0',
    '&:hover': { color: '#728ca1' }
}

export const activeLink = {
    fontSize: {
        lg: '95%',
    },
    fontFamily: 'Tommy',
    textDecoration: 'none',
    color: '#728ca1',
    padding: '3px 0',
    transition: 'transform .2s',
    cursor: 'pointer'
}
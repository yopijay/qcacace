export const swipe = {
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: 280,
        backgroundColor: '#fafafa',
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
    textDecoration: 'none', 
    padding: '11px 15px', 
    borderRadius: '7px', 
    color:'#204c6f',
    '&:hover': { backgroundColor: '#F1F1F1' }, 
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    
}

export const activeLink = {
    textDecoration: 'none', 
    padding: '11px 15px', 
    borderRadius: '7px', 
    backgroundColor: '#FFFFFF',
    cursor: 'pointer'
}

export const navcontainer = {
    padding: { 
        xs: '20px', 
        lg: '90px 0 20px 0' 
    }, 
    overflowY: 'scroll', 
    '&::-webkit-scrollbar': { display: 'none' }
}
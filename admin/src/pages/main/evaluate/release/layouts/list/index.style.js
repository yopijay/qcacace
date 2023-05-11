export const search = {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: 'solid 1px #F3F3F3',
    borderRadius: '50px',
    padding: '4px 10px',
    width: {
        xs: '100%',
        sm: '350px',
    }
}

export const item = {
    backgroundColor: '#FFFFFF', 
    padding: '10px 20px', 
    border: 'solid 1px #F3F3F3', 
    borderRadius: '10px'
}

export const approve = {
    color: '#4cd137', 
    padding: '3px', 
    lineHeight: 0, 
    transition: 'transform .2s', 
    '&:hover': { 
        transform: 'scale(1.1)', 
        transition: 'transform .2s' 
    }
}

export const disapprove = {
    color: '#e84118', 
    padding: '3px', 
    lineHeight: 0, 
    transition: 'transform .2s', 
    '&:hover': { 
        transform: 'scale(1.1)', 
        transition: 'transform .2s' 
    }
}

export const icons = {
    color: 'rgb(99, 115, 129)', 
    padding: '3px', 
    lineHeight: 0, 
    cursor: 'pointer',
    transition: 'transform .2s', 
    '&:hover': { 
        transform: 'scale(1.1)', 
        transition: 'transform .2s' 
    }
}

export const btntxt = { 
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    borderRadius: '7px',
    padding: '7px 15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}
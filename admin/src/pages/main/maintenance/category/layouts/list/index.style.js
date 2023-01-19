export const title = {
    fontSize: {
        xs: '1.2rem',
        md: '1.3rem'
    },
    fontFamily: 'Gilroy Bold',
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out',
    textTransform: 'uppercase'
}

export const search = {
    backgroundColor: '#EDE9E8',
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
        md: '955px'
    }
}

export const btntxt = { 
    display: {
        xs: 'none',
        md: 'block'
    }, 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    borderRadius: '7px',
    padding: '7px 15px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const btnicon = {
    display: {
        xs: 'flex',
        md: 'none'
    }, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    borderRadius: '7px',
    padding: '8px 10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const item = {
    backgroundColor: '#D2E1E6', 
    padding: '10px 20px', 
    border: 'solid 1px #F3F3F3', 
    borderRadius: '10px'
}

export const icons = {
    color: 'rgb(99, 115, 129)', 
    padding: '3px', 
    lineHeight: 0, 
    transition: 'transform .2s', 
    '&:hover': { 
        transform: 'scale(1.1)', 
        transition: 'transform .2s' 
    }
}
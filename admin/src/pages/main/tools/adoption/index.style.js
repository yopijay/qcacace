export const card = {
    padding: '30px 15px',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: 'solid 1px #919eab40',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' }
}

export const input = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '6px 8px',
        md: '8px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px'
}

export const select = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    padding: {
        xs: '8px',
        md: '10px 10px'
    },
    marginBottom: '5px',
    borderRadius: '5px'
}

export const textarea = {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe4ea',
    borderRadius: '5px',
    fontFamily: 'Gilroy Light',
    fontSize: '105%',
    padding: '10px',
    outline: 'none',
    textTransform: 'uppercase',
    color: '#353b48'
}

export const btntxt = { 
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '7px',
    padding: '7px 0',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const scanner = {
    marginTop: '-35px',
    padding: '7px 12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50px',
    color: '#444444',
    zIndex: 1,
    border: 'solid 1px #dfe4ea',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',

    '&:hover': { backgroundColor: '#dfe4ea' }
}
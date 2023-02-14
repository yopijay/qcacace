export const container = {
    padding: '90px 0 0 0',
    overflowY: 'scroll',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': { display: 'none' }
}

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
        md: '500px'
    }
}

export const tab = {
    cursor: 'pointer',
    minWidth: '150px',
    textAlign: 'center',
    padding: '8px 0',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#1b4168c2',
        color: '#ffffff'
    }
}

export const tabactive = {
    cursor: 'pointer',
    minWidth: '150px',
    textAlign: 'center',
    backgroundColor: '#1b4168',
    padding: '8px 0',
    borderRadius: '8px',
    color: '#ffffff'
}
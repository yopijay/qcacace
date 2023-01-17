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

export const btnadopt = { 
    display: {
        xs: 'none',
        md: 'block'
    }, 
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: '#204c6f',
    color: '#ffffff',
    borderRadius: '25px',
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

export const btnadopticon = {
    display: {
        xs: 'flex',
        md: 'none'
    }, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#204c6f',
    borderRadius: '25px',
    padding: '8px 10px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}

export const petseries = {
    fontWeight: 'bold',
    color: '#a7a7a9',
    fontSize: { 
        xs: '110%',
        sm: '100%'
    },
    whiteSapce: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petmale = {
    color: '#1ec2df',
    fontSize: { xs: '110%' },
    whiteSapce: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petfemale = {
    color: '#e76165',
    fontSize: { xs: '110%' },
    whiteSapce: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petdesc = {
    fontWeight: 'bold',
    padding: '0 5px 0 0',
    color: '#777d9c',
    fontSize: { xs: '125%' },
    whiteSapce: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const pettag = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#c9c9c9',
    padding: '2px 0',
    borderRadius: '50px',
    whiteSapce: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}
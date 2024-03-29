import { color } from "@mui/system"

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
        xs: '250px',
        sm: '350px',
        md: '500px'
    }
}

export const tab = {
    textDecoration: 'none',
    cursor: 'pointer',
    minWidth: '150px',
    textAlign: 'center',
    padding: '8px 0',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '8px',
    color: '#444444',
    fontWeight:'600',
    '&:hover': {
        backgroundColor: '#1b4168c2',
        color: '#ffffff'
    }
}

export const tabactive = {
    textDecoration: 'none',
    cursor: 'pointer',
    minWidth: '150px',
    textAlign: 'center',
    backgroundColor: '#1b4168',
    padding: '8px 0',
    borderRadius: '8px',
    color: '#ffffff'
}

export const item = {
    backgroundColor: '#ffffff',
    textDecoration: 'none',
    overflow: 'hidden',
    border: 'solid 1px #919eab40',
    padding: '30px 25px',
    borderRadius: '8px'
}

export const petmale = {
    width: '10%',
    color: '#1ec2df',
    fontSize: { xs: '110%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petfemale = {
    width: '10%',
    color: '#e76165',
    fontSize: { xs: '110%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}

export const petdesc = {
    width: '90%',
    fontWeight: 'bold',
    color: '#777d9c',
    fontSize: { xs: '125%' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    borderRadius: '10px',
    padding: '7px 40px',
    marginTop: '20px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#1b405d' }
}
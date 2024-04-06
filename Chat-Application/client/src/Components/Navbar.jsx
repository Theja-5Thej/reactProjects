import React from 'react'
import { Container,Nav,Navbar, Stack,} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Notification from './chat/Notification';
const NavbarComponent = () => {
    const {user,logOutUser} = useContext(AuthContext)
  return (
    <Navbar bg='dark' className='mb-4' style={{height:"4rem"}}>
    <Container>
        <h2>
        <Link to='/' className='link-light text-decoration-none'>Chat App</Link>
        </h2>
      {user &&   <span className='text-warning'>Logged in as {user?.name}</span>}
        <Nav>
          
            <Stack direction='horizontal' gap={4}>
                {user ? (<>
                  <Notification/>
                    <Link onClick={()=>logOutUser()} to='/login' className='link-light text-decoration-none'>Logout</Link>
                </>) :  (<>
                    <Link to='/login' className='link-light text-decoration-none'>Login</Link>
                    <Link to='/register' className='link-light text-decoration-none'>Register</Link>
                </>)}
            
            </Stack>
        </Nav>
    </Container>
    </Navbar>
  )
}

export default NavbarComponent

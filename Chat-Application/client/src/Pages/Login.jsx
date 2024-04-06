import React, { useContext ,useState} from 'react'
import { Alert,Button,Form, Row,Col,Stack } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'
const Login = () => {
    const {loginUser,loginError,updateLoginInfo,loginInfo,isloginLoading} = useContext(AuthContext)
    const [errors,setError] = useState([])
    const handleSubmit =(e)=>{
      e.preventDefault()
      for (let key in loginInfo) {
          if (loginInfo.hasOwnProperty(key)) {
              if(loginInfo[key]===""){
                setError(prev=>[...prev,key])
              }else{
                errors.splice(errors.indexOf(key))
              }
          }
        }
      if( loginInfo.email !==""   && loginInfo.password !==""){
        loginUser(e)
      }
  }
  return ( 
    <>
      <Form onSubmit={handleSubmit}>
    <Row style={{
        height:"100vh",
        justifyContent:"center",
        paddingTop : "6%"
    }}>
        <Col xs={6}>
        <Stack gap={4}>
            <h2>Login</h2>
            <Form.Control type='email'
             style={{border:errors.includes("email")? "2px solid red" :"none"}} placeholder='Email' onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})}/>
            <Form.Control type='password' 
             style={{border:errors.includes("password")? "2px solid red" :"none"}}placeholder='Password' onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})}/>
            <Button variant='primary' type='submit'>{isloginLoading ? "Logging.." :"Login"}</Button>
            {loginError && <Alert variant='danger'><p>{loginError.message}</p></Alert>}
        </Stack>
        </Col>
    </Row>
   </Form> 
    </>
  )
}

export default Login

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'
const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isregisterLoading } = useContext(AuthContext)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const lengthRef = useRef()
    const capitalRef = useRef()
    const smallRef = useRef()
    const numericRef = useRef()
    const specialCharRef = useRef()
    const [toggle, setToggle] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        for (let key in registerInfo) {
            if (registerInfo.hasOwnProperty(key)) {
                if (registerInfo[key] === "") {
                    setErrors(prev => [...prev, key])
                } else {
                    errors.splice(errors.indexOf(key))
                }
            }
        }
        
        if (registerInfo.name !== "" && registerInfo.email !== "" && registerInfo.password !== "") {
            if(isPasswordValid)  registerUser(e)
            setIsPasswordValid(validPassword)
        }
    }

    useEffect(() => {
        if(password.length>0) setToggle(true)
        let lenghtvalid = password.length >= 8
        let capitalLetterValid = /[A-Z]/.test(password)
        let smallLetterValid = /[a-z]/.test(password)
        let numericValid = /\d/.test(password)
        let specialCharecterValid = /[!@#$%&]/.test(password)
        if(toggle){
            if (lenghtvalid) lengthRef.current.style.color = "green"
            if (!lenghtvalid) lengthRef.current.style.color = "red"
          if (capitalLetterValid) capitalRef.current.style.color = "green"
            if (!capitalLetterValid) capitalRef.current.style.color = "red"
             if (smallLetterValid) smallRef.current.style.color = "green"
              if (!smallLetterValid) smallRef.current.style.color = "red"
            if (numericValid) numericRef.current.style.color = "green"
             if (!numericValid) numericRef.current.style.color = "red"
        if (specialCharecterValid) specialCharRef.current.style.color = "green"
        if (!specialCharecterValid) specialCharRef.current.style.color = "red"
        }
        
        const validPassword = lenghtvalid&&capitalLetterValid&&smallLetterValid&&numericValid&&specialCharecterValid
        setIsPasswordValid(validPassword)
    }, [password])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "2%"
                }}>
                    <Col xs={6}>
                        <Stack gap={4}>
                            <h2>Register</h2>
                            <Form.Control type='text'
                                style={{ border: errors.includes("name") ? "2px solid red" : "none" }}
                                placeholder='Name'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
                            <Form.Control type='email'
                                style={{ border: errors.includes("email") ? "2px solid red" : "none" }}
                                placeholder='Email'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
                            <Form.Control type='password'
                                style={{ border: errors.includes("password") ? "2px solid red" : "none" }}
                                placeholder='Password'
                                onChange={(e) => {
                                    updateRegisterInfo({ ...registerInfo, password: e.target.value })
                                    setPassword(e.target.value)
                                }} />
                            {toggle && <Stack>
                                <p ref={lengthRef}>* Must have Length more than 8 Chars</p>
                                <p ref={capitalRef}>* Must contain atleat a Capital </p>
                                <p ref={smallRef}>* Must contain atleat a small letter</p>
                                <p ref={numericRef}>* Must Contain atleast a numeric value </p>
                                <p ref={specialCharRef}>* Must Contain atleast a spacial chars ex:-@,#,$,%,&</p>
                            </Stack>}
                            <Button variant='primary' type='submit'>
                                {isregisterLoading ? 'Creating your account....' : "Register"}
                            </Button>
                            {/* {
                                registerError?.error && <Alert variant='danger'><p>{registerError?.message}</p></Alert>
                            } */}

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Register

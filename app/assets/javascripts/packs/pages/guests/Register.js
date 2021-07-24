/* eslint-disable */
import React from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams, Link } from 'react-router-dom'
import { Container, Button, Input} from 'components'
import {useStore} from 'context'
import { Validation } from 'utils'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import facebook from 'images/facebook.svg'
import google from 'images/google.png'

const Wrapper = styled.div`
  position: relative;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  .margin-bottom{
    margin-bottom: 10px;
  }
  > span:not(.margin-bottom){
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    &:after, &:before{
      content: '';
      width: 100%;
      height: 1px;
      background: #d7e1e7;
      z-index: 111;
      position: absolute;
    }
    &:before{
      bottom: 50%;
      margin-left: 50px;
      left: -100%;
    }
    &:after{
      bottom: 50%;
      left: 100%;
      margin-left: -50px;
    }
  }
  h3{
    text-align: center;
    margin-bottom: 40px;
  }
  .google, .facebook{
    b{
      min-width: 160px;
      text-align: left;
    }
  }
  .google{
    margin-bottom: 20px;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
  .facebook{
    margin-bottom: 40px;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`

const Login = styled.span`
  position: fixed;
  right: 20px;
  top: 20px;
  > a{
    color: ${props => props.color};
    font-weight: bold;
    text-decoration: none;
    font-family: 'OpenSans Bold';
  }
`

const Register = observer(() => {
  const store = useStore()
  const { user, createRegister } = store.user
  const { activeColor, activeBackground } = user
  const { slug } = useParams()
  const [register, setRegister] = React.useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });
  
  const registerRef = React.useRef(null)
  const formToCheck = ['email', 'password']

  const handleInput = (type) => (e) => {
    const { value } = e.target
    setRegister(prev => ({...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type) === '' ? Validation.checkEmail(value, type) : Validation.checkExist(value, type)) 
        : Validation.checkExist(value, type)
    }))
  }

  const checkForm = async(register) =>{
    formToCheck.map(any => {
      setRegister(prev =>
        ({...prev, [`${any}Error`]: Validation.checkExist(register[any], any)
      }))
    })
  }
  
  const submitRegister = (register) => () => {
    checkForm(register).then(() => {
      if(registerRef.current === 0){
        createRegister(register)
      }else{
        console.log('invalid')
      }
    })
  }

  // ref for checking error
  registerRef.current = formToCheck.filter(any => register[`${any}Error`]).length

  return(
    <Wrapper>
      <Container>
        <Content>
          <Box>
            {/* <h3><b>Login as staff</b></h3> */}
            <Button className="google">
              <img src={google}/>
              <b>Continue with google</b>
            </Button>
            <Button className="facebook">
              <img src={facebook}/>
              <b>Continue with facebook</b>
            </Button>
            <span>Register with email</span>
            <Input 
              label={
                (register.emailError === '' ? <label>Email</label> :
                <label className="error">{register.emailError}</label>)
              }
              placeholder="Enter email"
              value={register.email}
              error={register.emailError}
              type="text"
              onChange={handleInput('email')}
            />
            <Input 
              label={
                (register.passwordError === '' ? <label>Password</label> :
                <label className="error">{register.passwordError}</label>)
              }
              placeholder="Enter password"
              value={register.password}
              error={register.passwordError}
              type="password"
              onChange={handleInput('password')}
            />
            <span className="margin-bottom"/>
            <Button
              onClick={submitRegister(register)}
              color={activeColor}
              background={activeBackground} 
              borderColor={activeBackground}>
              <b>  
                Register
              </b>
            </Button>
          </Box>
        </Content>
      </Container>
      <Login color={activeColor}>
        <Link to={`/${slug}/login`}>Login</Link>
      </Login>
    </Wrapper>
  )
})

export default Register

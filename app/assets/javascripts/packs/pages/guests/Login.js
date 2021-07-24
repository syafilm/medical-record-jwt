/* eslint-disable */
import React from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation, useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Container, Button, Input} from 'components'
import {useStore} from 'context'
import { Validation } from 'utils'
import facebook from 'images/facebook.svg'
import google from 'images/google.png'
import { toJS } from 'mobx'

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

const Register = styled.span`
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

const Login = observer(() => {
  const store = useStore()
  const { user, createSession } = store.user
  const { activeColor, activeBackground, loadingForm } = user
  const { slug } = useParams()
  const [login, setLogin] = React.useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });

  const loginRef = React.useRef(null)
  const formToCheck = ['email', 'password']

  const handleInput = (type) => (e) => {
    const { value } = e.target
    setLogin(prev => ({...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type) === '' ? Validation.checkEmail(value, type) : Validation.checkExist(value, type)) 
        : Validation.checkExist(value, type)
    }))
  }

  const checkForm = async(login) => {
    formToCheck.map(any => {
      setLogin(prev =>
        ({...prev, [`${any}Error`]: Validation.checkExist(login[any], any)
      }))
    })
  }

  const submitLogin = (login) => () => {
    checkForm(login).then(() => {
      if(loginRef.current === 0){
        createSession(login)
      }else{
        console.log('invalid')
      }
    })
  }

  // ref for checking error
  loginRef.current = formToCheck.filter(any => login[`${any}Error`]).length

  return (
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
            <span>Login with email</span>
            <Input 
              label={
                (login.emailError === '' ? <label>Email</label> :
                <label className="error">{login.emailError}</label>)
              }
              placeholder="Enter email"
              value={login.email}
              error={login.emailError}
              type="text"
              onChange={handleInput('email')}
            />
            <Input 
              label={
                (login.passwordError === '' ? <label>Password</label> :
                <label className="error">{login.passwordError}</label>)
              }
              placeholder="Enter password"
              value={login.password}
              error={login.passwordError}
              type="password"
              onChange={handleInput('password')}
            />
            <span className="margin-bottom"/>
            <Button
              onClick={submitLogin(login)}
              color={activeColor}
              background={activeBackground}
              loading={loadingForm}
              borderColor={activeBackground}>
              <b>  
                Login
              </b>
            </Button>
          </Box>
        </Content>
      </Container>
      <Register color={activeColor}>
        <Link to={`/${slug}/register`}>Register</Link>
      </Register>
    </Wrapper>
  )
})

export default Login

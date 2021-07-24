import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.button`
  padding: 8px 15px;
  background: ${props => props.background ? `${props.background}` : `#fff`};
  color: ${props => props.color ? `${props.color}` : `rgba(0,0,0,0.7)`};
  border: 1px solid ${props => props.borderColor ? `${props.borderColor}` : `#d7e1e7`};
  border-radius: 5px;
  outline: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 38px;
`

const Loading = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 0.20rem solid ${props => props.color};
  border-top-color: rgba(236, 241, 244, 0.8);
  animation: 1s spin infinite linear;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const Button = ({
  background,
  borderColor,
  color,
  onClick,
  loading = false,
  children,
  className,
}) => (
  <Wrapper 
    borderColor={borderColor} 
    background={background}
    className={className ? className : ''}
    color={color}
    onClick={onClick}>  
    {
      loading ? <Loading color={color}/> : children
    }
  </Wrapper>
)

export default Button
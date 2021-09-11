import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import {Validation} from 'utils'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Text = styled.input`
  border: 1px solid ${props => props.error ? `#d9534f` : `#d7e1e7`};
  border-radius: 5px;
  min-height: 38px;
  display: inline-flex;
  min-width: 250px;
  background: ${props => props.error ? `rgba(251, 57, 51, 0.05)` : `#ECF1F4`};
  padding: 0px 10px;
  &:focus{
    outline: 0;
    border: 1px solid #0083fc;
  }
`

const Input = ({
  onChange,
  label,
  type,
  value,
  placeholder,
  error,
  className,
}) => {
  !Validation.checkExist(value) && value === null && console.log(label.props.children, 'label apa yang null')
  return(
    <Wrapper>
      {label}
      <Text 
        onChange={onChange}
        type={type}
        value={value}
        error={error}
        className={className}
        placeholder={placeholder}
      />
    </Wrapper>
  )
}

export default Input
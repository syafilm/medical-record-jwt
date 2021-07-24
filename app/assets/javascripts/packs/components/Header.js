import React from 'react'
import moment from 'moment'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  border-bottom: 1px solid #d7e1e7;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`

const InputGroup = styled.div`
  display: inline-flex;
  align-items: center;
  > span{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    padding-left: 10px;
    background: #ECF1F4;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 38px;
    border: 1px solid #d7e1e7;
    border-right: 0px;
  }
  > div{
    margin-bottom: 0px;
  }
  .input-search{
    border-left: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`

const LeftHeader = styled.div`
  margin-right: auto;
`

const RightHeader = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  > span{
    margin-right: 10px;
  }
  > ul{
    display: flex;
    list-style: none;
    margin: 0px;
    padding: 0px;
    > li{
      display: inline-flex;
      margin-left: 10px;
      > a{
        > i{
          font-size: 22px;
        }
      }
    }
  }
`

const Input = styled.input`
  border: 1px solid #d7e1e7;
  border-radius: 5px;
  min-height: 38px;
  display: inline-flex;
  min-width: 250px;
  background: #ECF1F4;
  padding: 0px 10px;
  &:focus{
    outline: 0;
  }
`

const Header = () => {
  return(
    <Wrapper>
      <LeftHeader>
        <InputGroup>
          <span><i className="la la-search"></i></span>
          <Input placeholder={"Search here"} className="input-search"/>
        </InputGroup>
      </LeftHeader>
      <RightHeader>
        <span>
          {moment().format('dddd, D MMMM YYYY')}
        </span>
        <ul>
          <li><a><i className="la la-bell"></i></a></li>
          <li><a><i className="la la-cog"></i></a></li>
        </ul>
      </RightHeader>
    </Wrapper>
  )
}  

export default Header
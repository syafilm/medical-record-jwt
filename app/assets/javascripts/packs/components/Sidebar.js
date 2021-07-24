import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #d7e1e7;
  display: flex;
  flex-direction: column;
  > ul{
    padding: 0px;
    padding-left: 20px;
    margin: 0px;
    list-style: none;
    margin-top: 30px;
    > li{
      > a{
        > i {
          font-size: 22px;
          display: inline-flex;
          margin-right: 10px;
        }
        display: flex;
        padding: 8px 15px;
      }
    }
  }
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 15px;
  > img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
  > b{
    margin-top: 10px;
  }
`

const Sidebar = ({
  avatar,
  superadminName,
  menu
}) => {
  return(
    <Wrapper>
      <Profile>
        <img src={avatar} alt="Profile"/>
        <b>Superadmin name</b>
      </Profile>
      <ul>
        {menu.map(any => 
          <li key={any.slug}>
            <a><i className={any.icon}></i>{any.label}</a>
          </li>
        )}
      </ul>
    </Wrapper>
  )
}

export default Sidebar
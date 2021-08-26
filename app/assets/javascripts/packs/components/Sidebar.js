import React from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {useLocation, Link} from 'react-router-dom'
import {useStore} from 'context'

const Wrapper = styled.div`
  width: 240px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #d7e1e7;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 111;
  left: 0;
  > h4{
    font-family: 'OpenSans Bold';
    padding: 0px 20px;
    height: 61px;
    display: flex;
    align-items: center;
  }
  > ul{
    padding: 0px;
    padding-left: 0px;
    margin: 0px;
    list-style: none;
    margin-top: 30px;
    > li{
      &.active{
        >a{
          &:after{
            content: '';
            width: 7px;
            height: 7px;
            background: ${props => props.color};
            border-radius: 5px;
            position: absolute;
            right: 20px;
            margin-bottom: -3.5px;
          }
          font-family: 'OpenSans Bold';
          color: ${props => props.color};
        }
      }
      > a{
        position: relative;
        cursor: pointer;
        align-items:center;
        > i {
          background: #ECF1F4;
          width: 35px;
          height: 35px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          font-size: 20px;
          margin-right: 10px;
        }
        display: flex;
        padding: 10px 20px;
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

const Sidebar = observer(({avatar, superadminName, menu }) => {
  const location = useLocation()
  const store = useStore()
  const { user, createSession } = store.user
  const { activeColor, activeBackground, loadingForm, role } = user

  console.log(role, 'role');

  return(
    <Wrapper color={activeColor}>
      {/* <Profile>
        <img src={avatar} alt="Profile"/>
        <b>Superadmin name</b>
      </Profile> */}
      <h4>Medical staff project</h4>
      <ul>
        {menu.map(any => {
          const activeClass = location.pathname.includes(any.slug) ? 'active' : ''
          return(
            <li className={activeClass} key={any.slug}>
              <Link to={`/${role}/${any.slug}`}>
                <i className={any.icon}></i>{any.label}
              </Link>
            </li>
          )
        }
        )}
      </ul>
    </Wrapper>
  )
})

export default Sidebar
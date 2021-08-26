import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {ApiStaffs} from 'api'
import {ModelStaff} from 'models'
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'
import Wrapper from '../Wrapper'
import 'react-input-range/lib/css/index.css'

const Content = styled.div`
  padding: 25px 15px; 
  > button{
    width: 100%;
  }
`

const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
  thead {
    th {
      vertical-align: bottom;
      border-bottom: 1px solid #d7e1e7;
      font-family: 'OpenSans Bold';
      font-size: 14px;
    }
  }
  th, td{
    padding: 6px 6px;
    border-top: 1px solid #d7e1e7;
    text-align: center;
  }
  th{
    &.th-avatar{
      width: 40px;
    }
  }
  td{
    border-top: 0px solid rgba(0, 123, 255, 0.3);
    border-bottom: 0px solid rgba(0, 123, 255, 0.3);
    vertical-align: middle;
    font-size: 14px;
    &.td-avatar{
      width: 40px;
    }
    > div.option{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      > span{
        &:nth-of-type(1){
          margin-bottom: 4px;
        }
        &:nth-of-type(3){
          margin-top: 4px;
        }
        width: 4px;
        height: 4px;
        border-radius: 50%;
        position: relative;
        display: inline-flex;
        border-radius: 50%;
        background: #212529;
      }
    }
  }
  thead{
    border-left: 1px solid #d7e1e7;
    border-right: 1px solid #d7e1e7;
  }
  tbody {
    border-left: 0px solid rgba(0, 123, 255, 0.3);
    border-right: 0px solid rgba(0, 123, 255, 0.3);
  }
  tbody{
    tr{
      &:nth-of-type(odd){
        background-color: ${props => props.background ? `${props.background}` : `rgba(0, 123, 255, 0.05)`};
      }
    }
  }
`

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  background: #f8f9fa;
  object-fit: cover;
  object-position: center;
  display: block;
  text-align: center;
  margin: 0 auto;
`

const Tag = styled.span`
  background: #212529;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 10px;
`

const Department = styled.span`
  background: #212529;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 10px;
`

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: calc(32% - 30px);
  border:1px solid #d7e1e7;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 15px;
  > a{
    display: flex;
    flex-direction: column;
    padding: 10px;
    text-decoration: none;
    color: #000;
    > div{
      display: flex;
      width: 100%;
      > img{
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-right: 10px;
        border-radius: 5px;
        object-fit: cover;
        objct-position: center;
      }
      &:nth-of-type(1){
        display: flex;
        align-items: flex-start;
        width: 100%;
        > div{
          > b{
            display: block;
            margin-bottom: 0px;
            font-size: 14px;
          }
          > span{
            color: rgba(0,0,0, 0.6);
            font-size: 14px;
          }
        }
      }
      &:nth-of-type(2){
        margin-top: 10px;
        display: flex;
        align-items: center;
        width: 100%;
        > ul{
          padding: 0px;
          margin: 0px;
          list-style: none;
          li{
            margin-right: 10px;
            display: inline-flex;
            i{
              font-size: 20px;
            }
          }
        }
      }
    }
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > h1{
    display: inline-flex;
    margin-right: auto;
  }
  > a{
    display: inline-flex;
    align-items: center;
    margin-left: auto;
    color: #4b988b;
    > b{
      margin-right: 5px;
      color: #4b988b;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 2px solid #4b988b;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`

const Index = observer(() => {
  const store = useStore()
  const { user, handleNotification } = store.user
  const { activeColor, activeBackground, role } = user
  const [staff, setStaff] = React.useState({
    index: [],
    staffLoading: true
  })

  const getStaffs = async() => {
    try {
      const {data} = await ApiStaffs.index()
      setStaff(prev => ({...prev, index: data}))
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getStaffs()
  }, [])
  
  const { hexToRgb } = Helpers
  const {r, g, b} = hexToRgb(activeBackground)
  const background = "rgba("+r+", "+g+", "+b+", 0.3)"

  console.log(activeBackground, 'hello');

  return(
    <>
      <Wrapper>
        <Content>
          <Title>
            <h4><b>All</b></h4>
            <Link to={`/${role}/staffs/new`}><b>+</b>Add staff</Link>
          </Title>
          {staff.index.map((any, index) => {
            return(
              <Card key={any.id}>
                <Link to={`/${role}/staffs/${any.id}`}>
                  <div>
                    <img src={any?.avatar?.url}/>
                    <div>
                      <b>{any?.name}</b>
                      <span>{any?.email}</span>
                    </div>
                  </div>
                  <div>
                    <ul>
                      <li><i className="las la-map-marked-alt"></i></li>
                      <li><i className="la la-comment"></i></li>
                      <li><i className="la la-envelope"></i></li>
                    </ul>
                  </div>
                </Link>
              </Card>
            )
          })}
        </Content>
      </Wrapper>
    </>

  )
})

export default Index
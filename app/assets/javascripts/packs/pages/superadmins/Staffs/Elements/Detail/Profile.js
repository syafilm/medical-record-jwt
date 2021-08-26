import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding: 25px 15px;
  border-bottom:1px solid #d7e1e7;
  background: #fff;
  border-radius: 0px;
`

const Content = styled.div`
  display: flex;
  > div{
    display: flex;
    flex-direction: column;
    > h3{
      font-family: 'OpenSans Bold';
    }
    > span{
      font-size: 14px;
      color: rgba(0,0,0, 0.6);
    }
  }
`

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  object-fit: cover;
  object-position: cover;
  position: relative;
  margin-right: 10px;
`

const Information = styled.div`
  display: flex;
  margin-top: auto;
  ul{
    padding: 0px;
    margin: 0px;
    list-style: none;
    li{
      display: inline-flex;
      align-items: center;
      width: calc(50% - 30px);
      margin-right: 15px;
      margin-bottom: 10px;
      &:nth-of-type(3), 
      &:nth-of-type(4){
        margin-bottom: 0px;
      }
      font-size: 14px;
      > i {
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }
`

const Profile = ({
  detail,
}) => {
  return(
    <Wrapper>
      <Content>
        <Avatar src={detail.avatar.url}/>
        <div>
          <h3>{detail.name}</h3>
          <span>{detail.email}</span>
          <Information>
            <ul>
              <li><i className="las la-map-marked-alt"></i> Jakarta, Indonesia</li>
              <li><i className="la la-phone"></i> {detail.phone}</li>
              <li><i className="la la-envelope"></i> {detail.email}</li>
              <li><i className="la la-link"></i> marvlous.com</li>
            </ul>
          </Information>
        </div>
      </Content>
    </Wrapper>
  )
}

export default Profile
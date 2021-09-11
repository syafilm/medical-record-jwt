import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
`

const Section = styled.div`
  width: 33%;
  padding: 15px;
  &:first-of-type{
    padding-left: 0px;
  }
  &:last-of-type{
    padding-right: 0px;
  }
  > h4{
    font-family: 'OpenSans Bold';
  }
  > div{
    > h4{
      font-family: 'OpenSans Bold';
    }
    > span{
      font-size: 14px;
    }
    &:nth-of-type(1){
      margin-bottom: 15px;
    }
  }
  ul.attachment{
    display: flex;
    padding: 0px;
    margin: 0px;
    margin-bottom: 15px;
    flex-direction: column;
    > li{
      display: flex;
      align-items: flex-start;
      margin-bottom: 5px;
      > div{
        > span{
          &:first-of-type{
            color: #4b988b;
          }
        }
      }
      &:last-of-type{
        > span{
          font-size: 14px;
          color: #4b988b;
          cursor: pointer;
        }
      }
      > i{
        font-size: 34px;
        width: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      > div{
        margin-left: 10px;
        width: 100%;
        position: relative;
        > i{
          cursor: pointer;
          right: 0px;
          position: absolute;
          width: 16px;
          height: 16px;
          top: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #000;
          color: #fff;
          font-size: 10px;
          font-style: normal;
        }
        > span{
          display: flex;
          font-size: 14px;
          width: 100%;
          &:nth-of-type(2){
            font-size: 13px;
          }
          &:nth-of-type(1){
            margin-bottom: 0px;
            font-family: 'OpenSans Bold';
            position: relative;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            -webkit-line-clamp: 1;
            width: 95%;
          }
        }
      }
    }
  }
  ul.skills{
    padding: 0px;
    list-style: none;
    margin: 0px;
    > li{
      margin-right: 10px;
      display: inline-flex;
      > a{
        padding: 3px 0px;
        color: #4b988b;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 10px;
        display: flex; 
      }
    }
  }
  ul.social-media{
    padding: 0px;
    list-style: none;
    margin: 0px;
    li{
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      > a{
        display: flex;
        align-items: center;
        > i{
          margin-right: 5px;
          font-size: 22px;
        }
      }
    }
  }
  > span{
    font-size: 14px;
  }
`

const Information = ({
  staff,
  setShowModalAttachment,
  confirmDeleteFile,
  readablizeBytes,
}) => {
  return(
    <Wrapper>
      <Section>
        <div>
          <h4>About</h4>
          <span>I'm {staff.detail.name}, a software developer with a Computer Science degree from Binus University. In the past I've worked as an intern for presidential office staff developing in PHP and Javascript. Most of my personal work revolves around web development and graphics. This site is where I put my side projects when I finish them.</span>
        </div>
        <div>
          <h4>Attachment</h4>
          <ul className="attachment">
            {staff.attachments.map(a => {
              return <li key={a.id}>
                <i className="las la-file-alt"></i>
                <div>
                  <span>{a.name}</span>
                  <span>{readablizeBytes(a.size)}</span>
                  <i onClick={confirmDeleteFile(a.id, 'attachment')}>x</i>
                </div>
              </li>
            })}
            <li><span onClick={() =>{setShowModalAttachment(true)}}>Add an Attachment +</span></li>
          </ul>
        </div>
      </Section>
      <Section>
        <h4>Skills</h4>
        <ul className="skills">
          <li><a>web-development</a></li>
          <li><a>javascript</a></li>
          <li><a>mobile-app</a></li>
          <li><a>ruby</a></li>
          <li><a>nginx</a></li>
        </ul>
      </Section>
      <Section>
        <h4>Social Media</h4>
        <ul className="social-media">
          <li><a><i className="la la-facebook"></i> {staff.detail.name}</a></li>
          <li><a><i className="la la-twitter"></i> {staff.detail.name}</a></li>
          <li><a><i className="la la-linkedin"></i> {staff.detail.name}</a></li>
        </ul>
      </Section>
    </Wrapper>
  )
}

export default Information
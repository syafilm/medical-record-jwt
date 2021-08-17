import React from 'react'
import styled from '@emotion/styled'
import {Link, useParams, useLocation} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button, Dialog} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {ApiStaffs, ApiAttachments} from 'api'
import {ModelStaff, ModelAttachment} from 'models'
import {confirmAlert} from 'react-confirm-alert';
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'
import Wrapper from '../Wrapper'
import 'react-input-range/lib/css/index.css'
import uuid from 'uuid'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  > button{
    width: 100%;
  }
`

const Profile = styled.div`
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

const Card = styled.div`
  padding: 25px 15px;
  border-bottom:1px solid #d7e1e7;
  background: #fff;
  border-radius: 0px;
`

const Info = styled.div`
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

const Box = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`

const Section = styled.div`
  width: 33%;
  padding: 15px;
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

const Tab = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  > li{
    display: inline-flex;
    margin-right: 10px;
    a{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ECF1F4;
      padding: 6px 12px;
      border-radius: 5px;
      color: #4b988b;
      cursor: pointer;
      text-decoration: none;
      &.active {
        background: #4b988b;
        color: #ECF1F4;
      }
    }
  }
`

const TabDetail = styled.div`
  display: flex;
`

const Attachment = styled.div`
  padding: 15px;
  > button{
    width: 100%;
    margin-top: 15px;
  }
  #dropzone-preview{
    width: 100% !important;
    height: 50px !important;
    border: 1px dashed rgb(102, 102, 102) !important;
    border-radius: 5px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > span{
      font-size: 14px;
    }
  }
  > h4{
    font-family: 'OpenSans Bold';
    margin-bottom: 10px;
  }
  > ul{
    display: flex;
    padding: 0px;
    margin: 0px;
    margin-bottom: 15px;
    flex-direction: column;
    > li{
      display: flex;
      align-items: flex-start;
      margin-bottom: 5px;
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
`

const Detail = observer(() => {
  const location = useLocation();
  const store = useStore()
  const {slug} = useParams()
  const { user, handleNotification } = store.user
  const { activeColor, activeBackground } = user
  const query = new URLSearchParams(location.search)
  const tab = query.get('tab') === null ? 'information' : query.get('tab');
  const [staff, setStaff] = React.useState({
    detail: {},
    staffLoading: true,
    formFileLoading: false,
    files: [],
    filesLoading: [],
    temporaryFiles: [],
    fileError: '',
    activeTab: tab,
    modelId: '',
    modelType: 'staff',
  })
  const [showModalAttachment, setShowModalAttachment] = React.useState(false);

  const getStaffsDetail = async(slug) => {
    try {
      const detail = await ApiStaffs.detail(slug)
      const attachment = await ApiAttachments.list(slug, 'staff')
      setStaff(prev => ({...prev, 
        detail: detail.data,
        staffLoading: false,
        modelId: detail.data.id,
        files: attachment.data
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleFile = (staff) => (files) => {
    const newFiles = files.filter(any => (Validation.file(any.name) === ''))
    
    let i = 0
    while (i < newFiles.length) {
      const total = i++
      const theFile = {
        ...newFiles[total],
        name: newFiles[total].name, 
        size: newFiles[total].size, 
        uuid: uuid.v4(),
        progress: {}
      }
      handleUploadFile(staff, newFiles[total], theFile.uuid)
      setStaff(prev => ({...prev, temporaryFiles: prev.temporaryFiles.concat(theFile)}))
    }
  }

  const handleUploadProgress = (uuid) => (progress) => {
    setStaff(prev => ({
      ...prev, 
      temporaryFiles: prev.temporaryFiles.map(a => {
        if(a.uuid === uuid){
          return{...a, progress}
        }
        return {...a}
      })
    }))
  }

  const handleUploadFile = async(staff, file, uuid) => {
    try {
      const objectToSend = ModelAttachment.params({...staff, file, uuid})
      const {data} = await ApiAttachments.create(objectToSend, handleUploadProgress(uuid))
      setStaff(prev => 
        ({...prev,
          temporaryFiles: prev.temporaryFiles.map(a => {
            if(a.uuid === data.uuid){
              return{...a, progress: {}}
            }
            return {...a}
          })
        }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteFile = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text="Are you sure want to delete this file?"
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  };

  React.useEffect(() => {
    getStaffsDetail(slug)
  }, [slug, tab])

  const { hexToRgb, detailTabStaff, readablizeBytes } = Helpers
  const {r, g, b} = hexToRgb(activeBackground)

  if (process.env.ENV_APP === 'development') console.log(staff, 'object state')

  return(
    <>
      <Wrapper>
        <Content>
          {
            Object.keys(staff.detail).length > 0 &&
            <>
              <Card>
                <Profile>
                  <Avatar src={staff.detail.avatar.url}/>
                  <div>
                    <h3>{staff.detail.name}</h3>
                    <span>{staff.detail.email}</span>
                    <Info>
                      <ul>
                        <li><i className="las la-map-marked-alt"></i> Jakarta, Indonesia</li>
                        <li><i className="la la-phone"></i> {staff.detail.phone}</li>
                        <li><i className="la la-envelope"></i> {staff.detail.email}</li>
                        <li><i className="la la-link"></i> marvlous.com</li>
                      </ul>
                    </Info>
                  </div>
                </Profile>
              </Card>
              <Box>
                <Tab>
                  {detailTabStaff.map((a) => {
                    return <li key={a.slug}>
                      <Link
                        onClick={() => setStaff(prev => ({...prev, activeTab: a.slug}))}
                        replace
                        to={`${location.pathname}?tab=${a.slug}`} 
                        className={`${a.slug === staff.activeTab ? `active` : ``}`}>
                        {a.label}
                      </Link>
                    </li>
                  })}
                </Tab>
                <TabDetail>
                  <Section>
                    <div>
                      <h4>About</h4>
                      <span>I'm {staff.detail.name}, a software developer with a Computer Science degree from Brown University. In the past I've worked as an intern for Microsoft and Pixar developing in C++. Most of my personal work revolves around web development and graphics. This site is where I put my side projects when I finish them.</span>
                    </div>
                    <div>
                      <h4>Attachment</h4>
                      <ul className="attachment">
                        {staff.files.map(a => {
                          return <li key={a.id}>
                            <i className="las la-file-alt"></i>
                            <div>
                              <span>{a.name}</span>
                              <span>{readablizeBytes(a.size)}</span>
                              <i onClick={handleDeleteFile}>x</i>
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
                </TabDetail>
              </Box>
            </>
          }
        </Content>
      </Wrapper>
      <Modal
        show={showModalAttachment}
        onClose={() => {
          setShowModalAttachment(false)
        }}
        width={`400px`} 
        height={`auto`}>
        <Attachment>
          <h4>Attachment</h4>
          {
            staff.temporaryFiles.length > 0 &&
            <ul>
              {staff.temporaryFiles.map((a, index) => {
                return(
                  <li key={index}>
                    <i className="las la-file-alt"></i>
                    <div>
                      <span>{a.name}</span>
                      <span>{
                          Object.keys(a.progress).length > 0 ?
                          `${readablizeBytes(a.progress.loaded)} / ${readablizeBytes(a.size)} ${Math.round((a.progress.loaded * 100) / a.progress.total)}%` :
                          `${readablizeBytes(a.size)}`
                        }
                      </span>
                      <i>x</i>
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(staff)} id="dropzone-preview">
            <span>Pilih file</span>
          </Dropzone>
          <Button
            // onClick={handleUploadFile(staff)}
            color={activeColor}
            background={activeBackground}
            customLoading={true}
            loadingChildren={
              <span>10%</span>
            }
            loading={staff.formFileLoading}
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Attachment>
      </Modal>
    </>

  )
})

export default Detail
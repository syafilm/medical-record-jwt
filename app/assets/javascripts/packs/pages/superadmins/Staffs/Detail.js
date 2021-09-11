import React from 'react'
import styled from '@emotion/styled'
import {Link, useParams, useLocation} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button, Dialog} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'
import {
  ApiStaffs, 
  ApiDocuments, 
  ApiTags, 
  ApiEmployeeStates,
  ApiBankAccounts,
  ApiQualifications,
  ApiDepartments
} from 'api'
import {ModelStaff, ModelDocument} from 'models'
import {confirmAlert} from 'react-confirm-alert'
import {useDebounce} from 'use-debounce'
import moment from 'moment'
import avatar from 'images/avatar.png'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import InputRange from 'react-input-range'
import Wrapper from '../Wrapper'
import uuid from 'uuid'
import Information from './elements/Detail/Information'
import Profile from './elements/Detail/Profile'
import General from './elements/Detail/General'

const address = ['streetname', 'streetnumber', 'zipCode', 'region', 'country']
const mainInfo = ['department', 'qualification', 'tag']
const employeeState = ['entry', 'exit', 'contract']
const bankAccount = ['bankname', 'iban', 'bic', 'accountHolder']

const Content = styled.div`
  display: flex;
  flex-direction: column;
  > button{
    width: 100%;
  }
`

const Box = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
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
          cursor: pointer;
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
            color: #4b988b;
          }
        }
      }
    }
  }
`

const Archives = styled.div`
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
          cursor: pointer;
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
            color: #4b988b;
          }
        }
      }
    }
  }
`

const Wardtime = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 32.3%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Wardcontact = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 50%;
    padding-left: 15px;
    padding-right: 15px;
    > input{
      min-width: unset;
      width: auto;
    }
  }
`

const Documents = styled.div`
  display: flex;
  padding: 15px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  @media ${Breakpoints.laptop} {
    max-width: 768px;
  }
  > h3, h4{
    font-family: 'OpenSans Bold';
  }
`

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  > h3, h4{
    font-family: 'OpenSans Bold';
  }
  > div{
    display: inline-flex;
    align-items:center;
    margin-left: auto;
    color: #4b988b;
    > span{
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      &:nth-of-type(2){
        margin-left: 10px;
      }
      &:nth-of-type(1){
        > b{
          font-size: 12px;
          i{
            position: relative;
            top: 1px;
          }
        }
      }
    }
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
      font-style: normal;
    }
  }
`

const Table = styled.table`
  width: 100%;
  margin-bottom: 0rem;
  color: #212529;
  border-collapse: collapse;
  display: table;
  border-color: grey;
  > thead{
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    > tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }
    th{
      display: table-cell;
      vertical-align: inherit;
      vertical-align: bottom;
      border-bottom: 1px solid #dee2e6;
      font-family: 'OpenSans Bold';
      padding: .75rem;
      vertical-align: top;
      border-top: 0px solid #dee2e6;
      text-align:left;
      &:nth-of-type(1){
        width: 50%;
        padding-left: 0px;
      }
      &:nth-of-type(4){
        padding-right: 0px;
      }
    }
  }
  > tbody{
    tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
      &:nth-of-type(odd){
        background-color: rgba(44, 189, 165, 0.1);
      }
    }
    td{
      display: table-cell;
      vertical-align: inherit;
      padding: .75rem;
      vertical-align: top;
      border-top: 0px solid #dee2e6;
      font-size: 14px;
      &:nth-of-type(1){
        padding-left: 0px;
      }
      &:nth-of-type(4){
        padding-right: 0px;
      }
      > span{
        position: relative;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-line-clamp: 1;
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
    detail: {}, staffLoading: true, formFileLoading: false,
    typeInput: '',
    attachments: [], 
    attachmentsLoading: [], 
    temporaryAttachments: [],
    archives: [],
    temporaryArchives: [],
    archivesLoading: [],
    fileError: '', activeTab: tab, modelId: '',

    // --- general --- //
    modelType: 'staff', department: '', departmentOption: [],
    departmentError: '', qualification: [], qualificationOption: [],
    qualificationError: '',
    tag: [], tagOption: [], tagError: '',
    entry: '', entryError: '', 
    exit: '', exitError: '',
    contract: '', contractError: '',
    streetname: '', streetnameError: '',
    streetnumber: '', streetnumberError: '',
    zipCode: '', zipCodeError: '',
    region: '', regionError: '',
    country: '', countryError: '',
    bankname: '', banknameError: '',
    iban: '', ibanError: '',
    bic: '', bicError: '',
    accountHolder: '', accountHolderError: '',
   // --- general --- //

  })
  const [showModalAttachment, setShowModalAttachment] = React.useState(false);
  const [showModalArchives, setShowModalArchives] = React.useState(false);
  const [activeInputValue] = useDebounce(staff[staff.typeInput], 2000);
  const {hexToRgb, detailTabStaff, readablizeBytes, camelToSnakeCase, snakeToCamelCase, capitalizeFirstLetter} = Helpers

  const getStaffsDetail = async(slug) => {
    try {
      const detail = await ApiStaffs.detail(slug)
      const documentAttachment = await ApiDocuments.list(slug, 'staff', 'attachment')
      const documentArchive = await ApiDocuments.list(slug, 'staff', 'archive')
      const tags = await ApiTags.list()
      const departments = await ApiDepartments.list()
      const qualifications = await ApiQualifications.list()
      setStaff(prev => ({...prev,
        detail: detail.data,
        staffLoading: false,
        // it could be staff id or client id this name is in general
        modelId: detail.data.id || '',
        attachments: documentAttachment.data || [],
        archives: documentArchive.data || [],
        temporaryAttachments: documentAttachment.data || [],
        temporaryArchives: documentArchive.data || [],
        streetname: detail.data.streetname || '',
        streetnumber: detail.data.streetnumber || '',
        zipCode: detail.data.zip_code || '',
        region: detail.data.region || '',
        country: detail.data.country || '',
        tagOption: tags.data || [],
        tag: detail.data.tag || [],
        qualificationOption: qualifications.data || [],
        qualification: detail.data.qualification,
        departmentOption: departments.data || [],
        department: detail.data.department,
      }))
      return detail
    } catch (e) {
      console.log(e)
    }
  }

  const getEmployeeStateDetail = async(modelId) => {
    try {
      const employeeState = await ApiEmployeeStates.detail(modelId)
      const entry = employeeState?.data?.entry?.split('T')[0] || ''
      const exit = employeeState?.data?.exit?.split('T')[0] || ''
      const contract = employeeState?.data?.contract?.split('T')[0] || ''
      setStaff(prev => ({
        ...prev,
        entry,
        exit,
        contract
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const getBankAccountDetail = async(modelId) => {
    try {
      const bankAccount = await ApiBankAccounts.detail(modelId)
      const bankname = bankAccount.data.bankname || ''
      const iban = bankAccount.data.iban || ''
      const bic = bankAccount.data.bic || ''
      const accountHolder = bankAccount.data.account_holder || ''
      setStaff(prev => ({
        ...prev,
        bankname,
        iban,
        bic,
        accountHolder,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const updateMainInfo = async(value, attr) => {
    try {
      const snakeCaseAttr = camelToSnakeCase(attr)
      if(address.includes(attr)){
        const formAddress = new FormData()
        formAddress.append(`staff[${snakeCaseAttr}]`, value)
        const dataAddress = await ApiStaffs.update(staff.modelId, formAddress)
        console.log(dataAddress)
      }if(mainInfo.includes(attr)){
        const formMainInfo = new FormData()
        if (attr === 'tag' || attr === 'qualification') {
          const newAttr = attr === 'tag' ? 'tag_arr' : 'qualification_arr'
          value.map(t => formMainInfo.append(`staff[${newAttr}][]`, t.label))
        }else{
          formMainInfo.append(`staff[${snakeCaseAttr}]`, value)
        }
        const dataMainInfo = await ApiStaffs.update(staff.modelId, formMainInfo)
        console.log(dataMainInfo)
      }else if(employeeState.includes(attr)){
        const formEmployee = new FormData()
        formEmployee.append(`employee_state[${snakeCaseAttr}]`, value)
        const dataEmployeeState = await ApiEmployeeStates.update(staff.modelId, formEmployee)
        console.log(dataEmployeeState)
      }else if(bankAccount.includes(attr)){
        const formBank = new FormData()
        formBank.append(`bank_account[${snakeCaseAttr}]`, value)
        const dataBankAccount = await ApiBankAccounts.update(staff.modelId, formBank)
        console.log(dataBankAccount)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleFile = (staff, type) => (files) => {
    const newFiles = files.filter(any => (Validation.file(any.name) === ''))
    
    let i = 0
    while (i < newFiles.length) {
      const total = i++
      const theFile = {
        name: newFiles[total].name, 
        size: newFiles[total].size,
        file: {
          url: newFiles[total].preview
        },
        uuid: uuid.v4(),
        progress: {}
      }
      handleUploadFile(staff, newFiles[total], theFile.uuid, type)
      const stateType = capitalizeFirstLetter(type)
      setStaff(prev => ({...prev, [`temporary${stateType}s`]: prev[`temporary${stateType}s`].concat(theFile)}))
    }
  }

  const handleUploadProgress = (uuid, type) => (progress) => {
    const stateType = capitalizeFirstLetter(type)
    setStaff(prev => ({
      ...prev,
      [`temporary${stateType}s`]: prev[`temporary${stateType}s`].map(a => {
        if(a.uuid === uuid){
          return{...a, progress}
        }
        return {...a}
      })
    }))
  }

  const handleDeleteFile = async(id, type) => {
    try {
      const {data} = await ApiDocuments.destroy(id)
      if (process.env.ENV_APP === 'development') {
        console.log(`${type === 'attachment' ? `attachment` : `archive`} successfully deleted`)
        getStaffsDetail(slug)
      }
    } catch (e) {
      console.log(e)      
    }
  }

  const handleUploadFile = async(staff, file, uuid, uploadType) => {
    try {
      const objectToSend = ModelDocument.params({...staff, file, uuid, uploadType})
      const {data} = await ApiDocuments.create(objectToSend, handleUploadProgress(uuid, uploadType))
      const stateType = capitalizeFirstLetter(uploadType)
      setStaff(prev => 
        ({...prev,
          [`temporary${stateType}s`]: prev[`temporary${stateType}s`].map(a => {
            if(a.uuid === data.uuid){
              return{...a, ...data, progress: {}}
            }
            return {...a}
          })
        }))
    } catch (e) {
      console.log(e)
    }
  }

  const handleInputSelect = (type) => (newValue) => {
    setStaff(prev => ({
      ...prev, [type]: newValue,
      [`${type}Error`]: Validation.checkExist(newValue, type, true),
      typeInput: type
    }))
  }

  const handleInput = (type) => (e) => {
    const {value} = e.target
    setStaff(prev => ({
      ...prev,
      [type]: value,
      [`${type}Error`]: type === 'email' ? (Validation.checkExist(value, type, true) === '' ? 
        Validation.checkEmail(value, type) : Validation.checkExist(value, type, true))
      : Validation.checkExist(value, type, true),
      typeInput: type
    }))
  }

  const confirmDeleteFile = (id, type) => () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text={`Are you sure want to delete this ${type === 'attachment' ? `attachment?` : `archive?`}`}
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              handleDeleteFile(id, type);
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  };

  React.useEffect(() => {
    if(Validation.checkExist(staff.typeInput) && 
      Validation.checkExist(activeInputValue)){
      updateMainInfo(activeInputValue, staff.typeInput)
    }else{
      getStaffsDetail(slug).then(({data}) => {
        getEmployeeStateDetail(data.id)
        getBankAccountDetail(data.id)
      })
    }
  }, [slug, tab, activeInputValue])

  const {r, g, b} = hexToRgb(activeBackground)
  const {
    detail, activeTab, temporaryAttachments, 
    formFileLoading, temporaryArchives,
    departmentError, departmentOption, department,
    qualification, qualificationError, qualificationOption,
    tag, tagOption, tagError,
    entry, entryError, exit, exitError,
    contract, contractError,
    streetname, streetnameError,
    streetnumber, streetnumberError,
    zipCode, zipCodeError,
    region, regionError,
    country, countryError,
    bankname, banknameError,
    iban, ibanError,
    bic, bicError,
    accountHolder, accountHolderError,
  } = staff

  if (process.env.ENV_APP === 'development') console.log(staff, 'object state')

  return(
    <>
      <Wrapper>
        <Content>
          {
            Object.keys(detail).length > 0 &&
            <>
              <Profile detail={detail}/>
              <Box>
                <Tab>
                  {detailTabStaff.map((a) => {
                    return <li key={a.slug}>
                      <Link
                        onClick={() => setStaff(prev => ({...prev, activeTab: a.slug}))}
                        replace
                        to={`${location.pathname}?tab=${a.slug}`} 
                        className={`${a.slug === activeTab ? `active` : ``}`}>
                        {a.label}
                      </Link>
                    </li>
                  })}
                </Tab>
                {
                  activeTab === 'information' &&
                  (<Information
                    staff={staff}
                    setShowModalAttachment={setShowModalAttachment}
                    confirmDeleteFile={confirmDeleteFile}
                    readablizeBytes={readablizeBytes}
                  />)
                }
                {
                  activeTab === 'general' && 
                  (
                    <General
                      handleInput={handleInput}
                      handleInputSelect={handleInputSelect}
                      department={department}
                      departmentError={departmentError}
                      departmentOption={departmentOption}
                      tag={tag}
                      tagError={tagError}
                      tagOption={tagOption}
                      qualification={qualification}
                      qualificationError={qualificationError}
                      qualificationOption={qualificationOption}
                      streetname={streetname}
                      streetnameError={streetnameError}
                      streetnumber={streetnumber}
                      streetnumberError={streetnumberError}
                      zipCode={zipCode}
                      zipCodeError={zipCodeError}
                      region={region}
                      regionError={regionError}
                      country={country}
                      countryError={countryError}
                      entry={entry}
                      entryError={entryError}
                      exit={exit}
                      exitError={exitError}
                      contract={contract}
                      contractError={contractError}
                      bankname={bankname}
                      banknameError={banknameError}
                      iban={iban}
                      ibanError={ibanError}
                      bic={bic}
                      bicError={bicError}
                      accountHolder={accountHolder}
                      accountHolderError={accountHolderError}
                    />
                  )
                }
                {
                  activeTab === 'documents' &&
                  <Documents>
                    <Subtitle>
                      <h4>Employee Archive</h4>
                      <div>
                        <b onClick={() => {
                          setShowModalArchives(true)
                        }}>+</b>
                      </div>
                    </Subtitle>
                    <Table style={{marginTop: '10px'}}>
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Extension</th>
                          <th scope="col">Size</th>
                          <th scope="col">Last Changed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          staff.archives.map((a) => {
                            return(
                              <tr key={a.id}>
                                <td scope="row">
                                  <span>
                                    {a.name}
                                  </span>
                                </td>
                                <td>{a.extension}</td>
                                <td>{readablizeBytes(a.size)}</td>
                                <td>{a.updated_at.split('T')[0]}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </Documents>
                }
              </Box>
            </>
          }
        </Content>
      </Wrapper>

      {/* Modal attachment */}
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
            temporaryAttachments.length > 0 &&
            <ul>
              {temporaryAttachments.map((a, index) => {
                return(
                  <li key={index}>
                    <i className="las la-file-alt"></i>
                    <div>
                      <span>{a.name}</span>
                      <span>
                        {
                          (Object.keys(a).includes('progress') && 
                          Object.keys(a.progress).length > 0) ?
                          `${readablizeBytes(a.progress.loaded)} / ${readablizeBytes(a.size)} ${Math.round((a.progress.loaded * 100) / a.progress.total)}%` :
                          `${readablizeBytes(a.size)}`
                        }
                      </span>
                      {
                        Object.keys(a).includes('created_at') && 
                        <i onClick={confirmDeleteFile(a.id, 'attachment')}>x</i>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(staff, 'attachment')} id="dropzone-preview">
            <span>Pilih file</span>
          </Dropzone>
          <Button
            onClick={() => {
              setShowModalAttachment(false)
              getStaffsDetail(slug)
            }}
            color={activeColor}
            background={activeBackground}
            customLoading={true}
            loadingChildren={
              <span>10%</span>
            }
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Attachment>
      </Modal>

      {/* Modal document */}
      <Modal 
        show={showModalArchives}
        onClose={() => {
          setShowModalArchives(false)
        }}
        width={`400px`} 
        height={`auto`}>
        <Archives>
          <h4>Documents</h4>
          {
            temporaryArchives.length > 0 &&
            <ul>
              {temporaryArchives.map((a, index) => {
                return(
                  <li key={index}>
                    <i className="las la-file-alt"></i>
                    <div>
                      <span>{a.name}</span>
                      <span>
                        {
                          (Object.keys(a).includes('progress') && 
                          Object.keys(a.progress).length > 0) ?
                          `${readablizeBytes(a.progress.loaded)} / ${readablizeBytes(a.size)} ${Math.round((a.progress.loaded * 100) / a.progress.total)}%` :
                          `${readablizeBytes(a.size)}`
                        }
                      </span>
                      {
                        Object.keys(a).includes('created_at') && 
                        <i onClick={confirmDeleteFile(a.id, 'archive')}>x</i>
                      }
                    </div>
                  </li>
                )
              })}
            </ul>
          }
          <Dropzone multiple onDrop={handleFile(staff, 'archive')} id="dropzone-preview">
            <span>Pilih file</span>
          </Dropzone>
          <Button
            onClick={() => {
              setShowModalDocuments(false)
              getStaffsDetail(slug)
            }}
            color={activeColor}
            background={activeBackground}
            customLoading={true}
            loadingChildren={
              <span>10%</span>
            }
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Archives>
      </Modal>
    </>

  )
})

export default Detail
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
  ApiClinicStructures, 
  ApiEmployeeStates,
  ApiBankAccounts,
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

const clinicAddress = ['streetname', 'streetnumber', 'zipCode', 'region', 'country', 'companyName', 'ceoOwner', 'website', 'phoneClinic']
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

const General = styled.div`
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

const Form = styled.div`
  display: block;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
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
  }
`

const Employeetime = styled.div`
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

const Address = styled.div`
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

const Region = styled.div`
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

const Company = styled.div`
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

const Banking = styled.div`
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
    files: [], filesLoading: [], temporaryFiles: [],
    fileError: '', activeTab: tab, modelId: '',

    // --- clinic structure --- //
    modelType: 'staff', department: '', departmentOption: [],
    departmentError: '', contactName: '', contactNameOption: [],
    contactNameError: '', early: '', earlyError: '',
    midnight: '', midnightError: '', late: '',
    lateError: '', contactEmail: '', contactEmailError: '',
    contactNumber: '', contactNumberError: '', entry: '',
    entryError: '', exit: '', exitError: '',
    contract: '', contractError: '',
    streetname: '', streetnameError: '',
    streetnumber: '', streetnumberError: '',
    zipCode: '', zipCodeError: '',
    region: '', regionError: '',
    country: '', countryError: '',
    companyName: '', companyNameError: '',
    ceoOwner: '', ceoOwnerError: '',
    website: '', websiteError: '',
    phoneClinic: '', phoneClinicError: '',
    bankname: '', banknameError: '',
    iban: '', ibanError: '',
    bic: '', bicError: '',
    accountHoldler: '', accountHoldlerError: '',
   // --- clinic structure --- //

  })
  const [showModalAttachment, setShowModalAttachment] = React.useState(false);
  const [activeInputValue] = useDebounce(staff[staff.typeInput], 2000);
  const {hexToRgb, detailTabStaff, readablizeBytes, camelToSnakeCase, snakeToCamelCase} = Helpers

  const getStaffsDetail = async(slug) => {
    try {
      const detail = await ApiStaffs.detail(slug)
      const attachment = await ApiDocuments.list(slug, 'staff')
      await getClinicStructuresDetail(slug)
      setStaff(prev => ({...prev, 
        detail: detail.data,
        staffLoading: false,
        modelId: detail.data.id,
        files: attachment.data,
        temporaryFiles: attachment.data,
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const getClinicStructuresDetail = async(slug) => {
    try {
      const detail = await ApiClinicStructures.detail(slug)
      Object.keys(detail.data).map(a => {
        if(detail.data[a] === null){
          setStaff(prev => ({...prev, [snakeToCamelCase(a)]: ''}))
        }else{
          setStaff(prev => ({...prev, [snakeToCamelCase(a)]: detail.data[a]}))
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const updateClinicStructureDetail = async(value, attr) => {
    try {
      const snakeCaseAttr = camelToSnakeCase(attr)
      if(clinicAddress.includes(attr)){
        const formClinic = new FormData()
        formClinic.append(`clinic_structure[${snakeCaseAttr}]`, value);
        const dataClinicStructure = await ApiClinicStructures.update(staff.modelId, formClinic)
        console.log(dataClinicStructure)
      }else if(employeeState.includes(attr)){
        const formEmployee = new FormData()
        formEmployee.append(`employee_state[${snakeCaseAttr}]`, value);
        const dataEmployeeState = await ApiEmployeeStates.update(staff.modelId, formEmployee)
        console.log(dataEmployeeState)
      }else if(bankAccount.includes(attr)){
        const formBank = new FormData()
        formBank.append(`bank_account[${snakeCaseAttr}]`, value);
        const dataBankAccount = await ApiBankAccounts.update(staff.modelId, formBank)
        console.log(dataBankAccount)
      }
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
        name: newFiles[total].name, 
        size: newFiles[total].size,
        file: {
          url: newFiles[total].preview
        },
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

  const handleDeleteFile = async(id) => {
    try {
      const {data} = await ApiDocuments.destroy(id)
      if (process.env.ENV_APP === 'development') {
        console.log('file successfully deleted')
        getStaffsDetail(slug)
      }
    } catch (e) {
      console.log(e)      
    }
  }

  const handleUploadFile = async(staff, file, uuid) => {
    try {
      const objectToSend = ModelDocument.params({...staff, file, uuid})
      const {data} = await ApiDocuments.create(objectToSend, handleUploadProgress(uuid))
      setStaff(prev => 
        ({...prev,
          temporaryFiles: prev.temporaryFiles.map(a => {
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
      [`${type}Error`]: Validation.checkExist(newValue, type, true)
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

  const confirmDeleteFile = (id) => () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Dialog
            text="Are you sure want to delete this file?"
            textNo="No"
            textYes="Yes"
            onClickNo={onClose}
            onClickYes={() => {
              handleDeleteFile(id);
              onClose();
            }}
            buttonColor="danger"
          />
        );
      },
    });
  };

  React.useEffect(() => {
    if(Validation.checkExist(staff.typeInput)){
      updateClinicStructureDetail(activeInputValue, staff.typeInput)
    }else{
      getStaffsDetail(slug)
    }
  }, [slug, tab, activeInputValue])

  const {r, g, b} = hexToRgb(activeBackground)
  const {
    detail, activeTab, temporaryFiles, formFileLoading,
    departmentError, departmentOption, department,
    early, earlyError, midnight, midnightError, late, lateError,
    contactName, contactNameError, contactNameOption,
    contactEmail, contactEmailError, contactNumber, contactNumberError,
    entry, entryError, exit, exitError,
    contract, contractError,
    streetname, streetnameError, streetnumber, 
    streetnumberError, zipCode, zipCodeError,
    region, regionError,
    country, countryError,
    companyName, companyNameError,
    ceoOwner, ceoOwnerError,
    website, websiteError,
    phoneClinic, phoneClinicError,
    bankname, banknameError,
    iban, ibanError,
    bic, bicError,
    accountHoldler, accountHoldlerError,
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
                    <General>
                      <Subtitle>
                        <h4>Clinic Structure</h4>
                        <div>
                          {/* &bull; */}
                          <span><b>+</b> Add</span>
                        </div>
                      </Subtitle>
                      <Form>
                        <Select
                          label={
                            (departmentError === '' ? <label>Department&nbsp;<span className="optional">(optional)</span></label> :
                            <label className="error">{departmentError}</label>)
                          }
                          options={departmentOption}
                          value={department}
                          error={departmentError}
                          onChange={handleInputSelect('department')}
                        />
                        <Wardtime>
                          <Input
                            label={
                              (earlyError === '' ? <label>Early shift</label> :
                              <label className="error">{earlyError}</label>)
                            }
                            placeholder="Early shift"
                            value={early}
                            error={earlyError}
                            type="text"
                            onChange={handleInput('early')}
                          />
                          <Input 
                            label={
                              (midnightError === '' ? <label>Mid shift</label> :
                              <label className="error">{midnightError}</label>)
                            }
                            placeholder="Mid shift"
                            value={midnight}
                            error={midnightError}
                            type="text"
                            onChange={handleInput('midnight')}
                          />
                          <Input 
                            label={
                              (lateError === '' ? <label>Late shift</label> :
                              <label className="error">{lateError}</label>)
                            }
                            placeholder="Mid shift"
                            value={late}
                            error={lateError}
                            type="text"
                            onChange={handleInput('late')}
                          />
                        </Wardtime>
                        <Select
                          label={
                            (contactNameError === '' ? <label>Main Contact on Ward</label> :
                            <label className="error">{contactNameError}</label>)
                          }
                          options={contactNameOption}
                          value={contactName}
                          error={contactNameError}
                          onChange={handleInputSelect('contactName')}
                        />
                        <Wardcontact>
                          <Input 
                            label={null}
                            placeholder="Contact email"
                            value={contactEmail}
                            error={contactEmailError}
                            type="text"
                            onChange={handleInput('contactEmail')}
                          />
                          <Input
                            label={null}
                            placeholder="Contact number"
                            value={contactNumber}
                            error={contactNumberError}
                            type="text"
                            onChange={handleInput('contactNumber')}
                          />
                        </Wardcontact>
                      </Form>
                      <Subtitle>
                        <h4>Employee State</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Employeetime>
                          <Input 
                            label={
                              (entryError === '' ? <label>Entry Date</label> :
                              <label className="error">{entryError}</label>)
                            }
                            placeholder="Entry date"
                            value={entry}
                            error={entryError}
                            type="date"
                            onChange={handleInput('entry')}
                          />
                          <Input 
                            label={
                              (exitError === '' ? <label>Exit Date</label> :
                              <label className="error">{exitError}</label>)
                            }
                            placeholder="Exit Date"
                            value={exit}
                            error={exitError}
                            type="date"
                            onChange={handleInput('exit')}
                          />
                          <Input 
                            label={
                              (contractError === '' ? <label>Contract until</label> :
                              <label className="error">{contractError}</label>)
                            }
                            placeholder="Contract until"
                            value={contract}
                            error={contractError}
                            type="date"
                            onChange={handleInput('contract')}
                          />
                        </Employeetime>
                      </Form>
                      <Subtitle>
                        <h4>Clinic Adress</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Address>
                          <Input 
                            label={
                              (streetnameError === '' ? <label>Streetname</label> :
                              <label className="error">{streetnameError}</label>)
                            }
                            placeholder="Street"
                            value={streetname}
                            error={streetnameError}
                            type="text"
                            onChange={handleInput('streetname')}
                          />
                          <Input 
                            label={
                              (streetnumberError === '' ? <label>Streetnumber</label> :
                              <label className="error">{streetnumberError}</label>)
                            }
                            placeholder="Street number"
                            value={streetnumber}
                            error={streetnumberError}
                            type="text"
                            onChange={handleInput('streetnumber')}
                          />
                        </Address>
                        <Region>
                          <Input
                            label={
                              (zipCodeError === '' ? <label>Zip code</label> :
                              <label className="error">{zipCodeError}</label>)
                            }
                            placeholder="Zipcode"
                            value={zipCode}
                            error={zipCodeError}
                            type="text"
                            onChange={handleInput('zipCode')}
                          />
                          <Input
                            label={
                              (regionError === '' ? <label>Region</label> :
                              <label className="error">{regionError}</label>)
                            }
                            placeholder="Region"
                            value={region}
                            error={regionError}
                            type="text"
                            onChange={handleInput('region')}
                          />
                          <Input
                            label={
                              (countryError === '' ? <label>Country</label> :
                              <label className="error">{countryError}</label>)
                            }
                            placeholder="Country"
                            value={country}
                            error={countryError}
                            type="text"
                            onChange={handleInput('country')}
                          />
                        </Region>
                        <Company>
                          <Input
                            label={
                              (companyNameError === '' ? <label>Company Name</label> :
                              <label className="error">{companyNameError}</label>)
                            }
                            placeholder="Company"
                            value={companyName}
                            error={companyNameError}
                            type="text"
                            onChange={handleInput('companyName')}
                          />
                          <Input
                            label={
                              (ceoOwnerError === '' ? <label>CEO / Owner</label> :
                              <label className="error">{ceoOwnerError}</label>)
                            }
                            placeholder="CEO / Owner"
                            value={ceoOwner}
                            error={ceoOwnerError}
                            type="text"
                            onChange={handleInput('ceoOwner')}
                          />
                        </Company>
                        <Company>
                          <Input
                            label={
                              (websiteError === '' ? <label>Website</label> :
                              <label className="error">{websiteError}</label>)
                            }
                            placeholder="Website"
                            value={website}
                            error={websiteError}
                            type="text"
                            onChange={handleInput('website')}
                          />
                          <Input
                            label={
                              (phoneClinicError === '' ? <label>Telephone Clinic</label> :
                              <label className="error">{phoneClinicError}</label>)
                            }
                            placeholder="Telephone Clinic"
                            value={phoneClinic}
                            error={phoneClinicError}
                            type="text"
                            onChange={handleInput('phoneClinic')}
                          />
                        </Company>
                      </Form>
                      <Subtitle>
                        <h4>Banking</h4>
                        <div>
                        </div>
                      </Subtitle>
                      <Form>
                        <Banking>
                          <Input
                            label={
                              (banknameError === '' ? <label>Bankname</label> :
                              <label className="error">{banknameError}</label>)
                            }
                            placeholder="Bankname"
                            value={bankname}
                            error={banknameError}
                            type="text"
                            onChange={handleInput('bankname')}
                          />
                          <Input
                            label={
                              (ibanError === '' ? <label>IBAN</label> :
                              <label className="error">{ibanError}</label>)
                            }
                            placeholder="IBAN"
                            value={iban}
                            error={ibanError}
                            type="text"
                            onChange={handleInput('iban')}
                          />
                        </Banking>
                        <Banking>
                          <Input
                            label={
                              (bicError === '' ? <label>BIC</label> :
                              <label className="error">{bicError}</label>)
                            }
                            placeholder="BIC"
                            value={bic}
                            error={bicError}
                            type="text"
                            onChange={handleInput('bic')}
                          />
                          <Input
                            label={
                              (accountHoldlerError === '' ? <label>Account Holdler</label> :
                              <label className="error">{accountHoldlerError}</label>)
                            }
                            placeholder="Account Holdler"
                            value={accountHoldler}
                            error={accountHoldlerError}
                            type="text"
                            onChange={handleInput('accountHoldler')}
                          />
                        </Banking>
                      </Form>
                    </General>
                  )
                }
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
            temporaryFiles.length > 0 &&
            <ul>
              {temporaryFiles.map((a, index) => {
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
                        <i onClick={confirmDeleteFile(a.id)}>x</i>
                      }
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
            loading={formFileLoading}
            borderColor={activeBackground}>
            <b>Upload file</b>
          </Button>
        </Attachment>
      </Modal>
    </>

  )
})

export default Detail
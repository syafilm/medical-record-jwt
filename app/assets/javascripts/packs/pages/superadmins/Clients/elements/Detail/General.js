import React from 'react'
import styled from '@emotion/styled'
import {Input, Select} from 'components'
import {Breakpoints} from 'utils'

const Wrapper = styled.div`
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
  &:nth-of-type(1), 
  &:nth-of-type(2),
  &:nth-of-type(3){
    > div{
      > div{
        > div{
          &:nth-of-type(1){
            margin-right: 30px;
          }
        }
      }
    }
  }
  > div{
    width: 33.3%;
    padding-left: 15px;
    padding-right: 15px;
    display: inline-flex;
    flex-direction: column;
    > label{
      display: flex;
    }
    > div{
      width: 100%;
      display: inline-flex;
      > div{
        width: 50%;
      }
    }
    input{
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

const General = ({
  client,
  handleInput,
  handleInputSelect,
}) => {
  return (
    <Wrapper>
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
            (client.departmentError === '' ? <label>Department&nbsp;<span className="optional">(optional)</span></label> :
            <label className="error">{client.departmentError}</label>)
          }
          options={client.departmentOption}
          value={client.department}
          error={client.departmentError}
          onChange={handleInputSelect('department')}
        />
        <Wardtime>
          <div>
            <label>Early shift time (start - end)</label>
            <div>
              <Input
                label={null}
                placeholder="Early start shift"
                value={client.earlyStart}
                error={client.earlyStartError}
                type="time"
                onChange={handleInput('earlyStart')}
              />
              <Input
                label={null}
                placeholder="Early end shift"
                value={client.earlyEnd}
                error={client.earlyEndError}
                type="time"
                onChange={handleInput('earlyEnd')}
              />
            </div>
          </div>
          <div>
            <label>Mid shift time (start - end)</label>
            <div>
              <Input 
                label={null}
                placeholder="Mid shift"
                value={client.middleStart}
                error={client.middleStartError}
                type="time"
                onChange={handleInput('middleStart')}
              />
              <Input 
                label={null}
                placeholder="Mid shift"
                value={client.middleEnd}
                error={client.middleEndError}
                type="time"
                onChange={handleInput('middleEnd')}
              />
            </div>
          </div>
          <div>
            <label>Late shift time (start - end)</label>
            <div>
              <Input 
                label={null}
                placeholder="Mid shift"
                value={client.lateStart}
                error={client.lateStartError}
                type="time"
                onChange={handleInput('lateStart')}
              />
              <Input 
                label={null}
                placeholder="Mid shift"
                value={client.lateEnd}
                error={client.lateEndError}
                type="time"
                onChange={handleInput('lateEnd')}
              />
            </div>
          </div>
        </Wardtime>
        <Select
          label={
            (client.contactError === '' ? <label>Main Contact on Ward</label> :
            <label className="error">{client.contactError}</label>)
          }
          options={client.contactOption}
          value={client.contact}
          error={client.contactError}
          onChange={handleInputSelect('contact')}
        />
        <Wardcontact>
          <Input 
            label={null}
            placeholder="Contact email"
            value={client.contactEmail}
            error={client.contactEmailError}
            type="text"
            onChange={handleInput('contactEmail')}
          />
          <Input
            label={null}
            placeholder="Contact number"
            value={client.contactPhone}
            error={client.contactPhoneError}
            type="text"
            onChange={handleInput('contactPhone')}
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
              (client.entryError === '' ? <label>Entry Date</label> :
              <label className="error">{client.entryError}</label>)
            }
            placeholder="Entry date"
            value={client.entry}
            error={client.entryError}
            type="date"
            onChange={handleInput('entry')}
          />
          <Input 
            label={
              (client.exitError === '' ? <label>Exit Date</label> :
              <label className="error">{client.exitError}</label>)
            }
            placeholder="Exit Date"
            value={client.exit}
            error={client.exitError}
            type="date"
            onChange={handleInput('exit')}
          />
          <Input 
            label={
              (client.contractError === '' ? <label>Contract until</label> :
              <label className="error">{client.contractError}</label>)
            }
            placeholder="Contract until"
            value={client.contract}
            error={client.contractError}
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
              (client.streetnameError === '' ? <label>Streetname</label> :
              <label className="error">{client.streetnameError}</label>)
            }
            placeholder="Street"
            value={client.streetname}
            error={client.streetnameError}
            type="text"
            onChange={handleInput('streetname')}
          />
          <Input 
            label={
              (client.streetnumberError === '' ? <label>Streetnumber</label> :
              <label className="error">{client.streetnumberError}</label>)
            }
            placeholder="Street number"
            value={client.streetnumber}
            error={client.streetnumberError}
            type="text"
            onChange={handleInput('streetnumber')}
          />
        </Address>
        <Region>
          <Input
            label={
              (client.zipCodeError === '' ? <label>Zip code</label> :
              <label className="error">{client.zipCodeError}</label>)
            }
            placeholder="Zipcode"
            value={client.zipCode}
            error={client.zipCodeError}
            type="text"
            onChange={handleInput('zipCode')}
          />
          <Input
            label={
              (client.regionError === '' ? <label>Region</label> :
              <label className="error">{client.regionError}</label>)
            }
            placeholder="Region"
            value={client.region}
            error={client.regionError}
            type="text"
            onChange={handleInput('region')}
          />
          <Input
            label={
              (client.countryError === '' ? <label>Country</label> :
              <label className="error">{client.countryError}</label>)
            }
            placeholder="Country"
            value={client.country}
            error={client.countryError}
            type="text"
            onChange={handleInput('country')}
          />
        </Region>
        <Company>
          <Input
            label={
              (client.companyNameError === '' ? <label>Company Name</label> :
              <label className="error">{client.companyNameError}</label>)
            }
            placeholder="Company"
            value={client.companyName}
            error={client.companyNameError}
            type="text"
            onChange={handleInput('companyName')}
          />
          <Input
            label={
              (client.ceoOwnerError === '' ? <label>CEO / Owner</label> :
              <label className="error">{client.ceoOwnerError}</label>)
            }
            placeholder="CEO / Owner"
            value={client.ceoOwner}
            error={client.ceoOwnerError}
            type="text"
            onChange={handleInput('ceoOwner')}
          />
        </Company>
        <Company>
          <Input
            label={
              (client.websiteError === '' ? <label>Website</label> :
              <label className="error">{client.websiteError}</label>)
            }
            placeholder="Website"
            value={client.website}
            error={client.websiteError}
            type="text"
            onChange={handleInput('website')}
          />
          <Input
            label={
              (client.phoneClinicError === '' ? <label>Telephone Clinic</label> :
              <label className="error">{client.phoneClinicError}</label>)
            }
            placeholder="Telephone Clinic"
            value={client.phoneClinic}
            error={client.phoneClinicError}
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
              (client.banknameError === '' ? <label>Bankname</label> :
              <label className="error">{client.banknameError}</label>)
            }
            placeholder="Bankname"
            value={client.bankname}
            error={client.banknameError}
            type="text"
            onChange={handleInput('bankname')}
          />
          <Input
            label={
              (client.ibanError === '' ? <label>IBAN</label> :
              <label className="error">{client.ibanError}</label>)
            }
            placeholder="IBAN"
            value={client.iban}
            error={client.ibanError}
            type="text"
            onChange={handleInput('iban')}
          />
        </Banking>
        <Banking>
          <Input
            label={
              (client.bicError === '' ? <label>BIC</label> :
              <label className="error">{client.bicError}</label>)
            }
            placeholder="BIC"
            value={client.bic}
            error={client.bicError}
            type="text"
            onChange={handleInput('bic')}
          />
          <Input
            label={
              (client.accountHolderError === '' ? <label>Account Holder</label> :
              <label className="error">{client.accountHolderError}</label>)
            }
            placeholder="Account Holder"
            value={client.accountHolder}
            error={client.accountHolderError}
            type="text"
            onChange={handleInput('accountHolder')}
          />
        </Banking>
      </Form>
    </Wrapper>
  )
}

export default General

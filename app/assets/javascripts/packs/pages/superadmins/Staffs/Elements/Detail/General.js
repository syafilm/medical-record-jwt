import React from 'react'
import styled from '@emotion/styled'
import {Link, useParams, useLocation} from 'react-router-dom'
import {useStore} from 'context'
import {observer} from 'mobx-react'
import {Input, Select, Modal, Button, Dialog} from 'components'
import {Helpers, Breakpoints, Validation} from 'utils'

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

const Form = styled.div`
  display: block;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
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

const Country = styled.div`
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
  > div{
    width: 100%;
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
  handleInput,
  handleInputSelect,
  department,
  departmentError,
  departmentOption,
  tag,
  tagError,
  tagOption,
  qualification,
  qualificationError,
  qualificationOption,
  streetname,
  streetnameError,
  streetnumber,
  streetnumberError,
  zipCode,
  zipCodeError,
  region,
  regionError,
  country,
  countryError,
  entry,
  entryError,
  exit,
  exitError,
  contract,
  contractError,
  bankname,
  banknameError,
  iban,
  ibanError,
  bic,
  bicError,
  accountHolder,
  accountHolderError
}) => {
  return(
      <Wrapper>
        <Subtitle>
          <h4>Main info</h4>
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
          <Select
            label={
              (qualificationError === '' ? <label>Qualification</label> :
              <label className="error">{qualificationError}</label>)
            }
            options={qualificationOption}
            value={qualification}
            error={qualificationError}
            multiple={true}
            onChange={handleInputSelect('qualification')}
          />
          <Select
            label={
              (tagError === '' ? <label>Tag</label> :
              <label className="error">{tagError}</label>)
            }
            options={tagOption}
            multiple={true}
            value={tag}
            error={tagError}
            onChange={handleInputSelect('tag')}
          />
        </Form>
        <Subtitle>
          <h4>Address</h4>
        </Subtitle>
        <Form>
          <Address>
            <Input 
              label={
                (streetnameError === '' ? <label>Streetname</label> :
                <label className="error">{streetnameError}</label>)
              }
              placeholder="Streetname"
              value={streetname}
              error={streetnameError}
              onChange={handleInput('streetname')}
            />
            <Input 
              label={
                (streetnumberError === '' ? <label>Streetnumber</label> :
                <label className="error">{streetnumberError}</label>)
              }
              placeholder="Streetnumber"
              value={streetnumber}
              error={streetnumberError}
              onChange={handleInput('streetnumber')}
            />
          </Address>
          <Address>
            <Input 
              label={
                (zipCodeError === '' ? <label>Zipcode</label> :
                <label className="error">{zipCodeError}</label>)
              }
              placeholder="Zipcode"
              value={zipCode}
              error={zipCodeError}
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
              onChange={handleInput('region')}
            />
          </Address>
          <Country>
            <Input 
              label={
                (countryError === '' ? <label>Country</label> :
                <label className="error">{countryError}</label>)
              }
              placeholder="Country"
              value={country}
              error={countryError}
              onChange={handleInput('country')}
            />
          </Country>
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
                (accountHolderError === '' ? <label>Account Holder</label> :
                <label className="error">{accountHolderError}</label>)
              }
              placeholder="Account Holder"
              value={accountHolder}
              error={accountHolderError}
              type="text"
              onChange={handleInput('accountHolder')}
            />
          </Banking>
        </Form>
      </Wrapper>
  )
}

export default General


import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { components } from "react-select"
import styled from '@emotion/styled'

const SelectStyle = {
  control: (base, state) => {
    console.log(state, 'yolo');
    return({
      ...base,
      border: state.isFocused ? '1px solid #0083fc' : '1px solid #d7e1e7',
      background: '#ECF1F4',
      borderRadius: '5px',
      height: 'calc(1.5em + 0.75rem + 2px)',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #0083fc',
      },
      '&:focus': {
        border: '1px solid #0083fc',
      }
    })
  }
  ,
  option: (base, state) => ({
    ...base,
    border: '0px',
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: '2px',
    fontSize: '14px',
    // kill the gap
    marginTop: 0,
    border: '0px',
  }),
  menuList: base => ({
    ...base,
    border: '0px',
    // kill the white space on first and last option
    padding: 0,
  }),
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Maxlimit = styled.div`
  height: 45px;
  font-weight: bold;
  font-size: 14px;
  color: rgb(41, 41, 41);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Select = ({
  label,
  onChange, 
  options, 
  formatOptionLabel, 
  multiple = false, 
  margin, 
  error, 
  darkMode, 
  value
}) => {

  const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 10 ? (
          props.children
        ) : (
          <Maxlimit>Max limit achieved</Maxlimit>
        )}
      </components.Menu>
    );
  }

  const isValidNewOption = (inputValue, selectValue) => inputValue.length > 0 && selectValue.length < 10

  return(
    <Wrapper>

      {label}
      {
        multiple ?
        <CreatableSelect
          isMulti
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
            Menu
          }}
          placeholder=""
          formatOptionLabel={formatOptionLabel}
          onChange={onChange}
          options={options}
          value={value}
          classNamePrefix="custom-select"
          isValidNewOption={isValidNewOption}
          styles={SelectStyle}
        />
        :
        <CreatableSelect
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
          }}
          placeholder=""
          formatOptionLabel={formatOptionLabel}
          onChange={onChange}
          value={value}
          options={options}
          classNamePrefix="custom-select"
          styles={SelectStyle}
        />
      }
    </Wrapper>
  )
}

export default Select

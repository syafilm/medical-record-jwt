import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import {Validation} from 'utils'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'
import 'flatpickr/dist/themes/material_blue.css'

const Wrapper = styled.div`
  position: relative;
  .picker{
    border: 1px solid #d7e1e7;
    border-radius: 5px;
    min-height: 38px;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    min-width: 250px;
    background: #ECF1F4;
    padding: 0px 10px;
  }
`

const Date = ({
  value,
  options,
  placeholder,
  onChange,
  onReady,
  onClose,
  className,
  label,
}) => {
  return(
    <Wrapper>
      {label}
      <Flatpickr
        onReady={(selectedDates, dateStr, instance) => instance.calendarContainer.classList.add('flatpickr-calendar-custom')}
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClose={onClose}
        className={className ? `${className} picker` : `picker`}
      />
    </Wrapper>
  )
}

export default Date

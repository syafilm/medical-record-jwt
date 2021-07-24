import React, { Fragment } from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: relative;
  .donut {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0.25rem solid rgba($dark, 0.25);
    border-top-color: $dark;
    animation: 1s spin infinite linear;
    &.tiny{
      width: 24px;
      height: 24px;
    }
    &.white{
      border: 0.25rem solid rgba(white, 0.25);
      border-top-color: white;    
    }
    &.multi {
      border-bottom-color: $dark;
    }
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

const Loading = () => (
  <Wrapper>
    <div className="donut"/>
  </Wrapper>
)

export default Loading
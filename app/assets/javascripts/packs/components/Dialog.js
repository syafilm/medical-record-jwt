import React from 'react';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: relative;
  padding: ${props => props.noPadding ? `0px` : `20px 15px`};
  background-color: #fff;
  width: ${props => props.width ? `90vw` : `350px`};
  height: ${props => props.height ? `70vh` : `auto`};
  @media (min-width: 1024px) {
    width: ${props => props.width ? `${props.width}vw` : `350px`};
    height: ${props => props.height ? `${props.height}vh` : `auto`};
  }
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  h6 {
    font-size: 13px;
    font-weight: 700px;
    line-height: normal;
    margin-bottom: 8px;
  }
  p {
    font-size: 13px;
    font-weight: 400px;
    line-height: normal;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebf1f4;
  }
`

const Bottom = styled.div`
  display: flex;
  justify-content: ${props => props.useCancelBtn ? `space-between` : `flex-end`};
  align-items: center;
  padding-top: 15px;
  button {
    background-color: #fff;
    padding: 0px;
    font-weight: 700;
    text-transform: uppercase;
  }
`

const Cancel = styled.button`
  color: #a1aeb7;
  border: 0px;
`

const Submit = styled.button`
  border: 0px;
  color: ${props => props.buttonColor === 'danger' ? `#E3001E` : `#0ecab8`};
`

const Dialog = ({
  text,
  textHeader = 'Confirm',
  onClickYes,
  onClickNo,
  textYes,
  textNo,
  buttonColor,
  useCancelBtn = true,
  children,
  hideBottom,
  noPadding,
  width,
  height
}) => {
  return (
    <Wrapper 
      width={width}
      height={height}
      noPadding={noPadding}>
      {children}
      {!children && (
        <div>
          <h6>
            <b>
              {textHeader}
            </b>
          </h6>
          <p>{text}</p>
        </div>
      )}
      {!hideBottom &&
        <Bottom useCancelBtn={useCancelBtn}>
          {
            useCancelBtn && 
            <Cancel onClick={onClickNo}>
              {textNo}
            </Cancel>
          }
          <Submit onClick={onClickYes} buttonColor={buttonColor}>
            {textYes}
          </Submit>
        </Bottom>
      }
    </Wrapper>
  );
};

export default Dialog

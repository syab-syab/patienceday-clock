import React from 'react'
import styled from 'styled-components'

type Props = {
  show: boolean,
  lightOrDark: boolean,
  onClickFunc: () => void
}


// モードの色があべこべだから後で直す

// ライトモード
// 文字色#FDFFE2
// 背景#223A70,
const lightModeBGColor: string = `
  background: #F5FFA2;
`

// ダークモード
// 文字色,
// 背景色#FDFFE2(または#FFFE71)
const darkModeBGColor: string = `
  background: #223A70;
`


const Wrapper = styled.div`
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background-color:rgba(0,0,0,0.5);

display: flex;
align-items: center;
justify-content: center;
`

const Modal = styled.div<{$isLightOrDark?: boolean}>`
color: ${props =>  props.$isLightOrDark ? 'black' : '#FDFFE2'};
z-index:2;
width:50%;
padding: 1em;
${props =>  props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
border: 0.2rem black solid;
border-radius: 0.8rem;
@media (max-width: 1000px) {
  width: 70%;
}
@media (max-width: 800px) {
  width: 80%;
}
@media (max-width: 700px) {
  width: 90%;
}
@media (max-width: 500px) {
  width: 95%;
  padding: 0.3em;
}
`

const CloseButton = styled.div`
font-size: 3rem;
width: 15rem;
margin: 0 auto;
border: 0.2rem black solid;
border-radius: 0.8rem;
margin-bottom: 1rem;

`

const StartButton = styled.div`
  font-size: 3rem;
  width: 15rem;
  margin: 0 auto;
  border: 0.2rem black solid;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`

const MessageWrapper = styled.div`
padding: 0;
margin: 0;
font-size: 4rem;
`

const MessageHeading = styled.h1`
  margin: 0;
  font-size: 4rem;
`

const MessageSub = styled.p`
  margin: 0;
  font-size: 2rem;
`

// input類のサイズは本番で
const ContentInput = styled.input<{$isLightOrDark?: boolean}>`
  margin: 1rem;
  border: 0.1rem solid;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`
const DayInput = styled.input<{$isLightOrDark?: boolean}>`
  margin: 1rem;
  border: 0.1rem solid;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`

const TimeInput = styled.input<{$isLightOrDark?: boolean}>`
  margin: 1rem;
  border: 0.1rem solid;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`

const AddModal = (props: Props) => {

  if (props.show) {
    return (
      <Wrapper>
        <Modal $isLightOrDark={props.lightOrDark}>
          <MessageWrapper>
            <MessageHeading>
              何を我慢する？
            </MessageHeading>
            <ContentInput type='text' $isLightOrDark={props.lightOrDark} />
            <MessageSub>
              どのくらい我慢する？
            </MessageSub>
            <DayInput type='text' $isLightOrDark={props.lightOrDark} />日
            <br />
            {/* ↓は本番ではselect */}
            <TimeInput type='text' $isLightOrDark={props.lightOrDark} />時間
          </MessageWrapper>
          <StartButton>始める</StartButton>
          <CloseButton onClick={props.onClickFunc}>閉じる</CloseButton>
        </Modal>
      </Wrapper>
    )
  } else {
    return null;
  }
}

export default AddModal
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import millisecondsTest from '../../functions/millisecondsTest'

type Props = {
  show: boolean,
  lightOrDark: boolean,
  onClickFunc: () => void
}


// inputのスタイルが崩れているので
// width, height, font-sizeで大きさを調整して
// displayのflexとかfloatとかで位置を調整する

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
padding: 1rem 3rem;
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
  width: 100%;
  height: 100%;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`
const DayInput = styled.input<{$isLightOrDark?: boolean}>`
  margin: 1rem;
  border: 0.1rem solid;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`

const HourSelect = styled.select<{$isLightOrDark?: boolean}>`
  margin: 1rem;
  border: 0.1rem solid;
  ${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
`

const selectHourValues: Array<string> = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23"
]

const AddModal = (props: Props) => {

  // 忍耐の内容(文字列)
  const [content, setContent] = useState<string>("")
  const contentHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value)
  }

  // 日数の期限
  const [deadlineDay, setDeadlineDay] = useState<string>("0")
  const deadlineDayHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDeadlineDay(String(e.target.value))
  }

  const [deadlineHour, setDeadlineHour] = useState<string>("0")
  const deadlineHourHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeadlineHour(e.target.value)
  }

  // 新たにカウントを追加する
  // 編集や削除よりも優先する
  const addCount = (): void => {
    // あとで追加のロジックを書く
    const tmp: number = Number(deadlineDay) * 86400000 + Number(deadlineHour) * 3600000
    if (tmp <= 0 || content === "") {
      alert("１時間以上の時間の入力、または忍耐の内容を入力してください。")
    } else {
      alert(`${content}を${millisecondsTest(tmp, true)}耐える`)
      setContent("")
      setDeadlineDay("0")
      setDeadlineHour("0")
    }
  }


  if (props.show) {
    return (
      <Wrapper>
        <Modal $isLightOrDark={props.lightOrDark}>
          <MessageWrapper>
            <MessageHeading>
              何を我慢する？
            </MessageHeading>
            <p>{deadlineDay}</p>
            <ContentInput type='text' value={content} onChange={contentHandleChange} $isLightOrDark={props.lightOrDark} />
            <MessageSub>
              どのくらい我慢する？
            </MessageSub>
            {/* type="number"ではないけど入力は数字だけを受け付けたい */}
            {/* あとは一番上の位に0の入力を受け付けないようにしたい */}
            <DayInput type='number' min="0" value={Number(deadlineDay)} onChange={deadlineDayHandleChange} $isLightOrDark={props.lightOrDark} /><label>日</label>
            <br />
            {/* ↓は本番ではselect */}
            <HourSelect $isLightOrDark={props.lightOrDark} value={deadlineHour} onChange={(e) => deadlineHourHandleChange(e)}>
              {
                selectHourValues.map((h) => {
                  return <option key={h} value={h}>{h}</option>
                })
              }
            </HourSelect>
            
            <label>時間</label>
          </MessageWrapper>
          <StartButton onClick={addCount}>始める</StartButton>
          <CloseButton onClick={props.onClickFunc}>閉じる</CloseButton>
        </Modal>
      </Wrapper>
    )
  } else {
    return null;
  }
}

export default AddModal
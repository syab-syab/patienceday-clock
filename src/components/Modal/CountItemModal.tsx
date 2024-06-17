import React from 'react'
import styled from 'styled-components'
import { db } from '../../models/db'


type Props = {
  show: boolean,
  lightOrDark: boolean,
  deadLine: number,
  onClickFunc: () => void,
  content: string,
  count: string,
  indexKey?: number,
  toDeadLine?: string
}

// レスポンシブはあとで
// 1000pxと800pxと700pxと500px

// fontの色は共通(ボタンだけ違う)
// const succeedBGColor: string =`
//   background: linear-gradient(to right, #FF3131, #FF914D);
// `

const succeedBGColor: string =`
  background-image: repeating-conic-gradient(from 3deg, rgba(255, 255, 255, 1) 10deg 20deg, rgba(255, 0, 0, 1) 20deg 30deg);
`

const lightModeBGColor: string =`
  background: #F5FFA2;
`

const lightModeCDSColor: string =`
  background: #FDFFE2;
`

const darkModeBGColor: string =`
  background: #5A72A0;
  color: #FDFFE2;
`
const darkModeCDSColor: string =`
  background: #97A0B2;
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

const Modal = styled.div<{$isDeadLine?: number, $isLightOrDark?: boolean}>`
  color: ${props => props.$isLightOrDark ? "black" : "#FDFFE2"};
  z-index:2;
  width:50%;
  padding: 1em;
  ${props => props.$isDeadLine ? succeedBGColor : props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
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

const Button = styled.div<{$isLightOrDark?: boolean}>`
  font-size: 3rem;
  width: 15rem;
  margin: 0 auto;
  border: 0.2rem black solid;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`

const CountdownSpace = styled.div<{$isDeadLine?: number, $isLightOrDark?: boolean}>`
  border-radius: 0.8rem;
  padding: 1rem;
  margin: 1rem 0;
  ${props => props.$isDeadLine ? succeedBGColor : props.$isLightOrDark ? lightModeCDSColor : darkModeCDSColor}
`

const AlmostWrapper = styled.div`
  height: 70vh;
  overflow-y: scroll;
`

const MessageWrapper = styled.div`
  padding: 0;
  margin: 0;
`

const MessageHeading = styled.h1`
  margin: 0;
  font-size: 4rem;
`

const MessageSub = styled.p`
  margin: 0;
  font-size: 2rem;
`

const MessageCount = styled.h2`
  margin: 0;
  font-size: 3rem;
`

const CountItemModal = (props: Props) => {

  // finishedの値を変更する(0から1に)
  // 1から0にはできないようにする
  // 優先度は中、追加機能を実装してから
  const toggleStatus = async (index?: number, deadLine?: number) => {
    // 期限まで忍耐が続いていないものに対しては
    // 本当に終了するかどうかを尋ねること
    // updateは更新したいデータのプライマリーキーを第一引数に指定し
    // 第二引数に変更するプロパティとその値を指定する
    const resultMessage: string
      = deadLine ? 
      "目標期限達成おめでとうございます！終了しますか？" : "まだ目標期限を達成していませんが、終了しますか？"
    const result = window.confirm(resultMessage)
    if(result) {
      await db.deadline.update( index, {finished: 1 , finishedSec: Date.now()})
      alert("お疲れさまでした！")
    } else {
      alert("引き続き頑張ってください！")
    }
  }

  if (props.show) {
    return (
    <Wrapper>
      <Modal $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark}>
        <AlmostWrapper>
          <MessageWrapper>
            <MessageHeading>
              {props.content}
            </MessageHeading>
            <MessageSub>
              を今まで
            </MessageSub>
            <MessageCount>
              {props.count}
            </MessageCount>
            <MessageSub>
              耐えている！
            </MessageSub>
          </MessageWrapper>
          <CountdownSpace $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark}>
            {props.deadLine ? 
              <><MessageCount>目標達成</MessageCount><MessageCount>おめでとう！</MessageCount></> : 
              <>
                <MessageSub>目標まであと</MessageSub>
                <MessageCount>
                  {props.toDeadLine}
                </MessageCount>
              </>
            }
          </CountdownSpace>
        </AlmostWrapper>
        <Button
          $isLightOrDark={props.lightOrDark}
          onClick={() => toggleStatus(props.indexKey, props.deadLine)}
        >
          終了する
        </Button>
        <Button
          $isLightOrDark={props.lightOrDark}
          onClick={props.onClickFunc}
        >
          閉じる
        </Button>
      </Modal>
    </Wrapper>
    )
  } else {
    return null;
  }

}

export default CountItemModal
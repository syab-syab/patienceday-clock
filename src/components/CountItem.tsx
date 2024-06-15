import React from 'react'
import styled from 'styled-components'
// import CountItemModal from './Modal/CountItemModal'
// import { useState } from 'react'
import { FaClock } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

type Props= {
  lightOrDark: boolean,
  deadLine: number,
  // 参照しているのがhistoryのモーダルか否か
  history: boolean,
  // 期限or記録
  content: string,
  count: string,
  // モーダルの開閉
  onClickFunc: () => void
}

// 履歴からでも呼び出せるようにする

// 外に定義してみる
const lightModeIconColor: string = `
background: #FFFE71;
`

const lightModeContentColor: string = `
background: #F5FFA2;
`

const darkModeIconColor: string = `
background: #5A72A0;
`

const darkModeContentColor: string = `
background: #97A0B2;
`

const succeedColor: string = `
background: linear-gradient(to right, #FF3131, #FF914D);
`

const historyIconColor: string = `
  background: black;
  color: #FDFFE2;
` 

const historyContentColor: string =`
  background: #97A0B2;
`

// 親コンポーネントのメディアクエリを打ち消し
const Item = styled.div`
display: flex;
border: 0.1rem solid black;
font-size: 5rem;
margin-bottom: 4rem;
color: black;
@media (max-width: 500px) {
  font-size: 3.7rem;
  font-weight: normal;
  margin-bottom: 2rem;
}
`

const Wrapper = styled.div`
  display: block;
  width: 100%;
`

// 下の二つにエラー出てるけど後回し
// 忍耐の内容
const Heading = styled.p<{$isDeadLine?: number, $isLightOrDark?: boolean, $isHistory?: boolean}>`
  ${
    props => props.$isDeadLine ? succeedColor : props.$isHistory ? historyContentColor : props.$isLightOrDark ? lightModeContentColor : darkModeContentColor
  }
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 0;
  border-bottom: 0.1rem black solid;
`

// 忍耐の期限(履歴では記録)
const Content = styled.p<{$isDeadLine?: number, $isLightOrDark?: boolean, $isHistory?: boolean}>`
  ${
    props => props.$isDeadLine ? succeedColor : props.$isHistory ? historyContentColor : props.$isLightOrDark ? lightModeContentColor : darkModeContentColor
  }
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 0;
`

const Icon = styled.div<{$isDeadLine?: number, $isLightOrDark?: boolean, $isHistory?: boolean}>`
  ${
    props =>
      props.$isDeadLine ? succeedColor : props.$isHistory ? historyIconColor : props.$isLightOrDark ? lightModeIconColor : darkModeIconColor
  };
  border: 0.1rem solid black;
  padding: 1rem 1rem 0 1rem;
  vertical-align: middle;
  font-size: 5rem;
`



const CountItem = (props: Props) => {

  return (
    <>
      <Item onClick={props.onClickFunc}>
        <Icon $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>
          {props.history ? <FaTrashAlt /> : props.deadLine ? <FaThumbsUp /> : <FaClock />}
        </Icon>
        <Wrapper>
          <Heading $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>{props.content}</Heading>
          <Content $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>{props.count}</Content>
        </Wrapper>
      </Item>
    </>

  )
}

export default CountItem
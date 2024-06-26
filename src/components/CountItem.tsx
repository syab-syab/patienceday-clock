import React from 'react'
import styled from 'styled-components'
import { FaClock } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { db } from '../models/db';
import { useState } from 'react';
import CountItemModal from './Modal/CountItemModal';

type Props= {
  lightOrDark: boolean,
  deadLine: number,
  // 参照しているのがhistoryのモーダルか否か
  history: boolean,
  // 期限or記録
  content: string,
  count: string,
  // モーダルの開閉
  itemKey?: number,
  // CountItemModalに中継
  toDeadline?: string
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
  // モーダルを追加する
  const [modalShow, setModalShow] = useState<boolean>(false)

  const toggleModalOrHistoryDel = (id?: number): void => {
    if (props.history) {
      const res = window.confirm('削除してもよろしいですか？')
      if (res) {
        db.deadline.delete(id)
        alert("削除しました。")
      }
    } else {
      setModalShow(!modalShow)
    }
    
  }


  return (
    <>
      <Item onClick={() => toggleModalOrHistoryDel(props.itemKey)}>
        <Icon $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>
          {props.history ? <FaTrashAlt /> : props.deadLine ? <FaThumbsUp /> : <FaClock />}
        </Icon>
        <Wrapper>
          <Heading $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>
            {props.history ? `${props.content} を耐えた` : `${props.content}`}
          </Heading>
          <Content $isDeadLine={props.deadLine} $isLightOrDark={props.lightOrDark} $isHistory={props.history}>
            {props.history ? `記録: ${props.count}`: props.count}
          </Content>
        </Wrapper>
      </Item>
      <CountItemModal
        show={modalShow}
        deadLine={props.deadLine}
        lightOrDark={props.lightOrDark}
        onClickFunc={toggleModalOrHistoryDel}
        content={props.content}
        count={props.count}
        toDeadLine={props.toDeadline}
        indexKey={props.itemKey}
      />
    </>

  )
}

export default CountItem
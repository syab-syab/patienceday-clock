import React from 'react'
import styled from 'styled-components'
import TopMessage from './TopMessage'
import CountSection from './CountSection'
import { Deadline } from '../models/Deadline'

type Props = {
  lightOrDark: boolean,
  unfinished: number | any
}

// 500pxでメディアクエリ


const lightMode: string = `
  color: black;
  background: #FDFFE2;
`

const darkMode: string = `
  color: #FDFFE2;
  background: #223A70;
`

const scroll: string = `
  overflow-y: scroll;
`

const nonScroll: string = `
  overflow-y: visible;
`

const hiddenScrollBar: string =`
  &::-webkit-scrollbar{
    display:none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  text-align: center;
`

// heightは画面全コンテンツが画面内に収まるように
// 画面内スクロールはこっちで指定した方が良いかも
// スクロールバーも消す(ブラウザごとに設定が異なる)
const Wrapper = styled.main<{$isLightOrDark?: boolean, $validItems?: Array<Deadline>}>`
  height: 90vh;
  ${props => props.$validItems ? scroll : nonScroll}
  ${hiddenScrollBar}
  text-align: center;
  ${props => props.$isLightOrDark ? lightMode : darkMode};
  margin: 0 auto;
  padding: 5rem 0 5rem;
  @media (max-width: 500px) {
    height: 85vh;
    font-size: 3.7rem;
    font-weight: bold;
  }
`

const MainTitle = styled.h1`
  font-weight: normal;
  margin: 0 auto;
  font-size: 7.2rem;
  @media (max-width: 500px) {
    font-size: 3.7rem;
    font-weight: bold;
  }
`

const SubTitle = styled.h2`
  font-weight: normal;
  margin: 0 auto;
  font-size: 4.8rem;
  @media (max-width: 500px) {
    font-size: 2.4rem;
    font-weight: bold;
  }
`


const Main = (props: Props) => {

  if(props.unfinished) {
    return (
      <Wrapper $isLightOrDark={props.lightOrDark} $validItems={props.unfinished}>
        <CountSection lightOrDark={props.lightOrDark} />
      </Wrapper>
    )
   } else {
      return(
      <Wrapper $isLightOrDark={props.lightOrDark} $validItems={props.unfinished}>
        <MainTitle>
          世界忍耐時計
        </MainTitle>
        <SubTitle>
          -PatienceDay Clock-
        </SubTitle>
        <TopMessage lightDark={props.lightOrDark} />  
      </Wrapper>
      )
    }
}

export default Main
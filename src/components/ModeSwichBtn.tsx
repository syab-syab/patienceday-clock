import React from 'react'
import styled from 'styled-components'

type Props = {
  lightOrDark: boolean,
  toggleVal: React.MouseEventHandler<HTMLButtonElement>
}

// 外に定義してみる
const lightMode: string = `
color: #FDFFE2;
background: #223A70;
`

const darkMode: string = `
 color: black;
 background: #FDFFE2;
`

// 796pxでメインと被るからメディアクエリで変える

const Button = styled.button<{isLightOrDark: boolean}>`
  ${props => props.isLightOrDark ? lightMode : darkMode}
  font-size: 2.7rem;
  border: black solid;
  border-radius: 0.4rem;
  position: fixed;
  top: 5rem;
  right: 10rem;
  @media (max-width: 796px) {
    font-size: 1.6rem;
    font-weight: bold;
    position: fixed;
    top: 3rem;
    right: 2rem;
  }
`

const ModeSwichBtn = (props: Props) => {

  return (
    <>
      <Button isLightOrDark={props.lightOrDark} onClick={props.toggleVal}>{props.lightOrDark ? "ライト" : "ダーク"}</Button>
    </>
  )
}

export default ModeSwichBtn
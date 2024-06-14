import React from 'react'
import styled from 'styled-components'

type Props = {
  lightDark: boolean
}

const backgroundLightMode: string = `
background: #5A72A0;
`

const backgroundDarkMode: string = `
background: #FDFFE2;
`

// section以外の方が良いかも
const MessageSection = styled.p<{isLightOrDark: boolean}>`
border: dashed black;
width: 45rem;
font-size: 2.6rem;
@media (max-width: 500px) {
  width: 20rem;
  font-size: 1.1rem;
}
color: black;
font-weight: bold;
display: inline-block;
text-align: center;
${props => props.isLightOrDark ? backgroundLightMode : backgroundDarkMode};
`

const TopMessage = (props: Props) => {
  // 500pxでメディアクエリ
  


  return (
    <MessageSection isLightOrDark={props.lightDark}>
      現在我慢している項目がありません。
    </MessageSection>
  )
}

export default TopMessage
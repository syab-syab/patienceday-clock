import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string,
  tag: boolean
}

// 条件分岐でタグを選択
const InfoHeader = styled.header`
  background: black;
  color: #FDFFE2;
  text-align: center;
`

const InfoFooter = styled.footer`
  background: black;
  color: #FDFFE2;
  text-align: center;
`

// ヘッダーとフッター用
const EasyInfo = (props: Props) => {

  if(props.tag) {
    return (
      <InfoHeader>
        <span>{props.value}</span>
      </InfoHeader>
    )
  } else {
  return (
    <InfoFooter>
      <span>{props.value}</span>
    </InfoFooter>
    )

  }

}

export default EasyInfo
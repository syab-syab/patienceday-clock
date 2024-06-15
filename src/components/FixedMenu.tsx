import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import AddModal from './Modal/AddModal'
import HistoryModal from './Modal/HistoryModal'

type Props = {
  lightOrDark: boolean
}

const lightMode: string = `
color: #FDFFE2;
background: #223A70;
&:hover {
  background: #83B4FF;
}
`

const darkMode: string = `
color: black;
background: #FDFFE2;
&:hover {
  background: #F5FFA2;
}
`

const Menu = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

const MenuItem = styled.div<{$isLightOrDark?: boolean}>`
padding: 1rem 0;
vertical-align: center;
flex-direction: column;
flex-grow: 1;
${props => props.$isLightOrDark ? lightMode : darkMode};
border: solid 1px;
font-size: 3rem;
@media (max-width: 500px) {
  font-size: 2rem;
  padding: 2rem 0;
  font-weight: bold;
}
`

const FixedMenu = (props: Props) => {
  // モーダルを追加と履歴の二つを追加
  const [addModalShow, setAddModalShow] = useState<boolean>(false)

  const toggleAddModal = (): void => {
    setAddModalShow(!addModalShow)
  }

  // console.log(addModalShow)

  const [historyModalShow, setHistoryModalShow] = useState<boolean>(false)

  const toggleHistoryModal = (): void => {
    setHistoryModalShow(!historyModalShow)
  }

  return (
    <>
      <Menu>
        <MenuItem $isLightOrDark={props.lightOrDark}>リンク</MenuItem>
        <MenuItem $isLightOrDark={props.lightOrDark} onClick={toggleAddModal}>追加</MenuItem>
        <MenuItem $isLightOrDark={props.lightOrDark} onClick={toggleHistoryModal}>履歴</MenuItem>
      </Menu>
      <AddModal show={addModalShow} toggleState={setAddModalShow} onClickFunc={toggleAddModal} lightOrDark={props.lightOrDark} />
      <HistoryModal show={historyModalShow} onClickFunc={toggleHistoryModal} lightOrDark={props.lightOrDark} />
    </>
  )
}

export default FixedMenu
import React from 'react'
import styled from 'styled-components'
import CountItem from '../CountItem'

type Props = {
  show: boolean,
  lightOrDark: boolean,
  onClickFunc: () => void
}

// 削除機能を追加すること
// 追加機能と編集機能を付けてからだから優先度は最後
// func: deleteDeadline
// 詳細情報のconfirmも必要かもしれない
// confirmで削除するかどうかを尋ねる感じにする

// ライトモード
const lightModeBGColor: string = `
  background: #F5FFA2;
`


// ダークモード
const darkModeBGColor: string = `
  background: #5A72A0;
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
color: ${props => props.$isLightOrDark ? "black" : "#FDFFE2"};
z-index:2;
width:50%;
padding: 1em;
${props => props.$isLightOrDark ? lightModeBGColor : darkModeBGColor}
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

const Button = styled.div`
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
`

const MessageHeading = styled.h1`
margin: 0;
font-size: 4rem;
`

const ItemWrapper = styled.div`
  overflow-y: scroll;
  height: 70vh;
`

const HistoryModal = (props: Props) => {

  // counteritemをクリックしたら
  // 本番では削除するかどうかを聞く
  // それと詳細を表示(confirmとかで)
  // 本番だと引数でidとかが必要になると思う
  const historyDelete = (): void => {
    alert('削除しますテスト')
  }

  if (props.show) {
    return (
    <Wrapper>
      <Modal $isLightOrDark={props.lightOrDark}>
        <MessageWrapper>
          <MessageHeading>
            履歴
          </MessageHeading>
        </MessageWrapper>
        <ItemWrapper>
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={false} />
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={true} />
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={false} />
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={false} />
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={false} />
        <CountItem onClickFunc={historyDelete} history={true} lightOrDark={props.lightOrDark} content="ビール" count="XXXX年XX月XX日XX時XX分" deadLine={false} />
        </ItemWrapper>
        <Button onClick={props.onClickFunc}>閉じる</Button>
      </Modal>
    </Wrapper>
    )
  } else {
    return null;
  }
}

export default HistoryModal
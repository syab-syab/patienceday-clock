import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Main from './Main';
import FixedMenu from './FixedMenu';
// import ModeSwichBtn from './components/ModeSwichBtn';
import ModeSwichBtn from './ModeSwichBtn';

const Wrapper = styled.main`
height: 100vh;
`

const MainWrapper = () => {
  // コンポーネントに渡すのはスタイルではなく
  // ダークモードか否かの有無だけにする
  // trueならライトモード
  // falseならダークモード

  const  [lightOrDark, setlightOrDark] = useState<boolean>(true)

  const toggleLD = (): void => {
    setlightOrDark(!lightOrDark)
  }


  return (
    <Wrapper>
      {/* ライト・ダークモード切替ボタン */}
      <ModeSwichBtn lightOrDark={lightOrDark} toggleVal={toggleLD} />
      {/* Main以下を新規にコンポーネントを作成してheightを100vhにした方が良いかも */}
      <Main
        lightOrDark={lightOrDark}
      />
      <FixedMenu lightOrDark={lightOrDark} />
    </Wrapper>
  )
}

export default MainWrapper
import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import EasyInfo from './components/EasyInfo';
import Main from './components/Main';
import FixedMenu from './components/FixedMenu';
import ModeSwichBtn from './components/ModeSwichBtn';
// import MainWrapper from './components/MainWrapper';



function App() {

  // コンポーネントに渡すのはスタイルではなく
  // ダークモードか否かの有無だけにする
  // trueならライトモード
  // falseならダークモード

  const  [lightOrDark, setlightOrDark] = useState<boolean>(true)

  const toggleLD = (): void => {
    setlightOrDark(!lightOrDark)
  }

  return (
    <>
      <EasyInfo value={"-PatienceDay Clock-"} tag={true} />

        {/* ライト・ダークモード切替ボタン */}
        <ModeSwichBtn lightOrDark={lightOrDark} toggleVal={toggleLD} />
        <Main
          lightOrDark={lightOrDark}
        />
        <FixedMenu lightOrDark={lightOrDark} />

      <EasyInfo value={"©Swiss Army Apps"} tag={false} />

    </>
  );
}

export default App;
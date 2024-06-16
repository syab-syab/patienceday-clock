import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import EasyInfo from './components/EasyInfo';
import Main from './components/Main';
import FixedMenu from './components/FixedMenu';
import ModeSwichBtn from './components/ModeSwichBtn';
import { localGetItem, localSetItem } from './functions/localStorageFunc';
import { db } from './models/db';
import { useLiveQuery } from 'dexie-react-hooks'


function App() {

  // 一瞬タイトルが出てしまう現象をどうにかできそうならする
  useLiveQuery(() => db.deadline.where("finished").equals(0).count((c?: number) => {
    setCheckUnFinished(c)
  }), [])

  const [checkUnFinished, setCheckUnFinished] = useState<number | any>(null)


  const validateBoolean = (booleanStr: string): boolean => {
    return booleanStr === "true";
  }

  const localLDKey: string = "lightOrDark"

  const localLDValue: string | any = localGetItem(localLDKey)

  const  [lightOrDark, setlightOrDark] 
    = useState<boolean>(!!localLDValue===false ? true : validateBoolean(localLDValue))

  const toggleLD = (): void => {
    const tmp: boolean = !lightOrDark
    localSetItem(localLDKey, String(tmp))
    setlightOrDark(tmp)
  }

  return (
    <>
      <EasyInfo value={"-PatientDay Clock-"} tag={true} />

        {/* ライト・ダークモード切替ボタン */}
        <ModeSwichBtn lightOrDark={lightOrDark} toggleVal={toggleLD} />
        <Main
          lightOrDark={lightOrDark}
          unfinished={checkUnFinished}
        />
        <FixedMenu lightOrDark={lightOrDark} />

      <EasyInfo value={"©Swiss Army Apps"} tag={false} />

    </>
  );
}

export default App;
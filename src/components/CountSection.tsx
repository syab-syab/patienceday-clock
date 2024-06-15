import React from 'react'
import styled from 'styled-components'
import CountItem from './CountItem'
import CountItemModal from './Modal/CountItemModal'
import { useState } from 'react'
import { db } from '../models/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { Deadline } from '../models/Deadline'
import millisecondsTest from '../functions/millisecondsTest'
import { useEffect } from 'react'
import milliSecEdit from '../functions/milliSecEdit'

type Props = {
  lightOrDark: boolean
}

const { deadline } = db

// const lightMode: string = `
// background: #5A72A0;
// `

// const darkMode: string = `
// background: #FDFFE2;
// `

// 900pxくらいでpaddingが限界
// とりあえずメディアクエリは暫定
const Wrapper = styled.section`
padding: 0 20rem;
@media (max-width: 900px) {
  padding: 0 10rem;
}
@media (max-width: 800px) {
  padding: 0 7rem;
}
@media (max-width: 700px) {
  padding: 0 6rem;
}
@media (max-width: 500px) {
  padding: 0 3rem;
}
`

const CountSection = (props: Props) => {
  // モーダルを追加する
  // const [modalShow, setModalShow] = useState<boolean>(false)
  // const [modalShow, setModalShow] = useState<boolean>(true)

  // const toggleModal = (): void => {
  //   setModalShow(!modalShow)
  // }

  const allCounts: Array<Deadline> | any = useLiveQuery(
    () => db.deadline.where("finished").equals(0).toArray(),
  [])

    // とりあえず1秒ごとにカウントするよう動かしてみた
    const [current, setCurrent] = useState<number>(Date.now())
    useEffect(() => {
      // セットアップ処理
      const count = setInterval(() => {
        setCurrent(Date.now())
        allCounts?.map(async (item: Deadline | any) => {
          if(!(item.achievement) && current > item.deadline) {
            await deadline.update(item.id, {achievement: 1})
          } 
        })
      }, 1000)
  
      // クリーンアップ処理
      // return無しだと挙動がおかしくなるから必要
      return () => clearInterval(count)
    }, [current])

  return (
    <Wrapper>
      {/* 本番環境ではmapで回すから現段階で真偽値は手打ち */}
      {
        allCounts?.map((c: Deadline) => {
          const nowCounting: string = millisecondsTest(milliSecEdit(current - c.startSec))
          const toDeadLine: string = millisecondsTest(milliSecEdit(c.deadline - current))
          return (
          <div key={c.id}>
            <CountItem
              // key={c.id}
              // onClickFunc={toggleModal}
              itemKey={c.id}
              history={false}
              lightOrDark={props.lightOrDark}
              content={c.name}
              count={nowCounting}
              deadLine={c.achievement}
            />
            {/* やむを得ずモーダル廃止 */}
              {/* <CountItemModal
                show={modalShow}
                deadLine={c.achievement}
                lightOrDark={props.lightOrDark}
                onClickFunc={toggleModal}
                content={c.name}
                count={nowCounting}
                toDeadLine={toDeadLine}
                countKey={c.id}
              /> */}
            </div>
          )
        })
      }

      {/* CountItemModalのdeadLineは仮置き */}
      {/* <CountItemModal show={modalShow} deadLine={false} lightOrDark={props.lightOrDark} onClickFunc={toggleModal} /> */}
    </Wrapper>
  )
}

export default CountSection
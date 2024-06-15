// ファイル名と関数名を変えたほうがいいかも

const modifyMilliSeconds = (unix: number, milliSec: number): Array<number> => {
  // 渡されたミリ秒(unix)を各時間の単位のミリ秒(milliSec)で割る
  const unitOfTime = Math.floor(unix / milliSec)
  if (unitOfTime >= 1) {
    // unitOfTimeが1以上
    return [unitOfTime, unix - unitOfTime * milliSec]
  } else {
    // unitOfTimeが1以下
    return [0, unix]
  }
}

const millisecondsTest = (uni: number, short: boolean = false): string => {
  // 渡されたtimeを各ミリ秒で除算 ex) uni / 31536000000 = x.xxxx
  // 秒以外で答えが1以上なら余りを四捨五入して対応するミリ秒を乗算し、timeから減算 ex) uni - 31536000000 * x = y
  // 減算の答えを次に回していく

  // 残り≠余り
  // (年) 31536000000で割って1以下なら0、1以上なら残りを
  // (月) 2592000000で割って1以下なら0、1以上なら残りを
  // (週) 604800000で割って1以下なら0、1以上なら残りを
  // [年、月、週はやっぱり要らない]
  // (日) 86400000で割って1以下なら0、1以上なら残りを
  const tmpDay: Array<number> | number = modifyMilliSeconds(uni, 86400000)
  const returnDay: number = tmpDay[0]
  // (時) 3600000で割って1以下なら0、1以上なら残りを
  const tmpHour: Array<number> | number = modifyMilliSeconds(tmpDay[1], 3600000)
  const returnHour: number = tmpHour[0]
  // (分) 60000で割って1以下なら0、1以上なら残りを
  const tmpMinutes: Array<number> | number = modifyMilliSeconds(tmpHour[1], 60000)
  const returnMinutes: number = tmpMinutes[0]
  // (秒) 1000で割る
  const returnSeconds: number = tmpMinutes[1] / 1000 

  // .toString().padStart( 2, '0')を付けなければ表示が遅れないっぽい
  if (short) {
    return uni < 86400000 ? `${returnHour}時間` : `${returnDay}日${returnHour}時間`
  } else {
    return `${returnDay}日${returnHour}時間${returnMinutes}分${returnSeconds.toString()}秒`
  }
  
}

export default millisecondsTest
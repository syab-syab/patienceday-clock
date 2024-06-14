const milliSecEdit = (milli: number): number => {
  const tmpMilli: string = String(milli)
  // 一度文字列のミリ秒を配列にする
  const arr: Array<string> = tmpMilli.split("")

  // 下三桁を0にする(そうしないと小数点以下の数値が表示されるから)
  arr[arr.length-1] = "0"
  arr[arr.length-2] = "0"
  arr[arr.length-3] = "0"

  // 再び文字列に直してから返す
  return Number(arr.join(''))
}

export default milliSecEdit
const dateCreate = (milliSec: number) : string => {
  const tmpDate: Date = new Date(milliSec)
  const tmpYear: string = String(tmpDate.getFullYear())
  const tmpMonth: string = String(tmpDate.getMonth()+1)
  const tmpDay: string = String(tmpDate.getDate())
  const tmpHour: string = String(tmpDate.getHours())
  const tmpMinutes: string = String(tmpDate.getMinutes())
  return `${tmpYear}年 ${tmpMonth}月${tmpDay}日 ${tmpHour}時${tmpMinutes}分`
}

export default dateCreate
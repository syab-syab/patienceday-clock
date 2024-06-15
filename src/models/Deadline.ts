// カウントの期限テスト
export type Deadline = {
  // ?は省略可能なプロパティに付けるらしい
  id?: number
  // 我慢する事柄
  name: string
  // 我慢する期限のミリ秒
  deadline: number
  // カウントを開始した日付時刻のミリ秒
  startSec: number
  // 期限を達成したか否か(初期値と未達成はfalse, 達成はtrue)
  achievement: boolean
  // 達成・未達成に関わらずカウントを終えたかどうか(初期値と未終了はfalse, 終了はtrue)
  // 終了した(true)のモノは履歴として残し、表示できるようにしたい
  finished: boolean
}
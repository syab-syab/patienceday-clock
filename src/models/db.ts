import Dexie, { Table } from 'dexie';
// import { Todo } from "./Todo"
// import { Deadline } from './Deadline';
import { Deadline } from './Deadline';

// export class MySubClassedDexie extends Dexie {
export class Count extends Dexie {
  // 'todos' is added by dexie when declaring the stores()
  // 'todos' は、stores() を宣言するときに dexie によって追加される
  // We just tell the typing system this is the case
  // 型付けシステムにこれが当てはまることを伝えるだけ
  // todos!: Table<Todo>;
  // カウントの期限テスト
  deadline!: Table<Deadline>

  constructor() {
    // super()にデータベース名を渡す(多分)
    // super('todoApp');
    super('counterApp');
    // バージョンを指定する
    this.version(1).stores({
      // オブジェクトストア(todos)の設定をする
      // ++を付けることでオートインクリメントしプライマリーキーにする
      // 先に定義しておいたinterfaceにカラム名を同じくする必要がある？
      // todos: '++id, task, completed',
      // カウントの期限テスト
      deadline: '++id, name, deadline, startSec, achievement, finished, finishedSec'
    });
  }
}

// export const db = new MySubClassedDexie();
export const db = new Count();
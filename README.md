# front-template

フロント開発用テンプレート


---

## Dependencies

- Node.js >= 6.11.0
- Gulp
- Babel
- [assemble](https://www.npmjs.com/package/assemble)

---

## Usage

### Frontend

```sh
$ cd src
$ npm i
$ gulp
# serve: localhost:6002
```

--

### Structure

```sh
.
├── .git
├── .gitignore
├── README.md
├── src/ # プリプロセッサ系のソースファイル（SassやEct,Handlebars等）を格納
│   ├── gulpfile.babel.js
│   ├── node_modules/ # gitignore対象
│   ├── config.json # gulpを走らせた際にロードするtask／パスの設定
│   ├── package.json
│   ├── gulp
│   │   ├── tasks
│   │   │   └── {taskDir} # テンプレートで使用する際の一連の処理を書いたtaskファイルを格納
│   │   └── utils
│   ├── hbs
│   │   ├── data
│   │   ├── layouts
│   │   │   └── default.hbs # HTMLルート要素を記述。assembleでコンパイル
│   │   ├── partials
│   │   └── index.hbs
│   ├── img
│   │   └── sprite # PC用sprite画像の切り出しを格納
│   │       └── mobile # SP用sprite画像の切り出しを格納
│   ├── js
│   │   ├── libs # ライブラリを格納
│   │   ├── modules # 開発用ディレクトリ
│   │   └── script.js
│   └── scss
│       ├── base
│       ├── constants
│       ├── generated # globbing使用。[ base, constants, layouts, mixins, modules, utils ]を生成
│       ├── layouts
│       ├── mixins
│       ├── modules
│       ├── utils
│       ├── print.scss
│       └── style.scss # generated に生成されたscssをimport
└── www/ # プロジェクトルート
    ├── static/ # 静的ドキュメントルート
    └── html/ # ドキュメントルート
```
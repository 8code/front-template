# front-template

フロント開発用テンプレート


---

## Dependencies

- Node.js 5.12.0
- Gulp

---

## Usage

### Frontend

```sh
$ cd src
$ npm i
$ gulp
```

グローバルに必要なモジュール（未インストールの場合のみ）
```sh
$ babel --version # バージョンが表示されるならば babel-cli は不要
$ sudo npm i -g assemble browserify babel-cli
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
│   ├── package.json # パッケージ／プロジェクト設定ファイル
│   ├── hbs
│   │   ├── data
│   │   ├── layouts
│   │   │   └── default.hbs # HTMLルート要素を記述。ページはassembleで結合
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
│       ├── generated # globbingで[ base, constants, layouts, mixins, modules, utils ]を生成
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
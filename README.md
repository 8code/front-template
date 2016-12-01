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
├── src/ # プリプロセッサ系のソースファイル（SassやEct,Handlebars等）を収める
│   ├── gulpfile.babel.js
│   ├── node_modules/ # npmインストールしたファイル（gitignore対象）
│   └── package.json # node.js用設定ファイル
└── www/ # プロジェクトルート
    ├── static/ # 静的ドキュメントルート
    └── html/ # ドキュメントルート
```
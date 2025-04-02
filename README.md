# DataFormat Finder

VS Code で snake_case のテーブル名から対応する DataFormat クラスファイル（`.php`）を検索・オープンできる拡張です。

## インストール
1. このリポジトリをローカルにclone。
1. `npm install`を実行する。
1. `yes | npx vsce package`を実行して`dataformat-finder-0.0.1.vsix`ファイルを出力する。
1. 開発環境のVSCodeの拡張機能のページで、「VSIXからのインストール...」で出力したvsixファイルを選択する。　<br>※ ローカルマシン上のVSIXファイルが選択できない場合は、`scp ./dataformat-finder-0.0.1.vsix z-yuta-ioka@iioka-dev.dev-gamelib.gree-dev.net:/home/***`を実行してEC2上の開発環境に転送してください。

## 使い方

1. ソースコード中のテーブル名（snake_case）にカーソルを置くか、選択する
2. 以下のいずれかを実行：
   - エディタ上で右クリック → `Find DataFormat File`
   - コマンドパレットから `Find DataFormat File` を実行
   - `Ctrl+Alt+D`（Mac: `Ctrl+Shift+D`） ← ショートカット

## コマンド

| コマンド ID                  | 説明                                       |
|-----------------------------|--------------------------------------------|
| `dataformat-finder.findFile` | テーブル名に対応する DataFormat ファイルを開く |

## ショートカット

| OS      | キー           |
|---------|----------------|
| Windows / Linux | `Ctrl+Alt+D`     |
| macOS   | `Ctrl+Shift+D` |

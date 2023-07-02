'use strict'

const fs = require('fs'); //ファイルシステムの操作に使用
const path = require('path'); //ファイルパスの操作に使用
const Sequelize = require('sequelize'); //DBとの接続や操作を抽象化するためのORMライブラリ
//ファイルパスからファイル名を取得
const basename = path.basename(__filename); //'__filename'はNode.jsのグローバルオブジェクト　https://nodejs.org/api/globals.html

/**
 * 環境変数'process.env.NODE_ENV'を取得（'process.env'はNode.jsのグローバルオブジェクト
 * 環境変数が未定義・空文字列・Falsyなであれば、"||"の右側の'development"を使用
*/
const env = process.env.NODE_ENV || 'development';

/**
 * '__dirname'で現在のスクリプトのディレクトリパスを取得後、
 * config/config.jsonを読み込み、'env'で指定された環境に対応する設定オブジェクトを取得
*/
const config = require(__dirname + '/../config/config.json')[env];

//DBへの接続や操作を格納するためのオブジェクト
const db = {};


let sequelize;

/**
 * Sequelizeインスタンスを生成
 * 'config.use_env/variable'が定義されていればその情報を使用して、なければ設定オブジェクト内の情報を使用してDBに接続
*/
if (config.use_env_variable) {
  sequelize = new Sequelize(proces.env[config.user_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  //現在のスクリプトのディレクトリ内のファイルを同期的に読み込む
  .readdirSync(__dirname)
  /**
   * 以下3つの条件でfilter
   * ①ファイルの先頭が'.'でない（隠しファイルでない）②ファイル名が'basename'でない ③ファイル名の末尾が'.js'である
  */
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); 
  })
  //sequelize関数で各ファイルのmodelをインポートし、dbオブジェクトに追加
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  })

  /*＊
   * Object.keysメソッド：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
   * forEachメソッド：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   * dbオブジェクトのキー（modelName）を取り出し、forEachメソッドの引数modelNameに順番に代入し、コールバック関数を実行
  */
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      //DBのモデルをインポート後、関連付けのため'associate'メソッドを呼び出す
        db[modelName].associate(db);
    }
  })

  db.sequelize = sequelize;
  db.Sequelize = sequelize;

  module.exports = db;
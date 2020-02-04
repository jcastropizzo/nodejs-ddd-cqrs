import sql from 'sqlite3';

export class AppDAO {
  public static db: sql.Database;

  static initDb(dbFilePath: string) {
    const accountSql = `
            CREATE TABLE IF NOT EXISTS Account (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Value INT NOT NULL)`
    const historySql = `
            CREATE TABLE IF NOT EXISTS History (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Value INT NOT NULL,
            Operation INT NOT NULL)`

    AppDAO.db = new sql.Database(dbFilePath, (err) => {
      if (err) {

      } else {
        console.log('Connected to database')
      }
    });
    AppDAO.run(accountSql);
    AppDAO.run(historySql);

  }

  public static run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }
  public static get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  public static all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

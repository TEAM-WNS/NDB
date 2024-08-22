import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller()
export class AppController {
  constructor(private readonly dataService: DataService) { }

  @Get("ndb/check")
  async check(@Query("id") id, @Query("pw") pw, @Query("database") db, @Query("collection") coll, @Query("user") user) {
    if (db && coll && !user) {
      if (await this.dataService.getAccount(id, pw)) {
        if (await this.dataService.isAdmin(id, pw)) {
          const result = await this.dataService.checkDataBase(db, coll)
          return result
        }
      }
    } else if (!db && !coll && user) {
      if (await this.dataService.getAccount(id, pw)) {
        if (await this.dataService.isAdmin(id, pw)) {
          if (await this.dataService.getAccount((user as string).split(":")[0], (user as string).split(":")[1])) {
            const r = await this.dataService.isAdmin((user as string).split(":")[0].trim(), (user as string).split(":")[1].trim())
    
            return {result: "exist", isAdmin: r}
          } else {
            return {result: "non-exist"}
          }
        }
      }
    }
  }

  @Get("ndb/create")
  async create(@Query("id") id, @Query("pw") pw, @Query("database") db, @Query("collection") coll, @Query("user") user) {
    if (db && coll && !user) {
      if (await this.dataService.getAccount(id, pw)) {
        if (await this.dataService.isAdmin(id, pw)) {
          const result = await this.dataService.createDefaultDataBase(db, coll)
          return result
        } else { return {result: "fail", cause: "NON-ADMIN"} }
      } else { return {result: "fail", cause: "NON-EXIST-USER"} }
    } else if (!db && !coll && user) {
      if (await this.dataService.getAccount(id, pw)) {
        if (await this.dataService.isAdmin(id, pw)) {
          const result = await this.dataService.addUser(user) // user은 id:pw:role 형식.
          return result
        } else { return {result: "fail", cause: "NON-ADMIN"} }
      } else { return {result: "fail", cause: "NON-EXIST-USER"} }
    }
  }

  @Get("ndb/collection")
  async getData(@Query("dbName") db, @Query("collectionName") coll, @Query("id") id, @Query("pw") pw, @Query("findBy") findBy, @Query("edit") edit, @Query("deleteKey") deleteKey, @Query("addKey") addKey, @Query("keyValue") keyValue, @Query("addField") addField, @Query("fieldArray") fieldArray, @Query("fieldValue") fieldValue, @Query("deleteField") deletaField, @Query("isStrict") isStrict) {
    if (!findBy) {
      if (addKey && keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(keyValue)
          const result = await this.dataService.addDocument(db, coll, addKey, jsonData)
          return result
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      } else if (deleteKey && !addKey && !keyValue && !addField && !deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteDocument(db, coll, deleteKey)
          return result
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      }
      else if (!addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadData(db, coll)
          return dataBase
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      }
    } else {
      if (edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(edit)
          let result = await this.dataService.editJson(db, coll, findBy, jsonData)
          return result
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadDocument(db, coll, findBy)
          return dataBase
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      } else if (!edit && !addKey && !keyValue && !deleteKey && addField && !deletaField && fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(fieldArray)
          const result = await this.dataService.addField(db, coll, findBy, addField, jsonData)
          return result
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      } else if (!edit && !addKey && !keyValue && !deleteKey && addField && !deletaField && !fieldArray && fieldValue && isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          if (isStrict.toLowerCase() === 'false') {
            let temp: number | string | boolean;
            if (!isNaN(Number(fieldValue))) {
              temp = Number(fieldValue) as number
            } else if ((fieldValue as string).toLowerCase() === "true" || (fieldValue as string).toLowerCase() === "false") {
              temp = (Boolean(fieldValue as string) as unknown as boolean)
            } else {
              temp = fieldValue as string
            } //boolean = $true

            const result = await this.dataService.addFieldValue(db, coll, findBy, addField, temp)
            return result
          } else if (isStrict.toLowerCase() === 'true') {
            const result = await this.dataService.addFieldValue(db, coll, findBy, addField, fieldValue)
            return result
          }
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && deletaField && !fieldArray && !fieldValue && !isStrict) {
        if (await this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteField(db, coll, findBy, deletaField)
          return result
        } else { return {result: "fail", cause: "NON-EXIST-USER"} }
      }
    }
  }


}

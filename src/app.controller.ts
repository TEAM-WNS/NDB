import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';

@Controller()
export class AppController {
  constructor(private readonly dataService: DataService) { }

  @Get("ndb/create")
  async create(@Query("id") id, @Query("pw") pw, @Query("database") db, @Query("collection") coll, @Query("user") user) {
    if (db && coll && !user) {
      if (this.dataService.getAccount(id, pw)) {
        if (this.dataService.isAdmin(id, pw)) {
          const result = await this.dataService.createDefaultDataBase(db, coll)
          return result
        }
      }
    } else if (!db && !coll && user) {
      if (this.dataService.getAccount(id, pw)) {
        if (this.dataService.isAdmin(id, pw)) {
          const result = this.dataService.addUser(user) // user은 id:pw:role 형식.
          return result
        }
      }
    }
  }

  @Get("ndb/collection")
  async getData(@Query("dbName") db, @Query("collectionName") coll, @Query("id") id, @Query("pw") pw, @Query("findBy") findBy, @Query("edit") edit, @Query("deleteKey") deleteKey, @Query("addKey") addKey, @Query("keyValue") keyValue, @Query("addField") addField, @Query("fieldValue") fieldValue, @Query("deleteField") deletaField) {
    if (!findBy) {
      if (addKey && keyValue && !deleteKey && !addField && !deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(keyValue)
          const result = await this.dataService.addDocument(db, coll, addKey, jsonData)
          return result
        }
      } else if (deleteKey && !addKey && !keyValue && !addField && !deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteDocument(db, coll, deleteKey)
          return result
        }
      }
      else if (!addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadData(db, coll)
          return dataBase
        }
      }
    } else {
      if (edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(edit)
          let result = await this.dataService.editJson(db, coll, findBy, jsonData)
          return result
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadDocument(db, coll, findBy)
          return dataBase
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && addField && !deletaField && fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(fieldValue)
          const result = await this.dataService.addField(db, coll, findBy, addField, jsonData)
          return result
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && deletaField && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteField(db, coll, findBy, deletaField)
          return result
        }
      }
    }
  }


}

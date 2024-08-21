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
  async getData(@Query("dbName") db, @Query("collectionName") coll, @Query("id") id, @Query("pw") pw, @Query("findBy") findBy, @Query("edit") edit, @Query("deleteKey") deleteKey, @Query("addKey") addKey, @Query("keyValue") keyValue, @Query("addField") addField, @Query("fieldArray") fieldArray, @Query("fieldValue") fieldValue, @Query("deleteField") deletaField) {
    if (!findBy) {
      if (addKey && keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(keyValue)
          const result = await this.dataService.addDocument(db, coll, addKey, jsonData)
          return result
        }
      } else if (deleteKey && !addKey && !keyValue && !addField && !deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteDocument(db, coll, deleteKey)
          return result
        }
      }
      else if (!addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadData(db, coll)
          return dataBase
        }
      }
    } else {
      if (edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(edit)
          let result = await this.dataService.editJson(db, coll, findBy, jsonData)
          return result
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && !deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const dataBase = await this.dataService.loadDocument(db, coll, findBy)
          return dataBase
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && addField && !deletaField && fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const jsonData: JSON = JSON.parse(fieldArray)
          const result = await this.dataService.addField(db, coll, findBy, addField, jsonData)
          return result
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && addField && !deletaField && !fieldArray && fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          let temp: number | string | boolean;
          if (!isNaN(Number(fieldValue))) {
            temp = Number(fieldValue) as number
          } else if ((fieldValue as string).toLowerCase() === "$true" || (fieldValue as string).toLowerCase() === "$false") {
            temp = (Boolean((fieldValue as string).slice(1)) as unknown as boolean)
          } else {
            temp = fieldValue as string
          } //boolean = $true

          if (!isNaN(Number((fieldValue as string).slice(1)))) {
            temp = (fieldValue as string).slice(1)
          } // $1 등 이런 식일 때, "1" 이런 식으로 저장하기 위함.
          const result = await this.dataService.addFieldValue(db, coll, findBy, addField, temp)
          return result
        }
      } else if (!edit && !addKey && !keyValue && !deleteKey && !addField && deletaField && !fieldArray && !fieldValue) {
        if (this.dataService.getAccount(id, pw)) {
          const result = await this.dataService.deleteField(db, coll, findBy, deletaField)
          return result
        }
      }
    }
  }


}

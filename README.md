# POST로 변경 예정
- 설계자 잘못임 암튼 그럼 ㅇㅇ

<h1 align="center"><img src="" alt= NDB></h1>
<strong align="center">A New Json-Based DataBase made by Team-WNS</strong>


# What we supports?
base url: ```https://ndb.previousw.dev/ndb/ | your own server's domain/ndb/ ```

## 구조
```json
{
    "Key" { # document를 Key라는 식별자로 생성합니다.
        "field": "fieldValue" # 하위 field-value 쌍입니다.
    }
    "Key2" {
        "field2": "fieldValue2"
    }
}
```

## `/create`
- '*' 는 필수 표시
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>* id, pw</th>
    <th>관리자 계정의 아이디, 비밀번호</th>
  </tr>
  <tr>
    <th>user</th>
    <th>userId:userPw:role</th>
  </tr>
  <tr>
    <th>database, collection</th>
    <th>각각의 이름</th>
  </tr>
</table>

## `/check`
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>* id, pw</th>
    <th>관리자 계정의 아이디, 비밀번호</th>
  </tr>
  <tr>
    <th>database, collection</th>
    <th>db, 컬렉션의 이름</th>
  </tr>
  <tr>
    <th>user</th>
    <th>유저 확인. 아이디:비밀번호 형식</th>
  </tr>
  
</table>

## `/collection`
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>* id, pw</th>
    <th>관리자 계정의 아이디, 비밀번호</th>
  </tr>
  <tr>
    <th>* dbName</th>
    <th>db의 이름</th>
  </tr>
  <tr>
    <th>* collectionName</th>
    <th>컬렉션의 이름</th>
  </tr>
  <tr>
    <th>findBy</th> 
    <th>찾을 data document의 key를 기준으로 document를 받습니다.</th>
  </tr>
</table>


### `하위 쿼리`
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>addKey, keyValue</th>
    <th>key로 document를 생성합니다. keyValue는 기본 값입니다.</th>
  </tr>
  <tr>
    <th>deleteKey</th>
    <th>key로 특정 document를 삭제합니다.</th>
  </tr>
</table>

### `findBy 기준`
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>edit</th>
    <th>json 자체를 완전 수정합니다</th>
  </tr>
  <tr>
    <th>addField, fieldValue / fieldArray</th>
    <th>document에 field-value 쌍을 추가합니다. (fieldArray는 배열, 리스트입니다)</th>
  </tr>
    <tr>
        <th>isStrict</th>
        <th>엄격 모드를 끄고 킵니다. (false / true) </th>
    </tr>
  <tr>
    <th>deleteField</th>
    <th>key로 그 field-value 쌍을 삭제합니다.</th>
  </tr>
</table>

## 엄격모드란?
- 엄격모드가 꺼져있으면 queryString에 입력된 모든 값들은 원래의 값으로 변환되어 저장됩니다. EX) 8 -> number, true -> boolean
- 그러나 엄격모드가 켜져있다면 모든 값을 string으로 저장합니다. EX) 8 -> "8", true -> "true"
### 주의!
- 엄격 모드가 켜져있다면, 어떤 형태로 값을 넣든 간에 string 형식으로 저장되니, 가급적 엄격모드를 꺼주세요!
### 예시: 
- ``` https://ndb.previousw.dev/ndb/create?id=id&pw=pw&user=prevw08:1234567890:member ``` 
- ``` https://ndb.previousw.dev/ndb/create?id=id&pw=pw&database=db&collection=coll ```
- `https://ndb.previousw.dev/ndb/collection?id=id&pw=pw&dbName=database&collectionName=coll&findBy=Key1`
- `https://ndb.previousw.dev/ndb/collection?id=id&pw=pw&dbName=database&collectionName=coll&addKey=Key3&keyValue={"H": 1}`
- `https://ndb.previousw.dev/ndb/collection?id=id&pw=pw&dbName=database&collectionName=coll&findBy=Key1&edit={"kills": 3}`

### return types
```json
{
    result: <fail/success>,
    cause: string
}
```

## CLI commands
- ndb create user <id> <prompt password>
- ndb create database <name> [collection <name>]
- ndb grant.Perm user <name> database <name> [collection <name>]


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

<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>id, pw</th>
    <th>관리자 계정의 아이디, 비밀번호</th>
  </tr>
  <tr>
    <th>user</th>
    <th>userId:userPw:role</th>
  </tr>
  <tr>
    <th>dataBase, collection</th>
    <th>각각의 이름</th>
  </tr>
</table>

## `/collection`
<table>
  <tr>
    <th>query</th>
    <th>입력값</th>
  </tr>
  <tr>
    <th>id, pw</th>
    <th>관리자 계정의 아이디, 비밀번호</th>
  </tr>
  <tr>
    <th>dbName</th>
    <th>db의 이름</th>
  </tr>
  <tr>
    <th>collectionName</th>
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
    <th>addField, fieldValue</th>
    <th>document에 field-value 쌍을 추가합니다.</th>
  </tr>
  <tr>
    <th>deleteField</th>
    <th>key로 그 field-value 쌍을 삭제합니다.</th>
  </tr>
</table>

### 예시: 
- ``` https://ndb.previousw.dev/ndb/create?id=id&pw=pw&user=minmiddle08:kmj08_0928:member ``` 
- ``` https://ndb.previousw.dev/ndb/create?id=id&pw=pw&database=db&collection=coll ```
- `https://ndb.previousw.dev/ndb/collection?id=id&pw=pw&findBy=Key1`
- `https://ndb.previousw.dev/ndb/collection?id=id&pw=pw&addKey=Key3&keyValue={"H": 1}`

### return types
```json
{
    result: <fail/success>,
    cause: string
}
```

## CLI commands
- 추가 예정

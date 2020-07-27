README
===========================
take home project --  撈取 [https://data.taipei/](https://data.taipei/)『今日氣象資訊』資料之前後端系統。

****

此專案以docker包next＋react＋node開發

#目錄結構描述
```
├── Readme.md                   
├── mongo                       // mongodb
├── cronjob                     // nodejs
├── pages                       // nextjs + reactjs
│   ├── index.js                
│   ├── api                         
├── public
├── .env                         
├── .gitignore
├── dokcer-compose.yml
├── package.json
├── th.conf
├── yarn.lock
```


說明
------
### 第一步 安裝docker
官方文檔：[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
### 第二步 啟動docker
```Bash
docker-compose up -d
```
### 成果 前端頁面
[http://localhost:3000/](http://localhost:3000/)
------
### 關閉docker
```Bash
docker-compose down
```

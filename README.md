# Node-js Movie Api 
Node.JS  Movie Api routes

# MOVİES
| Route | Http Verb |  Post body | Description |
| ---- | ---- | ---- | ---- |
| api/movie/ | `GET` | Empty | List all movies |
| api/movie/ | `POST` |  { 'title' : ... .} | Create movie |
| api/movie/:movie_id | `GET` | Empty | Get Movie |
| api/movie/:movie_id | `PUT` |  { 'title' : ... .} | Update Movie |
| api/movie/:movie_id | `DELETE` | Empty | Delete Movie |
| api/movie/top/:value | `GET` | Empty | Get the top 10 Movie |
| api/movie/between/:start_date/:end_date | `GET` | Empty | Get the top between date  Movie|



# DİRECTORS
| Route | Http Verb |  Post body | Description |
| ---- | ---- | ---- | ---- |
| api/director/ | `GET` | Empty | List all movies |
| api/director/ | `POST` |  { 'title' : ... .} | Create movie |
| api/director/:movie_id | `GET` | Empty | Get Movie |
| api/director/:movie_id | `PUT` |  { 'title' : ... .} | Update Movie |
| api/director/:movie_id | `DELETE` | Empty | Delete Movie |
| api/director/top10 | `GET` | Empty | Get the top 10 Movie |

# service crud Lawyer

feature:

1. create new lawyer
2. update data lawyer
3. delete (soft delete) data lawyer
4. filter (ASC belongs to nearest law office) and filter by experince and search by lawyer name

# what we utilize at this service

we use mysql point (geo cordinat method to get nearest law office)

# how to start this project

1. you need: mysql 8.0.0 and node.js versio 18.x.x
2. the migration file in infra/migrtion/perqara.sql
3. configuration in declare ini docker-compose.yml

# Pattern used at this project
Router -> Middleware -> handler -> service -> Repository -> database

# linting 
using standard.js

#test Coverage
using jest just run `npm run test` and it will make a coverage folder and reporting using instanbul.js

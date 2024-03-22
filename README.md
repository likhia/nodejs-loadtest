#Load sample data about 100K record

import the data/playerDB.playerCredit.json using MongoDB Compass.

#run the application with pm2

Please change the host, port and cluster in the connection URI.   The DB name is playerDB and collection is playerCredit. 
pm2 start app2.js -i 13 --name app2

#run the load test with K6 under K6 folder

Please change host and port to Client VM in find.js and modify.js 

k6 run find.js

k6 run modify.js

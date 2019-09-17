#!/bin/bash

Seq 8000 8003 | while read line; 
do
  NAME=index-$line
  pm2 describe $NAME > /dev/null 2>&1
  if [ -z $? ] 
  then
    pm2 restart $NAME    
  else
    echo $line
    pm2 delete $NAME
    export PORT=$line; pm2 start --name $NAME ./index.js 
    sleep 5
  fi
    

done
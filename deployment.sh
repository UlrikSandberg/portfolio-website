ssh root@$PROD_IP << EOF

docker container ls -a

docker stop $(docker ps -a -q)

docker rm $(docker ps -a -q)

docker container ls -a

docker run -d -p 80:80 ulriksandberg/portfolio:$CIRCLE_SHA1

exit
EOF





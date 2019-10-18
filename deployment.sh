ssh root@$PROD_IP << EOF

docker stop $(docker ps -a -q)

docker rm $(docker ps -a -q)

docker run -d -p 80:80 ulriksandberg/portfolio:$CIRCLE_SHA1

exit
EOF





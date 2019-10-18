ssh root@$PROD_IP << EOF

docker container stop $(docker container ls -aq)

docker container rm $(docker container ls -aq)

docker run -d -p 80:80 ulriksandberg/portfolio:$CIRCLE_SHA1

exit
EOF





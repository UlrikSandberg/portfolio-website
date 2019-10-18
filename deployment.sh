ssh root@$PROD_IP << EOF

docker container stop portfolio

docker container rm portfolio

docker image prune -f

docker run -d -p 80:80 -name portfolio ulriksandberg/portfolio:$CIRCLE_SHA1

exit
EOF





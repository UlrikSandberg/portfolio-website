# Fetch the latest alpine distribution and tag it as builder
FROM alpine:latest as BUILDER

# Copy the entire app content into alpine root in a directory called /app
COPY . /app

# Install nodejs and npm --> cd into app directory --> install app dependencies and make a prod build
RUN apk add nodejs && apk add npm && cd /app && npm install && npm run build;

# Take the build artifact from this first stage and copy into the final build stage
FROM alpine:latest 

# Create a new workdir /ap
WORKDIR /app

# Copy the build from build stage
COPY --from=BUILDER /app/build /app
# Copy the nginxConf file into the container
COPY nginxConf/default.conf /etc/nginx/conf.d/default.conf

# Install nginx and make /run/nginx directory to allow nginx to run on a process id; Lastly test the nginx conf file
RUN apk add nginx && mkdir /run/nginx && nginx -t

# At this point we don't have to use cmds such as npm start or npx serve because the build packaged the application in such a
# way that they only require a http server to expose them.

# Expose port 80 which is the port that nginx is listening for
EXPOSE 80 

# The following cmd line will run nginx at this http server
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]

# Lets unpack the cmd above --> "/bin/sh" start the shell --> -c means that bash should intepret following cmds as strings and execute
# them in the context of the "/bin/sh". 

# Now the exec cmd does the following --> exec command in Linux is used to execute a command from the bash itself.
# This command does not create a new process it just replaces the bash with the command to be executed. If the exec
# command is successful, it does not return to the calling process.
# nginx starts nginx x 






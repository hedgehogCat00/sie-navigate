#from node:10 as builder
#copy ./ /app
#workdir /app
#run npm install -g yarn@1.17.3 && yarn run build

FROM 10.192.30.110:8280/nginx
#copy --from=builder /app/dist /app
COPY /home/hedgehogcat/jly-files/SCIC-projects/sie-nav/dist /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/nginx.conf

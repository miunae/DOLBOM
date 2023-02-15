FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploydolbom/FrontEnd
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/deploydolbom/FrontEnd/dist /usr/share/nginx/html
<<<<<<< HEAD
COPY --from=build-stage /var/jenkins_home/workspace/deploydolbom/FrontEnd/deploy_config/nginx.config/etc/nginx/conf.d/default.conf
=======
COPY --from=build-stage /var/jenkins_home/workspace/deploydolbom/FrontEnd/deploy_conf/nginx.conf/etc/nginx/conf.d/default.conf
>>>>>>> 80c3e47d079e7173f536a45f509af6b521b8b158
EXPOSE 3000
#EXPOSE 80
CMD ["nginx", "-g","daemon off;"]

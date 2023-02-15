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
COPY --from=build-stage /var/jenkins_home/workspace/deploydolbom/FrontEnd/deploy_config/nginx.config /etc/nginx/conf.d/default.conf
>>>>>>> b12c22704116aed1768e4fcce69a1464160ca575
EXPOSE 3000
#EXPOSE 80
CMD ["nginx", "-g","daemon off;"]

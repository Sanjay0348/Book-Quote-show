# # Base image
# FROM node:18-alpine AS base
# WORKDIR /app
# COPY package*.json ./

# # ---- Development stage (optional) ----
# # FROM base AS development
# # RUN npm install
# # COPY . .
# # EXPOSE 3000
# # CMD ["npm", "run", "dev"]

# # ---- Build stage ----
# FROM base AS build
# RUN npm install
# COPY . .
# RUN npm run build

# # ---- Production stage (nginx) ----
# FROM nginx:alpine AS production
# # Copy build output to nginx html folder
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Use official Node image
FROM node:18-alpine As build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Optional: remove default nginx config and copy your own
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
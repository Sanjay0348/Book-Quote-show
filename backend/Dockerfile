# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# # Build stage
# FROM base AS build
# # install ALL deps (including dev) for build
# RUN npm install
# COPY . .
# RUN npm run build

# # Production stage
# FROM node:18-alpine AS production
# WORKDIR /app

# # copy only required stuff
# COPY --from=build /app/dist ./dist
# COPY package*.json ./

# # install only prod deps
# RUN npm install --omit=dev && npm cache clean --force

# create non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S backend -u 1001
USER backend

EXPOSE 5000
CMD ["npm", "start"]

# --- Build stage ---
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build


# --- Runtime stage ---
FROM node:18-alpine AS runtime
WORKDIR /app

# Copy only package files for production install
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built artifacts from build stage
COPY --from=build /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
    && adduser -S backend -u 1001
USER backend

EXPOSE 5000
CMD ["npm", "start"]

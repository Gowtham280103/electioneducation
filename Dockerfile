# Stage 1: Build the React app
FROM node:20.17.0-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json ./

# Install dependencies with legacy peer deps to avoid conflicts
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build the production app
RUN npm run build

# Stage 2: Serve with lightweight nginx
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (required by Cloud Run)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

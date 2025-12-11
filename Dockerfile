# -------------------------
# 1) BUILD STAGE (Vite)
# -------------------------
FROM node:22-alpine AS build

# Create app directory
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the source
COPY . .

ARG VITE_GOOGLE_API_KEY
ARG VITE_SHEET_ID
ARG VITE_YOUTUBE_CHANNEL_ID

ENV VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY
ENV VITE_SHEET_ID=$VITE_SHEET_ID
ENV VITE_YOUTUBE_CHANNEL_ID=$VITE_YOUTUBE_CHANNEL_ID

# If you are using .env.production / .env files,
# Vite will read them automatically at build time.
# Just make sure your keys are prefixed with VITE_.

# Build the production bundle
RUN npm run build


# -------------------------
# 2) RUNTIME STAGE (Nginx)
# -------------------------
FROM nginx:alpine

# Remove default config and add our SPA config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

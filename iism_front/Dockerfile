FROM --platform=linux/amd64 node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM --platform=linux/amd64 node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json       ./package.json
COPY --from=builder /app/package-lock.json  ./package-lock.json
RUN npm install --omit=dev

COPY --from=builder /app/.next   ./.next
COPY --from=builder /app/public  ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "run", "start"]


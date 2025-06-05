FROM oven/bun:1.1.18-alpine AS production

# Set working directory for the application
WORKDIR /app

COPY . .

# COPY .env .env

RUN bun install --frozen-lockfile

# Expose the port that your NestJS application listens on
# Default for NestJS is 3000
EXPOSE 3000

# Command to run the application
# Use 'bun run start' if you have a 'start' script in package.json
# or 'bun dist/main.js' directly if you prefer
CMD ["bun", "run", "start"]
# CMD ["bun", "dist/main.js"] # Alternative if 'start' script just runs this
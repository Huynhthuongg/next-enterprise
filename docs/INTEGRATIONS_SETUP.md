# 🔗 Kubiks Integrations Setup Guide

## Available Integrations

### 1. Drizzle ORM - Database Tracing
```bash
pnpm add @kubiks/otel-drizzle
```

### 2. Better Auth - Authentication Tracing  
```bash
pnpm add @kubiks/otel-better-auth
```

### 3. Resend - Email Service Tracing
```bash
pnpm add @kubiks/otel-resend
```

### 4. QStash - Message Queue Tracing
```bash
pnpm add @kubiks/otel-upstash-queues
```

### 5. Autumn - Billing & Subscription Tracing
```bash
pnpm add @kubiks/otel-autumn
```

## Installation Priority

1. ✅ Drizzle (if using database)
2. ✅ Better Auth (if using authentication)
3. ✅ Resend (if sending emails)
4. ⭐ QStash (if using message queues)
5. 💰 Autumn (if implementing billing)

## Testing Integrations

1. Trigger an action (login, query, send email)
2. Check Kubiks dashboard for spans
3. Verify span attributes

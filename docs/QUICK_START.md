# 🚀 Kubiks Quick Start Guide

## Step 1: Environment Setup (5 mins)

### 1.1 Add Environment Variables
```bash
# .env.local
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.kubiks.app
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_HEADERS=x-kubiks-key=kubiks_4aa688df2151e61b173b7681dca5ae027c0f807f04abac93d267fda085f902fb
OTEL_SERVICE_NAME=next-enterprise
```

### 1.2 Install Dependencies
```bash
pnpm install
```

### 1.3 Run Application
```bash
pnpm dev
```

---

## Step 2: Test Connection (5 mins)

### 2.1 Generate Some Traffic
Open http://localhost:3000 in your browser

### 2.2 Check Kubiks Dashboard
1. Go to https://kubiks.io
2. Look at your project dashboard
3. Should see requests coming in

---

## Step 3: Setup Vercel Integration (10 mins)

### 3.1 Add Environment Variables to Vercel
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add the OTEL variables

### 3.2 Create Log Drain
1. Settings → Log Drains
2. Click "Add Drain"

---

## Support

- 📧 Email: support@kubiks.ai
- 📖 Docs: https://docs.kubiks.ai

Happy monitoring! 🎉

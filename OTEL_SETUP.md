# OpenTelemetry Setup Guide for Kubiks v1.0

This guide explains how to configure and use OpenTelemetry with Kubiks in your Next.js application.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Variables](#environment-variables)
3. [What Gets Tracked](#what-gets-tracked)
4. [Verifying the Setup](#verifying-the-setup)
5. [Advanced Configuration](#advanced-configuration)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Get Your API Key

- Go to [Kubiks Dashboard](https://app.kubiks.ai)
- Navigate to **Settings → API Keys**
- Copy your API key

### 2. Set Environment Variables

Create a `.env.local` file in the root of your project:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.kubiks.app
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_HEADERS=x-kubiks-key=YOUR_API_KEY_HERE
OTEL_SERVICE_NAME=next-enterprise
```

Replace `YOUR_API_KEY_HERE` with your actual API key.

### 3. Run Your Application

```bash
pnpm install
pnpm dev
```

### 4. Generate Some Traffic

- Open your app in a browser: http://localhost:3000
- Click around different pages and routes
- Make some API calls

### 5. Check Kubiks Dashboard

- Go to [Kubiks Dashboard](https://app.kubiks.ai)
- You should see traces and logs appearing within a few seconds

---

## 🔑 Environment Variables

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `https://ingest.kubiks.app` | Kubiks ingestion endpoint |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `http/protobuf` | Data protocol (HTTP + Protocol Buffers) |
| `OTEL_EXPORTER_OTLP_HEADERS` | `x-kubiks-key=YOUR_API_KEY` | Authentication header |
| `OTEL_SERVICE_NAME` | `next-enterprise` | Application name (change as needed) |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OTEL_TRACES_SAMPLER` | `always_on` | Sampling strategy |
| `OTEL_TRACES_SAMPLER_ARG` | `1.0` | Sampling rate (0.0-1.0) |
| `OTEL_LOG_LEVEL` | `INFO` | Log verbosity level |

**Sampling Example:**
```bash
# Sample 10% of traces (useful for high-traffic apps)
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.1
```

---

## 📊 What Gets Tracked

### Automatic Tracking (via @vercel/otel)

✅ **HTTP Requests**
- All incoming HTTP requests to your Next.js app
- Request method, path, status code, duration
- Client IP address, user agent, referrer

✅ **Server-Side Rendering**
- Page rendering performance
- Data fetching duration
- Middleware execution

✅ **API Routes**
- Next.js API route handlers
- Request/response timing
- Errors and exceptions

✅ **Errors & Exceptions**
- Unhandled errors with stack traces
- Error frequency and patterns
- Performance degradation alerts

### Manual Tracking (Add Custom Spans)

You can add custom spans to track specific operations:

```typescript
// In your API routes or server actions
import { trace } from '@opentelemetry/api'

const tracer = trace.getTracer('next-enterprise')

export async function POST(request: Request) {
  const span = tracer.startSpan('custom-operation')
  
  try {
    // Your business logic
    span.addEvent('operation-completed')
    return new Response('Success')
  } catch (error) {
    span.recordException(error as Error)
    throw error
  } finally {
    span.end()
  }
}
```

---

## ✅ Verifying the Setup

### Check 1: Logs Output

When you run `pnpm dev`, you should see OpenTelemetry initialization:

```
⚡ Next.js Dev Server Started
OpenTelemetry initialized with service: next-enterprise
Sending traces to: https://ingest.kubiks.app
```

### Check 2: Kubiks Dashboard

1. Go to https://app.kubiks.ai
2. Look for your service name in the dashboard
3. You should see:
   - Recent traces from your app
   - Performance metrics
   - Error logs (if any)

### Check 3: Browser DevTools

Check the Network tab in your browser:
- You should see POST requests to `ingest.kubiks.app` 
- These contain your telemetry data (gzipped)

### Check 4: Direct Test

Run this command to test the endpoint:

```bash
curl -X POST https://ingest.kubiks.app/v1/traces \
  -H "x-kubiks-key: YOUR_API_KEY" \
  -H "Content-Type: application/x-protobuf" \
  -d "test"
```

---

## 🔧 Advanced Configuration

### 1. Enable Trace Context Propagation

For distributed tracing across services:

```bash
OTEL_PROPAGATORS=tracecontext,baggage
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

### 2. Custom Resource Attributes

Add custom attributes to all spans:

```bash
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=production,version=1.0.0
```

### 3. Disable Specific Instrumentations

If you want to skip certain instrumentations:

```bash
OTEL_INSTRUMENTATION_HTTP_ENABLED=true
OTEL_INSTRUMENTATION_FS_ENABLED=false
```

### 4. High-Volume Traffic Configuration

For production environments with high traffic:

```bash
# Sample 5% of traces
OTEL_TRACES_SAMPLER=parentbased_traceidratio
OTEL_TRACES_SAMPLER_ARG=0.05

# Batch export (more efficient)
OTEL_BSP_MAX_QUEUE_SIZE=2048
OTEL_BSP_SCHEDULED_DELAY_MILLIS=5000
OTEL_BSP_MAX_EXPORT_BATCH_SIZE=512
```

---

## 🐛 Troubleshooting

### Issue 1: No Data Appearing in Kubiks

**Check the following:**

1. ✅ API key is correct (copy from Settings → API Keys)
2. ✅ Environment variables are set correctly
3. ✅ Application is actually running (`pnpm dev` or `pnpm start`)
4. ✅ You've generated some traffic (visit pages, make API calls)
5. ✅ Check for network errors in browser console

**Debug Command:**
```bash
# Enable debug logging
OTEL_LOG_LEVEL=DEBUG pnpm dev
```

### Issue 2: CORS Errors

If you see CORS errors in the browser console, it's likely a browser security issue. This is **not a problem** because:
- Server-side telemetry (Node.js) still works
- Browser-side telemetry respects CORS
- You should still see server-side traces

### Issue 3: High Memory Usage

If your app uses too much memory:

```bash
# Reduce sampling rate
OTEL_TRACES_SAMPLER_ARG=0.1

# Reduce batch size
OTEL_BSP_MAX_QUEUE_SIZE=1024
```

### Issue 4: Slow Application Startup

OpenTelemetry initialization is fast, but if needed:

```bash
# Disable some instrumentations
OTEL_INSTRUMENTATION_HTTP_ENABLED=true
OTEL_INSTRUMENTATION_FS_ENABLED=false
OTEL_INSTRUMENTATION_MYSQL_ENABLED=false
```

### Issue 5: Vercel Deployment Not Sending Data

Make sure to:

1. Add environment variables to Vercel:
   - Go to **Project Settings → Environment Variables**
   - Add all OTEL_* variables

2. Use Vercel's Log Drains:
   - Go to **Settings → Log Drains**
   - Configure Kubiks endpoint

3. Redeploy after adding variables:
   ```bash
   git push
   # or use Vercel CLI: vercel
   ```

---

## 🔗 Integration with Kubiks Features

### 1. Error Tracking

Errors are automatically captured. View them in:
- **Errors** tab in Kubiks dashboard
- Email/Slack alerts (if configured)

### 2. Performance Monitoring

Track slow requests:
- **Performance** section shows P50, P95, P99 latencies
- Identify bottlenecks by service/route

### 3. Distributed Tracing

If you have multiple services:
- Traces automatically correlate across services
- See the full request flow (frontend → backend → database)

### 4. Custom Dashboards

Create custom dashboards:
1. Go to **Dashboards** in Kubiks
2. Add widgets for your metrics
3. Set up alerts for anomalies

---

## 📚 Additional Resources

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Next.js + OpenTelemetry](https://nextjs.org/docs/app/building-your-application/optimizing/open-telemetry)
- [Vercel OTEL Integration](https://vercel.com/docs/observability/otel-overview)
- [Kubiks Documentation](https://docs.kubiks.ai)

---

## ❓ Still Having Issues?

Contact Kubiks support:
- Email: support@kubiks.ai
- Chat: https://app.kubiks.ai/support
- Slack: #kubiks-support (if available)

---

**Last Updated:** 2024
**Version:** 1.0

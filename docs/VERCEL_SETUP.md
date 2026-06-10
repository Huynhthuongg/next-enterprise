# ⚙️ Thiết lập Vercel Integration cho Kubiks

## Environment Variables

1. Go to https://vercel.com/dashboard
2. Select project: `next-enterprise`
3. Settings → Environment Variables
4. Add these variables:

```
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.kubiks.app
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_HEADERS=x-kubiks-key=kubiks_4aa688df2151e61b173b7681dca5ae027c0f807f04abac93d267fda085f902fb
OTEL_SERVICE_NAME=next-enterprise
```

Ensure variables are applied to:
- Production
- Preview
- Development

## Log Drains

1. Settings → Log Drains
2. Click "Add Drain"
3. Choose "Logs"
4. Configure Kubiks endpoint

## Trace Drains (Optional)

1. Settings → Integrations → OpenTelemetry
2. Configure trace endpoint:
   - Endpoint: `https://ingest.kubiks.app/v1/traces`
   - Headers: `x-kubiks-key=kubiks_4aa688df2151e61b173b7681dca5ae027c0f807f04abac93d267fda085f902fb`

## Expected Results

- ✅ Logs sent real-time
- ✅ Traces captured automatically
- ✅ Data visible in Kubiks dashboard

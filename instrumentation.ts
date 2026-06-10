import { registerOTel } from "@vercel/otel"

/**
 * OpenTelemetry Instrumentation for Next.js
 * 
 * This file is automatically loaded by Next.js at startup.
 * Environment variables are read from .env.local, .env.production, etc.
 * 
 * Required env vars:
 * - OTEL_EXPORTER_OTLP_ENDPOINT: https://ingest.kubiks.app
 * - OTEL_EXPORTER_OTLP_PROTOCOL: http/protobuf
 * - OTEL_EXPORTER_OTLP_HEADERS: x-kubiks-key=YOUR_API_KEY
 * - OTEL_SERVICE_NAME: next-enterprise
 */

export function register() {
  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME || "next-enterprise",
  })
}

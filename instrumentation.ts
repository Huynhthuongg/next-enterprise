/**
 * OpenTelemetry Instrumentation for Kubiks
 * 
 * This file configures automatic tracing for your Next.js application.
 * It runs on both server and client sides and collects:
 * - HTTP requests and responses
 * - Server-side errors and performance metrics
 * - Database queries (if instrumented)
 * - Custom spans for business logic
 * 
 * Configuration:
 * - OTEL_EXPORTER_OTLP_ENDPOINT: Kubiks ingest endpoint
 * - OTEL_EXPORTER_OTLP_PROTOCOL: HTTP with Protocol Buffers
 * - OTEL_EXPORTER_OTLP_HEADERS: Authentication with API key
 * - OTEL_SERVICE_NAME: Your application name
 */

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
    // Vercel automatically detects OTEL_EXPORTER_OTLP_ENDPOINT
    // OTEL_EXPORTER_OTLP_HEADERS sẽ được sử dụng tự động
  })
}

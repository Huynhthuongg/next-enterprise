/**
 * Kubiks Debug Utilities
 * Giúp debugging OpenTelemetry traces
 */

import { trace, context } from '@opentelemetry/api';

const tracer = trace.getTracer('kubiks-debug');

/**
 * Log trace ID trong browser console
 * Dùng để link logs với traces
 */
export function logTraceId() {
  const ctx = context.active();
  const span = trace.getActiveSpan();
  
  if (span) {
    const { traceId, spanId } = span.spanContext();
    console.log(`[Kubiks] TraceId: ${traceId}`);
    console.log(`[Kubiks] SpanId: ${spanId}`);
    console.log(`[Kubiks] Link: https://kubiks.io/traces/${traceId}`);
  }
}

/**
 * Create custom span cho debugging
 */
export function createDebugSpan<T>(
  name: string,
  fn: (span: any) => Promise<T> | T,
): Promise<T> {
  return tracer.startActiveSpan(name, async (span) => {
    try {
      const result = await fn(span);
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: 2 }); // ERROR status
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Measure function execution time
 */
export async function measurePerformance<T>(
  label: string,
  fn: () => Promise<T>,
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    console.log(`[Performance] ${label}: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[Performance] ${label}: ${duration}ms (FAILED)`);
    throw error;
  }
}

/**
 * Add custom attribute to current span
 */
export function addAttribute(key: string, value: any) {
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttribute(key, value);
  }
}

/**
 * Record event trong span
 */
export function recordEvent(name: string, attributes?: Record<string, any>) {
  const span = trace.getActiveSpan();
  if (span) {
    span.addEvent(name, attributes);
  }
}

export default {
  logTraceId,
  createDebugSpan,
  measurePerformance,
  addAttribute,
  recordEvent,
};

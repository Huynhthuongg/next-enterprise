# 📊 Monitoring & Debugging với Kubiks

## Key Metrics to Monitor

### Application Performance
- Request Duration
- Error Rate
- Throughput
- P95/P99 Latency

### Database Performance
- Query Duration
- Slow Queries (>500ms)
- Query Count
- N+1 Detection

### Debugging Workflow

**Step 1:** Identify the problem
**Step 2:** Find related logs
**Step 3:** Analyze traces  
**Step 4:** Reproduce locally

## Performance Optimization Tips

1. **Slow Database Queries**
   - Add indexes
   - Use SELECT specific columns
   - Use LIMIT for large results

2. **N+1 Queries**
   - Use JOIN instead of multiple queries
   - Use batch loading
   - Use select with relations

3. **Slow API Requests**
   - Cache responses
   - Use middleware optimization
   - Reduce data transferred

4. **High Memory Usage**
   - Release unused objects
   - Use streaming for large files
   - Implement caching with size limits

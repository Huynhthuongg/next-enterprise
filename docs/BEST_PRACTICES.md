# 🎯 Best Practices cho Kubiks & OpenTelemetry

## 1. Naming Conventions

### Service Names
```
✅ GOOD:  next-enterprise, user-api, payment-service
❌ BAD:   app1, service, my-service
```

### Span Names
```
✅ GOOD:  GET /api/users/:id, db.query.select, email.send
❌ BAD:   handle, process, do_something
```

## 2. Span Best Practices

### ✅ DO:
- Create spans cho main operations
- Tên spans rõ ràng và consistent
- Add relevant attributes
- Record errors với context

### ❌ DON'T:
- Quá nhiều spans
- Tên spans quá generic
- Log sensitive data
- Leave spans open

## 3. Attribute Best Practices

### Security:
```
❌ NEVER log:
- API keys
- Passwords
- Credit cards

✅ INSTEAD:
- User IDs
- General context
- Summaries
```

## 4. Sampling Strategy

### Production
- Sample Rate: 5-10%
- Capture errors 100%
- Capture slow requests 100%

### Staging
- Sample Rate: 50%

### Development
- Sample Rate: 100%

## 5. Log Levels

- DEBUG - Detailed info
- INFO - General operations
- WARN - Warnings
- ERROR - Errors
- FATAL - Critical errors

## 6. Regular Audits

### Weekly
- Review error patterns
- Check resource usage
- Verify sampling rates

### Monthly
- Optimize slow queries
- Clean up old data
- Update alerts

### Quarterly
- Full performance audit
- Capacity planning
- Cost optimization

# 📚 Kubiks & OpenTelemetry Complete Course v1.0

Hướng dẫn đầy đủ cho việc thiết lập, cấu hình, và sử dụng Kubiks observability platform.

## 📖 Documentation

### Getting Started
- **[Quick Start Guide](./QUICK_START.md)** - Bắt đầu nhanh trong 15 phút
- **[Vercel Setup](./VERCEL_SETUP.md)** - Cấu hình Vercel integrations
- **[Integrations Guide](./INTEGRATIONS_SETUP.md)** - Thêm tracing cho Drizzle, Auth, Resend, v.v.

### Advanced
- **[Monitoring Guide](./MONITORING_GUIDE.md)** - Cách monitor ứng dụng hiệu quả
- **[Best Practices](./BEST_PRACTICES.md)** - Best practices cho telemetry
- **[Debug Utilities](../lib/kubiks-debug.ts)** - Helper functions

## 🚀 Quick Links

- 🏠 Dashboard: https://kubiks.io
- 📖 Documentation: https://docs.kubiks.ai
- 🔑 API Key: `kubiks_4aa688df2151e61b173b7681dca5ae027c0f807f04abac93d267fda085f902fb`
- 📧 Support: support@kubiks.ai

## ✅ Implementation Checklist

### Phase 1: Basic Setup
- [ ] Environment variables configured (.env.local)
- [ ] Dependencies installed (pnpm install)
- [ ] Application running (pnpm dev)
- [ ] Data flowing to Kubiks

### Phase 2: Vercel Integration
- [ ] Environment variables added to Vercel
- [ ] Log Drain configured
- [ ] Trace Drain configured
- [ ] Production deployment connected

### Phase 3: Integrations
- [ ] Drizzle (if using database)
- [ ] Better Auth (if using authentication)
- [ ] Resend (if sending emails)
- [ ] QStash (if using message queues)

### Phase 4: Monitoring
- [ ] Custom dashboards created
- [ ] Alerts configured
- [ ] Error tracking enabled
- [ ] Performance monitoring active

## 📊 Key Metrics to Track

### Application
- Request duration
- Error rate
- Throughput
- P95/P99 latency

### Database
- Query duration
- Slow queries (>500ms)
- Query count
- N+1 detection

### Business
- User signups
- Login success rate
- Email delivery rate
- Feature usage

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| No data in Kubiks | Check env vars, API key, debug logs |
| Slow requests | Review trace duration, find slow spans |
| High memory | Check Lambda settings, memory leaks |
| Missing traces | Verify integrations installed |

## 📞 Support

- 💬 **Slack**: Join Kubiks community
- 📧 **Email**: support@kubiks.ai
- 📖 **Docs**: https://docs.kubiks.ai

---

**Last Updated**: June 2024
**Course Version**: v1.0
**Status**: Complete Setup

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: `https://cdde3ff008b044da82fb131ccb311413@o575001.ingest.sentry.io/5728642`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const logger = {
  init,
};

export default logger;

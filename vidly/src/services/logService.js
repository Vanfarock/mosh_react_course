import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://806123b4327842a8b7f27efc51a2f70e@o575001.ingest.sentry.io/5726717",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const logger = {
  init,
};

export default logger;

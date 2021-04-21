import * as Sentry from "@sentry/react";
import config from "../config.json";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: `https://${config.sentryPrivateKey}@o575001.ingest.sentry.io/5726717`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const logger = {
  init,
};

export default logger;

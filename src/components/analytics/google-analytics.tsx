"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const gaMeasurementId = "G-R79M92ZJ07";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/app")) {
      return;
    }

    const browserWindow = window as WindowWithIdleCallback;
    const loadAnalytics = () => setShouldLoad(true);

    if (browserWindow.requestIdleCallback) {
      const idleHandle = browserWindow.requestIdleCallback(loadAnalytics, { timeout: 3000 });
      return () => browserWindow.cancelIdleCallback?.(idleHandle);
    }

    const timeoutHandle = window.setTimeout(loadAnalytics, 3000);
    return () => window.clearTimeout(timeoutHandle);
  }, [pathname]);

  if (!shouldLoad || pathname?.startsWith("/app")) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}');
        `}
      </Script>
    </>
  );
}

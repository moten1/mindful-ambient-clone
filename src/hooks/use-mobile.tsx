import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === "undefined") return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Initial check
    checkIsMobile();

    // Event listener with compatibility fallback
    if (mql.addEventListener) {
      mql.addEventListener("change", checkIsMobile);
    } else if (mql.addListener) {
      mql.addListener(checkIsMobile);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkIsMobile);
      } else if (mql.removeListener) {
        mql.removeListener(checkIsMobile);
      }
    };
  }, []);

  return isMobile;
}

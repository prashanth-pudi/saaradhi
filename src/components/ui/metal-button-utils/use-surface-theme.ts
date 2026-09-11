"use client";

import * as React from "react";

export type SurfaceTheme = "auto" | "light" | "dark";

export function useSurfaceTheme(theme: SurfaceTheme = "auto"): "light" | "dark" {
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (theme !== "auto") {
      setResolvedTheme(theme);
      return;
    }

    const checkTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, [theme]);

  return resolvedTheme;
}

export default useSurfaceTheme;

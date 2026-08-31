type FetchPriority = "high" | "low" | "auto";

const alreadyHandled = new Set<string>();

export function preloadImage(src: string, priority: FetchPriority = "auto"): void {
  if (!src || alreadyHandled.has(src)) return;
  alreadyHandled.add(src);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  if (priority !== "auto") {
    link.setAttribute("fetchpriority", priority);
  }
  document.head.appendChild(link);
}

export function prefetchImages(sources: string[]): void {
  const load = () => {
    sources.forEach((src) => {
      if (!src || alreadyHandled.has(src)) return;
      alreadyHandled.add(src);
      const img = new Image();
      img.src = src;
    });
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(load, { timeout: 2000 });
  } else {
    setTimeout(load, 200);
  }
}
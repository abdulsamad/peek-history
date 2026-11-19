import { useRef, useCallback, useEffect } from "react";

/**
 * Returns a callback ref for a loader element. `onReachEnd` runs whenever the
 * loader scrolls into view, including right after it mounts while visible.
 */
const useInfiniteScroll = (onReachEnd: () => void) => {
  const observer = useRef<IntersectionObserver>();
  const onReachEndRef = useRef(onReachEnd);

  useEffect(() => {
    onReachEndRef.current = onReachEnd;
  });

  // Stable identity, so re-renders don't detach and re-attach the observer
  return useCallback((node: HTMLElement | null) => {
    observer.current?.disconnect();
    if (!node) return;

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onReachEndRef.current();
    });
    observer.current.observe(node);
  }, []);
};

export default useInfiniteScroll;

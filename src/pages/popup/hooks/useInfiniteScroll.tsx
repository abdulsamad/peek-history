import { useRef, useCallback } from "react";

interface IuseInfiniteScroll {
  next: (prevTime: number | undefined) => void;
}

const useInfiniteScroll = ({ next }: IuseInfiniteScroll) => {
  const observer = useRef<IntersectionObserver>();
  const prevLastVisitTime = useRef<number>();

  const lastElemRef = useCallback(
    (node: HTMLLIElement, lastVisitTime: number | undefined) => {
      // Disconnect old observer
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          node.scrollIntoView();

          setTimeout(() => {
            next(prevLastVisitTime.current);

            if (observer.current) {
              observer.current.disconnect();
            }
          }, 800);
        }
      });

      if (lastVisitTime !== prevLastVisitTime.current && node)
        observer.current.observe(node);
      prevLastVisitTime.current = lastVisitTime;
    },
    []
  );

  return { lastElemRef };
};

export default useInfiniteScroll;

import { useEffect, useRef } from 'react';

export const useInfinityScroll = ({ hasNext, callback }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    /* 스크롤 시 동작 */
    const onScroll = (entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasNext) {
        callback();
      }
    };

    /* 무한 스크롤 감시 */
    const observer = new IntersectionObserver(onScroll);
    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      /* 무한 스크롤 감시를 종료 */
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasNext, callback]);

  return { observerRef };
};

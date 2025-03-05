import * as React from 'react';

export interface IListProps {
    items: any[]
}

const Item: React.FC<{ index: number }> = ({ index }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={itemRef} className="relative w-full h-full">
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      {isVisible && (
        <img
          src={'https://picsum.photos/700'}
          alt={`Item ${index + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover relative z-10 transition-opacity duration-300"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-20">
        <h3 className="text-lg font-semibold">Item {index + 1}</h3>
      </div>
    </div>
  );
};

export default function List({ items }: IListProps) {
  const ITEM_COUNT = 100;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = React.useState(1);
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 0 });
  const scrollTimeout = React.useRef<number | undefined>(undefined);

  // Tính số cột dựa trên kích thước màn hình
  React.useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      let columns = 1;
      if (width >= 1280) columns = 5;
      else if (width >= 1024) columns = 4;
      else if (width >= 768) columns = 3;
      else if (width >= 640) columns = 2;
      setColumnCount(columns);
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Tính toán các items cần render
  React.useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemHeight = container.offsetWidth / columnCount;
    const buffer = 0; // Số hàng buffer

    const updateVisibleRange = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      
      const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const endRow = Math.min(
        Math.ceil(ITEM_COUNT / columnCount),
        Math.ceil((scrollTop + viewportHeight) / itemHeight) + buffer
      );

      setVisibleRange({
        start: startRow * columnCount,
        end: endRow * columnCount
      });
    };

    const handleScroll = () => {
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }

      scrollTimeout.current = window.requestAnimationFrame(updateVisibleRange);
    };

    container.addEventListener('scroll', handleScroll);
    updateVisibleRange(); // Tính toán ban đầu

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
    };
  }, [columnCount]);

  // Tạo placeholder để giữ kích thước tổng thể
  const totalHeight = Math.ceil(ITEM_COUNT / columnCount) * (containerRef.current?.offsetWidth || 0) / columnCount;

  return (
    <div ref={containerRef} className="w-full h-[800px] overflow-auto">
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          className="absolute top-0 left-0 grid gap-4 p-4"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            width: '100%',
            willChange: 'transform'
          }}
        >
          {Array.from({ length: visibleRange.end - visibleRange.start }).map((_, index) => {
            const itemIndex = visibleRange.start + index;
            const row = Math.floor(itemIndex / columnCount);
            const col = itemIndex % columnCount;
            
            return (
              <div 
                key={itemIndex} 
                className="aspect-square"
                style={{
                  position: 'absolute',
                  top: `${row * (containerRef.current?.offsetWidth || 0) / columnCount}px`,
                  left: `${col * (containerRef.current?.offsetWidth || 0) / columnCount}px`,
                  width: `${(containerRef.current?.offsetWidth || 0) / columnCount - 16}px`,
                  height: `${(containerRef.current?.offsetWidth || 0) / columnCount - 16}px`,
                  willChange: 'transform'
                }}
              >
                <Item index={itemIndex} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

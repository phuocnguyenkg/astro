import * as React from 'react';
import { FixedSizeGrid } from 'react-window';
import type { GridChildComponentProps } from 'react-window';

export interface IListProps {
    items: any[]
}

const ITEM_SIZE = 200;
const COLUMN_COUNT = 5;

interface CellProps extends GridChildComponentProps {
  columnIndex: number;
  rowIndex: number;
}

const Item: React.FC<CellProps> = ({ columnIndex, rowIndex, style, data }) => {
  const index = rowIndex * COLUMN_COUNT + columnIndex;
  
  return (
    <div style={style} className="relative w-full h-full p-2">
      <div className="absolute inset-0 bg-gray-200"></div>
      <img
        src={`https://picsum.photos/700?random=${index}`}
        alt={`Item ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
        <h3 className="text-lg font-semibold">Item {index + 1}</h3>
      </div>
    </div>
  );
};

export default function List({ items }: IListProps) {
  const ITEM_COUNT = 100;
  const rowCount = Math.ceil(ITEM_COUNT / COLUMN_COUNT);

  return (
    <div className="w-full h-[800px]">
      <FixedSizeGrid
        columnCount={COLUMN_COUNT}
        columnWidth={ITEM_SIZE}
        height={800}
        rowCount={rowCount}
        rowHeight={ITEM_SIZE}
        width={ITEM_SIZE * COLUMN_COUNT}
        style={{ margin: '0 auto' }}
        children={({ columnIndex, rowIndex, style, data }) => (
          <Item columnIndex={columnIndex} rowIndex={rowIndex} style={style} data={data} />
        )}
      />
    </div>
  );
}

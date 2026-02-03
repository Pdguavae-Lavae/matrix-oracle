import { useEffect, useState, useMemo } from 'react';

interface MatrixColumn {
  id: number;
  left: number;
  duration: number;
  delay: number;
  chars: string[];
}

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

const generateChars = (count: number): string[] => {
  return Array.from({ length: count }, () => 
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  );
};

const MatrixRain = () => {
  const [columns, setColumns] = useState<MatrixColumn[]>([]);

  const columnCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      return Math.floor(window.innerWidth / 20);
    }
    return 50;
  }, []);

  useEffect(() => {
    const newColumns: MatrixColumn[] = Array.from({ length: columnCount }, (_, i) => ({
      id: i,
      left: (i / columnCount) * 100,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
      chars: generateChars(20 + Math.floor(Math.random() * 15)),
    }));
    setColumns(newColumns);
  }, [columnCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-column absolute top-0 flex flex-col text-xs leading-tight"
          style={{
            left: `${column.left}%`,
            animationDuration: `${column.duration}s`,
            animationDelay: `${column.delay}s`,
          }}
        >
          {column.chars.map((char, charIndex) => (
            <span
              key={charIndex}
              className="font-mono"
              style={{
                color: charIndex === 0 
                  ? 'hsl(120 100% 90%)' 
                  : `hsl(120 100% ${50 - charIndex * 2}%)`,
                textShadow: charIndex === 0 
                  ? '0 0 10px hsl(120 100% 50%)' 
                  : 'none',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;

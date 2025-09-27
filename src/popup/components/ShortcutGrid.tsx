import React from 'react';
import ShortcutItem from './ShortcutItem';
import { Shortcut } from '../../types';

interface ShortcutGridProps {
  shortcuts: Shortcut[];
  gridColumns: number;
  isEditMode: boolean;
  onShortcutsChange: () => void;
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({
  shortcuts,
  gridColumns,
  isEditMode,
  onShortcutsChange
}) => {
  const gridClass = `grid gap-3 grid-cols-${gridColumns}`;

  return (
    <div className={gridClass}>
      {shortcuts.map((shortcut) => (
        <ShortcutItem
          key={shortcut.id}
          shortcut={shortcut}
          isEditMode={isEditMode}
          onDelete={onShortcutsChange}
        />
      ))}
    </div>
  );
};

export default ShortcutGrid;
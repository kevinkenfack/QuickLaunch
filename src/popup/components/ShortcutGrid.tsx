import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ShortcutItem from './ShortcutItem';
import { Shortcut } from '../../types';
import { reorderShortcuts } from '../../storage';

interface ShortcutGridProps {
  shortcuts: Shortcut[];
  gridColumns: number;
  isEditMode: boolean;
  hasBackground?: boolean;
  onShortcutsChange: () => void;
}

const ShortcutGrid: React.FC<ShortcutGridProps> = ({
  shortcuts,
  gridColumns,
  isEditMode,
  hasBackground = false,
  onShortcutsChange
}) => {
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !isEditMode) return;

    const { source, destination } = result;
    
    if (source.index === destination.index) return;

    try {
      await reorderShortcuts(source.index, destination.index);
      onShortcutsChange();
    } catch (error) {
      console.error('Erreur lors de la réorganisation:', error);
    }
  };

  const gridClass = `grid gap-3 grid-cols-${gridColumns}`;

  if (isEditMode) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="shortcuts" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${gridClass} ${snapshot.isDraggingOver ? 'bg-base-300/50 rounded-lg p-2' : ''}`}
            >
              {shortcuts.map((shortcut, index) => (
                <Draggable
                  key={shortcut.id}
                  draggableId={shortcut.id}
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'rotate-3 scale-105 z-50' : ''} transition-transform`}
                    >
                      <ShortcutItem
                        shortcut={shortcut}
                        isEditMode={isEditMode}
                        hasBackground={hasBackground}
                        onDelete={onShortcutsChange}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return (
    <div className={gridClass}>
      {shortcuts.map((shortcut) => (
        <ShortcutItem
          key={shortcut.id}
          shortcut={shortcut}
          isEditMode={isEditMode}
          hasBackground={hasBackground}
          onDelete={onShortcutsChange}
        />
      ))}
    </div>
  );
};

export default ShortcutGrid;
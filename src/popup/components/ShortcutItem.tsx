import React from 'react';
import { X } from 'lucide-react';
import { Shortcut } from '../../types';
import { removeShortcut } from '../../storage';

interface ShortcutItemProps {
  shortcut: Shortcut;
  isEditMode: boolean;
  onDelete: () => void;
}

const ShortcutItem: React.FC<ShortcutItemProps> = ({
  shortcut,
  isEditMode,
  onDelete
}) => {
  const handleClick = () => {
    if (!isEditMode) {
      chrome.tabs.create({ url: shortcut.url });
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Supprimer le raccourci "${shortcut.name}" ?`)) {
      await removeShortcut(shortcut.id);
      onDelete();
    }
  };

  return (
    <div className="relative group">
      <div
        className={`
          card bg-base-200 hover:bg-base-300 transition-all duration-200 cursor-pointer
          ${isEditMode ? 'hover:shadow-lg' : 'hover:scale-105'}
        `}
        onClick={handleClick}
      >
        <div className="card-body p-3 items-center text-center">
          <div className="avatar">
            <div className="w-8 h-8 rounded">
              <img
                src={shortcut.icon}
                alt={shortcut.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTIgOGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>
          <h3 className="text-xs font-medium truncate w-full">{shortcut.name}</h3>
        </div>
      </div>

      {/* Delete button in edit mode */}
      {isEditMode && !shortcut.isDefault && (
        <button
          className="absolute -top-2 -right-2 btn btn-error btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
          title="Supprimer"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default ShortcutItem;
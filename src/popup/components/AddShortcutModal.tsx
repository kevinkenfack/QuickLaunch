import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { addShortcut } from '../../storage';
import { generateId, convertImageToBase64, isValidUrl, formatUrl } from '../../utils';
import { downloadAndCacheIcon } from '../../storage';

interface AddShortcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShortcutAdded: () => void;
}

const AddShortcutModal: React.FC<AddShortcutModalProps> = ({
  isOpen,
  onClose,
  onShortcutAdded
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setUrl('');
    setIcon('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image valide');
      return;
    }

    if (file.size > 1024 * 1024) { // 1MB limit
      setError('L\'image doit faire moins de 1MB');
      return;
    }

    try {
      const base64 = await convertImageToBase64(file);
      setIcon(base64);
      setError('');
    } catch (error) {
      setError('Erreur lors du traitement de l\'image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Le nom est requis');
      return;
    }

    if (!url.trim()) {
      setError('L\'URL est requise');
      return;
    }

    const formattedUrl = formatUrl(url.trim());
    if (!isValidUrl(formattedUrl)) {
      setError('URL invalide');
      return;
    }

    setLoading(true);

    try {
      const shortcut = {
        id: generateId(),
        name: name.trim(),
        url: formattedUrl,
        icon: icon || await downloadAndCacheIcon(`https://www.google.com/s2/favicons?domain=${new URL(formattedUrl).hostname}&sz=32`)
      };

      await addShortcut(shortcut);
      onShortcutAdded();
      handleClose();
    } catch (error) {
      setError('Erreur lors de l\'ajout du raccourci');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Ajouter un raccourci</h3>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={handleClose}
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mon site favori"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">URL *</span>
            </label>
            <input
              type="url"
              className="input input-bordered"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ex: https://example.com"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Icône (optionnel)</span>
            </label>
            <div className="flex items-center gap-3">
              {icon && (
                <div className="avatar">
                  <div className="w-8 h-8 rounded">
                    <img src={icon} alt="Aperçu" />
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered file-input-sm flex-1"
              />
            </div>
            <label className="label">
              <span className="label-text-alt">
                Si aucune icône n'est fournie, le favicon du site sera utilisé
              </span>
            </label>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Ajouter'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShortcutModal;
import React, { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, htmlContent }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-[#10B981] text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Stäng villkorsfönster"
        >
          &times;
        </button>
        <div className="prose max-w-none text-black prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-base prose-li:text-base prose-strong:font-semibold prose-ul:pl-6 prose-ol:pl-6 prose-table:w-full prose-table:text-sm prose-th:font-semibold prose-th:text-left prose-th:pr-4 prose-td:pr-4 prose-blockquote:border-l-4 prose-blockquote:border-[#10B981] prose-blockquote:pl-4 prose-blockquote:text-gray-600 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-md prose-a:text-[#10B981] prose-a:underline"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default TermsModal; 
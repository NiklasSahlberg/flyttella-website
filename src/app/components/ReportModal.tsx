import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'skada' | 'reklamation' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    order: '',
    description: '',
    files: [] as File[],
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'files') {
      setForm(f => ({ ...f, files: files ? Array.from(files) : [] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative text-black" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-[#10B981] text-2xl font-bold focus:outline-none" onClick={onClose} aria-label="Stäng anmälan">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Anmälan</h2>
        {!type && !submitted && (
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => setType('skada')}>Skada eller förlust</button>
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => setType('reklamation')}>Reklamationsstäd</button>
          </div>
        )}
        {type && !submitted && (
          <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Namn</label>
              <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-post</label>
              <input type="email" name="email" required className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Offertnummer</label>
              <input type="text" name="order" required className="w-full border rounded-lg px-3 py-2" value={form.order} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Beskrivning</label>
              <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bifoga bilder (valfritt)</label>
              <label htmlFor="file-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                Välj filer
              </label>
              <input
                id="file-upload"
                type="file"
                name="files"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleChange}
              />
              {form.files.length > 0 && (
                <ul className="mt-2 text-xs text-gray-600 list-disc pl-5">
                  {form.files.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" onClick={() => setType(null)}>Tillbaka</button>
              <button type="submit" className="flex-1 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]">Skicka</button>
            </div>
          </form>
        )}
        {submitted && (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-[#10B981] mb-2">Tack för din anmälan!</h3>
            <p className="text-gray-700">Vi har tagit emot din {type === 'skada' ? 'skadeanmälan' : 'reklamation'} och återkommer så snart som möjligt.</p>
            <button className="mt-6 px-6 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]" onClick={onClose}>Stäng</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal; 
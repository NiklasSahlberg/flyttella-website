import React, { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'skada' | 'reklamation' | null>(null);
  const [damageType, setDamageType] = useState<'skada' | 'forlust' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    order: '',
    description: '',
    files: [] as File[],
    damageType: '',
    itemType: '',
    brandModel: '',
    packedBy: '',
    frontImage: null as File | null,
    leftImage: null as File | null,
    rightImage: null as File | null,
    damagedItemImage: null as File | null,
    wasNew: '',
    hasReceipt: '',
    purchasePrice: '',
    purchaseYear: '',
    contactedRepair: '',
    repairPrice: '',
    eventDate: '',
    phone: '',
    receiptFile: null as File | null,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'files') {
      setForm(f => ({ ...f, files: files ? Array.from(files) : [] }));
    } else if (name === 'frontImage' || name === 'leftImage' || name === 'rightImage' || name === 'damagedItemImage' || name === 'receiptFile') {
      setForm(f => ({ ...f, [name]: files ? files[0] : null }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setType(null);
    setDamageType(null);
    setSubmitted(false);
    setForm({
      name: '',
      email: '',
      order: '',
      description: '',
      files: [],
      damageType: '',
      itemType: '',
      brandModel: '',
      packedBy: '',
      frontImage: null,
      leftImage: null,
      rightImage: null,
      damagedItemImage: null,
      wasNew: '',
      hasReceipt: '',
      purchasePrice: '',
      purchaseYear: '',
      contactedRepair: '',
      repairPrice: '',
      eventDate: '',
      phone: '',
      receiptFile: null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative text-black" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-[#10B981] text-2xl font-bold focus:outline-none" onClick={onClose} aria-label="Stäng anmälan">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-[#0F172A]">Anmälan</h2>
        
        {!type && !submitted && (
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => setType('skada')}>Skadeanmälan</button>
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => setType('reklamation')}>Reklamationsstäd</button>
          </div>
        )}

        {type === 'skada' && !damageType && !submitted && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">Vad har du råkat ut för?</h3>
            <button 
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" 
              onClick={() => setDamageType('skada')}
            >
              Skada på föremål
            </button>
            <button 
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" 
              onClick={() => setDamageType('forlust')}
            >
              Förlust
            </button>
            <button 
              type="button" 
              className="w-full py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" 
              onClick={() => setType(null)}
            >
              Tillbaka
            </button>
          </div>
        )}

        {type === 'skada' && damageType && !submitted && (
          <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
            {damageType === 'skada' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Offertnummer *</label>
                  <input type="text" name="order" required className="w-full border rounded-lg px-3 py-2" value={form.order} onChange={handleChange} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bilder på skadat föremål *</label>
                  <label htmlFor="damaged-item-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                    Välj bild
                  </label>
                  <input
                    id="damaged-item-upload"
                    type="file"
                    name="damagedItemImage"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={handleChange}
                  />
                  {form.damagedItemImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.damagedItemImage.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild på framsidan</label>
                  <label htmlFor="front-image-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                    Välj bild
                  </label>
                  <input
                    id="front-image-upload"
                    type="file"
                    name="frontImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                  {form.frontImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.frontImage.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild från vänster sida</label>
                  <label htmlFor="left-image-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                    Välj bild
                  </label>
                  <input
                    id="left-image-upload"
                    type="file"
                    name="leftImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                  {form.leftImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.leftImage.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild från höger sida</label>
                  <label htmlFor="right-image-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                    Välj bild
                  </label>
                  <input
                    id="right-image-upload"
                    type="file"
                    name="rightImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                  {form.rightImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.rightImage.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Beskriv skador på föremålet och hur skadan har gått till *</label>
                  <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vilken typ av föremål var det som skadades? *</label>
                  <select name="itemType" required className="w-full border rounded-lg px-3 py-2" value={form.itemType} onChange={handleChange}>
                    <option value="">Välj typ</option>
                    <option value="mobler">Möbler</option>
                    <option value="elektronik">Elektronik</option>
                    <option value="konstverk">Konstverk och antikviteter</option>
                    <option value="vaxter">Växter</option>
                    <option value="kontorsutrustning">Kontorsutrustning</option>
                    <option value="koksartiklar">Köksartiklar</option>
                    <option value="annat">Annat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vad är märket och modellen på föremålet?</label>
                  <input type="text" name="brandModel" className="w-full border rounded-lg px-3 py-2" value={form.brandModel} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vem packade föremålet?</label>
                  <input type="text" name="packedBy" className="w-full border rounded-lg px-3 py-2" value={form.packedBy} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Var föremålet nytt när du köpte den? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="wasNew" 
                        value="ja" 
                        required 
                        className="mr-2" 
                        checked={form.wasNew === 'ja'} 
                        onChange={handleChange} 
                      />
                      Ja
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="wasNew" 
                        value="nej" 
                        required 
                        className="mr-2" 
                        checked={form.wasNew === 'nej'} 
                        onChange={handleChange} 
                      />
                      Nej
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Har du kvitto från butiken? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="hasReceipt" 
                        value="ja" 
                        required 
                        className="mr-2" 
                        checked={form.hasReceipt === 'ja'} 
                        onChange={handleChange} 
                      />
                      Ja
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="hasReceipt" 
                        value="nej" 
                        required 
                        className="mr-2" 
                        checked={form.hasReceipt === 'nej'} 
                        onChange={handleChange} 
                      />
                      Nej
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Tänk på att om du inte kan uppvisa kvitto för föremålet kommer det att värderas med en högre grad av värdeminskning.
                  </p>
                  <div className="mt-3">
                    <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                      Ladda upp kvittot
                    </label>
                    <input
                      id="receipt-upload"
                      type="file"
                      name="receiptFile"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleChange}
                    />
                    {form.receiptFile && (
                      <p className="mt-2 text-xs text-gray-600">{form.receiptFile.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Inköpspris *</label>
                  <input type="number" name="purchasePrice" required className="w-full border rounded-lg px-3 py-2" value={form.purchasePrice} onChange={handleChange} placeholder="SEK" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Inköpsår *</label>
                  <input type="number" name="purchaseYear" required className="w-full border rounded-lg px-3 py-2" value={form.purchaseYear} onChange={handleChange} placeholder="ÅÅÅÅ" min="1900" max={new Date().getFullYear()} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Har du varit i kontakt med reparatör? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="contactedRepair" 
                        value="ja" 
                        required 
                        className="mr-2" 
                        checked={form.contactedRepair === 'ja'} 
                        onChange={handleChange} 
                      />
                      Ja
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="contactedRepair" 
                        value="nej" 
                        required 
                        className="mr-2" 
                        checked={form.contactedRepair === 'nej'} 
                        onChange={handleChange} 
                      />
                      Nej
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Reparationspris</label>
                  <input type="number" name="repairPrice" className="w-full border rounded-lg px-3 py-2" value={form.repairPrice} onChange={handleChange} placeholder="SEK" />
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Kontaktinformation</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Händelsedatum</label>
                    <input type="date" name="eventDate" className="w-full border rounded-lg px-3 py-2" value={form.eventDate} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Fullständigt Namn och Efternamn *</label>
                    <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefonnummer *</label>
                    <input type="tel" name="phone" required className="w-full border rounded-lg px-3 py-2" value={form.phone} onChange={handleChange} placeholder="070-123 45 67" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">E-post *</label>
                    <input type="email" name="email" required className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            {damageType === 'forlust' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Offertnummer *</label>
                  <input type="text" name="order" required className="w-full border rounded-lg px-3 py-2" value={form.order} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vad är märket och modellen på föremålet?</label>
                  <input type="text" name="brandModel" className="w-full border rounded-lg px-3 py-2" value={form.brandModel} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Beskriv hur föremålet har försvunnit *</label>
                  <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Var föremålet nytt när du köpte den? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="wasNew" 
                        value="ja" 
                        required 
                        className="mr-2" 
                        checked={form.wasNew === 'ja'} 
                        onChange={handleChange} 
                      />
                      Ja
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="wasNew" 
                        value="nej" 
                        required 
                        className="mr-2" 
                        checked={form.wasNew === 'nej'} 
                        onChange={handleChange} 
                      />
                      Nej
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Har du kvitto från butiken? *</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="hasReceipt" 
                        value="ja" 
                        required 
                        className="mr-2" 
                        checked={form.hasReceipt === 'ja'} 
                        onChange={handleChange} 
                      />
                      Ja
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="hasReceipt" 
                        value="nej" 
                        required 
                        className="mr-2" 
                        checked={form.hasReceipt === 'nej'} 
                        onChange={handleChange} 
                      />
                      Nej
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Tänk på att om du inte kan uppvisa kvitto för föremålet kommer det att värderas med en högre grad av värdeminskning.
                  </p>
                  <div className="mt-3">
                    <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                      Ladda upp kvittot
                    </label>
                    <input
                      id="receipt-upload"
                      type="file"
                      name="receiptFile"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleChange}
                    />
                    {form.receiptFile && (
                      <p className="mt-2 text-xs text-gray-600">{form.receiptFile.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Inköpspris *</label>
                  <input type="number" name="purchasePrice" required className="w-full border rounded-lg px-3 py-2" value={form.purchasePrice} onChange={handleChange} placeholder="SEK" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Inköpsår *</label>
                  <input type="number" name="purchaseYear" required className="w-full border rounded-lg px-3 py-2" value={form.purchaseYear} onChange={handleChange} placeholder="ÅÅÅÅ" min="1900" max={new Date().getFullYear()} />
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Kontaktinformation</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Händelsedatum</label>
                    <input type="date" name="eventDate" className="w-full border rounded-lg px-3 py-2" value={form.eventDate} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Fullständigt Namn och Efternamn *</label>
                    <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefonnummer *</label>
                    <input type="tel" name="phone" required className="w-full border rounded-lg px-3 py-2" value={form.phone} onChange={handleChange} placeholder="070-123 45 67" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">E-post *</label>
                    <input type="email" name="email" required className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-4">
              <button 
                type="button" 
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" 
                onClick={() => {
                  if (damageType) {
                    setDamageType(null);
                  } else {
                    setType(null);
                  }
                }}
              >
                Tillbaka
              </button>
              <button type="submit" className="flex-1 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]">Skicka</button>
            </div>
          </form>
        )}

        {type === 'reklamation' && !submitted && (
          <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Fullständigt Namn och Efternamn *</label>
              <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-post *</label>
              <input type="email" name="email" required className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Offertnummer *</label>
              <input type="text" name="order" required className="w-full border rounded-lg px-3 py-2" value={form.order} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Beskriv tydligt vad som har varit bristande i städningen *</label>
              <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bifoga bilder på alla bristmoment i städningen *</label>
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
                required
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
            <p className="text-gray-700">
              Vi har tagit emot din {type === 'skada' ? 'skadeanmälan' : 'reklamation'} och återkommer så snart som möjligt.
            </p>
            <button 
              className="mt-6 px-6 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]" 
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Stäng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal; 
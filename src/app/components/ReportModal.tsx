import React, { useState, useCallback, useEffect } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'skada' | 'reklamation' | null>(null);
  const [damageType, setDamageType] = useState<'skada' | 'forlust' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<'skada' | 'reklamation' | null>(null);
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
    cleaningDate: '',
  });
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setType(null);
      setDamageType(null);
      setSubmitted(false);
      setFormType(null);
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
        cleaningDate: '',
      });
      setValidationErrors(new Set());
      setShowValidationPopup(false);
    }
  }, [isOpen]);

  const handleTypeSelection = useCallback((selectedType: 'skada' | 'reklamation') => {
    setType(selectedType);
    setFormType(selectedType);
    setDamageType(null);
    setSubmitted(false);
  }, []);

  const handleBack = useCallback(() => {
    if (damageType) {
      setDamageType(null);
    } else {
      setType(null);
      setFormType(null);
    }
  }, [damageType]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
    
    // Clear validation error when user starts typing
    if (validationErrors.has(name)) {
      setValidationErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(name);
        return newErrors;
      });
    }
  };

  const hasError = (fieldName: string) => validationErrors.has(fieldName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for required fields and scroll to first missing one
    const formElement = e.target as HTMLFormElement;
    const requiredFields = formElement.querySelectorAll('[required]');
    let firstMissingField: Element | null = null;
    const errors = new Set<string>();
    
    requiredFields.forEach((field) => {
      const input = field as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input.value || (input.type === 'file' && !(input as HTMLInputElement).files?.length)) {
        if (!firstMissingField) {
          firstMissingField = field;
        }
        errors.add(input.name);
      }
    });
    
    setValidationErrors(errors);
    
    if (errors.size > 0) {
      setShowValidationPopup(true);
    } else {
      setShowValidationPopup(false);
    }
    
    if (firstMissingField) {
      (firstMissingField as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      (firstMissingField as HTMLElement).focus();
      return;
    }
    
    setValidationErrors(new Set());
    setShowValidationPopup(false);

    // Prepare the data to send - remove File objects as they can't be serialized
    const reportData = {
      type,
      damageType,
      name: form.name,
      email: form.email,
      order: form.order,
      description: form.description,
      itemType: form.itemType,
      brandModel: form.brandModel,
      packedBy: form.packedBy,
      wasNew: form.wasNew,
      hasReceipt: form.hasReceipt,
      purchasePrice: form.purchasePrice,
      purchaseYear: form.purchaseYear,
      contactedRepair: form.contactedRepair,
      repairPrice: form.repairPrice,
      eventDate: form.eventDate,
      phone: form.phone,
      cleaningDate: form.cleaningDate,
      // File information (not the actual files)
      hasDamagedItemImage: !!form.damagedItemImage,
      hasFrontImage: !!form.frontImage,
      hasLeftImage: !!form.leftImage,
      hasRightImage: !!form.rightImage,
      hasReceiptFile: !!form.receiptFile,
      filesCount: form.files?.length || 0
    };

    console.log('Sending report data:', reportData);

    try {
      // Create FormData to send files along with the form data
      const formData = new FormData();
      
      // Add all the form data
      Object.entries(reportData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      
      // Add the actual files
      if (form.damagedItemImage) {
        formData.append('damagedItemImage', form.damagedItemImage);
      }
      if (form.frontImage) {
        formData.append('frontImage', form.frontImage);
      }
      if (form.leftImage) {
        formData.append('leftImage', form.leftImage);
      }
      if (form.rightImage) {
        formData.append('rightImage', form.rightImage);
      }
      if (form.receiptFile) {
        formData.append('receiptFile', form.receiptFile);
      }
      
      // Add multiple files for cleaning complaints
      if (form.files && form.files.length > 0) {
        form.files.forEach((file, index) => {
          formData.append(`files`, file);
        });
      }

      // Send the form data to the API endpoint
      const response = await fetch('/api/send-report', {
        method: 'POST',
        body: formData, // Don't set Content-Type header, let the browser set it with boundary
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to send report');
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert("Ett fel uppstod när anmälan skulle skickas. Vänligen försök igen.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative text-black" onClick={e => e.stopPropagation()}>
        <button className="sticky top-4 right-4 text-gray-500 hover:text-[#10B981] text-2xl font-bold focus:outline-none z-20 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-auto" onClick={handleClose} aria-label="Stäng anmälan">&times;</button>
        {showValidationPopup && (
          <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in">
            <span className="font-semibold">Vänligen svara på alla frågor</span>
            <button onClick={() => setShowValidationPopup(false)} className="ml-2 text-white text-lg font-bold focus:outline-none">&times;</button>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4 text-[#0F172A] text-center">Anmälan</h2>
        
        {!type && !submitted && (
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => handleTypeSelection('skada')}>Skadeanmälan</button>
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => handleTypeSelection('reklamation')}>Reklamationsstäd</button>
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
              onClick={handleBack}
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
                  <input 
                    type="text" 
                    name="order" 
                    required 
                    className={`w-full border rounded-lg px-3 py-2 ${hasError('order') ? 'border-red-500 bg-red-50' : ''}`} 
                    value={form.order} 
                    onChange={handleChange} 
                  />
                  {hasError('order') && <p className="text-red-500 text-xs mt-1">Offertnummer krävs</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bilder på skadat föremål *</label>
                  <label htmlFor="damaged-item-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('damagedItemImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
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
                  {hasError('damagedItemImage') && <p className="text-red-500 text-xs mt-1">Bild krävs</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild på framsidan *</label>
                  <label htmlFor="front-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('frontImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    Välj bild
                  </label>
                  <input
                    id="front-image-upload"
                    type="file"
                    name="frontImage"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={handleChange}
                  />
                  {form.frontImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.frontImage.name}</p>
                  )}
                  {hasError('frontImage') && <p className="text-red-500 text-xs mt-1">Bild krävs</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild från vänster sida *</label>
                  <label htmlFor="left-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('leftImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    Välj bild
                  </label>
                  <input
                    id="left-image-upload"
                    type="file"
                    name="leftImage"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={handleChange}
                  />
                  {form.leftImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.leftImage.name}</p>
                  )}
                  {hasError('leftImage') && <p className="text-red-500 text-xs mt-1">Bild krävs</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bild från höger sida *</label>
                  <label htmlFor="right-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('rightImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    Välj bild
                  </label>
                  <input
                    id="right-image-upload"
                    type="file"
                    name="rightImage"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={handleChange}
                  />
                  {form.rightImage && (
                    <p className="mt-2 text-xs text-gray-600">{form.rightImage.name}</p>
                  )}
                  {hasError('rightImage') && <p className="text-red-500 text-xs mt-1">Bild krävs</p>}
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
                  <label className="block text-sm font-medium mb-1">Vad är märket och modellen på föremålet? *</label>
                  <input type="text" name="brandModel" required className="w-full border rounded-lg px-3 py-2" value={form.brandModel} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Vem packade föremålet? *</label>
                  <input type="text" name="packedBy" required className="w-full border rounded-lg px-3 py-2" value={form.packedBy} onChange={handleChange} />
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
                  {form.hasReceipt === 'ja' && (
                    <div className="mt-3">
                      <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                        Ladda upp kvittot *
                      </label>
                      <input
                        id="receipt-upload"
                        type="file"
                        name="receiptFile"
                        accept="image/*,.pdf"
                        className="hidden"
                        required
                        onChange={handleChange}
                      />
                      {form.receiptFile && (
                        <p className="mt-2 text-xs text-gray-600">{form.receiptFile.name}</p>
                      )}
                    </div>
                  )}
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

                {form.contactedRepair === 'ja' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Reparationspris *</label>
                    <input type="number" name="repairPrice" required className="w-full border rounded-lg px-3 py-2" value={form.repairPrice} onChange={handleChange} placeholder="SEK" />
                  </div>
                )}

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-4">Kontaktinformation</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Händelsedatum *</label>
                    <input 
                      type="date" 
                      name="eventDate" 
                      required 
                      className={`w-full border rounded-lg px-3 py-2 ${hasError('eventDate') ? 'border-red-500 bg-red-50' : ''}`} 
                      value={form.eventDate} 
                      onChange={handleChange} 
                    />
                    {hasError('eventDate') && <p className="text-red-500 text-xs mt-1">Händelsedatum krävs</p>}
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
                  <label className="block text-sm font-medium mb-1">Vad är märket och modellen på föremålet? *</label>
                  <input type="text" name="brandModel" required className="w-full border rounded-lg px-3 py-2" value={form.brandModel} onChange={handleChange} />
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
                  {form.hasReceipt === 'ja' && (
                    <div className="mt-3">
                      <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                        Ladda upp kvittot *
                      </label>
                      <input
                        id="receipt-upload"
                        type="file"
                        name="receiptFile"
                        accept="image/*,.pdf"
                        className="hidden"
                        required
                        onChange={handleChange}
                      />
                      {form.receiptFile && (
                        <p className="mt-2 text-xs text-gray-600">{form.receiptFile.name}</p>
                      )}
                    </div>
                  )}
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
                    <label className="block text-sm font-medium mb-1">Händelsedatum *</label>
                    <input 
                      type="date" 
                      name="eventDate" 
                      required 
                      className={`w-full border rounded-lg px-3 py-2 ${hasError('eventDate') ? 'border-red-500 bg-red-50' : ''}`} 
                      value={form.eventDate} 
                      onChange={handleChange} 
                    />
                    {hasError('eventDate') && <p className="text-red-500 text-xs mt-1">Händelsedatum krävs</p>}
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
                onClick={handleBack}
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
              <label className="block text-sm font-medium mb-1">Ange datum för flyttstädningen *</label>
              <input 
                type="date" 
                name="cleaningDate" 
                required 
                className="w-full border rounded-lg px-3 py-2" 
                value={form.cleaningDate} 
                onChange={handleChange} 
              />
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
              <button type="button" className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" onClick={handleBack}>Tillbaka</button>
              <button type="submit" className="flex-1 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]">Skicka</button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="text-center py-8">
            {formType === 'reklamation' ? (
              <>
                <h3 className="text-lg font-semibold text-[#10B981] mb-4">Tack för din reklamation!</h3>
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Vi försöker alltid att prioritera reklamationsärenden och kommer att hjälpa dig så fort vi kan. Vi återkommer så fort vi har tittat på ditt ärende.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#10B981] mb-4">Tack för din skaderapport!</h3>
                
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Enligt våra villkor hanterar vi skador under två månader efter att fakturan har blivit slutbetald (se punkt 14 nedan). Enligt Skatteverkets regler är det inte tillåtet att göra avdrag på RUT-fakturan. Mer information om RUT-reglerna finns på Skatteverkets webbplats.
                  </p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-[#0F172A] mb-3">Se villkor kring ersättning och betalning nedan:</h4>
                    
                    <div className="text-xs text-gray-600 space-y-3">
                      <div>
                        <h5 className="font-medium text-[#0F172A]">14. Ersättnings- och betalningsvillkor</h5>
                        
                        <p className="mt-2">
                          <strong>14.1</strong> Hos Flyttella AB kan betalning ske genom följande betalsätt: Swish överföring på nummer: 123-44-62-248. Betalning kan ske mot faktura med en betalningsfrist om 10 dagar, förutsatt att fakturabetalning har godkänts av Flyttella AB:s kundtjänst vid bokningstillfället. Kunden är skyldig att erlägga full betalning senast vid ankomst till lossningsadressen, om inte annat skriftligen avtalats mellan parterna. Flyttella AB åtar sig att hantera skadeanmälningar som separata ärenden och behandla dessa inom en tidsram om högst två månader från det att en fullständig anmälan mottagits. Fakturan ska vara fullständigt betald innan Flyttella AB påbörjar utredning av förlust- eller skadeärenden.
                        </p>
                        
                        <p className="mt-2">
                          <strong>14.2</strong> Vid dröjsmål med betalning har Flyttella AB rätt till dröjsmålsräntan som framgår på fakturan fram till dess att full betalning sker, och har rätt att debitera lagstadgade påminnelse- och inkassoavgifter samt rätt att överlämna ärendet till Kronofogdemyndigheten.
                        </p>
                        
                        <p className="mt-2">
                          <strong>14.3</strong> Betalning för de tjänster som Företaget tillhandahåller ska ske i enlighet med de betalningsvillkor som specificeras i offerten eller på fakturan. Företaget förbehåller sig rätten att kräva betalning under pågående arbete eller innan arbetet påbörjas, om det finns anledning att ifrågasätta Kundens betalningsförmåga. Detta kan innefatta situationer där Företaget bedömer att kunden inte kan uppvisa tillräcklig säkerhet för betalning, eller om kunden har tidigare betalningsanmärkningar eller övriga ekonomiska förhållanden som ger anledning till tvekan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <button 
              className="mt-4 px-6 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]" 
              onClick={handleClose}
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
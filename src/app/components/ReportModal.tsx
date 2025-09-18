import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
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
    damageLevel: '',
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
        damageLevel: '',
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
      damageLevel: form.damageLevel,
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
      alert(t('reportModal.errorMessage'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative text-black" onClick={e => e.stopPropagation()}>
        <button className="sticky top-4 right-4 text-gray-500 hover:text-[#10B981] text-2xl font-bold focus:outline-none z-20 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-auto" onClick={handleClose} aria-label={t('reportModal.closeLabel')}>&times;</button>
        {showValidationPopup && (
          <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-fade-in">
            <span className="font-semibold">{t('reportModal.validationMessage')}</span>
            <button onClick={() => setShowValidationPopup(false)} className="ml-2 text-white text-lg font-bold focus:outline-none">&times;</button>
          </div>
        )}
        <h2 className="text-xl font-bold mb-4 text-[#0F172A] text-center">{t('reportModal.title')}</h2>
        
        {!type && !submitted && (
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => handleTypeSelection('skada')}>{t('reportModal.damageReport')}</button>
            <button className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" onClick={() => handleTypeSelection('reklamation')}>{t('reportModal.cleaningComplaint')}</button>
          </div>
        )}

        {type === 'skada' && !damageType && !submitted && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">{t('reportModal.whatHappened')}</h3>
            <button 
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" 
              onClick={() => setDamageType('skada')}
            >
              {t('reportModal.damageToItem')}
            </button>
            <button 
              className="w-full py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-[#0F172A] font-medium" 
              onClick={() => setDamageType('forlust')}
            >
              {t('reportModal.loss')}
            </button>
            <button 
              type="button" 
              className="w-full py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" 
              onClick={handleBack}
            >
              {t('reportModal.back')}
            </button>
          </div>
        )}

        {type === 'skada' && damageType && !submitted && (
          <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
            {damageType === 'skada' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.quoteNumber')} *</label>
                  <input 
                    type="text" 
                    name="order" 
                    required 
                    className={`w-full border rounded-lg px-3 py-2 ${hasError('order') ? 'border-red-500 bg-red-50' : ''}`} 
                    value={form.order} 
                    onChange={handleChange} 
                  />
                  {hasError('order') && <p className="text-red-500 text-xs mt-1">{t('reportModal.quoteNumberRequired')}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.damagedItemImages')} *</label>
                  <label htmlFor="damaged-item-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('damagedItemImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    {t('reportModal.selectImage')}
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
                  {hasError('damagedItemImage') && <p className="text-red-500 text-xs mt-1">{t('reportModal.imageRequired')}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.frontImage')} *</label>
                  <label htmlFor="front-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('frontImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    {t('reportModal.selectImage')}
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
                  {hasError('frontImage') && <p className="text-red-500 text-xs mt-1">{t('reportModal.imageRequired')}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.leftSideImage')} *</label>
                  <label htmlFor="left-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('leftImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    {t('reportModal.selectImage')}
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
                  {hasError('leftImage') && <p className="text-red-500 text-xs mt-1">{t('reportModal.imageRequired')}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.rightSideImage')} *</label>
                  <label htmlFor="right-image-upload" className={`inline-block px-4 py-2 rounded-lg cursor-pointer text-xs font-medium bg-[#10B981] text-white hover:bg-[#059669] ${hasError('rightImage') ? 'border border-red-500 bg-red-50 text-red-700' : ''}`}>
                    {t('reportModal.selectImage')}
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
                  {hasError('rightImage') && <p className="text-red-500 text-xs mt-1">{t('reportModal.imageRequired')}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.describeDamage')} *</label>
                  <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.howDamaged')} *</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="damageLevel" 
                        value="lindrigt_skadad" 
                        required 
                        className="mr-2" 
                        checked={form.damageLevel === 'lindrigt_skadad'} 
                        onChange={handleChange} 
                      />
                      {t('reportModal.slightlyDamaged')}
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="damageLevel" 
                        value="delvis_skadad" 
                        required 
                        className="mr-2" 
                        checked={form.damageLevel === 'delvis_skadad'} 
                        onChange={handleChange} 
                      />
                      {t('reportModal.partiallyDamaged')}
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="damageLevel" 
                        value="helt_forstord" 
                        required 
                        className="mr-2" 
                        checked={form.damageLevel === 'helt_forstord'} 
                        onChange={handleChange} 
                      />
                      {t('reportModal.completelyDestroyed')}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.itemType')} *</label>
                  <select name="itemType" required className="w-full border rounded-lg px-3 py-2" value={form.itemType} onChange={handleChange}>
                    <option value="">{t('reportModal.selectType')}</option>
                    <option value="mobler">{t('reportModal.furniture')}</option>
                    <option value="elektronik">{t('reportModal.electronics')}</option>
                    <option value="konstverk">{t('reportModal.artwork')}</option>
                    <option value="vaxter">{t('reportModal.plants')}</option>
                    <option value="kontorsutrustning">{t('reportModal.officeEquipment')}</option>
                    <option value="koksartiklar">{t('reportModal.kitchenItems')}</option>
                    <option value="annat">{t('reportModal.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.brandModel')} *</label>
                  <input type="text" name="brandModel" required className="w-full border rounded-lg px-3 py-2" value={form.brandModel} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.whoPacked')} *</label>
                  <input type="text" name="packedBy" required className="w-full border rounded-lg px-3 py-2" value={form.packedBy} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.wasNew')} *</label>
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
                      {t('reportModal.yes')}
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
                      {t('reportModal.no')}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.hasReceipt')} *</label>
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
                      {t('reportModal.yes')}
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
                      {t('reportModal.no')}
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('reportModal.receiptNote')}
                  </p>
                  {form.hasReceipt === 'ja' && (
                    <div className="mt-3">
                      <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                        {t('reportModal.uploadReceipt')} *
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
                  <label className="block text-sm font-medium mb-1">{t('reportModal.purchasePrice')} *</label>
                  <input type="number" name="purchasePrice" required className="w-full border rounded-lg px-3 py-2" value={form.purchasePrice} onChange={handleChange} placeholder="SEK" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.purchaseYear')} *</label>
                  <input type="number" name="purchaseYear" required className="w-full border rounded-lg px-3 py-2" value={form.purchaseYear} onChange={handleChange} placeholder="ÅÅÅÅ" min="1900" max={new Date().getFullYear()} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.contactedRepair')} *</label>
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
                      {t('reportModal.yes')}
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
                      {t('reportModal.no')}
                    </label>
                  </div>
                </div>

                {form.contactedRepair === 'ja' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.repairPrice')} *</label>
                    <input type="number" name="repairPrice" required className="w-full border rounded-lg px-3 py-2" value={form.repairPrice} onChange={handleChange} placeholder="SEK" />
                  </div>
                )}

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-4">{t('reportModal.contactInfo')}</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.eventDate')} *</label>
                    <input 
                      type="date" 
                      name="eventDate" 
                      required 
                      className={`w-full border rounded-lg px-3 py-2 ${hasError('eventDate') ? 'border-red-500 bg-red-50' : ''}`} 
                      value={form.eventDate} 
                      onChange={handleChange} 
                    />
                    {hasError('eventDate') && <p className="text-red-500 text-xs mt-1">{t('reportModal.eventDateRequired')}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.fullName')} *</label>
                    <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.phoneNumber')} *</label>
                    <input type="tel" name="phone" required className="w-full border rounded-lg px-3 py-2" value={form.phone} onChange={handleChange} placeholder="070-123 45 67" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.email')} *</label>
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
                  <label className="block text-sm font-medium mb-1">{t('reportModal.describeLoss')} *</label>
                  <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.wasNew')} *</label>
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
                      {t('reportModal.yes')}
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
                      {t('reportModal.no')}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.hasReceipt')} *</label>
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
                      {t('reportModal.yes')}
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
                      {t('reportModal.no')}
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('reportModal.receiptNote')}
                  </p>
                  {form.hasReceipt === 'ja' && (
                    <div className="mt-3">
                      <label htmlFor="receipt-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                        {t('reportModal.uploadReceipt')} *
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
                  <label className="block text-sm font-medium mb-1">{t('reportModal.purchasePrice')} *</label>
                  <input type="number" name="purchasePrice" required className="w-full border rounded-lg px-3 py-2" value={form.purchasePrice} onChange={handleChange} placeholder="SEK" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('reportModal.purchaseYear')} *</label>
                  <input type="number" name="purchaseYear" required className="w-full border rounded-lg px-3 py-2" value={form.purchaseYear} onChange={handleChange} placeholder="ÅÅÅÅ" min="1900" max={new Date().getFullYear()} />
                </div>

                <div className="border-t pt-6 mt-6">
                  <h4 className="text-lg font-semibold text-[#0F172A] mb-4">{t('reportModal.contactInfo')}</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.eventDate')} *</label>
                    <input 
                      type="date" 
                      name="eventDate" 
                      required 
                      className={`w-full border rounded-lg px-3 py-2 ${hasError('eventDate') ? 'border-red-500 bg-red-50' : ''}`} 
                      value={form.eventDate} 
                      onChange={handleChange} 
                    />
                    {hasError('eventDate') && <p className="text-red-500 text-xs mt-1">{t('reportModal.eventDateRequired')}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.fullName')} *</label>
                    <input type="text" name="name" required className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.phoneNumber')} *</label>
                    <input type="tel" name="phone" required className="w-full border rounded-lg px-3 py-2" value={form.phone} onChange={handleChange} placeholder="070-123 45 67" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{t('reportModal.email')} *</label>
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
                {t('reportModal.back')}
              </button>
              <button type="submit" className="flex-1 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]">{t('reportModal.send')}</button>
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
              <label className="block text-sm font-medium mb-1">{t('reportModal.cleaningDate')} *</label>
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
              <label className="block text-sm font-medium mb-1">{t('reportModal.describeCleaning')} *</label>
              <textarea name="description" required className="w-full border rounded-lg px-3 py-2 min-h-[80px]" value={form.description} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('reportModal.attachImages')} *</label>
              <label htmlFor="file-upload" className="inline-block px-4 py-2 bg-[#10B981] text-white rounded-lg cursor-pointer hover:bg-[#059669] text-xs font-medium">
                {t('reportModal.selectFiles')}
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
              <button type="button" className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50" onClick={handleBack}>{t('reportModal.back')}</button>
              <button type="submit" className="flex-1 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669]">{t('reportModal.send')}</button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="text-center py-8">
            {formType === 'reklamation' ? (
              <>
                <h3 className="text-lg font-semibold text-[#10B981] mb-4">{t('reportModal.thankYouComplaint')}</h3>
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {t('reportModal.complaintMessage')}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-[#10B981] mb-4">{t('reportModal.thankYouReport')}</h3>
                
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {t('reportModal.damageReportMessage')}
                  </p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-[#0F172A] mb-3">{t('reportModal.compensationTerms')}</h4>
                    
                    <div className="text-xs text-gray-600 space-y-3">
                      <div>
                        <h5 className="font-medium text-[#0F172A]">{t('reportModal.compensationTitle')}</h5>
                        
                        <p className="mt-2">
                          <strong>14.1</strong> {t('reportModal.compensationText1')}
                        </p>
                        
                        <p className="mt-2">
                          <strong>14.2</strong> {t('reportModal.compensationText2')}
                        </p>
                        
                        <p className="mt-2">
                          <strong>14.3</strong> {t('reportModal.compensationText3')}
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
              {t('reportModal.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportModal; 
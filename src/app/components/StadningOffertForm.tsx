import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface StadningFormData {
  name: string;
  email: string;
  phone: string;
  typeOfHome: string;
  numberOfFloors: string;
  entireHome: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  livingRoom: number;
  otherRooms: number;
  officeRooms: number;
  kitchenArea: number;
  diningRooms: number;
  meetingRooms: number;
  changingRooms: number;
  toilets: number;
  otherBusinessRooms: number;
  hasGarage: boolean;
  hasBalcony: boolean;
  hasStorage: boolean;
  squareMeters: string;
  comments: string;
  movingDate: string;
  flexibleMovingDate: string;
  wantsFlexibleDate: boolean;
  additionalInfo: string;
  address: string;
  streetNumber: string;
  postalCode: string;
  contactPersonName?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  typeOfHome?: string;
  numberOfFloors?: string;
  entireHome?: string;
  squareMeters?: string;
  movingDate?: string;
  flexibleMovingDate?: string;
  rooms?: string;
  address?: string;
  streetNumber?: string;
  postalCode?: string;
  contactPersonName?: string;
}

interface StadningOffertFormProps {
  onSubmit: (data: StadningFormData) => void;
  onCancel: () => void;
  customerType?: 'privat' | 'foretag';
}

const StadningOffertForm: React.FC<StadningOffertFormProps> = ({ onSubmit, onCancel, customerType = 'privat' }) => {
  const [step, setStep] = useState(1);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidAddress, setLastValidAddress] = useState('');
  const [formData, setFormData] = useState<StadningFormData>({
    name: '',
    email: '',
    phone: '',
    typeOfHome: '',
    numberOfFloors: '',
    entireHome: '',
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    livingRoom: 0,
    otherRooms: 0,
    officeRooms: 0,
    kitchenArea: 0,
    diningRooms: 0,
    meetingRooms: 0,
    changingRooms: 0,
    toilets: 0,
    otherBusinessRooms: 0,
    hasGarage: false,
    hasBalcony: false,
    hasStorage: false,
    squareMeters: '',
    comments: '',
    movingDate: '',
    flexibleMovingDate: '',
    wantsFlexibleDate: false,
    additionalInfo: '',
    address: '',
    streetNumber: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [localCustomerType, setLocalCustomerType] = useState<'privat' | 'foretag'>(customerType || 'privat');

  // Debug log for current step
  console.log('Current step:', step);

  useEffect(() => {
    if (!isGoogleMapsLoaded) return;
    if (!window.google?.maps?.places) return;
    try {
      const addressInput = document.getElementById('address') as HTMLInputElement;
      if (addressInput) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
          componentRestrictions: { country: 'se' },
          fields: ['place_id', 'name', 'types', 'formatted_address', 'address_components'],
          types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            let streetName = '';
            let streetNumber = '';
            let city = '';
            place.address_components.forEach((component: AddressComponent) => {
              if (component.types.includes('route')) streetName = component.long_name;
              if (component.types.includes('street_number')) streetNumber = component.long_name;
              if (component.types.includes('locality') || component.types.includes('postal_town')) city = component.long_name;
            });
            const formattedAddress = `${streetName}, ${city}, Sweden`;
            setFormData(prev => ({ ...prev, address: formattedAddress, streetNumber }));
            setLastValidAddress(formattedAddress);
          }
        });
        addressInput.addEventListener('blur', () => {
          if (lastValidAddress && formData.address !== lastValidAddress) {
            setFormData(prev => ({ ...prev, address: lastValidAddress }));
          }
        });
      }
    } catch (error) {
      // ignore
    }
  }, [step, isGoogleMapsLoaded, formData.address, lastValidAddress]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'wantsFlexibleDate' && !checked ? { flexibleMovingDate: '' } : {}),
    }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.movingDate.trim()) {
      newErrors.movingDate = 'Vänligen välj önskat städdatum';
    }
    if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
      newErrors.flexibleMovingDate = 'Vänligen välj flexibilitet för städdatum';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.typeOfHome.trim()) {
      newErrors.typeOfHome = 'Vänligen välj bostadstyp';
    }
    if (!formData.numberOfFloors.trim()) {
      newErrors.numberOfFloors = 'Vänligen ange antal våningar';
    }
    if (!formData.entireHome.trim()) {
      newErrors.entireHome = 'Vänligen välj om hela bostaden ska städas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    if (localCustomerType === 'foretag') {
      const totalRooms = (formData.officeRooms || 0) + 
                        (formData.kitchenArea || 0) + 
                        (formData.diningRooms || 0) + 
                        (formData.meetingRooms || 0) + 
                        (formData.changingRooms || 0) + 
                        (formData.toilets || 0) + 
                        (formData.otherBusinessRooms || 0);
      if (totalRooms === 0) {
        newErrors.rooms = 'Vänligen ange minst ett rum som ska städas';
      }
    } else {
      const totalRooms = formData.bedrooms + formData.bathrooms + formData.kitchen + formData.livingRoom + formData.otherRooms;
      if (totalRooms === 0) {
        newErrors.rooms = 'Vänligen ange minst ett rum som ska städas';
      }
      if (!formData.squareMeters.trim()) {
        newErrors.squareMeters = 'Vänligen ange ytstorlek';
      } else if (!/^\d+$/.test(formData.squareMeters)) {
        newErrors.squareMeters = 'Vänligen ange endast siffror';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Vänligen ange ditt namn';
    }
    if (localCustomerType === 'foretag' && !formData.contactPersonName?.trim()) {
      newErrors.contactPersonName = 'Vänligen ange kontaktpersonens namn';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Vänligen ange din e-postadress';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vänligen ange en giltig e-postadress';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vänligen ange ditt telefonnummer';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vänligen ange din adress';
    }
    if (!formData.streetNumber.trim()) {
      newErrors.streetNumber = 'Vänligen ange gatunummer';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Vänligen ange postnummer';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postnummer måste vara exakt 5 siffror';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    switch (step) {
      case 1:
        setTouchedFields(prev => ({ ...prev, movingDate: true, flexibleMovingDate: formData.wantsFlexibleDate }));
        isValid = validateStep1();
        break;
      case 2:
        setTouchedFields(prev => ({ ...prev, typeOfHome: true, numberOfFloors: true, entireHome: true }));
        isValid = validateStep2();
        break;
      case 3:
        setTouchedFields(prev => ({ ...prev, squareMeters: true }));
        isValid = validateStep3();
        break;
      case 4:
        setTouchedFields({ name: true, email: true, phone: true, address: true, streetNumber: true, postalCode: true });
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }
    if (isValid) {
      setStep((prev) => prev + 1);
      setErrors({});
      setTouchedFields({});
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setErrors({});
    setTouchedFields({});
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Format the data to match the email template
      const emailData = {
        movingDate: formData.movingDate,
        flexibleMovingDate: formData.wantsFlexibleDate ? formData.flexibleMovingDate : 'Nej',
        typeOfHome: formData.typeOfHome,
        numberOfFloors: formData.numberOfFloors,
        entireHome: formData.entireHome,
        squareMeters: formData.squareMeters,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        kitchen: formData.kitchen,
        livingRoom: formData.livingRoom,
        otherRooms: formData.otherRooms,
        officeRooms: formData.officeRooms,
        kitchenArea: formData.kitchenArea,
        diningRooms: formData.diningRooms,
        meetingRooms: formData.meetingRooms,
        changingRooms: formData.changingRooms,
        toilets: formData.toilets,
        otherBusinessRooms: formData.otherBusinessRooms,
        hasGarage: formData.hasGarage,
        hasBalcony: formData.hasBalcony,
        hasStorage: formData.hasStorage,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        streetNumber: formData.streetNumber,
        postalCode: formData.postalCode,
        comments: formData.comments,
        customerType: localCustomerType,
        contactPersonName: formData.contactPersonName,
      };

      // Send the email data to the API endpoint
      const response = await fetch('/api/send-cleaning-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      setSubmitSuccess(true);
      window.location.href = '/tack';
    } catch (error) {
      console.error('Error sending form:', error);
      setSubmitError('Ett fel uppstod när förfrågan skulle skickas. Vänligen försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className=""
      >
        <h1 className="text-3xl font-bold text-center text-[#0F172A] mb-8">
          Få offert på flyttstädning
        </h1>
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${stepNumber === step ? 'text-[#10B981]' : 'text-gray-400'}`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center mr-2 ${
                    stepNumber === step ? 'bg-[#10B981] text-white rounded-full' : 'bg-gray-200 rounded-full'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-sm">
                  {stepNumber === 1 ? 'Datum' :
                    stepNumber === 2 ? 'Bostad' :
                    stepNumber === 3 ? 'Rum' :
                    stepNumber === 4 ? 'Kontakt' :
                    'Bekräfta'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Tack för din förfrågan!</strong>
            <span className="block sm:inline"> Vi återkommer så snart som möjligt.</span>
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              // Only allow form submission on step 5
              if (step === 5) {
                handleFinalSubmit(e);
              }
            }} 
            noValidate
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-l-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 ${localCustomerType === 'privat' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                    onClick={() => setLocalCustomerType('privat')}
                  >
                    Privat
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-r-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 -ml-px ${localCustomerType === 'foretag' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                    onClick={() => setLocalCustomerType('foretag')}
                  >
                    Företag
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Önskat städdatum</label>
                  <input
                    type="date"
                    name="movingDate"
                    value={formData.movingDate}
                    onChange={handleInputChange}
                    min={(() => {
                      const tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      return tomorrow.toISOString().split('T')[0];
                    })()}
                    onKeyDown={(e) => e.preventDefault()}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                      errors.movingDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                  {errors.movingDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.movingDate}</p>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="wantsFlexibleDate"
                      checked={formData.wantsFlexibleDate}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Jag är flexibel med städdatum
                    </label>
                  </div>
                  {formData.wantsFlexibleDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flexibelt städdatum</label>
                      <select
                        name="flexibleMovingDate"
                        value={formData.flexibleMovingDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.flexibleMovingDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                      >
                        <option value="">-- Välj --</option>
                        <option value="+- 1 dag">+- 1 dag</option>
                        <option value="+- 2 dagar">+- 2 dagar</option>
                        <option value="+- 3 dagar">+- 3 dagar</option>
                        <option value="+- 4 dagar">+- 4 dagar</option>
                        <option value="+- 5 dagar">+- 5 dagar</option>
                        <option value="+- 6 dagar">+- 6 dagar</option>
                        <option value="+- 1 vecka">+- 1 vecka</option>
                        <option value="+- 2 veckor">+- 2 veckor</option>
                        <option value="+- 3 veckor">+- 3 veckor</option>
                        <option value="+- 1 månad">+- 1 månad</option>
                        <option value="mer än 1 månad">mer än 1 månad</option>
                      </select>
                      {errors.flexibleMovingDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.flexibleMovingDate}</p>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        Om du väljer ett flexibelt städdatum sker städningen inom vald tidsperiod från det datum du har valt.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {localCustomerType === 'foretag'
                      ? 'Vilken typ av lokal ska städas?'
                      : 'Vilken sorts bostad ska städas?'}
                  </label>
                  <select
                    name="typeOfHome"
                    value={formData.typeOfHome}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                      errors.typeOfHome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <option value="">{localCustomerType === 'foretag' ? 'Välj lokaltyp' : 'Välj bostadstyp'}</option>
                    {localCustomerType === 'foretag' ? (
                      <>
                        <option value="kontor">Kontor</option>
                        <option value="butik">Butik/Handel</option>
                        <option value="lager">Lager/Industri</option>
                        <option value="restaurang">Restaurang/Servering</option>
                        <option value="undervisning">Undervisning</option>
                        <option value="hotell">Hotell</option>
                        <option value="annat">Annat</option>
                      </>
                    ) : (
                      <>
                        <option value="villa">Villa</option>
                        <option value="lagenhet">Lägenhet</option>
                        <option value="parhus">Parhus</option>
                        <option value="radhus">Radhus</option>
                        <option value="fritidshus">Fritidshus</option>
                        <option value="annat">Annat</option>
                      </>
                    )}
                  </select>
                  {errors.typeOfHome && (
                    <p className="mt-1 text-sm text-red-600">{errors.typeOfHome}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.typeOfHome.toLowerCase() === 'lagenhet' ? 'Vilken våning ligger lägenheten på?' : 'Hur många våningar ska städas?'}
                  </label>
                  <select
                    name="numberOfFloors"
                    value={formData.numberOfFloors}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                      errors.numberOfFloors ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  >
                    <option value="">Välj antal våningar</option>
                    <option value="1">1 våning</option>
                    <option value="2">2 våningar</option>
                    <option value="3">3 våningar</option>
                    <option value="4">4 våningar eller fler</option>
                  </select>
                  {errors.numberOfFloors && (
                    <p className="mt-1 text-sm text-red-600">{errors.numberOfFloors}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {localCustomerType === 'foretag'
                      ? 'Ska hela lokalen städas?'
                      : 'Ska hela bostaden städas?'}
                  </label>
                  {localCustomerType === 'foretag' ? (
                    <div className="flex gap-6 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entireHome"
                          value="yes"
                          checked={formData.entireHome === 'yes'}
                          onChange={handleInputChange}
                          className="form-radio text-[#10B981]"
                        />
                        <span className="ml-2 text-gray-700">Ja, hela lokalen</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entireHome"
                          value="no"
                          checked={formData.entireHome === 'no'}
                          onChange={handleInputChange}
                          className="form-radio text-[#10B981]"
                        />
                        <span className="ml-2 text-gray-700">Nej, endast delar av lokalen</span>
                      </label>
                    </div>
                  ) : (
                    <div className="flex gap-6 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entireHome"
                          value="yes"
                          checked={formData.entireHome === 'yes'}
                          onChange={handleInputChange}
                          className="form-radio text-[#10B981]"
                        />
                        <span className="ml-2 text-gray-700">Ja, hela bostaden</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="entireHome"
                          value="no"
                          checked={formData.entireHome === 'no'}
                          onChange={handleInputChange}
                          className="form-radio text-[#10B981]"
                        />
                        <span className="ml-2 text-gray-700">Nej, endast delar av bostaden</span>
                      </label>
                    </div>
                  )}
                  {errors.entireHome && (
                    <p className="mt-1 text-sm text-red-600">{errors.entireHome}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">Ungefär hur stor yta ska städas?</label>
                  <input
                    type="text"
                    name="squareMeters"
                    value={formData.squareMeters}
                    onChange={e => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      setFormData({ ...formData, squareMeters: value });
                      setErrors({ ...errors, squareMeters: '' });
                    }}
                    placeholder="Ange yta i kvm"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                      errors.squareMeters ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: 'white', color: 'black' }}
                  />
                  {errors.squareMeters && (
                    <p className="mt-1 text-sm text-red-600">{errors.squareMeters}</p>
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="block text-sm font-medium text-gray-700 mb-3">
                    {localCustomerType === 'foretag' 
                      ? 'Ange antalet rum som ska städas'
                      : 'Ange antalet rum som ska städas'}
                  </h3>
                  <div className="space-y-4">
                    {localCustomerType === 'foretag' ? (
                      <>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Kontorsrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                officeRooms: Math.max(0, prev.officeRooms || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.officeRooms || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  officeRooms: (prev.officeRooms || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Köksutrymme</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                kitchenArea: Math.max(0, prev.kitchenArea || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.kitchenArea || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  kitchenArea: (prev.kitchenArea || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Matrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                diningRooms: Math.max(0, prev.diningRooms || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.diningRooms || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  diningRooms: (prev.diningRooms || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Mötesrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                meetingRooms: Math.max(0, prev.meetingRooms || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.meetingRooms || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  meetingRooms: (prev.meetingRooms || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Omklädningsrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                changingRooms: Math.max(0, prev.changingRooms || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.changingRooms || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  changingRooms: (prev.changingRooms || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Toalett</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                toilets: Math.max(0, prev.toilets || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.toilets || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  toilets: (prev.toilets || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Övriga rum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                otherBusinessRooms: Math.max(0, prev.otherBusinessRooms || 0 - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.otherBusinessRooms || 0}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  otherBusinessRooms: (prev.otherBusinessRooms || 0) + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Sovrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                bedrooms: Math.max(0, prev.bedrooms - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.bedrooms}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  bedrooms: prev.bedrooms + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Badrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                bathrooms: Math.max(0, prev.bathrooms - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.bathrooms}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  bathrooms: prev.bathrooms + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Kök</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                kitchen: Math.max(0, prev.kitchen - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.kitchen}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  kitchen: prev.kitchen + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Vardagsrum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                livingRoom: Math.max(0, prev.livingRoom - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.livingRoom}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  livingRoom: prev.livingRoom + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="text-gray-700">Övriga rum</span>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                otherRooms: Math.max(0, prev.otherRooms - 1)
                              }))}
                              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="min-w-[2rem] text-center text-gray-900">{formData.otherRooms}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  otherRooms: prev.otherRooms + 1
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.rooms;
                                  return newErrors;
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {errors.rooms && (
                      <p className="mt-1 text-sm text-red-600">{errors.rooms}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                <p className="text-sm text-gray-700 mb-6">Tjänsten är gratis och {localCustomerType === 'foretag' ? 'ni' : 'du'} är inte bunden till någonting.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {localCustomerType === 'foretag' ? 'Företagsnamn' : 'Ditt namn'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  {localCustomerType === 'foretag' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kontaktperson för och efternamn</label>
                      <input
                        type="text"
                        name="contactPersonName"
                        value={formData.contactPersonName || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.contactPersonName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                      {errors.contactPersonName && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactPersonName}</p>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adress</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          setErrors({ ...errors, address: "" });
                        }}
                        placeholder="Börja skriva din adress"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                      )}
                    </div>
                    <div className="md:w-1/4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gatunr.</label>
                      <input
                        type="text"
                        name="streetNumber"
                        value={formData.streetNumber}
                        onChange={(e) => {
                          // Must start with number, followed by optional single letter
                          const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').replace(/^([0-9]+)?([A-Za-z]?).*/g, '$1$2');
                          if (/^[0-9]+[A-Za-z]?$/.test(value) || value === '') {
                            setFormData({ ...formData, streetNumber: value });
                            setErrors({ ...errors, streetNumber: "" });
                          }
                        }}
                        onKeyDown={(e) => {
                          // Allow only numbers, letters, backspace, delete, and arrow keys
                          if (
                            !/^[0-9A-Za-z]$/.test(e.key) && // not a number or letter
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault();
                          }
                          // If no numbers yet, prevent letters
                          if (!/^[0-9]+/.test(formData.streetNumber) && /^[A-Za-z]$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="1A"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.streetNumber ? "border-red-500" : ""
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                      {errors.streetNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.streetNumber}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postnummer</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => {
                        // Only allow numbers and limit to 5 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                        setFormData({ ...formData, postalCode: value });
                        setErrors({ ...errors, postalCode: "" });
                      }}
                      placeholder="12345"
                      required
                      maxLength={5}
                      pattern="\d{5}"
                      className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.postalCode ? "border-red-500" : ""
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kommentarer (frivilligt)</label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      placeholder="Här kan du nämna särskilda detaljer, t.ex. om du har stuckaturer som behöver rengöras varsamt."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                      style={{ backgroundColor: 'white', color: 'black' }}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Bekräfta din förfrågan</h2>
                <p className="text-sm text-gray-700 mb-6">Dubbelkolla att alla uppgifter stämmer innan du skickar in din förfrågan.</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-900">
                  <div className="mb-2"><span className="font-semibold">{localCustomerType === 'foretag' ? 'Företagsnamn' : 'Namn'}:</span> {formData.name}</div>
                  {localCustomerType === 'foretag' && (
                    <div className="mb-2"><span className="font-semibold">Kontaktperson för och efternamn:</span> {formData.contactPersonName || ''}</div>
                  )}
                  <div className="mb-2"><span className="font-semibold">E-post:</span> {formData.email}</div>
                  <div className="mb-2"><span className="font-semibold">Telefon:</span> {formData.phone}</div>
                  <div className="mb-2"><span className="font-semibold">Adress:</span> {formData.address} {formData.streetNumber}, {formData.postalCode}</div>
                  <div className="mb-2"><span className="font-semibold">Städdatum:</span> {formData.movingDate}</div>
                  {formData.wantsFlexibleDate ? (
                    <div className="mb-2"><span className="font-semibold">Flexibelt datum:</span> {formData.flexibleMovingDate}</div>
                  ) : null}
                  <div className="mb-2"><span className="font-semibold">{localCustomerType === 'foretag' ? 'Lokaltyp' : 'Bostadstyp'}:</span> {formData.typeOfHome}</div>
                  <div className="mb-2"><span className="font-semibold">Antal våningar:</span> {formData.numberOfFloors}</div>
                  <div className="mb-2"><span className="font-semibold">{localCustomerType === 'foretag' ? 'Hela lokalen' : 'Hela bostaden'}:</span> {formData.entireHome === 'yes' ? 'Ja' : 'Nej'}</div>
                  {localCustomerType === 'foretag' ? (
                    <>
                      {formData.officeRooms > 0 && <div className="mb-2"><span className="font-semibold">Kontorsrum:</span> {formData.officeRooms}</div>}
                      {formData.kitchenArea > 0 && <div className="mb-2"><span className="font-semibold">Köksutrymme:</span> {formData.kitchenArea}</div>}
                      {formData.diningRooms > 0 && <div className="mb-2"><span className="font-semibold">Matrum:</span> {formData.diningRooms}</div>}
                      {formData.meetingRooms > 0 && <div className="mb-2"><span className="font-semibold">Mötesrum:</span> {formData.meetingRooms}</div>}
                      {formData.changingRooms > 0 && <div className="mb-2"><span className="font-semibold">Omklädningsrum:</span> {formData.changingRooms}</div>}
                      {formData.toilets > 0 && <div className="mb-2"><span className="font-semibold">Toalett:</span> {formData.toilets}</div>}
                      {formData.otherBusinessRooms > 0 && <div className="mb-2"><span className="font-semibold">Övriga rum:</span> {formData.otherBusinessRooms}</div>}
                    </>
                  ) : (
                    <>
                      <div className="mb-2"><span className="font-semibold">Sovrum:</span> {formData.bedrooms}</div>
                      <div className="mb-2"><span className="font-semibold">Badrum:</span> {formData.bathrooms}</div>
                      <div className="mb-2"><span className="font-semibold">Kök:</span> {formData.kitchen}</div>
                      <div className="mb-2"><span className="font-semibold">Vardagsrum:</span> {formData.livingRoom}</div>
                      <div className="mb-2"><span className="font-semibold">Övriga rum:</span> {formData.otherRooms}</div>
                      <div className="mb-2"><span className="font-semibold">Bostadens storlek (kvm):</span> {formData.squareMeters}</div>
                      <div className="mb-2"><span className="font-semibold">Garage:</span> {formData.hasGarage ? 'Ja' : 'Nej'}</div>
                      <div className="mb-2"><span className="font-semibold">Balkong:</span> {formData.hasBalcony ? 'Ja' : 'Nej'}</div>
                      <div className="mb-2"><span className="font-semibold">Förråd:</span> {formData.hasStorage ? 'Ja' : 'Nej'}</div>
                    </>
                  )}
                  {formData.comments ? (
                    <div className="mb-2"><span className="font-semibold">Kommentarer:</span> {formData.comments}</div>
                  ) : null}
                </div>
              </div>
            )}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrev();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
                >
                  Tillbaka
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Nästa
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka offertförfrågan'}
                </button>
              )}
            </div>
          </form>
        )}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Ett fel uppstod!</strong>
            <span className="block sm:inline"> {submitError}</span>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default StadningOffertForm; 
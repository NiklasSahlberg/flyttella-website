"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: any;
        };
      };
    };
  }
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceResult {
  address_components?: AddressComponent[];
}

interface FormData {
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
}

export default function FaStadningOffert() {
  const [step, setStep] = useState(1);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidAddress, setLastValidAddress] = useState("");
  
  // Custom address autocomplete states
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [isLoadingAddressSuggestions, setIsLoadingAddressSuggestions] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  
  // Calculate tomorrow's date for minDate
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    typeOfHome: "",
    numberOfFloors: "",
    entireHome: "",
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    livingRoom: 0,
    otherRooms: 0,
    hasGarage: false,
    hasBalcony: false,
    hasStorage: false,
    squareMeters: "",
    comments: "",
    movingDate: "",
    flexibleMovingDate: "",
    wantsFlexibleDate: false,
    additionalInfo: "",
    address: "",
    streetNumber: "",
    postalCode: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Custom address search function using Swedish address API
  const searchAddresses = async (query: string) => {
    if (query.length < 2) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    setIsLoadingAddressSuggestions(true);

    try {
      const response = await fetch(
        `https://ovuvdmhqcg.execute-api.eu-central-1.amazonaws.com/production/search/addresses?country=SE&query=${encodeURIComponent(query)}&limit=8`
      );
      const data = await response.json();
      
      if (data.success && data.data) {
        const suggestions = data.data.map((item: any) => ({
          display_name: item.text,
          formatted_address: `${item.street} ${item.streetNumber || ''}`.trim() + `, ${item.postarea}, Sweden`,
          address_components: {
            street_name: item.street,
            street_number: item.streetNumber || '',
            city: item.postarea,
            postcode: item.postcode || '',
            municipality: item.municipality || '',
            county: item.county || ''
          },
          full_text: item.text
        }));

        setAddressSuggestions(suggestions);
        setShowAddressSuggestions(suggestions.length > 0);
      } else {
        setAddressSuggestions([]);
        setShowAddressSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
    } finally {
      setIsLoadingAddressSuggestions(false);
    }
  };

  // Debounced search
  const debounceSearch = React.useRef<NodeJS.Timeout>();
  const handleAddressSearch = (query: string) => {
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }
    debounceSearch.current = setTimeout(() => {
      searchAddresses(query);
    }, 300);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceSearch.current) {
        clearTimeout(debounceSearch.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Special handling for date to prevent selecting today or earlier
    if (name === 'movingDate') {
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        return;
      }
    }

    // Special handling for phone number to allow + at the start
    if (name === 'phone') {
      const phoneValue = value.startsWith('+') ? '+' + value.slice(1).replace(/[^0-9]/g, '') : value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: phoneValue,
      }));

      // Clear phone error if input becomes valid
      if (phoneValue) {
        const phoneNumber = phoneValue.startsWith('+') ? phoneValue.slice(1) : phoneValue;
        if (/^\d+$/.test(phoneNumber) && phoneNumber.length >= 7 && phoneNumber.length <= 10) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.phone;
            return newErrors;
          });
        }
      }
      return;
    }

    // Only allow numbers for postal code
    if (name === 'postalCode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));

      // Clear postal code error if input becomes valid
      if (numericValue.length === 5) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.postalCode;
          return newErrors;
        });
      }
      return;
    }

    // Only allow numbers for square meters
    if (name === 'squareMeters') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));

      // Clear square meters error if input becomes valid
      if (numericValue) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.squareMeters;
          return newErrors;
        });
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "wantsFlexibleDate" && !checked ? { flexibleMovingDate: "" } : {}),
    }));

    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    // Clear error when user starts typing
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
      newErrors.movingDate = "Vänligen välj önskat städdatum";
    } else {
      const selectedDate = new Date(formData.movingDate);
      if (selectedDate < tomorrow) {
        newErrors.movingDate = "Städdatum måste vara minst imorgon";
      }
    }

    if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
      newErrors.flexibleMovingDate = "Vänligen välj flexibilitet för städdatum";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.typeOfHome.trim()) {
      newErrors.typeOfHome = "Vänligen välj bostadstyp";
    }
    if (!formData.numberOfFloors.trim()) {
      newErrors.numberOfFloors = "Vänligen ange antal våningar";
    }
    if (!formData.entireHome.trim()) {
      newErrors.entireHome = "Vänligen välj om hela bostaden ska städas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};

    // Check if at least one room has been selected
    const totalRooms = formData.bedrooms + formData.bathrooms + formData.kitchen + formData.livingRoom + formData.otherRooms;
    if (totalRooms === 0) {
      newErrors.rooms = "Vänligen ange minst ett rum som ska städas";
    }

    if (!formData.squareMeters.trim()) {
      newErrors.squareMeters = "Vänligen ange ytstorlek";
    } else if (!/^\d+$/.test(formData.squareMeters)) {
      newErrors.squareMeters = "Vänligen ange endast siffror";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};

    // Always validate name
    if (!formData.name.trim()) {
      newErrors.name = "Vänligen ange ditt namn";
    }

    // Always validate email
    if (!formData.email.trim()) {
      newErrors.email = "Vänligen ange din e-postadress";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vänligen ange en giltig e-postadress";
    }

    // Always validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Vänligen ange ditt telefonnummer";
    } else {
      const phoneNumber = formData.phone.startsWith('+') ? formData.phone.slice(1) : formData.phone;
      if (!/^\d+$/.test(phoneNumber)) {
        newErrors.phone = "Vänligen ange endast siffror (och eventuellt + i början)";
      } else if (phoneNumber.length < 7 || phoneNumber.length > 10) {
        newErrors.phone = "Telefonnummer måste vara mellan 7 och 10 siffror (exklusive +)";
      }
    }

    // Always validate address
    if (!formData.address.trim()) {
      newErrors.address = "Vänligen ange din adress";
    } else if (!isAddressValid) {
      newErrors.address = "Vänligen välj en adress från listan";
    }

    // Always validate street number
    if (!formData.streetNumber.trim()) {
      newErrors.streetNumber = "Vänligen ange gatunummer";
    }

    // Always validate postal code
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Vänligen ange postnummer";
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postnummer måste vara exakt 5 siffror";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-cleaning-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send request');
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Ett fel uppstod när förfrågan skulle skickas. Vänligen försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    let isValid = false;
    
    switch (step) {
      case 1:
        setTouchedFields(prev => ({
          ...prev,
          movingDate: true,
          flexibleMovingDate: formData.wantsFlexibleDate
        }));
        isValid = validateStep1();
        break;
      case 2:
        setTouchedFields(prev => ({
          ...prev,
          typeOfHome: true,
          numberOfFloors: true,
          entireHome: true
        }));
        isValid = validateStep2();
        break;
      case 3:
        setTouchedFields(prev => ({
          ...prev,
          squareMeters: true
        }));
        isValid = validateStep3();
        break;
      case 4:
        // Mark all fields as touched for step 4
        setTouchedFields({
          name: true,
          email: true,
          phone: true,
          address: true,
          streetNumber: true,
          postalCode: true
        });
        isValid = validateStep4();
        break;
      case 5:
        // No additional validation needed for confirmation step
        isValid = true;
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

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
    // Clear touched fields when moving to previous step
    setTouchedFields({});
  };

  return (
    <>
      <main className="min-h-screen py-16 bg-gradient-to-r from-[#0F172A]/5 to-[#10B981]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <strong className="font-bold">Tack för din förfrågan!</strong>
                <span className="block sm:inline"> Vi återkommer så snart som möjligt.</span>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4, 5].map((stepNumber) => (
                      <div
                        key={stepNumber}
                        className={`flex items-center ${
                          stepNumber === step ? "text-[#10B981]" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                            stepNumber === step
                              ? "bg-[#10B981] text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {stepNumber}
                        </div>
                        <span className="text-sm">
                          {stepNumber === 1 ? "Datum" : 
                           stepNumber === 2 ? "Bostad" : 
                           stepNumber === 3 ? "Rum" :
                           stepNumber === 4 ? "Kontakt" :
                           "Bekräfta"}
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

                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Ett fel uppstod!</strong>
                    <span className="block sm:inline"> {submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {step === 1 && (
                    <div className="space-y-6">
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
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.movingDate ? "border-red-500" : "border-gray-300"
                          }`}
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
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                wantsFlexibleDate: e.target.checked,
                                flexibleMovingDate: e.target.checked ? prev.flexibleMovingDate : ""
                              }));
                              setErrors(prev => {
                                const newErrors = { ...prev };
                                if (!e.target.checked) {
                                  delete newErrors.flexibleMovingDate;
                                }
                                return newErrors;
                              });
                            }}
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
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                                errors.flexibleMovingDate ? "border-red-500" : "border-gray-300"
                              }`}
                            >
                              <option value="">-- Välj --</option>
                              <option value="1">+ 1 dag</option>
                              <option value="2">+ 2 dagar</option>
                              <option value="3">+ 3 dagar</option>
                              <option value="4">+ 4 dagar</option>
                              <option value="5">+ 5 dagar</option>
                              <option value="6">+ 6 dagar</option>
                              <option value="7">+ 1 vecka</option>
                              <option value="14">+ 2 veckor</option>
                              <option value="21">+ 3 veckor</option>
                              <option value="30">+ 1 månad</option>
                              <option value="31+">+ mer än 1 månad</option>
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
                          Vilken sorts bostad ska städas?
                        </label>
                        <select
                          name="typeOfHome"
                          value={formData.typeOfHome}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.typeOfHome ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Välj bostadstyp</option>
                          <option value="villa">Villa</option>
                          <option value="lagenhet">Lägenhet</option>
                          <option value="parhus">Parhus</option>
                          <option value="radhus">Radhus</option>
                          <option value="fritidshus">Fritidshus</option>
                          <option value="annat">Annat</option>
                        </select>
                        {errors.typeOfHome && (
                          <p className="mt-1 text-sm text-red-600">{errors.typeOfHome}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hur många våningar ska städas?
                        </label>
                        <select
                          name="numberOfFloors"
                          value={formData.numberOfFloors}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.numberOfFloors ? "border-red-500" : "border-gray-300"
                          }`}
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
                          Ska hela bostaden städas?
                        </label>
                        <select
                          name="entireHome"
                          value={formData.entireHome}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.entireHome ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Välj alternativ</option>
                          <option value="yes">Ja, hela bostaden</option>
                          <option value="no">Nej, endast delar av bostaden</option>
                        </select>
                        {errors.entireHome && (
                          <p className="mt-1 text-sm text-red-600">{errors.entireHome}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="block text-sm font-medium text-gray-700 mb-3">
                          Ange antalet rum som ska städas
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <span>Sovrum</span>
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
                              <span className="w-4 text-center">{formData.bedrooms}</span>
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
                            <span>Badrum</span>
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
                              <span className="w-4 text-center">{formData.bathrooms}</span>
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
                            <span>Kök</span>
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
                              <span className="w-4 text-center">{formData.kitchen}</span>
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
                            <span>Vardagsrum</span>
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
                              <span className="w-4 text-center">{formData.livingRoom}</span>
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
                            <span>Övriga rum</span>
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
                              <span className="w-4 text-center">{formData.otherRooms}</span>
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
                        </div>
                      </div>

                      {errors.rooms && (
                        <p className="mt-1 text-sm text-red-600">{errors.rooms}</p>
                      )}

                      <div>
                        <h3 className="block text-sm font-medium text-gray-700 mb-3">
                          Välj om du vill ha städning av följande
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasGarage"
                              checked={formData.hasGarage}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              Garage
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasBalcony"
                              checked={formData.hasBalcony}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              Balkong/veranda/terrass
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasStorage"
                              checked={formData.hasStorage}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                              Förråd/uthus
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bostadens storlek (kvm)
                        </label>
                        <input
                          type="text"
                          name="squareMeters"
                          value={formData.squareMeters}
                          onChange={handleInputChange}
                          placeholder="T.ex. 120"
                          required
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.squareMeters ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.squareMeters && (
                          <p className="mt-1 text-sm text-red-600">{errors.squareMeters}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ditt namn</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
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
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Adress</label>
                            <div className="relative">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={(e) => {
                                  setFormData({ ...formData, address: e.target.value });
                                  setErrors({ ...errors, address: "" });
                                  setIsAddressValid(false); // Invalidate when manually edited
                                  handleAddressSearch(e.target.value);
                                }}
                                onFocus={() => {
                                  if (formData.address.length >= 2) {
                                    setShowAddressSuggestions(true);
                                  }
                                }}
                                onBlur={() => {
                                  // Delay hiding suggestions to allow for selection
                                  setTimeout(() => setShowAddressSuggestions(false), 200);
                                }}
                                placeholder="Börja skriva din adress"
                                required
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                                  errors.address 
                                    ? "border-red-500" 
                                    : isAddressValid 
                                      ? "border-green-500" 
                                      : "border-gray-300"
                                }`}
                              />
                              
                              {/* Custom dropdown */}
                              {showAddressSuggestions && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                  {isLoadingAddressSuggestions && (
                                    <div className="p-4 text-center text-gray-500">
                                      Söker adresser...
                                    </div>
                                  )}
                                  {!isLoadingAddressSuggestions && addressSuggestions.length === 0 && formData.address.length >= 2 && (
                                    <div className="p-4 text-center text-gray-500">
                                      Inga adresser hittades
                                    </div>
                                  )}
                                  {!isLoadingAddressSuggestions && addressSuggestions.map((suggestion, index) => (
                                    <div
                                      key={index}
                                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                      onMouseDown={(e) => {
                                        e.preventDefault(); // Prevent blur from firing
                                        
                                        // Create clean address without street number
                                        const streetName = suggestion.address_components.street_name || '';
                                        const city = suggestion.address_components.city || '';
                                        const cleanAddress = `${streetName}, ${city}, Sweden`;
                                        
                                        setFormData({ 
                                          ...formData, 
                                          address: cleanAddress,
                                          streetNumber: suggestion.address_components.street_number || formData.streetNumber,
                                          postalCode: suggestion.address_components.postcode || formData.postalCode
                                        });
                                        setLastValidAddress(cleanAddress);
                                        setIsAddressValid(true); // Mark as valid when selected from dropdown
                                        setShowAddressSuggestions(false);
                                        setErrors({ 
                                          ...errors, 
                                          address: "",
                                          streetNumber: "",
                                          postalCode: ""
                                        });
                                      }}
                                    >
                                      <div className="font-medium text-sm text-gray-900">
                                        {suggestion.full_text}
                                      </div>
                                      {suggestion.address_components.postcode && (
                                        <div className="text-xs text-gray-500 mt-1">
                                          {suggestion.address_components.postcode} {suggestion.address_components.city}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
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
                              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                                errors.streetNumber ? "border-red-500" : ""
                              }`}
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
                            className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.postalCode ? "border-red-500" : ""
                            }`}
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Bekräfta din förfrågan</h2>
                        <p className="text-gray-600">Vänligen kontrollera att all information är korrekt innan du skickar in din förfrågan.</p>
                      </div>
                      
                      <div className="space-y-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Städdatum
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-700">
                              <span className="font-medium">Datum:</span> {formData.movingDate}
                            </p>
                            {formData.wantsFlexibleDate && (
                              <p className="text-gray-700">
                                <span className="font-medium">Flexibilitet:</span> {formData.flexibleMovingDate} dagar
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-6 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Bostadsinformation
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Typ:</span> {formData.typeOfHome}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Antal våningar:</span> {formData.numberOfFloors}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Hela bostaden:</span> {formData.entireHome === "yes" ? "Ja" : "Nej"}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Yta:</span> {formData.squareMeters} kvm
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 border-b border-gray-200">
                          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Rum
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Sovrum:</span> {formData.bedrooms}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Badrum:</span> {formData.bathrooms}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Kök:</span> {formData.kitchen}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Vardagsrum:</span> {formData.livingRoom}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Övriga rum:</span> {formData.otherRooms}
                              </p>
                            </div>
                          </div>
                          {(formData.hasGarage || formData.hasBalcony || formData.hasStorage) && (
                            <div className="mt-4">
                              <p className="text-gray-700 font-medium mb-2">Ytterligare utrymmen:</p>
                              <div className="flex flex-wrap gap-2">
                                {formData.hasGarage && (
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Garage</span>
                                )}
                                {formData.hasBalcony && (
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Balkong/veranda/terrass</span>
                                )}
                                {formData.hasStorage && (
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Förråd/uthus</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Kontaktinformation
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Namn:</span> {formData.name}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">E-post:</span> {formData.email}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Telefon:</span> {formData.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-700">
                                <span className="font-medium">Adress:</span> {formData.address} {formData.streetNumber}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Postnummer:</span> {formData.postalCode}
                              </p>
                            </div>
                          </div>
                        </div>

                        {formData.comments && (
                          <div className="p-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
                              <svg className="w-5 h-5 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              Kommentarer
                            </h3>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{formData.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-[#0F172A] text-[#0F172A] rounded-full hover:bg-[#0F172A] hover:text-white transition-colors"
                      >
                        Tillbaka
                      </button>
                    )}
                    <button
                      type={step === 5 ? "submit" : "button"}
                      onClick={(e) => {
                        if (step !== 5) {
                          e.preventDefault();
                          nextStep();
                        }
                      }}
                      disabled={isSubmitting}
                      className={`ml-auto px-6 py-2 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-full hover:opacity-90 transition-opacity ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Skickar..." : step === 5 ? "Skicka" : "Nästa"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
} 
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

interface HeavyItem {
  type: string;
  description?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentAddress: string;
  newAddress: string;
  apartmentNumber: string;
  postalCode: string;
  apartmentSize: string;
  numberOfRooms: string;
  typeOfHome: string;
  floor: string;
  hasElevator: string;
  parkingDistance: string;
  toApartmentNumber: string;
  toPostalCode: string;
  toApartmentSize: string;
  toNumberOfRooms: string;
  fromTypeOfHome: string;
  toTypeOfHome: string;
  fromFloor: string;
  toFloor: string;
  fromHasElevator: string;
  toHasElevator: string;
  fromParkingDistance: string;
  toParkingDistance: string;
  hasHeavyItems: string;
  heavyItems: HeavyItem[];
  hasDelicateItems: string;
  delicateItemsDescription: string;
  movingDate: string;
  flexibleMovingDate: string;
  needsPacking: boolean;
  needsStorage: boolean;
  needsCleaning: boolean;
  additionalInfo: string;
}

interface FormErrors {
  currentAddress?: string;
  newAddress?: string;
  toApartmentNumber?: string;
  toPostalCode?: string;
  toApartmentSize?: string;
  toNumberOfRooms?: string;
  toTypeOfHome?: string;
  fromFloor?: string;
  toFloor?: string;
  fromHasElevator?: string;
  toHasElevator?: string;
  fromParkingDistance?: string;
  toParkingDistance?: string;
  hasHeavyItems?: string;
  heavyItems?: string;
  hasDelicateItems?: string;
  delicateItemsDescription?: string;
  floor?: string;
  parkingDistance?: string;
}

export default function FaOffert() {
  const [step, setStep] = useState(1);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItem, setCustomItem] = useState({ type: "", weight: "" });
  const [customItemError, setCustomItemError] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    currentAddress: "",
    newAddress: "",
    apartmentNumber: "",
    postalCode: "",
    apartmentSize: "",
    numberOfRooms: "",
    typeOfHome: "",
    floor: "",
    hasElevator: "",
    parkingDistance: "",
    toApartmentNumber: "",
    toPostalCode: "",
    toApartmentSize: "",
    toNumberOfRooms: "",
    fromTypeOfHome: "",
    toTypeOfHome: "",
    fromFloor: "",
    toFloor: "",
    fromHasElevator: "",
    toHasElevator: "",
    fromParkingDistance: "",
    toParkingDistance: "",
    hasHeavyItems: "",
    heavyItems: [],
    hasDelicateItems: "",
    delicateItemsDescription: "",
    movingDate: "",
    flexibleMovingDate: "",
    needsPacking: false,
    needsStorage: false,
    needsCleaning: false,
    additionalInfo: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!isGoogleMapsLoaded) return;

    // Initialize Google Places Autocomplete
    if (!window.google?.maps?.places) return;

    try {
      const currentAddressInput = document.getElementById('currentAddress') as HTMLInputElement;
      const newAddressInput = document.getElementById('newAddress') as HTMLInputElement;

      if (currentAddressInput) {
        const autocomplete1 = new window.google.maps.places.Autocomplete(currentAddressInput, {
          componentRestrictions: { country: 'se' },
          fields: ['address_components', 'formatted_address'],
          types: ['address']
        });

        autocomplete1.addListener('place_changed', () => {
          const place = autocomplete1.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({
              ...prev,
              currentAddress: place.formatted_address
            }));
          }
        });
      }

      if (newAddressInput) {
        const autocomplete2 = new window.google.maps.places.Autocomplete(newAddressInput, {
          componentRestrictions: { country: 'se' },
          fields: ['address_components', 'formatted_address'],
          types: ['address']
        });

        autocomplete2.addListener('place_changed', () => {
          const place = autocomplete2.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({
              ...prev,
              newAddress: place.formatted_address
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error initializing Google Places:', error);
    }
  }, [step, isGoogleMapsLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user makes a valid selection
    if (step === 5) {
      const newErrors = { ...errors };
      
      if (name === 'toFloor' && value) {
        delete newErrors.toFloor;
      } else if (name === 'toHasElevator' && value) {
        delete newErrors.toHasElevator;
      } else if (name === 'toParkingDistance' && value) {
        delete newErrors.toParkingDistance;
      }
      
      setErrors(newErrors);
    }
  };

  const nextStep = () => {
    if (step === 2) {
      if (!formData.currentAddress || !formData.currentAddress.trim()) {
        setErrors({ ...errors, currentAddress: "Vänligen ange en giltig adress" });
        return;
      }
      // Check if the address is in a valid format (contains at least street name and city)
      if (!formData.currentAddress.includes(',')) {
        setErrors({ ...errors, currentAddress: "Vänligen välj en adress från listan" });
        return;
      }
    }
    if (step === 3) {
      const newErrors: FormErrors = {};
      let isValid = true;

      // Validate floor selection
      if (!formData.floor || !formData.floor.trim()) {
        newErrors.floor = "Vänligen välj våning";
        isValid = false;
      }

      // Validate parking distance
      if (!formData.parkingDistance || !formData.parkingDistance.trim()) {
        newErrors.parkingDistance = "Vänligen ange avstånd till parkering";
        isValid = false;
      } else if (isNaN(Number(formData.parkingDistance)) || Number(formData.parkingDistance) <= 0) {
        newErrors.parkingDistance = "Avståndet måste vara ett positivt tal i meter";
        isValid = false;
      }

      setErrors(newErrors);
      if (!isValid) return;
    }
    if (step === 4) {
      const newErrors: FormErrors = {};
      let isValid = true;

      // Validate new address
      if (!formData.newAddress || !formData.newAddress.trim()) {
        newErrors.newAddress = "Vänligen ange en giltig adress";
        isValid = false;
      } else if (!formData.newAddress.includes(',')) {
        newErrors.newAddress = "Vänligen välj en adress från listan";
        isValid = false;
      }

      // Validate apartment number
      if (!formData.toApartmentNumber || !formData.toApartmentNumber.trim()) {
        newErrors.toApartmentNumber = "Vänligen ange gatunummer";
        isValid = false;
      }

      // Validate postal code
      if (!formData.toPostalCode || !formData.toPostalCode.trim()) {
        newErrors.toPostalCode = "Vänligen ange postnummer";
        isValid = false;
      } else if (!/^\d{5}$/.test(formData.toPostalCode)) {
        newErrors.toPostalCode = "Postnummer måste vara exakt 5 siffror";
        isValid = false;
      }

      // Validate apartment size
      if (!formData.toApartmentSize || !formData.toApartmentSize.trim()) {
        newErrors.toApartmentSize = "Vänligen ange bostadens storlek";
        isValid = false;
      } else if (isNaN(Number(formData.toApartmentSize)) || Number(formData.toApartmentSize) <= 0) {
        newErrors.toApartmentSize = "Bostadens storlek måste vara ett positivt tal";
        isValid = false;
      }

      // Validate number of rooms
      if (!formData.toNumberOfRooms || !formData.toNumberOfRooms.trim()) {
        newErrors.toNumberOfRooms = "Vänligen ange antal rum";
        isValid = false;
      }

      // Validate property type
      if (!formData.toTypeOfHome || !formData.toTypeOfHome.trim()) {
        newErrors.toTypeOfHome = "Vänligen välj typ av bostad";
        isValid = false;
      }

      setErrors(newErrors);
      if (!isValid) return;
    }
    if (step === 5) {
      const newErrors: FormErrors = {};
      let isValid = true;

      if (!formData.toFloor) {
        newErrors.toFloor = "Vänligen ange antal våningar";
        isValid = false;
      }

      if (!formData.toHasElevator) {
        newErrors.toHasElevator = "Vänligen ange om det finns hiss";
        isValid = false;
      }

      if (!formData.toParkingDistance) {
        newErrors.toParkingDistance = "Vänligen ange avstånd till lossningsplats";
        isValid = false;
      }

      setErrors(newErrors);
      if (!isValid) return;
    }
    if (step === 6) {
      const newErrors: FormErrors = {};
      let isValid = true;

      if (formData.hasHeavyItems === "yes" && (!formData.heavyItems || formData.heavyItems.length === 0)) {
        newErrors.heavyItems = "Vänligen ange vilka tunga föremål som ska flyttas";
        isValid = false;
      }

      if (formData.hasDelicateItems === "yes" && !formData.delicateItemsDescription.trim()) {
        newErrors.delicateItemsDescription = "Vänligen beskriv de känsliga föremålen";
        isValid = false;
      }

      setErrors(newErrors);
      if (!isValid) return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateStep6 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (formData.hasHeavyItems === "yes" && (!formData.heavyItems || formData.heavyItems.length === 0)) {
      newErrors.heavyItems = "Vänligen ange vilka tunga föremål som ska flyttas";
      isValid = false;
    }

    if (formData.hasDelicateItems === "yes" && !formData.delicateItemsDescription.trim()) {
      newErrors.delicateItemsDescription = "Vänligen beskriv de känsliga föremålen";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep5 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.toFloor) {
      newErrors.toFloor = "Vänligen ange antal våningar";
      isValid = false;
    }

    if (!formData.toHasElevator) {
      newErrors.toHasElevator = "Vänligen ange om det finns hiss";
      isValid = false;
    }

    if (!formData.toParkingDistance) {
      newErrors.toParkingDistance = "Vänligen ange avstånd till lossningsplats";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 5) {
      if (!validateStep5()) {
        return;
      }
    } else if (step === 6) {
      if (!validateStep6()) {
        return;
      }
    }

    // If all validations pass, proceed with form submission
    console.log(formData);
    alert("Tack för din förfrågan! Vi återkommer inom kort.");
  };

  const addHeavyItem = (item: { type: string; description?: string }) => {
    setFormData(prev => ({
      ...prev,
      heavyItems: [...prev.heavyItems, item]
    }));
  };

  const removeHeavyItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      heavyItems: prev.heavyItems.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSNfM36ny9L-S04VbU0xzhkGdaPAm_gU&libraries=places`}
        strategy="lazyOnload"
        async
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header - Same as other pages */}
        <header className="sticky top-0 z-50">
          {/* Contact Bar */}
          <div className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-8">
                <div className="flex items-center divide-x divide-white/20">
                  <div className="flex items-center pr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white/80 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-white/90">Mån-Fre: 08:00-18:00</span>
                  </div>
                  <div className="flex items-center px-6">
                    <span className="text-sm text-white/90">Lör-Sön: Stängt</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <a href="tel:08-630-07-25" className="flex items-center group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80 group-hover:text-white transition-colors mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">08-630 07 25</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center">
                  <Link href="/">
                    <div className="relative h-14 w-48">
                      <Image
                        src="/flyttella-logo.png"
                        alt="Flyttella Logo"
                        fill
                        className="object-contain"
                        priority={false}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <nav className="flex items-center space-x-8">
                    <Link href="/" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Hem</Link>
                    <Link href="/bohagsflytt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Bohagsflytt</Link>
                    <Link href="/flyttstadning" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Flyttstädning</Link>
                    <Link href="/om-oss" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Om oss</Link>
                    <Link href="/kontakt" className="text-[#0F172A] hover:text-[#10B981] transition-colors text-sm font-medium tracking-wide">Kontakt</Link>
                  </nav>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-[#0F172A] hover:text-[#10B981] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Steg {step} av 6</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round((step / 6) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#0F172A] to-[#10B981] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 6) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Namn</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Önskat flyttdatum</label>
                      <input
                        type="date"
                        name="movingDate"
                        value={formData.movingDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flexibelt flyttdatum</label>
                      <select
                        name="flexibleMovingDate"
                        value={formData.flexibleMovingDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      >
                        <option value="">-- Välj --</option>
                        <option value="no">Önskar ej flexibelt flyttdatum</option>
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
                      <p className="mt-2 text-sm text-gray-600">
                        Om du väljer ett flexibelt flyttdatum sker flytten inom vald tidsperiod från det datum du har valt.
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Vill du att flyttfirman packar dina ägodelar?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsPacking"
                              value="yes"
                              checked={formData.needsPacking === true}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsPacking: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsPacking"
                              value="no"
                              checked={formData.needsPacking === false}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsPacking: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ska dina ägodelar förvaras i lager mellan ut- och inflyttning?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsStorage"
                              value="yes"
                              checked={formData.needsStorage === true}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsStorage: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsStorage"
                              value="no"
                              checked={formData.needsStorage === false}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsStorage: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Vill du ha flyttstädning i din nuvarande bostad?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsCleaning"
                              value="yes"
                              checked={formData.needsCleaning === true}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsCleaning: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsCleaning"
                              value="no"
                              checked={formData.needsCleaning === false}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                needsCleaning: e.target.value === "yes"
                              }))}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Nästa
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Nuvarande adress</h2>
                    <p className="text-sm text-gray-700 mb-6">Information om din nuvarande bostad</p>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nuvarande adress</label>
                          <input
                            type="text"
                            id="currentAddress"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={(e) => {
                              setFormData({ ...formData, currentAddress: e.target.value });
                              setErrors({ ...errors, currentAddress: "" });
                            }}
                            placeholder="Börja skriva din adress"
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.currentAddress ? "border-red-500" : ""
                            }`}
                          />
                          {errors.currentAddress && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentAddress}</p>
                          )}
                        </div>
                        <div className="md:w-1/4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gatunr.</label>
                          <input
                            type="text"
                            name="apartmentNumber"
                            value={formData.apartmentNumber}
                            onChange={handleInputChange}
                            placeholder="1A"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                          />
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
                            setErrors({ ...errors, toPostalCode: "" });
                          }}
                          placeholder="12345"
                          required
                          maxLength={5}
                          pattern="\d{5}"
                          className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toPostalCode ? "border-red-500" : ""
                          }`}
                        />
                        {errors.toPostalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.toPostalCode}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bostadens storlek (kvm)</label>
                        <input
                          type="number"
                          name="apartmentSize"
                          value={formData.apartmentSize}
                          onChange={handleInputChange}
                          placeholder="120"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal rum</label>
                        <select
                          name="numberOfRooms"
                          value={formData.numberOfRooms}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        >
                          <option value="">-- Välj --</option>
                          <option value="1">1 rum</option>
                          <option value="2">2 rum</option>
                          <option value="3">3 rum</option>
                          <option value="4">4 rum</option>
                          <option value="5">5 rum</option>
                          <option value="6">6 rum</option>
                          <option value="7">7 rum</option>
                          <option value="8">8 rum</option>
                          <option value="9">9 rum</option>
                          <option value="10+">10 eller fler rum</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Typ av bostad</label>
                        <select
                          name="typeOfHome"
                          value={formData.typeOfHome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        >
                          <option value="">-- Välj --</option>
                          <option value="villa">Villa</option>
                          <option value="lagenhet">Lägenhet</option>
                          <option value="parhus">Parhus</option>
                          <option value="radhus">Radhus</option>
                          <option value="fritidshus">Fritidshus</option>
                          <option value="magasin">Magasin</option>
                          <option value="annat">Annat</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && formData.typeOfHome === "lagenhet" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Nuvarande adress</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">På vilken våning ligger lägenheten?</label>
                        <select
                          name="floor"
                          value={formData.floor}
                          onChange={(e) => {
                            setFormData({ ...formData, floor: e.target.value });
                            setErrors({ ...errors, floor: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.floor ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">-- Välj --</option>
                          <option value="-2">Våning -2</option>
                          <option value="-1">Våning -1</option>
                          <option value="entreplan">Entréplan</option>
                          <option value="1">Våning 1</option>
                          <option value="2">Våning 2</option>
                          <option value="3">Våning 3</option>
                          <option value="4">Våning 4</option>
                          <option value="5">Våning 5</option>
                          <option value="6+">Våning 6 eller högre</option>
                        </select>
                        {errors.floor && (
                          <p className="mt-1 text-sm text-red-600">{errors.floor}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Finns hiss i byggnaden?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasElevator"
                              value="yes"
                              checked={formData.hasElevator === "yes"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasElevator"
                              value="no"
                              checked={formData.hasElevator === "no"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lastningsplats (meter)</label>
                        <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                        <input
                          type="number"
                          name="parkingDistance"
                          value={formData.parkingDistance}
                          onChange={(e) => {
                            // Only allow positive numbers
                            const value = e.target.value;
                            if (value === '' || (Number(value) >= 0)) {
                              setFormData({ ...formData, parkingDistance: value });
                              setErrors({ ...errors, parkingDistance: "" });
                            }
                          }}
                          placeholder="20"
                          required
                          min="0"
                          step="1"
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.parkingDistance ? "border-red-500" : ""
                          }`}
                        />
                        {errors.parkingDistance && (
                          <p className="mt-1 text-sm text-red-600">{errors.parkingDistance}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && formData.typeOfHome !== "lagenhet" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Nuvarande adress</h2>
                    {(formData.typeOfHome === "villa" || formData.typeOfHome === "parhus" || formData.typeOfHome === "radhus" || formData.typeOfHome === "fritidshus" || formData.typeOfHome === "magasin") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal våningar</label>
                        <select
                          name="floor"
                          value={formData.floor}
                          onChange={(e) => {
                            setFormData({ ...formData, floor: e.target.value });
                            setErrors({ ...errors, floor: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.floor ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">-- Välj --</option>
                          <option value="1">1 våning</option>
                          <option value="2">2 våningar</option>
                          <option value="3">3 våningar</option>
                          <option value="4">4 våningar</option>
                        </select>
                        {errors.floor && (
                          <p className="mt-1 text-sm text-red-600">{errors.floor}</p>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lastningsplats (meter)</label>
                      <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                      <input
                        type="number"
                        name="parkingDistance"
                        value={formData.parkingDistance}
                        onChange={(e) => {
                          // Only allow positive numbers
                          const value = e.target.value;
                          if (value === '' || (Number(value) >= 0)) {
                            setFormData({ ...formData, parkingDistance: value });
                            setErrors({ ...errors, parkingDistance: "" });
                          }
                        }}
                        placeholder="20"
                        required
                        min="0"
                        step="1"
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                          errors.parkingDistance ? "border-red-500" : ""
                        }`}
                      />
                      {errors.parkingDistance && (
                        <p className="mt-1 text-sm text-red-600">{errors.parkingDistance}</p>
                      )}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress</h2>
                    <p className="text-sm text-gray-700 mb-6">Information om din nya bostad</p>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ny adress</label>
                          <input
                            type="text"
                            id="newAddress"
                            name="newAddress"
                            value={formData.newAddress}
                            onChange={(e) => {
                              setFormData({ ...formData, newAddress: e.target.value });
                              setErrors({ ...errors, newAddress: "" });
                            }}
                            placeholder="Börja skriva din adress"
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.newAddress ? "border-red-500" : ""
                            }`}
                          />
                          {errors.newAddress && (
                            <p className="mt-1 text-sm text-red-600">{errors.newAddress}</p>
                          )}
                        </div>
                        <div className="md:w-1/4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gatunr.</label>
                          <input
                            type="text"
                            name="toApartmentNumber"
                            value={formData.toApartmentNumber}
                            onChange={(e) => {
                              setFormData({ ...formData, toApartmentNumber: e.target.value });
                              setErrors({ ...errors, toApartmentNumber: "" });
                            }}
                            placeholder="1A"
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.toApartmentNumber ? "border-red-500" : ""
                            }`}
                          />
                          {errors.toApartmentNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.toApartmentNumber}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postnummer</label>
                        <input
                          type="text"
                          name="toPostalCode"
                          value={formData.toPostalCode}
                          onChange={(e) => {
                            // Only allow numbers and limit to 5 digits
                            const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                            setFormData({ ...formData, toPostalCode: value });
                            setErrors({ ...errors, toPostalCode: "" });
                          }}
                          placeholder="12345"
                          required
                          maxLength={5}
                          pattern="\d{5}"
                          className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toPostalCode ? "border-red-500" : ""
                          }`}
                        />
                        {errors.toPostalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.toPostalCode}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bostadens storlek (kvm)</label>
                        <input
                          type="number"
                          name="toApartmentSize"
                          value={formData.toApartmentSize}
                          onChange={(e) => {
                            // Only allow positive numbers
                            const value = e.target.value;
                            if (value === '' || (Number(value) >= 0)) {
                              setFormData({ ...formData, toApartmentSize: value });
                              setErrors({ ...errors, toApartmentSize: "" });
                            }
                          }}
                          placeholder="120"
                          required
                          min="0"
                          step="1"
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toApartmentSize ? "border-red-500" : ""
                          }`}
                        />
                        {errors.toApartmentSize && (
                          <p className="mt-1 text-sm text-red-600">{errors.toApartmentSize}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal rum</label>
                        <select
                          name="toNumberOfRooms"
                          value={formData.toNumberOfRooms}
                          onChange={(e) => {
                            setFormData({ ...formData, toNumberOfRooms: e.target.value });
                            setErrors({ ...errors, toNumberOfRooms: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toNumberOfRooms ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">-- Välj --</option>
                          <option value="1">1 rum</option>
                          <option value="2">2 rum</option>
                          <option value="3">3 rum</option>
                          <option value="4">4 rum</option>
                          <option value="5">5 rum</option>
                          <option value="6">6 rum</option>
                          <option value="7">7 rum</option>
                          <option value="8">8 rum</option>
                          <option value="9">9 rum</option>
                          <option value="10+">10 eller fler rum</option>
                        </select>
                        {errors.toNumberOfRooms && (
                          <p className="mt-1 text-sm text-red-600">{errors.toNumberOfRooms}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Typ av bostad</label>
                        <select
                          name="toTypeOfHome"
                          value={formData.toTypeOfHome}
                          onChange={(e) => {
                            setFormData({ ...formData, toTypeOfHome: e.target.value });
                            setErrors({ ...errors, toTypeOfHome: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toTypeOfHome ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">-- Välj --</option>
                          <option value="villa">Villa</option>
                          <option value="lagenhet">Lägenhet</option>
                          <option value="parhus">Parhus</option>
                          <option value="radhus">Radhus</option>
                          <option value="fritidshus">Fritidshus</option>
                          <option value="magasin">Magasin</option>
                          <option value="annat">Annat</option>
                        </select>
                        {errors.toTypeOfHome && (
                          <p className="mt-1 text-sm text-red-600">{errors.toTypeOfHome}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && formData.toTypeOfHome === "lagenhet" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">På vilken våning ligger lägenheten?</label>
                        <select
                          name="toFloor"
                          value={formData.toFloor}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        >
                          <option value="">-- Välj --</option>
                          <option value="-2">Våning -2</option>
                          <option value="-1">Våning -1</option>
                          <option value="entreplan">Entréplan</option>
                          <option value="1">Våning 1</option>
                          <option value="2">Våning 2</option>
                          <option value="3">Våning 3</option>
                          <option value="4">Våning 4</option>
                          <option value="5">Våning 5</option>
                          <option value="6+">Våning 6 eller högre</option>
                        </select>
                        {errors.toFloor && (
                          <p className="text-sm text-red-600 mt-1">{errors.toFloor}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Finns hiss i byggnaden?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="toHasElevator"
                              value="yes"
                              checked={formData.toHasElevator === "yes"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="toHasElevator"
                              value="no"
                              checked={formData.toHasElevator === "no"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.toHasElevator && (
                          <p className="text-sm text-red-600 mt-1">{errors.toHasElevator}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lossningsplats (meter)</label>
                        <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                        <input
                          type="number"
                          name="toParkingDistance"
                          value={formData.toParkingDistance}
                          onChange={handleInputChange}
                          placeholder="20"
                          min="0"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        />
                        {errors.toParkingDistance && (
                          <p className="text-sm text-red-600 mt-1">{errors.toParkingDistance}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep5()) {
                            nextStep();
                          }
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 5 && formData.toTypeOfHome !== "lagenhet" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress</h2>
                    {(formData.toTypeOfHome === "villa" || formData.toTypeOfHome === "parhus" || formData.toTypeOfHome === "radhus" || formData.toTypeOfHome === "fritidshus" || formData.toTypeOfHome === "magasin") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal våningar</label>
                        <select
                          name="toFloor"
                          value={formData.toFloor}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        >
                          <option value="">-- Välj --</option>
                          <option value="1">1 våning</option>
                          <option value="2">2 våningar</option>
                          <option value="3">3 våningar</option>
                          <option value="4">4 våningar</option>
                        </select>
                        {errors.toFloor && (
                          <p className="text-sm text-red-600 mt-1">{errors.toFloor}</p>
                        )}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lossningsplats (meter)</label>
                      <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                      <input
                        type="number"
                        name="toParkingDistance"
                        value={formData.toParkingDistance}
                        onChange={handleInputChange}
                        placeholder="20"
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                      />
                      {errors.toParkingDistance && (
                        <p className="text-sm text-red-600 mt-1">{errors.toParkingDistance}</p>
                      )}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep5()) {
                            nextStep();
                          }
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Få erbjudanden om flytthjälp från flera flyttfirmor.</h2>
                    <p className="text-sm text-gray-700 mb-6">Tjänsten är gratis och du är inte bunden till någonting.</p>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Har du enskilda föremål som väger över 100 kg?
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                          <span className="font-bold">OBS! Markera endast "Ja" om du har enskilda föremål som väger mer än 100 kg</span> (t.ex. ett piano eller kassaskåp). Vanliga möbler som soffor, sängar eller garderober väger normalt under 100 kg.
                        </p>
                        <div className="flex gap-6 mb-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasHeavyItems"
                              value="yes"
                              checked={formData.hasHeavyItems === "yes"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasHeavyItems"
                              value="no"
                              checked={formData.hasHeavyItems === "no"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.hasHeavyItems && (
                          <p className="text-sm text-red-600 mt-1">{errors.hasHeavyItems}</p>
                        )}
                        {formData.hasHeavyItems === "yes" && (
                          <div className="space-y-4">
                            <div className="mb-6">
                              {formData.heavyItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2 p-3 bg-gray-50 rounded-lg">
                                  <span className="flex-1">{item.type}{item.description ? `: ${item.description}` : ''}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeHeavyItem(index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              ))}
                            </div>
                            {errors.heavyItems && (
                              <p className="text-sm text-red-600 mt-1">{errors.heavyItems}</p>
                            )}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Lägg till tungt föremål</label>
                              <div className="space-y-4">
                                <select
                                  name="heavyItemType"
                                  id="heavyItemType"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                                  onChange={(e) => {
                                    if (e.target.value === "other") {
                                      setShowCustomItemModal(true);
                                      e.target.value = ""; // Reset select after opening modal
                                    } else if (e.target.value) {
                                      addHeavyItem({ type: e.target.value });
                                      e.target.value = ""; // Reset select after adding
                                    }
                                  }}
                                >
                                  <option value="">-- Välj --</option>
                                  <option value="Piano">Piano</option>
                                  <option value="Flygel">Flygel</option>
                                  <option value="Kassaskåp">Kassaskåp</option>
                                  <option value="Akvarium (över 400L)">Akvarium (över 400L)</option>
                                  <option value="Stenbänkskiva">Stenbänkskiva</option>
                                  <option value="Annan tung maskin (över 100kg)">Annan tung maskin (över 100kg)</option>
                                  <option value="other">Annat (specificera)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Ska några särskilt ömtåliga föremål flyttas?
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                          Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som antikviteter, i förväg för att planera flytten.
                        </p>
                        <div className="flex gap-6 mb-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasDelicateItems"
                              value="yes"
                              checked={formData.hasDelicateItems === "yes"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasDelicateItems"
                              value="no"
                              checked={formData.hasDelicateItems === "no"}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.hasDelicateItems && (
                          <p className="text-sm text-red-600 mt-1">{errors.hasDelicateItems}</p>
                        )}
                        {formData.hasDelicateItems === "yes" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vilka särskilt ömtåliga föremål ska flyttas?</label>
                            <textarea
                              name="delicateItemsDescription"
                              value={formData.delicateItemsDescription}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                            ></textarea>
                            {errors.delicateItemsDescription && (
                              <p className="text-sm text-red-600 mt-1">{errors.delicateItemsDescription}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Tillbaka
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Skicka förfrågan
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Custom Heavy Item Modal */}
        {showCustomItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lägg till tungt föremål</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Föremål
                  </label>
                  <input
                    type="text"
                    value={customItem.type}
                    onChange={(e) => {
                      setCustomItem(prev => ({ ...prev, type: e.target.value }));
                      setCustomItemError("");
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    placeholder="T.ex. Marmorbord"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uppskattad vikt (kg)
                  </label>
                  <input
                    type="number"
                    value={customItem.weight}
                    onChange={(e) => {
                      setCustomItem(prev => ({ ...prev, weight: e.target.value }));
                      setCustomItemError("");
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                    placeholder="T.ex. 150"
                    min="100"
                  />
                </div>
                {customItemError && (
                  <p className="text-sm text-red-600">{customItemError}</p>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomItemModal(false);
                    setCustomItem({ type: "", weight: "" });
                    setCustomItemError("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!customItem.type || !customItem.weight) {
                      setCustomItemError("Vänligen fyll i både föremål och vikt");
                      return;
                    }
                    
                    const weight = Number(customItem.weight);
                    if (weight < 100) {
                      setCustomItemError("Vikten är under 100kg och räknas därmed inte som ett tungt föremål");
                      return;
                    }

                    addHeavyItem({
                      type: customItem.type,
                      description: `${customItem.weight} kg`
                    });
                    setShowCustomItemModal(false);
                    setCustomItem({ type: "", weight: "" });
                    setCustomItemError("");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Lägg till
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 
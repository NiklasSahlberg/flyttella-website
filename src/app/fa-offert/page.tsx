"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: any;
        };
      };
    };
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
  wantsFlexibleDate: boolean;
  elevatorSize?: string;
  toElevatorSize?: string;
}

interface FormErrors {
  currentAddress?: string;
  apartmentNumber?: string;
  postalCode?: string;
  apartmentSize?: string;
  numberOfRooms?: string;
  typeOfHome?: string;
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
  hasElevator?: string;
  name?: string;
  email?: string;
  phone?: string;
  movingDate?: string;
  flexibleMovingDate?: string;
  needsPacking?: string;
  needsStorage?: string;
  needsCleaning?: string;
  elevatorSize?: string;
  toElevatorSize?: string;
}

interface AddressComponent {
  types: string[];
  long_name: string;
  short_name: string;
}

export default function FaOffert() {
  const [step, setStep] = useState(1);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItem, setCustomItem] = useState({ type: "", weight: "" });
  const [customItemError, setCustomItemError] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidCurrentAddress, setLastValidCurrentAddress] = useState("");
  const [lastValidNewAddress, setLastValidNewAddress] = useState("");
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
    additionalInfo: "",
    wantsFlexibleDate: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const currentAddressRef = useRef<HTMLInputElement>(null);

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
          fields: ['place_id', 'name', 'types', 'formatted_address', 'address_components'],
          types: ['address']
        });

        autocomplete1.addListener('place_changed', () => {
          const place = autocomplete1.getPlace();
          if (place.formatted_address) {
            // Extract street name, number, and city from address components
            let streetName = '';
            let streetNumber = '';
            let city = '';
            
            place.address_components.forEach((component: AddressComponent) => {
              if (component.types.includes('route')) {
                streetName = component.long_name;
              }
              if (component.types.includes('street_number')) {
                streetNumber = component.long_name;
              }
              if (component.types.includes('locality') || component.types.includes('postal_town')) {
                city = component.long_name;
              }
            });

            // Format address as "Street, City, Sweden"
            const formattedAddress = `${streetName}, ${city}, Sweden`;
            setFormData(prev => ({
              ...prev,
              currentAddress: formattedAddress
            }));
            setLastValidCurrentAddress(formattedAddress);
          }
        });

        // Add blur event listener to restore last valid address
        currentAddressInput.addEventListener('blur', () => {
          if (lastValidCurrentAddress && formData.currentAddress !== lastValidCurrentAddress) {
            setFormData(prev => ({
              ...prev,
              currentAddress: lastValidCurrentAddress
            }));
          }
        });
      }

      if (newAddressInput) {
        const autocomplete2 = new window.google.maps.places.Autocomplete(newAddressInput, {
          componentRestrictions: { country: 'se' },
          fields: ['place_id', 'name', 'types', 'formatted_address', 'address_components'],
          types: ['address']
        });

        autocomplete2.addListener('place_changed', () => {
          const place = autocomplete2.getPlace();
          if (place.formatted_address) {
            // Extract street name, number, and city from address components
            let streetName = '';
            let streetNumber = '';
            let city = '';
            
            place.address_components.forEach((component: AddressComponent) => {
              if (component.types.includes('route')) {
                streetName = component.long_name;
              }
              if (component.types.includes('street_number')) {
                streetNumber = component.long_name;
              }
              if (component.types.includes('locality') || component.types.includes('postal_town')) {
                city = component.long_name;
              }
            });

            // Format address as "Street, City, Sweden"
            const formattedAddress = `${streetName}, ${city}, Sweden`;
            setFormData(prev => ({
              ...prev,
              newAddress: formattedAddress
            }));
            setLastValidNewAddress(formattedAddress);
          }
        });

        // Add blur event listener to restore last valid address
        newAddressInput.addEventListener('blur', () => {
          if (lastValidNewAddress && formData.newAddress !== lastValidNewAddress) {
            setFormData(prev => ({
              ...prev,
              newAddress: lastValidNewAddress
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error initializing Google Places:', error);
    }
  }, [step, isGoogleMapsLoaded, formData.currentAddress, formData.newAddress, lastValidCurrentAddress, lastValidNewAddress]);

  useEffect(() => {
    if (currentAddressRef.current) {
      const input = currentAddressRef.current;
      input.scrollLeft = input.scrollWidth;
    }
  }, [formData.currentAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user types or makes a selection
    if (step === 7) {
      const newErrors = { ...errors };
      
      if (name === 'name') {
        if (value.trim()) {
          delete newErrors.name;
        }
      } else if (name === 'email') {
        if (value.trim()) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            delete newErrors.email;
          }
        }
      } else if (name === 'phone') {
        if (value.trim()) {
          if (/^[0-9\s-+()]*$/.test(value)) {
            delete newErrors.phone;
          }
        }
      }
      
      setErrors(newErrors);
    }
  };

  const nextStep = () => {
    let isValid = true;
    
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      case 6:
        isValid = validateStep6();
        break;
      case 7:
        isValid = validateStep7();
        break;
      default:
        break;
    }

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateStep6 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Only validate heavy items if user selected "yes"
    if (formData.hasHeavyItems === "yes" && (!formData.heavyItems || formData.heavyItems.length === 0)) {
      newErrors.heavyItems = "Vänligen ange vilka tunga föremål som ska flyttas";
      isValid = false;
    }

    // Only validate delicate items if user selected "yes"
    if (formData.hasDelicateItems === "yes" && !formData.delicateItemsDescription.trim()) {
      newErrors.delicateItemsDescription = "Vänligen beskriv de känsliga föremålen";
      isValid = false;
    }

    // Make sure user has selected yes/no for both questions
    if (!formData.hasHeavyItems) {
      newErrors.hasHeavyItems = "Vänligen välj ett alternativ";
      isValid = false;
    }

    if (!formData.hasDelicateItems) {
      newErrors.hasDelicateItems = "Vänligen välj ett alternativ";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate floor selection
    if (!formData.floor || !formData.floor.trim()) {
      newErrors.floor = "Vänligen välj våning";
      isValid = false;
    }

    // Validate elevator selection for apartments
    if (formData.typeOfHome === "lagenhet" && !formData.hasElevator) {
      newErrors.hasElevator = "Vänligen ange om det finns hiss";
      isValid = false;
    }

    // Validate elevator size if elevator exists
    if (formData.hasElevator === "yes" && !formData.elevatorSize) {
      newErrors.elevatorSize = "Vänligen välj hisstorlek";
      isValid = false;
    }

    // Validate parking distance
    if (!formData.parkingDistance || !formData.parkingDistance.trim()) {
      newErrors.parkingDistance = "Vänligen ange avstånd till parkering";
      isValid = false;
    } else if (isNaN(Number(formData.parkingDistance)) || Number(formData.parkingDistance) < 0) {
      newErrors.parkingDistance = "Avståndet måste vara ett positivt tal i meter";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep7 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate name
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Vänligen ange ditt namn";
      isValid = false;
    }

    // Validate email
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Vänligen ange din e-postadress";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vänligen ange en giltig e-postadress";
      isValid = false;
    }

    // Validate phone
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Vänligen ange ditt telefonnummer";
      isValid = false;
    } else if (!/^[0-9\s-+()]*$/.test(formData.phone)) {
      newErrors.phone = "Vänligen ange ett giltigt telefonnummer";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 7) {
      const isValid = validateStep7();
      
      if (isValid) {
        // Format the data to match the email template
        const emailData = {
          title: "Ny lead flyttella",
          behov: "move_out",
          datum: formData.movingDate,
          flyttaFran: {
            address: formData.currentAddress,
            gatunummer: formData.apartmentNumber,
            postnummer: formData.postalCode,
            bostadstyp: formData.typeOfHome,
            kvadrat: formData.apartmentSize,
            antalRum: formData.numberOfRooms,
            vaningNr: formData.floor,
            hasElevator: formData.hasElevator === "yes" ? "Ja" : "Nej",
            elevatorSize: formData.hasElevator === "yes" ? formData.elevatorSize : undefined,
            parkeringsAvstand: formData.parkingDistance
          },
          flyttaTill: {
            address: formData.newAddress,
            gatunummer: formData.toApartmentNumber,
            postnummer: formData.toPostalCode,
            bostadstyp: formData.toTypeOfHome,
            kvadrat: formData.toApartmentSize,
            antalRum: formData.toNumberOfRooms,
            vaningNr: formData.toFloor,
            hasElevator: formData.toHasElevator === "yes" ? "Ja" : "Nej",
            elevatorSize: formData.toHasElevator === "yes" ? formData.toElevatorSize : undefined,
            parkeringsAvstand: formData.toParkingDistance
          },
          flexibeltDatum: formData.wantsFlexibleDate ? formData.flexibleMovingDate : "Nej",
          villDuHaPackhjalp: formData.needsPacking ? "Ja" : "Nej",
          villDuHaLagring: formData.needsStorage ? "Ja" : "Nej",
          villDuHaStadning: formData.needsCleaning ? "Ja" : "Nej",
          tungaForemal: formData.hasHeavyItems === "yes" ? 
            formData.heavyItems.map(item => `${item.type}${item.description ? ` (${item.description})` : ''}`).join(", ") : 
            "Nej",
          omtaligaForemal: formData.hasDelicateItems === "yes" ? formData.delicateItemsDescription : "Nej",
          kontaktInfo: {
            namn: formData.name,
            email: formData.email,
            telefon: formData.phone
          },
          additionalInfo: formData.additionalInfo || "Inga övriga önskemål"
        };

        try {
          // Send the email data to your API endpoint
          const response = await fetch('/api/send-moving-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          });

          if (response.ok) {
            alert("Tack för din förfrågan! Vi återkommer inom kort.");
            // Reset form or redirect
            window.location.href = '/tack';
          } else {
            throw new Error('Failed to send request');
          }
        } catch (error) {
          console.error('Error sending form:', error);
          alert("Ett fel uppstod när förfrågan skulle skickas. Vänligen försök igen.");
        }
      } else {
        // If validation fails, scroll to the first error
        const firstErrorElement = document.querySelector('.border-red-500');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const addHeavyItem = (item: { type: string; description?: string }) => {
    setFormData(prev => ({
      ...prev,
      heavyItems: [...prev.heavyItems, item]
    }));
    
    // Clear any heavy items error when an item is added
    if (errors.heavyItems) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.heavyItems;
        return newErrors;
      });
    }
  };

  const removeHeavyItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      heavyItems: prev.heavyItems.filter((_, i) => i !== index)
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate moving date
    if (!formData.movingDate || !formData.movingDate.trim()) {
      newErrors.movingDate = "Vänligen välj önskat flyttdatum";
      isValid = false;
    } else {
      // Check if the date is at least tomorrow
      const selectedDate = new Date(formData.movingDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
      
      if (selectedDate < tomorrow) {
        newErrors.movingDate = "Flyttdatum måste vara minst imorgon";
        isValid = false;
      }
    }

    // Validate flexible moving date only if checkbox is checked
    if (formData.wantsFlexibleDate && (!formData.flexibleMovingDate || !formData.flexibleMovingDate.trim())) {
      newErrors.flexibleMovingDate = "Vänligen välj flexibilitet för flyttdatum";
      isValid = false;
    }

    // Validate packing service selection
    if (formData.needsPacking === undefined) {
      newErrors.needsPacking = "Vänligen välj om du vill ha packhjälp";
      isValid = false;
    }

    // Validate storage service selection
    if (formData.needsStorage === undefined) {
      newErrors.needsStorage = "Vänligen välj om du behöver lagerförvaring";
      isValid = false;
    }

    // Validate cleaning service selection
    if (formData.needsCleaning === undefined) {
      newErrors.needsCleaning = "Vänligen välj om du vill ha flyttstädning";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate current address
    if (!formData.currentAddress || !formData.currentAddress.trim()) {
      newErrors.currentAddress = "Vänligen ange en giltig adress";
      isValid = false;
    } else if (!formData.currentAddress.includes(',')) {
      newErrors.currentAddress = "Vänligen välj en adress från listan";
      isValid = false;
    }

    // Validate apartment number
    if (!formData.apartmentNumber || !formData.apartmentNumber.trim()) {
      newErrors.apartmentNumber = "Vänligen ange gatunummer";
      isValid = false;
    } else if (!/^[0-9]+[A-Za-z]?$/.test(formData.apartmentNumber)) {
      newErrors.apartmentNumber = "Gatunummer måste börja med siffror och kan avslutas med en bokstav";
      isValid = false;
    }

    // Validate postal code
    if (!formData.postalCode || !formData.postalCode.trim()) {
      newErrors.postalCode = "Vänligen ange postnummer";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postnummer måste vara exakt 5 siffror";
      isValid = false;
    }

    // Validate apartment size
    if (!formData.apartmentSize || !formData.apartmentSize.trim()) {
      newErrors.apartmentSize = "Vänligen ange bostadens storlek";
      isValid = false;
    } else if (isNaN(Number(formData.apartmentSize)) || Number(formData.apartmentSize) <= 0) {
      newErrors.apartmentSize = "Bostadens storlek måste vara ett positivt tal";
      isValid = false;
    }

    // Validate number of rooms
    if (!formData.numberOfRooms || !formData.numberOfRooms.trim()) {
      newErrors.numberOfRooms = "Vänligen ange antal rum";
      isValid = false;
    }

    // Validate property type
    if (!formData.typeOfHome || !formData.typeOfHome.trim()) {
      newErrors.typeOfHome = "Vänligen välj typ av bostad";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep4 = (): boolean => {
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
    return isValid;
  };

  const validateStep5 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (formData.toTypeOfHome === "lagenhet") {
      // For apartments
      if (!formData.toFloor) {
        newErrors.toFloor = "Vänligen välj våning";
        isValid = false;
      }

      if (!formData.toHasElevator) {
        newErrors.toHasElevator = "Vänligen ange om det finns hiss";
        isValid = false;
      }

      // Validate elevator size if elevator exists
      if (formData.toHasElevator === "yes" && !formData.toElevatorSize) {
        newErrors.toElevatorSize = "Vänligen välj hisstorlek";
        isValid = false;
      }
    } else if (formData.toTypeOfHome !== "annat") {
      // For houses and other types (except "annat")
      if (!formData.toFloor) {
        newErrors.toFloor = "Vänligen ange antal våningar";
        isValid = false;
      }
    }

    // For all types
    if (!formData.toParkingDistance || !formData.toParkingDistance.trim()) {
      newErrors.toParkingDistance = "Vänligen ange avstånd till lossningsplats";
      isValid = false;
    } else if (isNaN(Number(formData.toParkingDistance)) || Number(formData.toParkingDistance) < 0) {
      newErrors.toParkingDistance = "Avståndet måste vara ett positivt tal i meter";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSNfM36ny9L-S04VbU0xzhkGdaPAm_gU&libraries=places`}
        strategy="lazyOnload"
        async
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-300">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Steg {step} av 7</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round((step / 7) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#0F172A] to-[#10B981] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 7) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Form */}
              <form 
                onSubmit={handleSubmit} 
                noValidate 
                className="bg-white rounded-lg shadow-sm p-8"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Flyttinformation</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Önskat flyttdatum</label>
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
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-base sm:text-lg ${
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
                          Jag är flexibel med flyttdatum
                        </label>
                      </div>
                      {formData.wantsFlexibleDate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Flexibelt flyttdatum</label>
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
                            Om du väljer ett flexibelt flyttdatum sker flytten inom vald tidsperiod från det datum du har valt.
                          </p>
                        </div>
                      )}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsPacking: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsPacking;
                                  return newErrors;
                                });
                              }}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsPacking: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsPacking;
                                  return newErrors;
                                });
                              }}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsPacking && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsPacking}</p>
                        )}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsStorage: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsStorage;
                                  return newErrors;
                                });
                              }}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsStorage: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsStorage;
                                  return newErrors;
                                });
                              }}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsStorage && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsStorage}</p>
                        )}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsCleaning: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsCleaning;
                                  return newErrors;
                                });
                              }}
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
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  needsCleaning: e.target.value === "yes"
                                }));
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.needsCleaning;
                                  return newErrors;
                                });
                              }}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsCleaning && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsCleaning}</p>
                        )}
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
                            ref={currentAddressRef}
                            value={formData.currentAddress}
                            onChange={(e) => {
                              setFormData({ ...formData, currentAddress: e.target.value });
                              setErrors({ ...errors, currentAddress: "" });
                            }}
                            placeholder="Börja skriva din adress"
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent overflow-x-auto whitespace-nowrap pr-8 text-sm md:text-base ${
                              errors.currentAddress ? "border-red-500" : ""
                            }`}
                            style={{ WebkitOverflowScrolling: 'touch' }}
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
                            onChange={(e) => {
                              // Must start with number, followed by optional single letter
                              const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').replace(/^([0-9]+)?([A-Za-z]?).*/g, '$1$2');
                              if (/^[0-9]+[A-Za-z]?$/.test(value) || value === '') {
                                setFormData({ ...formData, apartmentNumber: value });
                                setErrors({ ...errors, apartmentNumber: "" });
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
                              if (!/^[0-9]+/.test(formData.apartmentNumber) && /^[A-Za-z]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="1A"
                            required
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                              errors.apartmentNumber ? "border-red-500" : ""
                            }`}
                          />
                          {errors.apartmentNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.apartmentNumber}</p>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bostadens storlek (kvm)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="apartmentSize"
                          value={formData.apartmentSize}
                          onChange={(e) => {
                            // Only allow whole numbers
                            const value = e.target.value.replace(/[^\d]/g, '');
                            setFormData({ ...formData, apartmentSize: value });
                            setErrors({ ...errors, apartmentSize: "" });
                          }}
                          onKeyDown={(e) => {
                            // Prevent all non-numeric input except backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) && // not a number
                              e.key !== 'Backspace' &&
                              e.key !== 'Delete' &&
                              e.key !== 'ArrowLeft' &&
                              e.key !== 'ArrowRight' &&
                              e.key !== 'Tab'
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="120"
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.apartmentSize ? "border-red-500" : ""
                          }`}
                        />
                        {errors.apartmentSize && (
                          <p className="mt-1 text-sm text-red-600">{errors.apartmentSize}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal rum</label>
                        <select
                          name="numberOfRooms"
                          value={formData.numberOfRooms}
                          onChange={(e) => {
                            handleInputChange(e);
                            setErrors({ ...errors, numberOfRooms: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.numberOfRooms ? "border-red-500" : ""
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
                        {errors.numberOfRooms && (
                          <p className="mt-1 text-sm text-red-600">{errors.numberOfRooms}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Typ av bostad</label>
                        <select
                          name="typeOfHome"
                          value={formData.typeOfHome}
                          onChange={(e) => {
                            handleInputChange(e);
                            setErrors({ ...errors, typeOfHome: "" });
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.typeOfHome ? "border-red-500" : ""
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
                        {errors.typeOfHome && (
                          <p className="mt-1 text-sm text-red-600">{errors.typeOfHome}</p>
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
                            handleInputChange(e);
                            setErrors(prev => ({ ...prev, floor: "" }));
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
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors(prev => ({ ...prev, hasElevator: "" }));
                              }}
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
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors(prev => ({ ...prev, hasElevator: "" }));
                                // Clear elevator size when selecting no
                                setFormData(prev => ({
                                  ...prev,
                                  elevatorSize: ""
                                }));
                                setErrors(prev => ({ ...prev, hasElevator: "", elevatorSize: "" }));
                              }}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.hasElevator && (
                          <p className="mt-1 text-sm text-red-600">{errors.hasElevator}</p>
                        )}
                        {formData.hasElevator === "yes" && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Hur stor är hissen?
                            </label>
                            <select
                              name="elevatorSize"
                              value={formData.elevatorSize}
                              onChange={handleInputChange}
                              required
                              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                                errors.elevatorSize ? "border-red-500" : ""
                              }`}
                            >
                              <option value="">-- Välj --</option>
                              <option value="Liten hiss (2 personer)">Liten hiss (2 personer)</option>
                              <option value="Mellanstor hiss (4 personer)">Mellanstor hiss (4 personer)</option>
                              <option value="Stor hiss (6+ personer)">Stor hiss (6+ personer)</option>
                            </select>
                            {errors.elevatorSize && (
                              <p className="mt-1 text-sm text-red-600">{errors.elevatorSize}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lastningsplats (meter)</label>
                        <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="parkingDistance"
                          value={formData.parkingDistance}
                          onChange={(e) => {
                            // Only allow whole numbers
                            const value = e.target.value.replace(/[^\d]/g, '');
                            if (value === '' || Number(value) >= 0) {
                              setFormData(prev => ({ ...prev, parkingDistance: value }));
                              setErrors(prev => ({ ...prev, parkingDistance: "" }));
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent all non-numeric input except backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) && // not a number
                              e.key !== 'Backspace' &&
                              e.key !== 'Delete' &&
                              e.key !== 'ArrowLeft' &&
                              e.key !== 'ArrowRight' &&
                              e.key !== 'Tab'
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="20"
                          required
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
                            handleInputChange(e);
                            setErrors(prev => ({ ...prev, floor: "" }));
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
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="parkingDistance"
                        value={formData.parkingDistance}
                        onChange={(e) => {
                          // Only allow whole numbers
                          const value = e.target.value.replace(/[^\d]/g, '');
                          if (value === '' || Number(value) >= 0) {
                            setFormData(prev => ({ ...prev, parkingDistance: value }));
                            setErrors(prev => ({ ...prev, parkingDistance: "" }));
                          }
                        }}
                        onKeyDown={(e) => {
                          // Prevent all non-numeric input except backspace, delete, and arrow keys
                          if (
                            !/^\d$/.test(e.key) && // not a number
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="20"
                        required
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
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent overflow-x-auto whitespace-nowrap pr-8 text-sm md:text-base ${
                              errors.newAddress ? "border-red-500" : ""
                            }`}
                            style={{ WebkitOverflowScrolling: 'touch' }}
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
                              // Must start with number, followed by optional single letter
                              const value = e.target.value.replace(/[^0-9A-Za-z]/g, '').replace(/^([0-9]+)?([A-Za-z]?).*/g, '$1$2');
                              if (/^[0-9]+[A-Za-z]?$/.test(value) || value === '') {
                                setFormData({ ...formData, toApartmentNumber: value });
                                setErrors({ ...errors, toApartmentNumber: "" });
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
                              if (!/^[0-9]+/.test(formData.toApartmentNumber) && /^[A-Za-z]$/.test(e.key)) {
                                e.preventDefault();
                              }
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
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="toApartmentSize"
                          value={formData.toApartmentSize}
                          onChange={(e) => {
                            // Only allow whole numbers
                            const value = e.target.value.replace(/[^\d]/g, '');
                            if (value === '' || Number(value) >= 0) {
                              setFormData({ ...formData, toApartmentSize: value });
                              setErrors({ ...errors, toApartmentSize: "" });
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent all non-numeric input except backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) && // not a number
                              e.key !== 'Backspace' &&
                              e.key !== 'Delete' &&
                              e.key !== 'ArrowLeft' &&
                              e.key !== 'ArrowRight' &&
                              e.key !== 'Tab'
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="120"
                          required
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
                          onChange={(e) => {
                            handleInputChange(e);
                            setErrors(prev => ({ ...prev, toFloor: "" }));
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toFloor ? "border-red-500" : ""
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
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors(prev => ({ ...prev, toHasElevator: "" }));
                              }}
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
                              onChange={(e) => {
                                handleInputChange(e);
                                // Clear elevator size when selecting no
                                setFormData(prev => ({
                                  ...prev,
                                  toElevatorSize: ""
                                }));
                                setErrors(prev => ({ ...prev, toHasElevator: "", toElevatorSize: "" }));
                              }}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.toHasElevator && (
                          <p className="text-sm text-red-600 mt-1">{errors.toHasElevator}</p>
                        )}
                        {formData.toHasElevator === "yes" && (
                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Hur stor är hissen?
                            </label>
                            <select
                              name="toElevatorSize"
                              value={formData.toElevatorSize}
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors(prev => ({ ...prev, toElevatorSize: "" }));
                              }}
                              required
                              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                                errors.toElevatorSize ? "border-red-500" : ""
                              }`}
                            >
                              <option value="">-- Välj --</option>
                              <option value="Liten hiss (2 personer)">Liten hiss (2 personer)</option>
                              <option value="Mellanstor hiss (4 personer)">Mellanstor hiss (4 personer)</option>
                              <option value="Stor hiss (6+ personer)">Stor hiss (6+ personer)</option>
                            </select>
                            {errors.toElevatorSize && (
                              <p className="mt-1 text-sm text-red-600">{errors.toElevatorSize}</p>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Avstånd till lossningsplats (meter)</label>
                        <p className="text-sm text-gray-600 mb-2">Den närmaste punkt en flyttbil kan stå under lastning och lossning</p>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          name="toParkingDistance"
                          value={formData.toParkingDistance}
                          onChange={(e) => {
                            // Only allow whole numbers
                            const value = e.target.value.replace(/[^\d]/g, '');
                            if (value === '' || Number(value) >= 0) {
                              setFormData(prev => ({ ...prev, toParkingDistance: value }));
                              setErrors(prev => ({ ...prev, toParkingDistance: "" }));
                            }
                          }}
                          onKeyDown={(e) => {
                            // Prevent all non-numeric input except backspace, delete, and arrow keys
                            if (
                              !/^\d$/.test(e.key) && // not a number
                              e.key !== 'Backspace' &&
                              e.key !== 'Delete' &&
                              e.key !== 'ArrowLeft' &&
                              e.key !== 'ArrowRight' &&
                              e.key !== 'Tab'
                            ) {
                              e.preventDefault();
                            }
                          }}
                          placeholder="20"
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toParkingDistance ? "border-red-500" : ""
                          }`}
                        />
                        {errors.toParkingDistance && (
                          <p className="mt-1 text-sm text-red-600">{errors.toParkingDistance}</p>
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

                {step === 5 && formData.toTypeOfHome !== "lagenhet" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress</h2>
                    {(formData.toTypeOfHome === "villa" || formData.toTypeOfHome === "parhus" || formData.toTypeOfHome === "radhus" || formData.toTypeOfHome === "fritidshus" || formData.toTypeOfHome === "magasin") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Antal våningar</label>
                        <select
                          name="toFloor"
                          value={formData.toFloor}
                          onChange={(e) => {
                            handleInputChange(e);
                            setErrors(prev => ({ ...prev, toFloor: "" }));
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                            errors.toFloor ? "border-red-500" : ""
                          }`}
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
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="toParkingDistance"
                        value={formData.toParkingDistance}
                        onChange={(e) => {
                          // Only allow whole numbers
                          const value = e.target.value.replace(/[^\d]/g, '');
                          if (value === '' || Number(value) >= 0) {
                            setFormData(prev => ({ ...prev, toParkingDistance: value }));
                            setErrors(prev => ({ ...prev, toParkingDistance: "" }));
                          }
                        }}
                        onKeyDown={(e) => {
                          // Prevent all non-numeric input except backspace, delete, and arrow keys
                          if (
                            !/^\d$/.test(e.key) && // not a number
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="20"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
                          errors.toParkingDistance ? "border-red-500" : ""
                        }`}
                      />
                      {errors.toParkingDistance && (
                        <p className="mt-1 text-sm text-red-600">{errors.toParkingDistance}</p>
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

                {step === 6 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Tunga och ömtåliga föremål</h2>
                    
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
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                )}

                {step === 7 && (
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Övriga önskemål (frivilligt)</label>
                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          placeholder="Ställ frågor till flyttfirman eller meddela om eventuella önskemål och behov."
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                        ></textarea>
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
        </div>

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
      </main>
    </>
  );
} 
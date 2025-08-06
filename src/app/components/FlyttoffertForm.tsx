"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import StadningOffertForm from './StadningOffertForm';

// Interfaces
interface HeavyItem {
  type: string;
  description?: string;
}

interface FormData {
  serviceType: string; // 'flytt' or 'flyttstad'
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
  needsDisposal: boolean;
  additionalInfo: string;
  wantsFlexibleDate: boolean;
  elevatorSize?: string;
  toElevatorSize?: string;
  customerType?: 'privat' | 'foretag'; // NEW FIELD
  hasLoadingDock?: string; // NEW FIELD
  toHasLoadingDock?: string; // NEW FIELD
  contactFirstName?: string; // For företag, step 7
  contactLastName?: string; // For företag, step 7
  contactPersonName?: string; // For företag, step 7
  workplaceCount?: string; // NEW FIELD for företag
  hasStorageRoom?: string; // NEW FIELD for vind/källarförråd
  storageRoomArea?: string; // NEW FIELD for vind/källarförråd area
  hasGarage?: string; // NEW FIELD for garage
  garageArea?: string; // NEW FIELD for garage area
  hasAttic?: string; // NEW FIELD for vind (attic)
  atticArea?: string; // NEW FIELD for vind area
  hasBasementStorage?: string; // NEW FIELD for källarförråd (basement storage)
  basementStorageArea?: string; // NEW FIELD for källarförråd area
  
  
  
}

interface FormErrors {
  serviceType?: string;
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
  hasLoadingDock?: string;
  workplaceCount?: string; // NEW FIELD for företag
  hasStorageRoom?: string; // NEW FIELD for vind/källarförråd
  storageRoomArea?: string; // NEW FIELD for vind/källarförråd area
  hasGarage?: string; // NEW FIELD for garage
  garageArea?: string; // NEW FIELD for garage area
  hasAttic?: string; // NEW FIELD for vind (attic)
  atticArea?: string; // NEW FIELD for vind area
  hasBasementStorage?: string; // NEW FIELD for källarförråd (basement storage)
  basementStorageArea?: string; // NEW FIELD for källarförråd area
  
  
  // NEW FIELDS for disposal questions
  needsDisposal?: string;
}

interface AddressComponent {
  types: string[];
  long_name: string;
  short_name: string;
}

interface FlyttoffertFormProps {
  mode?: 'full' | 'widget';
  swapServiceOrder?: boolean;
  onServiceTypeSelect?: (serviceType: string) => void;
}

export default function FlyttoffertForm({ mode: _mode = 'full', swapServiceOrder = false, onServiceTypeSelect }: FlyttoffertFormProps) {
  const [step, setStep] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItem, setCustomItem] = useState({ type: "", weight: "" });
  const [customItemError, setCustomItemError] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidCurrentAddress, setLastValidCurrentAddress] = useState("");
  const [lastValidNewAddress, setLastValidNewAddress] = useState("");
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
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
    wantsFlexibleDate: false,
    elevatorSize: "",
    toElevatorSize: "",
    customerType: 'privat', // default
    hasLoadingDock: "no", // default for step 3
    toHasLoadingDock: "no", // default for step 5
    contactFirstName: '',
    contactLastName: '',
    contactPersonName: '',
    workplaceCount: '', // NEW FIELD for företag
    hasStorageRoom: "no", // NEW FIELD for vind/källarförråd
    storageRoomArea: "", // NEW FIELD for vind/källarförråd area
    hasGarage: "no", // NEW FIELD for garage
    garageArea: "", // NEW FIELD for garage area
    hasAttic: "no", // NEW FIELD for vind (attic)
    atticArea: "", // NEW FIELD for vind area
    hasBasementStorage: "no", // NEW FIELD for källarförråd (basement storage)
    basementStorageArea: "", // NEW FIELD for källarförråd area


    // NEW FIELDS for disposal questions
    needsDisposal: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const currentAddressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isGoogleMapsLoaded) return;
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
            let streetName = '';
            let _streetNumber = '';
            let city = '';
            place.address_components.forEach((component: AddressComponent) => {
              if (component.types.includes('route')) streetName = component.long_name;
              if (component.types.includes('street_number')) _streetNumber = component.long_name;
              if (component.types.includes('locality') || component.types.includes('postal_town')) city = component.long_name;
            });
            const formattedAddress = `${streetName}, ${city}, Sweden`;
            setFormData(prev => ({ ...prev, currentAddress: formattedAddress }));
            setLastValidCurrentAddress(formattedAddress);
          }
        });
        currentAddressInput.addEventListener('blur', () => {
          if (lastValidCurrentAddress && formData.currentAddress !== lastValidCurrentAddress) {
            setFormData(prev => ({ ...prev, currentAddress: lastValidCurrentAddress }));
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
            let streetName = '';
            let _streetNumber = '';
            let city = '';
            place.address_components.forEach((component: AddressComponent) => {
              if (component.types.includes('route')) streetName = component.long_name;
              if (component.types.includes('street_number')) _streetNumber = component.long_name;
              if (component.types.includes('locality') || component.types.includes('postal_town')) city = component.long_name;
            });
            const formattedAddress = `${streetName}, ${city}, Sweden`;
            setFormData(prev => ({ ...prev, newAddress: formattedAddress }));
            setLastValidNewAddress(formattedAddress);
          }
        });
        newAddressInput.addEventListener('blur', () => {
          if (lastValidNewAddress && formData.newAddress !== lastValidNewAddress) {
            setFormData(prev => ({ ...prev, newAddress: lastValidNewAddress }));
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
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Clear elevator-related fields when property type changes
    if (name === 'typeOfHome') {
      const shouldShowElevator = value === 'lagenhet' || value === 'magasin';
      if (!shouldShowElevator) {
        setFormData(prev => ({ 
          ...prev, 
          hasElevator: '', 
          elevatorSize: '' 
        }));
        setErrors(prev => ({ 
          ...prev, 
          hasElevator: '', 
          elevatorSize: '' 
        }));
      }
    }
    
    if (name === 'toTypeOfHome') {
      const shouldShowElevator = value === 'lagenhet' || value === 'magasin';
      if (!shouldShowElevator) {
        setFormData(prev => ({ 
          ...prev, 
          toHasElevator: '', 
          toElevatorSize: '' 
        }));
        setErrors(prev => ({ 
          ...prev, 
          toHasElevator: '', 
          toElevatorSize: '' 
        }));
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
      
      // Scroll to step bar when moving to next step (all devices)
      scrollToStepBar();
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Validation and handler functions
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.serviceType) {
      newErrors.serviceType = "Vänligen välj vilken tjänst du vill ha";
      isValid = false;
    }
    if (!formData.movingDate || !formData.movingDate.trim()) {
      newErrors.movingDate = "Vänligen välj önskat flyttdatum";
      isValid = false;
    } else {
      const selectedDate = new Date(formData.movingDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      if (selectedDate < tomorrow) {
        newErrors.movingDate = "Flyttdatum måste vara minst imorgon";
        isValid = false;
      }
    }
    if (formData.wantsFlexibleDate && (!formData.flexibleMovingDate || !formData.flexibleMovingDate.trim())) {
      newErrors.flexibleMovingDate = "Vänligen välj flexibilitet för flyttdatum";
      isValid = false;
    }
    if (formData.needsPacking === undefined) {
      newErrors.needsPacking = "Vänligen välj om du vill ha packhjälp";
      isValid = false;
    }
    if (formData.needsStorage === undefined) {
      newErrors.needsStorage = "Vänligen välj om du behöver lagerförvaring";
      isValid = false;
    }
    if (formData.needsCleaning === undefined) {
      newErrors.needsCleaning = "Vänligen välj om du vill ha flyttstädning";
      isValid = false;
    }
    if (formData.needsDisposal === undefined) {
      newErrors.needsDisposal = "Vänligen välj om du vill ha bortforsling";
      isValid = false;
    }



    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.currentAddress || !formData.currentAddress.trim()) {
      newErrors.currentAddress = "Vänligen ange en giltig adress";
      isValid = false;
    } else if (!formData.currentAddress.includes(',')) {
      newErrors.currentAddress = "Vänligen välj en adress från listan";
      isValid = false;
    }
    if (!formData.apartmentNumber || !formData.apartmentNumber.trim()) {
      newErrors.apartmentNumber = "Vänligen ange gatunummer";
      isValid = false;
    } else if (!/^[0-9]+[A-Za-z]?$/.test(formData.apartmentNumber)) {
      newErrors.apartmentNumber = "Gatunummer måste börja med siffror och kan avslutas med en bokstav";
      isValid = false;
    }
    if (!formData.postalCode || !formData.postalCode.trim()) {
      newErrors.postalCode = "Vänligen ange postnummer";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postnummer måste vara exakt 5 siffror";
      isValid = false;
    }
    if (!formData.apartmentSize || !formData.apartmentSize.trim()) {
      newErrors.apartmentSize = formData.customerType === 'foretag' ? "Vänligen ange lokalens storlek" : "Vänligen ange bostadens storlek";
      isValid = false;
    } else if (isNaN(Number(formData.apartmentSize)) || Number(formData.apartmentSize) <= 0) {
      newErrors.apartmentSize = formData.customerType === 'foretag' ? "Lokalens storlek måste vara ett positivt tal" : "Bostadens storlek måste vara ett positivt tal";
      isValid = false;
    }
    if (formData.customerType !== 'foretag') {
    if (!formData.typeOfHome || !formData.typeOfHome.trim()) {
      newErrors.typeOfHome = "Vänligen välj typ av bostad";
      isValid = false;
      }
    }
    if (formData.customerType === 'foretag') {
      if (!formData.workplaceCount || !formData.workplaceCount.trim()) {
        newErrors.workplaceCount = "Vänligen ange antal arbetsplatser";
        isValid = false;
      } else if (isNaN(Number(formData.workplaceCount)) || Number(formData.workplaceCount) <= 0) {
        newErrors.workplaceCount = "Antal arbetsplatser måste vara ett positivt tal";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.floor || !formData.floor.trim()) {
      newErrors.floor = "Vänligen välj våning";
      isValid = false;
    }
    if (formData.typeOfHome === "lagenhet" && !formData.hasElevator) {
      newErrors.hasElevator = "Vänligen ange om det finns hiss";
      isValid = false;
    }
    if (formData.hasElevator === "yes" && !formData.elevatorSize) {
      newErrors.elevatorSize = "Vänligen välj hisstorlek";
      isValid = false;
    }
    if (!formData.parkingDistance || !formData.parkingDistance.trim()) {
      newErrors.parkingDistance = "Vänligen ange avstånd till parkering";
      isValid = false;
    } else if (isNaN(Number(formData.parkingDistance)) || Number(formData.parkingDistance) < 0) {
      newErrors.parkingDistance = "Avståndet måste vara ett positivt tal i meter";
      isValid = false;
    }
    if (!formData.hasAttic) {
      newErrors.hasAttic = "Vänligen välj om du har vind";
      isValid = false;
    }
    if (formData.hasAttic === "yes" && (!formData.atticArea || !formData.atticArea.trim())) {
      newErrors.atticArea = "Vänligen ange vindens yta";
      isValid = false;
    } else if (formData.hasAttic === "yes" && (isNaN(Number(formData.atticArea)) || Number(formData.atticArea) <= 0)) {
      newErrors.atticArea = "Ytan måste vara ett positivt tal";
      isValid = false;
    }
    if (!formData.hasBasementStorage) {
      newErrors.hasBasementStorage = "Vänligen välj om du har källarförråd";
      isValid = false;
    }
    if (formData.hasBasementStorage === "yes" && (!formData.basementStorageArea || !formData.basementStorageArea.trim())) {
      newErrors.basementStorageArea = "Vänligen ange källarförrådets yta";
      isValid = false;
    } else if (formData.hasBasementStorage === "yes" && (isNaN(Number(formData.basementStorageArea)) || Number(formData.basementStorageArea) <= 0)) {
      newErrors.basementStorageArea = "Ytan måste vara ett positivt tal";
      isValid = false;
    }
    if (!formData.hasGarage) {
      newErrors.hasGarage = "Vänligen välj om du har garage";
      isValid = false;
    }
    if (formData.hasGarage === "yes" && (!formData.garageArea || !formData.garageArea.trim())) {
      newErrors.garageArea = "Vänligen ange garagets yta";
      isValid = false;
    } else if (formData.hasGarage === "yes" && (isNaN(Number(formData.garageArea)) || Number(formData.garageArea) <= 0)) {
      newErrors.garageArea = "Ytan måste vara ett positivt tal";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.newAddress || !formData.newAddress.trim()) {
      newErrors.newAddress = "Vänligen ange en giltig adress";
      isValid = false;
    } else if (!formData.newAddress.includes(',')) {
      newErrors.newAddress = "Vänligen välj en adress från listan";
      isValid = false;
    }
    if (!formData.toApartmentNumber || !formData.toApartmentNumber.trim()) {
      newErrors.toApartmentNumber = "Vänligen ange gatunummer";
      isValid = false;
    }
    if (!formData.toPostalCode || !formData.toPostalCode.trim()) {
      newErrors.toPostalCode = "Vänligen ange postnummer";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.toPostalCode)) {
      newErrors.toPostalCode = "Postnummer måste vara exakt 5 siffror";
      isValid = false;
    }
    if (!formData.toApartmentSize || !formData.toApartmentSize.trim()) {
      newErrors.toApartmentSize = formData.customerType === 'foretag' ? "Vänligen ange lokalens storlek" : "Vänligen ange bostadens storlek";
      isValid = false;
    } else if (isNaN(Number(formData.toApartmentSize)) || Number(formData.toApartmentSize) <= 0) {
      newErrors.toApartmentSize = formData.customerType === 'foretag' ? "Lokalens storlek måste vara ett positivt tal" : "Bostadens storlek måste vara ett positivt tal";
      isValid = false;
    }
    if (formData.customerType !== 'foretag') {
    if (!formData.toTypeOfHome || !formData.toTypeOfHome.trim()) {
      newErrors.toTypeOfHome = "Vänligen välj typ av bostad";
      isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep5 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (formData.toTypeOfHome === "lagenhet") {
      if (!formData.toFloor) {
        newErrors.toFloor = "Vänligen välj våning";
        isValid = false;
      }
      if (!formData.toHasElevator) {
        newErrors.toHasElevator = "Vänligen ange om det finns hiss";
        isValid = false;
      }
      if (formData.toHasElevator === "yes" && !formData.toElevatorSize) {
        newErrors.toElevatorSize = "Vänligen välj hisstorlek";
        isValid = false;
      }
    } else if (formData.toTypeOfHome !== "annat") {
      if (!formData.toFloor) {
        newErrors.toFloor = "Vänligen ange antal våningar";
        isValid = false;
      }
    }
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

  const validateStep7 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Vänligen ange ditt namn";
      isValid = false;
    }
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Vänligen ange din e-postadress";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vänligen ange en giltig e-postadress";
      isValid = false;
    }
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

  const handleBackToServiceSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSteps(false);
    setStep(0);
  };

  const scrollToStepBar = () => {
    // Scroll to step bar after a longer delay to ensure DOM is updated after state change
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Try to find the step bar by looking for elements with step text
        const allSpans = document.querySelectorAll('span');
        const stepTextElement = Array.from(allSpans).find(span => 
          span.textContent && span.textContent.includes('Steg')
        );
        
        if (stepTextElement) {
          // Scroll to step bar with extra offset to account for header
          const elementRect = stepTextElement.getBoundingClientRect();
          const headerHeight = 100; // Approximate header height
          const scrollTop = window.pageYOffset + elementRect.top - headerHeight - 50; // Extra 50px padding for more space
          window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        } else {
                      // Fallback: scroll to the form container with header offset
            const formElement = document.querySelector('.relative.rounded-2xl.shadow-2xl.border-2.border-\\[\\#10B981\\]');
            if (formElement) {
              const elementRect = formElement.getBoundingClientRect();
              const headerHeight = 100; // Approximate header height
              const scrollTop = window.pageYOffset + elementRect.top - headerHeight - 50; // Extra 50px padding for more space
              window.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
        }
      }
    }, 300);
  };

  return (
    <div>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSNfM36ny9L-S04VbU0xzhkGdaPAm_gU&libraries=places`}
        strategy="lazyOnload"
        async
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />
      <div className="relative rounded-2xl shadow-2xl border-2 border-[#10B981] p-6 md:p-12 max-w-xl w-full mx-auto overflow-hidden bg-gradient-to-br from-white to-blue-50">
        {/* Background image for mobile only - first step only */}
        {!showSteps && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 md:hidden"
            style={{
              backgroundImage: 'url(/ostermalm.avif)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <div className="flex flex-col items-center relative z-10">
          <Image src="/flyttella-logo.png" alt="Flyttella logo" width={80} height={80} className="mb-4 hidden md:block" />
          {!showSteps && (
            <>
          <h1 className="text-lg md:text-4xl font-extrabold text-center text-[#0F172A] mb-2 leading-tight">
            Fyll i formuläret för en kostnadsfri offert med ett fast pris<span className="md:hidden"> inom en minut!</span>
          </h1>
          <h2 className="text-lg md:text-xl font-extrabold text-center text-gray-700 mb-8 hidden md:block">
            Vi återkommer inom en minut!
          </h2>
            </>
          )}
        </div>
        <div className="text-center mb-6 md:mb-12 mt-4 md:mt-8 relative z-10">
          <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0">
            <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-0 md:mb-4">
              {!showSteps ? 'Välj tjänst' : ''}
            </h2>
            <p className="text-lg md:text-lg text-gray-900 font-bold">
              {!showSteps ? 'för att komma igång' : ''}
            </p>
          </div>
        </div>
        {/* Only swap the form fields and logic for Flyttstäd, keep the rest of the UI the same */}
        {showSteps && formData.serviceType === 'flyttstad' ? (
          <StadningOffertForm
            customerType={formData.customerType}
            onSubmit={(_data) => {
              alert('Flyttstäd offert skickad!');
              handleBackToServiceSelection({preventDefault: () => {}} as React.MouseEvent<HTMLButtonElement>);
            }}
            onCancel={() => handleBackToServiceSelection({preventDefault: () => {}} as React.MouseEvent<HTMLButtonElement>)}
          />
        ) : (
        <form className="relative z-10" onSubmit={async (e) => {
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
                  parkeringsAvstand: formData.parkingDistance,
                  workplaceCount: formData.customerType === 'foretag' ? formData.workplaceCount : undefined
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
        }}>
            {showSteps && (
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
            )}

            {!showSteps && (
              <div className="space-y-4 md:space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
                  {swapServiceOrder ? (
                    <>
                      <motion.div
                        className="relative rounded-xl p-2 md:p-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: 'flyttstad' }));
                          setErrors(prev => ({ ...prev, serviceType: '' }));
                          setShowSteps(true);
                          setStep(1);
                          if (onServiceTypeSelect) onServiceTypeSelect('flyttstad');
                          scrollToStepBar();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-2xl md:text-4xl mb-2 md:mb-4">✨</span>
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{swapServiceOrder ? 'Städtjänster' : 'Flyttstäd'}</h3>
                          <p className="text-sm md:text-base opacity-90">
                            Professionell flyttstädning för att lämna din gamla bostad i perfekt skick
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="relative rounded-xl p-3 md:p-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: 'flytt' }));
                          setErrors(prev => ({ ...prev, serviceType: '' }));
                          setShowSteps(true);
                          setStep(1);
                          if (onServiceTypeSelect) onServiceTypeSelect('flytt');
                          scrollToStepBar();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-2xl md:text-4xl mb-2 md:mb-4">🏠</span>
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Flytt</h3>
                          <p className="text-sm md:text-base opacity-90">
                            Komplett flyttservice med professionell packning, transport och uppackning
                          </p>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="relative rounded-xl p-2 md:p-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: 'flytt' }));
                          setErrors(prev => ({ ...prev, serviceType: '' }));
                          setShowSteps(true);
                          setStep(1);
                          if (onServiceTypeSelect) onServiceTypeSelect('flytt');
                          scrollToStepBar();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-2xl md:text-4xl mb-2 md:mb-4">🏠</span>
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Flytt</h3>
                          <p className="text-sm md:text-base opacity-90">
                            Komplett flyttservice med professionell packning, transport och uppackning
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="relative rounded-xl p-2 md:p-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: 'flyttstad' }));
                          setErrors(prev => ({ ...prev, serviceType: '' }));
                          setShowSteps(true);
                          setStep(1);
                          if (onServiceTypeSelect) onServiceTypeSelect('flyttstad');
                          scrollToStepBar();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-2xl md:text-4xl mb-2 md:mb-4">✨</span>
                          <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{swapServiceOrder ? 'Städtjänster' : 'Städ'}</h3>
                          <p className="text-sm md:text-base opacity-90">
                            Komplett städservice med professionell städning för alla behov
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
                
                {/* Five Years Badge for mobile */}
                <div className="md:hidden mt-4">
                  <div className="flex justify-center">
                    <Image 
                      src="/BadgeFiveYearsNew.png" 
                      alt="Five Years Badge" 
                      width={200} 
                      height={100} 
                      className="w-48 h-24 object-contain"
                    />
                  </div>
                </div>
                
                {/* Recommended company badges for mobile */}
                <div className="md:hidden mt-3">
                  <div className="flex flex-row justify-center -space-x-14">
                    <Image 
                      src="/recommendedcompany2021-no-bg.png" 
                      alt="Rekommenderat företag 2021" 
                      width={140} 
                      height={140} 
                      className="w-28 h-28 object-contain relative z-10"
                    />
                    <Image 
                      src="/recommendedcompany2022-no-bg.png" 
                      alt="Rekommenderat företag 2022" 
                      width={140} 
                      height={140} 
                      className="w-28 h-28 object-contain relative z-20"
                    />
                    <Image 
                      src="/recommendedcompany2023-no-bg.png" 
                      alt="Rekommenderat företag 2023" 
                      width={140} 
                      height={140} 
                      className="w-28 h-28 object-contain relative z-30"
                    />
                    <Image 
                      src="/recommendedcompany2024-no-bg.png" 
                      alt="Rekommenderat företag 2024" 
                      width={140} 
                      height={140} 
                      className="w-28 h-28 object-contain relative z-40"
                    />
                    <Image 
                      src="/recommendedcompany2.png" 
                      alt="Rekommenderat företag" 
                      width={120} 
                      height={120} 
                      className="w-24 h-24 object-contain relative z-50 mt-2 translate-x-2"
                    />
                  </div>
                </div>
                
                {errors.serviceType && (
                  <p className="text-base text-red-600 text-center mt-2 md:mt-4">{errors.serviceType}</p>
                )}
              </div>
            )}

            {showSteps && step === 1 && (
            <div className="space-y-6">
              {/* Privat/Företag Toggle */}
              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  className={`px-6 py-2 rounded-l-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 ${formData.customerType === 'privat' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'privat' }))}
                >
                  Privat
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-r-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 -ml-px ${formData.customerType === 'foretag' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'foretag' }))}
                >
                  Företag
                </button>
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Flyttinformation</h2>
              <div>
                                  <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Önskat flyttdatum</strong></label>
                <input
                  type="date"
                  name="movingDate"
                  value={formData.movingDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setFormData(prev => ({ ...prev, movingDate: selectedDate }));
                    if (selectedDate) {
                      setErrors(prev => ({ ...prev, movingDate: "" }));
                    }
                  }}
                  min={(() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    return tomorrow.toISOString().split('T')[0];
                  })()}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg bg-white appearance-none min-h-[44px] h-[44px]${errors.movingDate ? " border-red-500" : " border-gray-300"}`}
                />
                {errors.movingDate && (
                  <p className="mt-1 text-base text-red-600">{errors.movingDate}</p>
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
                  <label className="ml-2 text-lg text-gray-700">
                    Jag är flexibel med flyttdatum
                  </label>
                </div>
                {formData.wantsFlexibleDate && (
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Flexibelt flyttdatum</strong></label>
                    <select
                      name="flexibleMovingDate"
                      value={formData.flexibleMovingDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg${errors.flexibleMovingDate ? " border-red-500" : " border-gray-300"}`}
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
                      <p className="mt-1 text-base text-red-600">{errors.flexibleMovingDate}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-600">
                      Om du väljer ett flexibelt flyttdatum sker flytten inom vald tidsperiod från det datum du har valt.
                    </p>
                  </div>
                )}
              </div>
              {/* Packing help question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? 'Vill ni ha hjälp med packning?' : 'Vill du ha hjälp med packning?'}</strong>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsPacking"
                      value="yes"
                      checked={formData.needsPacking === true}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsPacking: true
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsPacking: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Ja</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsPacking"
                      value="no"
                      checked={formData.needsPacking === false}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsPacking: false
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsPacking: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Nej</span>
                  </label>
                </div>
                {errors.needsPacking && (
                  <p className="mt-1 text-base text-red-600">{errors.needsPacking}</p>
                )}
              </div>



              {/* Storage question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? 'Behöver ni magasinering?' : 'Behöver du magasinering?'}</strong>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsStorage"
                      value="yes"
                      checked={formData.needsStorage === true}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsStorage: true
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsStorage: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Ja</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsStorage"
                      value="no"
                      checked={formData.needsStorage === false}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsStorage: false
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsStorage: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Nej</span>
                  </label>
                </div>
                {errors.needsStorage && (
                  <p className="mt-1 text-base text-red-600">{errors.needsStorage}</p>
                )}
              </div>



              {/* Cleaning question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? 'Vill ni ha flyttstädning?' : 'Vill du ha flyttstädning?'}</strong>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsCleaning"
                      value="yes"
                      checked={formData.needsCleaning === true}
                      onChange={() => {
                        setFormData(prev => ({ ...prev, needsCleaning: true }));
                        setErrors(prev => ({ ...prev, needsCleaning: "" }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Ja</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsCleaning"
                      value="no"
                      checked={formData.needsCleaning === false}
                      onChange={() => {
                        setFormData(prev => ({ ...prev, needsCleaning: false }));
                        setErrors(prev => ({ ...prev, needsCleaning: "" }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Nej</span>
                  </label>
                </div>
                {errors.needsCleaning && (
                  <p className="mt-1 text-base text-red-600">{errors.needsCleaning}</p>
                )}
              </div>

              {/* Disposal question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? 'Vill ni ha bortforsling?' : 'Vill du ha bortforsling?'}</strong>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsDisposal"
                      value="yes"
                      checked={formData.needsDisposal === true}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsDisposal: true
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsDisposal: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Ja</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsDisposal"
                      value="no"
                      checked={formData.needsDisposal === false}
                      onChange={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          needsDisposal: false
                        }));
                        setErrors(prev => ({ 
                          ...prev, 
                          needsDisposal: ""
                        }));
                      }}
                      className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                    />
                    <span className="ml-2 text-lg text-gray-700">Nej</span>
                  </label>
                </div>
                {errors.needsDisposal && (
                  <p className="mt-1 text-base text-red-600">{errors.needsDisposal}</p>
                )}
              </div>


                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handleBackToServiceSelection}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Nuvarande företagsadress' : 'Nuvarande adress'}
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                {formData.customerType === 'foretag' ? 'Information om er nuvarande lokal' : 'Information om din nuvarande bostad'}
              </p>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Nuvarande adress</strong></label>
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
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg${errors.currentAddress ? " border-red-500" : ""}`}
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    />
                    {errors.currentAddress && (
                      <p className="mt-1 text-base text-red-600">{errors.currentAddress}</p>
                    )}
                  </div>
                  <div className="md:w-1/4">
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Gatunr.</strong></label>
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
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg${errors.apartmentNumber ? " border-red-500" : ""}`}
                    />
                    {errors.apartmentNumber && (
                      <p className="mt-1 text-base text-red-600">{errors.apartmentNumber}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Postnummer</strong></label>
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
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.postalCode ? " border-red-500" : ""}`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                  )}
                </div>
                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Lokalens storlek (kvm)' : 'Bostadens storlek (kvm)'}</strong>
                    </label>
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
                    placeholder="100"
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.apartmentSize ? " border-red-500" : ""}`}
                  />
                  {errors.apartmentSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.apartmentSize}</p>
                  )}
                </div>
                {((formData.customerType as string) === 'foretag') && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>Hur många arbetsplatser finns det?</strong>
                    </label>
                    <input
                      type="text"
                      name="workplaceCount"
                      value={formData.workplaceCount}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFormData(prev => ({ ...prev, workplaceCount: value }));
                        setErrors(prev => ({ ...prev, workplaceCount: "" }));
                      }}
                      placeholder="Ange antal"
                      required
                      className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.workplaceCount ? " border-red-500" : ""}`}
                    />
                    {errors.workplaceCount && (
                      <p className="mt-1 text-sm text-red-600">{errors.workplaceCount}</p>
                    )}
                  </div>
                )}
                {((formData.customerType as string) !== 'foretag') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>Typ av bostad</strong>
                    </label>
                  <select
                    name="typeOfHome"
                    value={formData.typeOfHome}
                    onChange={handleInputChange}
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.typeOfHome ? " border-red-500" : ""}`}
                  >
                    <option value="">-- Välj --</option>
                    <option value="lagenhet">Lägenhet</option>
                    <option value="villa">Villa</option>
                    <option value="parhus">Parhus</option>
                    <option value="radhus">Radhus</option>
                    <option value="fritidshus">Fritidshus</option>
                    <option value="magasin">Magasin</option>
                  </select>
                  {errors.typeOfHome && (
                    <p className="mt-1 text-sm text-red-600">{errors.typeOfHome}</p>
                  )}
                </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Nuvarande företagsadress' : 'Nuvarande adress'}
              </h2>
              <div className="space-y-6">
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.typeOfHome === 'lagenhet')) ? (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'På vilken våning ligger lokalen?' : 'På vilken våning ligger lägenheten?'}</strong>
                    </label>
                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={(e) => {
                      handleInputChange(e);
                      setErrors(prev => ({ ...prev, floor: "" }));
                    }}
                    required
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
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
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.typeOfHome === 'magasin' ? 'Vilken våning ligger magasinet på?' : 'Antal våningar'}</strong>
                    </label>
                    <select
                      name="floor"
                      value={formData.floor}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, floor: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                        errors.floor ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">-- Välj --</option>
                      {formData.typeOfHome === 'magasin' ? (
                        <>
                          <option value="-2">Våning -2</option>
                          <option value="-1">Våning -1</option>
                          <option value="entreplan">Entréplan</option>
                          <option value="1">Våning 1</option>
                          <option value="2">Våning 2</option>
                          <option value="3">Våning 3</option>
                          <option value="4">Våning 4</option>
                          <option value="5">Våning 5</option>
                          <option value="6+">Våning 6 eller högre</option>
                        </>
                      ) : (
                        <>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </>
                      )}
                    </select>
                    {errors.floor && (
                      <p className="mt-1 text-sm text-red-600">{errors.floor}</p>
                    )}
                  </div>
                )}
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && (formData.typeOfHome === 'lagenhet' || formData.typeOfHome === 'magasin'))) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Finns hiss i byggnaden?</strong></label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasElevator"
                          value="yes"
                          checked={formData.hasElevator === "yes"}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, hasElevator: e.target.value }));
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
                            setFormData(prev => ({ ...prev, hasElevator: e.target.value }));
                            setErrors(prev => ({ ...prev, hasElevator: "" }));
                          }}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Nej</span>
                      </label>
                    </div>
                    {errors.hasElevator && (
                      <p className="mt-1 text-sm text-red-600">{errors.hasElevator}</p>
                    )}
                  </div>
                )}
                {formData.hasElevator === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Hisstorlek</strong></label>
                    <select
                      name="elevatorSize"
                      value={formData.elevatorSize}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, elevatorSize: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] text-[#0F172A] ${
                        errors.elevatorSize ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">-- Välj --</option>
                      {(formData.customerType === 'foretag' || (formData.customerType === 'privat' && formData.typeOfHome === 'magasin')) ? (
                        <>
                          <option value="small">Liten (2-4 personer)</option>
                          <option value="medium">Mellanstor (6-8 personer)</option>
                          <option value="large">Stor (10+ personer)</option>
                        </>
                      ) : (
                        <>
                      <option value="small">Liten (2-4 personer)</option>
                      <option value="large">Stor (6+ personer)</option>
                        </>
                      )}
                    </select>
                    {errors.elevatorSize && (
                      <p className="mt-1 text-sm text-red-600">{errors.elevatorSize}</p>
                    )}
                  </div>
                )}

                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Avstånd till lastningsplats (meter)' : 'Avstånd till lastningsplats (meter)'}</strong>
                    </label>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.customerType === 'foretag' ? 'Den närmaste punkt en flyttbil kan stå vid er lokal under lastning och lossning' : 'Den närmaste punkt en flyttbil kan stå under lastning och lossning'}
                  </p>
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
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                      errors.parkingDistance ? "border-red-500" : ""
                    }`}
                  />
                  {errors.parkingDistance && (
                    <p className="mt-1 text-sm text-red-600">{errors.parkingDistance}</p>
                  )}
                </div>

                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Har ni vind?' : 'Har du vind?'}</strong>
                    </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasAttic"
                        value="yes"
                        checked={formData.hasAttic === "yes"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasAttic: e.target.value }));
                          setErrors(prev => ({ ...prev, hasAttic: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ja</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasAttic"
                        value="no"
                        checked={formData.hasAttic === "no"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasAttic: e.target.value }));
                          setErrors(prev => ({ ...prev, hasAttic: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Nej</span>
                    </label>
                  </div>
                  {errors.hasAttic && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasAttic}</p>
                  )}
                </div>

                {formData.hasAttic === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Vindens yta (kvm)</strong></label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="atticArea"
                      value={formData.atticArea}
                      onChange={(e) => {
                        // Only allow whole numbers
                        const value = e.target.value.replace(/[^\d]/g, '');
                        if (value === '' || Number(value) >= 0) {
                          setFormData(prev => ({ ...prev, atticArea: value }));
                          setErrors(prev => ({ ...prev, atticArea: "" }));
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
                      placeholder="10"
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                        errors.atticArea ? "border-red-500" : ""
                      }`}
                    />
                    {errors.atticArea && (
                      <p className="mt-1 text-sm text-red-600">{errors.atticArea}</p>
                    )}
                  </div>
                )}

                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Har ni källarförråd?' : 'Har du källarförråd?'}</strong>
                    </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBasementStorage"
                        value="yes"
                        checked={formData.hasBasementStorage === "yes"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasBasementStorage: e.target.value }));
                          setErrors(prev => ({ ...prev, hasBasementStorage: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ja</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasBasementStorage"
                        value="no"
                        checked={formData.hasBasementStorage === "no"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasBasementStorage: e.target.value }));
                          setErrors(prev => ({ ...prev, hasBasementStorage: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Nej</span>
                    </label>
                  </div>
                  {errors.hasBasementStorage && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasBasementStorage}</p>
                  )}
                </div>

                {formData.hasBasementStorage === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Källarförrådets yta (kvm)' : 'Källarförrådets yta (kvm)'}</strong>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="basementStorageArea"
                      value={formData.basementStorageArea}
                      onChange={(e) => {
                        // Only allow whole numbers
                        const value = e.target.value.replace(/[^\d]/g, '');
                        if (value === '' || Number(value) >= 0) {
                          setFormData(prev => ({ ...prev, basementStorageArea: value }));
                          setErrors(prev => ({ ...prev, basementStorageArea: "" }));
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
                      placeholder="10"
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                        errors.basementStorageArea ? "border-red-500" : ""
                      }`}
                    />
                    {errors.basementStorageArea && (
                      <p className="mt-1 text-sm text-red-600">{errors.basementStorageArea}</p>
                    )}
                  </div>
                )}

                <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Har ni garage?' : 'Har du garage?'}</strong>
                    </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasGarage"
                        value="yes"
                        checked={formData.hasGarage === "yes"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasGarage: e.target.value }));
                          setErrors(prev => ({ ...prev, hasGarage: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Ja</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasGarage"
                        value="no"
                        checked={formData.hasGarage === "no"}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, hasGarage: e.target.value }));
                          setErrors(prev => ({ ...prev, hasGarage: "" }));
                        }}
                        className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Nej</span>
                    </label>
                  </div>
                  {errors.hasGarage && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasGarage}</p>
                  )}
                </div>

                {formData.hasGarage === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'Garagets yta (kvm)' : 'Garagets yta (kvm)'}</strong>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="garageArea"
                      value={formData.garageArea}
                      onChange={(e) => {
                        // Only allow whole numbers
                        const value = e.target.value.replace(/[^\d]/g, '');
                        if (value === '' || Number(value) >= 0) {
                          setFormData(prev => ({ ...prev, garageArea: value }));
                          setErrors(prev => ({ ...prev, garageArea: "" }));
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
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                        errors.garageArea ? "border-red-500" : ""
                      }`}
                    />
                    {errors.garageArea && (
                      <p className="mt-1 text-sm text-red-600">{errors.garageArea}</p>
                    )}
                  </div>
                )}

                {((formData.customerType as string) === 'foretag') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Finns lastkaj i byggnaden?</strong></label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasLoadingDock"
                          value="yes"
                          checked={formData.hasLoadingDock === "yes"}
                          onChange={() => setFormData(prev => ({ ...prev, hasLoadingDock: "yes" }))}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Ja</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="hasLoadingDock"
                          value="no"
                          checked={formData.hasLoadingDock === "no"}
                          onChange={() => setFormData(prev => ({ ...prev, hasLoadingDock: "no" }))}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Nej</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Ny företagsadress' : 'Ny adress'}
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                {formData.customerType === 'foretag' ? 'Information om er nya lokal' : 'Information om din nya bostad'}
              </p>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Ny adress</strong></label>
                    <input
                      type="text"
                      id="newAddress"
                      name="newAddress"
                      value={formData.newAddress}
                      onChange={handleInputChange}
                      placeholder="Börja skriva din adress"
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.newAddress ? " border-red-500" : ""}`}
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    />
                    {errors.newAddress && (
                      <p className="mt-1 text-sm text-red-600">{errors.newAddress}</p>
                    )}
                  </div>
                  <div className="md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Gatunr.</strong></label>
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
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.toApartmentNumber ? " border-red-500" : ""}`}
                    />
                    {errors.toApartmentNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.toApartmentNumber}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Postnummer</strong></label>
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
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.toPostalCode ? " border-red-500" : ""}`}
                  />
                  {errors.toPostalCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.toPostalCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <strong>{formData.customerType === 'foretag' ? 'Lokalens storlek (kvm)' : 'Bostadens storlek (kvm)'}</strong>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="toApartmentSize"
                    value={formData.toApartmentSize}
                    onChange={(e) => {
                      // Only allow whole numbers
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setFormData({ ...formData, toApartmentSize: value });
                      setErrors({ ...errors, toApartmentSize: "" });
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
                    placeholder="100"
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.toApartmentSize ? " border-red-500" : ""}`}
                  />
                  {errors.toApartmentSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.toApartmentSize}</p>
                  )}
                </div>
                {((formData.customerType as string) !== 'foretag') && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>Typ av bostad</strong>
                    </label>
                  <select
                    name="toTypeOfHome"
                    value={formData.toTypeOfHome}
                    onChange={handleInputChange}
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.toTypeOfHome ? " border-red-500" : ""}`}
                  >
                    <option value="">-- Välj --</option>
                    <option value="lagenhet">Lägenhet</option>
                    <option value="villa">Villa</option>
                    <option value="parhus">Parhus</option>
                    <option value="radhus">Radhus</option>
                    <option value="fritidshus">Fritidshus</option>
                    <option value="magasin">Magasin</option>
                  </select>
                  {errors.toTypeOfHome && (
                    <p className="mt-1 text-sm text-red-600">{errors.toTypeOfHome}</p>
                  )}
                </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Ny företagsadress' : 'Ny adress'}
              </h2>
              <div className="space-y-6">
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.toTypeOfHome === 'lagenhet')) ? (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? 'På vilken våning ligger lokalen?' : 'På vilken våning ligger lägenheten?'}</strong>
                    </label>
                  <select
                    name="toFloor"
                    value={formData.toFloor}
                    onChange={(e) => {
                      handleInputChange(e);
                      setErrors(prev => ({ ...prev, toFloor: "" }));
                    }}
                    required
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
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
                    <p className="mt-1 text-sm text-red-600">{errors.toFloor}</p>
                  )}
                </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.toTypeOfHome === 'magasin' ? 'Vilken våning ligger magasinet på?' : 'Antal våningar'}</strong>
                    </label>
                    <select
                      name="toFloor"
                      value={formData.toFloor}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, toFloor: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                        errors.toFloor ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">-- Välj --</option>
                      {formData.toTypeOfHome === 'magasin' ? (
                        <>
                          <option value="-2">Våning -2</option>
                          <option value="-1">Våning -1</option>
                          <option value="entreplan">Entréplan</option>
                          <option value="1">Våning 1</option>
                          <option value="2">Våning 2</option>
                          <option value="3">Våning 3</option>
                          <option value="4">Våning 4</option>
                          <option value="5">Våning 5</option>
                          <option value="6+">Våning 6 eller högre</option>
                        </>
                      ) : (
                        <>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </>
                      )}
                    </select>
                    {errors.toFloor && (
                      <p className="mt-1 text-sm text-red-600">{errors.toFloor}</p>
                    )}
                  </div>
                )}
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && (formData.toTypeOfHome === 'lagenhet' || formData.toTypeOfHome === 'magasin'))) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Finns hiss i byggnaden?</strong></label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="toHasElevator"
                          value="yes"
                          checked={formData.toHasElevator === "yes"}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, toHasElevator: e.target.value }));
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
                            setFormData(prev => ({ ...prev, toHasElevator: e.target.value }));
                            setErrors(prev => ({ ...prev, toHasElevator: "" }));
                          }}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Nej</span>
                      </label>
                    </div>
                    {errors.toHasElevator && (
                      <p className="mt-1 text-sm text-red-600">{errors.toHasElevator}</p>
                    )}
                  </div>
                )}
                {formData.toHasElevator === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Hisstorlek</strong></label>
                    <select
                      name="toElevatorSize"
                      value={formData.toElevatorSize}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, toElevatorSize: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] text-[#0F172A] ${
                        errors.toElevatorSize ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">-- Välj --</option>
                      {(formData.customerType === 'foretag' || (formData.customerType === 'privat' && formData.typeOfHome === 'magasin')) ? (
                        <>
                          <option value="small">Liten (2-4 personer)</option>
                          <option value="medium">Mellanstor (6-8 personer)</option>
                          <option value="large">Stor (10+ personer)</option>
                        </>
                      ) : (
                        <>
                      <option value="small">Liten (2-4 personer)</option>
                      <option value="large">Stor (6+ personer)</option>
                        </>
                      )}
                    </select>
                    {errors.toElevatorSize && (
                      <p className="mt-1 text-sm text-red-600">{errors.toElevatorSize}</p>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <strong>{formData.customerType === 'foretag' ? 'Avstånd till lossningsplats (meter)' : 'Avstånd till lossningsplats (meter)'}</strong>
                  </label>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.customerType === 'foretag' ? 'Den närmaste punkt en flyttbil kan stå vid er lokal under lastning och lossning' : 'Den närmaste punkt en flyttbil kan stå under lastning och lossning'}
                  </p>
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
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                      errors.toParkingDistance ? "border-red-500" : ""
                    }`}
                  />
                  {errors.toParkingDistance && (
                    <p className="mt-1 text-sm text-red-600">{errors.toParkingDistance}</p>
                  )}
                </div>
                {((formData.customerType as string) === 'foretag') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Finns lastkaj i byggnaden?</strong></label>
                    <div className="flex gap-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="toHasLoadingDock"
                          value="yes"
                          checked={formData.toHasLoadingDock === "yes"}
                          onChange={() => setFormData(prev => ({ ...prev, toHasLoadingDock: "yes" }))}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Ja</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="toHasLoadingDock"
                          value="no"
                          checked={formData.toHasLoadingDock === "no"}
                          onChange={() => setFormData(prev => ({ ...prev, toHasLoadingDock: "no" }))}
                          className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Nej</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Tunga och ömtåliga föremål (företagsflytt)' : 'Tunga och ömtåliga föremål'}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    {formData.customerType === 'foretag' ? 'Har ni enskilda föremål som väger över 100 kg?' : 'Har du enskilda föremål som väger över 100 kg?'}
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.customerType === 'foretag'
                      ? <span className="font-bold">OBS! Markera endast "Ja" om ni har enskilda föremål som väger mer än 100 kg</span>
                      : <span className="font-bold">OBS! Markera endast "Ja" om du har enskilda föremål som väger mer än 100 kg</span>
                    } (t.ex. ett piano eller kassaskåp). Vanliga möbler som soffor, sängar eller garderober väger normalt under 100 kg.
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
                            <span className="flex-1 text-[#0F172A]">{item.type}{item.description ? `: ${item.description}` : ''}</span>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]"
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
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    {formData.customerType === 'foretag' ? 'Ska några särskilt ömtåliga föremål flyttas för ert företag?' : 'Ska några särskilt ömtåliga föremål flyttas?'}
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.customerType === 'foretag'
                      ? 'Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som antikviteter, i förväg för att planera företagsflytten.'
                      : 'Flyttfirman behöver få veta om särskilt ömtåliga eller värdefulla föremål, som antikviteter, i förväg för att planera flytten.'}
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]"
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
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
            {showSteps && step === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                {formData.customerType === 'foretag' ? 'Kontaktuppgifter till företaget' : 'Kontaktuppgifter'}
              </h2>
              {formData.customerType === 'foretag' && (
                <>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Kontaktperson för och efternamn</strong></label>
                    <input
                      type="text"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? 'Företagsnamn' : 'Namn'}</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.name ? " border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><strong>E-post</strong></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.email ? " border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Telefon</strong></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]${errors.phone ? " border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
                >
                  Tillbaka
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Skicka offertförfrågan
                </button>
              </div>
            </div>
          )}
        </form>
        )}
      </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A]"
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
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
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
  );
} 
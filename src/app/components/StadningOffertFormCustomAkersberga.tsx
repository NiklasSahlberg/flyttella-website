"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Script from "next/script";
import Image from "next/image";

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

interface StadningFormData {
  name: string;
  email: string;
  phone: string;
  typeOfHome: string;
  numberOfFloors: string;
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
  hasBalconyCleaning: boolean;
  hasStorageCleaning: boolean;
  hasGarageCleaning: boolean;
  hasGlazedBalconyCleaning: boolean;
  hasGlazedPatioCleaning: boolean;
  waterTrapCleaningCount: number;
  blindsCleaningCount: number;
  hasFreezerDefrosting: boolean;
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
  cleaningFrequency?: string;
  cleaningDays?: string[];
  cleaningTimes?: string[];
  windowCleaning: boolean;
  bedMaking: boolean;
  dishWashing: boolean;
  ironing: boolean;
  cleaningDayTimePairs: { day: string, time: string }[];
  cleaningDayTimePair: { day: string, time: string };
  _currentCleaningDay: string;
  _currentCleaningTime: string;
  estateClearing: boolean;
  windowCleaningEstate: boolean;
  constructionWorkType: string[];
  constructionCleaningServices: string[];
  needsLadder: string;
  windowTypes: string[];
  windowsWithMullions: number;
  windowsWithoutMullions: number;
  topHungWindows: number;
  wantsMovingHelp: string;
  // Moving-related fields
  needsPacking: boolean;
  needsStorage: boolean;
  needsDisposal: boolean;



  hasHeavyItems: string;
  heavyItems: { type: string; description?: string }[];
  hasDelicateItems: string;
  delicateItemsDescription: string;
  // Additional moving fields for complete form
  currentAddress: string;
  newAddress: string;
  apartmentNumber: string;
  toApartmentNumber: string;
  toPostalCode: string;
  apartmentSize: string;
  numberOfRooms: string;
  toApartmentSize: string;
  toNumberOfRooms: string;
  fromTypeOfHome: string;
  toTypeOfHome: string;
  floor: string;
  fromFloor: string;
  toFloor: string;
  hasElevator: string;
  fromHasElevator: string;
  toHasElevator: string;
  parkingDistance: string;
  fromParkingDistance: string;
  toParkingDistance: string;
  elevatorSize?: string;
  toElevatorSize?: string;
  hasLoadingDock?: string;
  toHasLoadingDock?: string;
  workplaceCount?: string;
  hasStorageRoom?: string;
  storageRoomArea?: string;
  hasGarageMoving?: string;
  garageArea?: string;
  hasAttic?: string;
  atticArea?: string;
  hasBasementStorage?: string;
  basementStorageArea?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  typeOfHome?: string;
  numberOfFloors?: string;
  squareMeters?: string;
  movingDate?: string;
  flexibleMovingDate?: string;
  rooms?: string;
  address?: string;
  streetNumber?: string;
  postalCode?: string;
  contactPersonName?: string;
  cleaningType?: string;
  cleaningFrequency?: string;
  cleaningDays?: string;
  cleaningTimes?: string;
  cleaningDayTimePairs?: string;
  cleaningDayTimePair?: string;
  comments?: string;
  constructionWorkType?: string;
  constructionCleaningServices?: string;
  needsLadder?: string;
  windowTypes?: string;
  windowCount?: string;
  // Moving-related error fields
  needsPacking?: string;
  needsStorage?: string;
  needsDisposal?: string;
  currentAddress?: string;
  apartmentNumber?: string;
  apartmentSize?: string;
  workplaceCount?: string;
  floor?: string;
  elevatorSize?: string;
  parkingDistance?: string;
  newAddress?: string;
  toApartmentNumber?: string;
  toPostalCode?: string;
  toApartmentSize?: string;
  toTypeOfHome?: string;
  toFloor?: string;
  toElevatorSize?: string;
  toParkingDistance?: string;
  heavyItems?: string;
  hasHeavyItems?: string;
  hasDelicateItems?: string;
  delicateItemsDescription?: string;
  wantsMovingHelp?: string;
}

interface StadningOffertFormProps {
  onSubmit: (data: StadningFormData) => void;
  onCancel: () => void;
  customerType?: 'privat' | 'foretag';
}

const StadningOffertForm: React.FC<StadningOffertFormProps> = ({ onSubmit, onCancel, customerType = 'privat' }) => {
  const [step, setStep] = useState(0); // Start at step 0 for cleaning type
  const [selectedCleaningType, setSelectedCleaningType] = useState<string>("");
  const [localCustomerType, setLocalCustomerType] = useState<'privat' | 'foretag'>(customerType);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidAddress, setLastValidAddress] = useState("");
  const addressRef = useRef<HTMLInputElement>(null);
  // Moving form state
  const [isMovingForm, setIsMovingForm] = useState(false);
  const [movingStep, setMovingStep] = useState(1);
  const [formData, setFormData] = useState<StadningFormData>({
    name: '',
    email: '',
    phone: '',
    typeOfHome: '',
    numberOfFloors: '',
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
    hasBalconyCleaning: false,
    hasStorageCleaning: false,
    hasGarageCleaning: false,
    hasGlazedBalconyCleaning: false,
    hasGlazedPatioCleaning: false,
    waterTrapCleaningCount: 0,
    blindsCleaningCount: 0,
    hasFreezerDefrosting: false,
    squareMeters: '',
    comments: '',
    movingDate: '',
    flexibleMovingDate: '',
    wantsFlexibleDate: false,
    additionalInfo: '',
    address: '',
    streetNumber: '',
    postalCode: '',
    contactPersonName: '',
    cleaningFrequency: '',
    cleaningDays: [],
    cleaningTimes: [],
    windowCleaning: false,
    bedMaking: false,
    dishWashing: false,
    ironing: false,
    cleaningDayTimePairs: [{ day: '', time: '' }],
    cleaningDayTimePair: { day: '', time: '' },
    _currentCleaningDay: '',
    _currentCleaningTime: '',
    estateClearing: false,
    windowCleaningEstate: false,
    constructionWorkType: [],
    constructionCleaningServices: [],
    needsLadder: '',
    windowTypes: [],
    windowsWithMullions: 0,
    windowsWithoutMullions: 0,
    topHungWindows: 0,
    wantsMovingHelp: '',
    // Moving-related fields
    needsPacking: false,
    needsStorage: false,
    needsDisposal: false,



    hasHeavyItems: '',
    heavyItems: [],
    hasDelicateItems: '',
    delicateItemsDescription: '',
    // Additional moving fields for complete form
    currentAddress: '',
    newAddress: '',
    apartmentNumber: '',
    toApartmentNumber: '',
    toPostalCode: '',
    apartmentSize: '',
    numberOfRooms: '',
    toApartmentSize: '',
    toNumberOfRooms: '',
    fromTypeOfHome: '',
    toTypeOfHome: '',
    floor: '',
    fromFloor: '',
    toFloor: '',
    hasElevator: '',
    fromHasElevator: '',
    toHasElevator: '',
    parkingDistance: '',
    fromParkingDistance: '',
    toParkingDistance: '',
    elevatorSize: '',
    toElevatorSize: '',
    hasLoadingDock: '',
    toHasLoadingDock: '',
    workplaceCount: '',
    hasStorageRoom: '',
    storageRoomArea: '',
    hasGarageMoving: '',
    garageArea: '',
    hasAttic: '',
    atticArea: '',
    hasBasementStorage: '',
    basementStorageArea: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Debug log for current step
  // console.log('Current step:', step);

  // 1. Add the cleaning alternatives array
  const cleaningAlternatives = [
    "Flyttstädning",
    "Hemstädning",
    "Storstädning",
    "Visningsstädning",
    "Byggstädning",
    "Dödsbostädning",
    "Fönsterputs",
    "Annan städning",
    
  ];

  // Adjust step count for progress bar (now 4 steps)
  const totalSteps = 4;

  useEffect(() => {
    if (!isGoogleMapsLoaded) return;
    if (!window.google?.maps?.places) return;
    
    const initializeAutocomplete = () => {
    try {
      const addressInput = document.getElementById('address') as HTMLInputElement;
        if (addressInput && !addressInput.dataset.autocompleteInitialized) {
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
              setFormData(prev => ({ ...prev, address: formattedAddress }));
            setLastValidAddress(formattedAddress);
          }
        });
          
        addressInput.addEventListener('blur', () => {
          if (lastValidAddress && formData.address !== lastValidAddress) {
            setFormData(prev => ({ ...prev, address: lastValidAddress }));
          }
        });
          
          // Mark as initialized to prevent duplicate initialization
          addressInput.dataset.autocompleteInitialized = 'true';
      }
    } catch (error) {
        console.error('Error initializing Google Places:', error);
      }
    };

    // Initialize immediately if step is 1, otherwise wait for step change
    if (step === 1) {
      // Small delay to ensure DOM is ready
      setTimeout(initializeAutocomplete, 100);
    }
  }, [isGoogleMapsLoaded, step, lastValidAddress, formData.address]);

  // Additional useEffect to handle initialization when component mounts
  useEffect(() => {
    if (!isGoogleMapsLoaded) return;
    if (!window.google?.maps?.places) return;
    if (step !== 1) return;
    
    const initializeAutocomplete = () => {
      try {
        const addressInput = document.getElementById('address') as HTMLInputElement;
        
        if (addressInput && !addressInput.dataset.autocompleteInitialized) {
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
              setFormData(prev => ({ ...prev, address: formattedAddress }));
              setLastValidAddress(formattedAddress);
            }
          });
          
          addressInput.addEventListener('blur', () => {
            if (lastValidAddress && formData.address !== lastValidAddress) {
              setFormData(prev => ({ ...prev, address: lastValidAddress }));
            }
          });
          
          // Mark as initialized to prevent duplicate initialization
          addressInput.dataset.autocompleteInitialized = 'true';
        }
      } catch (error) {
        console.error('Error initializing Google Places:', error);
      }
    };

    // Try to initialize immediately, then retry with a delay
    initializeAutocomplete();
    setTimeout(initializeAutocomplete, 100);
    setTimeout(initializeAutocomplete, 500);
  }, [isGoogleMapsLoaded, step]);

  useEffect(() => {
    if (addressRef.current) {
      const input = addressRef.current;
      input.scrollLeft = input.scrollWidth;
    }
  }, [formData.address]);

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

  const handleServiceCountChange = (service: 'waterTrapCleaningCount' | 'blindsCleaningCount', change: 1 | -1) => {
    setFormData(prev => ({
      ...prev,
      [service]: Math.max(0, prev[service] + change)
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    if (selectedCleaningType === 'Hemstädning') {
      if (!formData.cleaningDayTimePair || !formData.cleaningDayTimePair.day || !formData.cleaningDayTimePair.time) {
        newErrors.cleaningDayTimePair = 'Vänligen välj en städdag och tid';
      }
    } else if (selectedCleaningType === 'Storstädning' || selectedCleaningType === 'Annan städning') {
      if (!formData.movingDate.trim()) {
        newErrors.movingDate = 'Vänligen välj städdatum';
      }
      if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
        newErrors.flexibleMovingDate = 'Vänligen välj flexibelt städdatum';
      }
    } else if (selectedCleaningType !== 'Annan städning') {
      if (!formData.movingDate.trim()) {
        newErrors.movingDate = 'Vänligen välj städdatum';
      }
      if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
        newErrors.flexibleMovingDate = 'Vänligen välj flexibelt städdatum';
      }
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

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Byggstädning: require at least one work type and one cleaning service
    if (selectedCleaningType === 'Byggstädning') {
      if (!formData.constructionWorkType || formData.constructionWorkType.length === 0) {
        newErrors.constructionWorkType = 'Vänligen välj minst en sorts arbete.';
      }
      if (!formData.constructionCleaningServices || formData.constructionCleaningServices.length === 0) {
        newErrors.constructionCleaningServices = 'Vänligen välj minst en sak som ska ingå i städningen.';
      }
    } else if (selectedCleaningType !== 'Annan städning' && selectedCleaningType !== 'Fönsterputs') {
      if (!formData.typeOfHome.trim()) {
        newErrors.typeOfHome = 'Vänligen välj bostadstyp';
      }
      if (!formData.numberOfFloors.trim()) {
        newErrors.numberOfFloors = 'Vänligen ange antal våningar';
      }
      if (!formData.squareMeters.trim()) {
        newErrors.squareMeters = 'Vänligen ange ytstorlek';
      } else if (!/^\d+$/.test(formData.squareMeters)) {
        newErrors.squareMeters = 'Vänligen ange endast siffror';
      }
    }
    if (selectedCleaningType === 'Fönsterputs' && !formData.needsLadder.trim()) {
      newErrors.needsLadder = 'Vänligen välj om ni behöver en stege';
    }
    if (selectedCleaningType === 'Fönsterputs' && (!formData.windowTypes || formData.windowTypes.length === 0)) {
      newErrors.windowTypes = 'Vänligen välj minst en typ av fönster';
    }
    if (selectedCleaningType === 'Fönsterputs' && 
        (formData.windowsWithMullions || 0) + (formData.windowsWithoutMullions || 0) + (formData.topHungWindows || 0) === 0) {
      newErrors.windowCount = 'Vänligen ange antal fönster för minst en typ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (selectedCleaningType === 'Annan städning') {
      // For "Annan städning", only validate the comments field
      if (!formData.comments.trim()) {
        newErrors.comments = 'Vänligen beskriv din städtjänst';
      }
    } else if (selectedCleaningType === 'Flyttstädning') {
      // For "Flyttstädning", validate the moving help question
      if (!formData.wantsMovingHelp) {
        newErrors.wantsMovingHelp = 'Vänligen välj om du vill ha flytthjälp';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (selectedCleaningType === 'Annan städning') {
      // For "Annan städning", only validate contact fields
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
    } else if (selectedCleaningType === 'Flyttstädning' && formData.wantsMovingHelp === 'Nej') {
      // For "Flyttstädning" with "Nej", only validate contact fields
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
    } else {
      // For other cleaning types, validate all fields
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMovingStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};
    
    switch (stepNumber) {
      case 1:
        // Validate moving date and services
        if (!formData.movingDate || !formData.movingDate.trim()) {
          newErrors.movingDate = "Vänligen välj önskat flyttdatum";
        } else {
          const selectedDate = new Date(formData.movingDate);
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          if (selectedDate < tomorrow) {
            newErrors.movingDate = "Flyttdatum måste vara minst imorgon";
          }
        }
        if (formData.wantsFlexibleDate && (!formData.flexibleMovingDate || !formData.flexibleMovingDate.trim())) {
          newErrors.flexibleMovingDate = "Vänligen välj flexibilitet för flyttdatum";
        }
        if (formData.needsPacking === undefined) {
          newErrors.needsPacking = "Vänligen välj om du vill ha packhjälp";
        }
        if (formData.needsStorage === undefined) {
          newErrors.needsStorage = "Vänligen välj om du behöver lagerförvaring";
        }
        if (formData.needsDisposal === undefined) {
          newErrors.needsDisposal = "Vänligen välj om du vill ha bortforsling";
        }
        break;
      case 2:
        // Validate current address
        if (!formData.currentAddress.trim()) {
          newErrors.currentAddress = "Vänligen ange nuvarande adress";
        }
        if (!formData.apartmentNumber.trim()) {
          newErrors.apartmentNumber = "Vänligen ange gatunummer";
        }
        if (!formData.postalCode.trim()) {
          newErrors.postalCode = "Vänligen ange postnummer";
        } else if (!/^\d{5}$/.test(formData.postalCode)) {
          newErrors.postalCode = "Postnummer måste vara exakt 5 siffror";
        }
        if (!formData.apartmentSize.trim()) {
          newErrors.apartmentSize = "Vänligen ange bostadens storlek";
        }
        if (localCustomerType === 'foretag' && !formData.workplaceCount?.trim()) {
          newErrors.workplaceCount = "Vänligen ange antal arbetsplatser";
        }
        if (localCustomerType === 'privat' && !formData.typeOfHome.trim()) {
          newErrors.typeOfHome = "Vänligen välj typ av bostad";
        }
        break;
      case 3:
        // Validate current address details
        if (localCustomerType === 'privat' && formData.typeOfHome === 'lagenhet' && !formData.floor.trim()) {
          newErrors.floor = "Vänligen välj våning";
        }
        if (formData.hasElevator === 'yes' && !formData.elevatorSize?.trim()) {
          newErrors.elevatorSize = "Vänligen ange hissens storlek";
        }
        if (!formData.parkingDistance.trim()) {
          newErrors.parkingDistance = "Vänligen ange parkeringsavstånd";
        }
        break;
      case 4:
        // Validate new address
        if (!formData.newAddress.trim()) {
          newErrors.newAddress = "Vänligen ange ny adress";
        }
        if (!formData.toApartmentNumber.trim()) {
          newErrors.toApartmentNumber = "Vänligen ange gatunummer";
        }
        if (!formData.toPostalCode.trim()) {
          newErrors.toPostalCode = "Vänligen ange postnummer";
        } else if (!/^\d{5}$/.test(formData.toPostalCode)) {
          newErrors.toPostalCode = "Postnummer måste vara exakt 5 siffror";
        }
        if (!formData.toApartmentSize.trim()) {
          newErrors.toApartmentSize = "Vänligen ange bostadens storlek";
        }
        if (!formData.toTypeOfHome.trim()) {
          newErrors.toTypeOfHome = "Vänligen välj typ av bostad";
        }
        break;
      case 5:
        // Validate new address details
        if (formData.toTypeOfHome === 'lagenhet' && !formData.toFloor.trim()) {
          newErrors.toFloor = "Vänligen välj våning";
        }
        if (formData.toHasElevator === 'yes' && !formData.toElevatorSize?.trim()) {
          newErrors.toElevatorSize = "Vänligen ange hissens storlek";
        }
        if (!formData.toParkingDistance.trim()) {
          newErrors.toParkingDistance = "Vänligen ange parkeringsavstånd";
        }
        break;
      case 6:
        // Validate heavy and delicate items
        if (formData.hasHeavyItems === 'yes' && formData.heavyItems.length === 0) {
          newErrors.heavyItems = "Vänligen lägg till minst ett tungt föremål";
        }
        if (formData.hasDelicateItems === 'yes' && !formData.delicateItemsDescription.trim()) {
          newErrors.delicateItemsDescription = "Vänligen beskriv de ömtåliga föremålen";
        }
        break;
      case 7:
        // Validate contact information
        if (!formData.name.trim()) {
          newErrors.name = "Vänligen ange ditt namn";
        }
        if (localCustomerType === 'foretag' && !formData.contactPersonName?.trim()) {
          newErrors.contactPersonName = "Vänligen ange kontaktpersonens namn";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Vänligen ange din e-postadress";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Vänligen ange en giltig e-postadress";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Vänligen ange ditt telefonnummer";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for step 0
  const validateStep0 = (): boolean => {
    if (!selectedCleaningType) {
      setErrors({ cleaningType: 'Vänligen välj en städtjänst' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    console.log('handleNext called, current step:', step);
    let isValid = false;
    
    // If we're in moving form mode, handle moving steps
    if (isMovingForm) {
      isValid = validateMovingStep(movingStep);
      if (isValid && movingStep < 7) {
        setMovingStep(prev => prev + 1);
        setErrors({});
        setTouchedFields({});
      }
      return;
    }
    
    switch (step) {
      case 0:
        console.log('Validating step 0');
        isValid = validateStep0();
        break;
      case 1:
        console.log('Validating step 1');
        setTouchedFields(prev => ({ 
          ...prev, 
          movingDate: true, 
          flexibleMovingDate: formData.wantsFlexibleDate,
          address: true,
          streetNumber: true,
          postalCode: true
        }));
        isValid = validateStep1();
        break;
      case 2:
        console.log('Validating step 2');
        if (selectedCleaningType === 'Annan städning') {
          // Skip step 2 for "Annan städning" - go directly to step 3
          console.log('Skipping step 2 for Annan städning');
          setStep(3);
          return;
        } else {
          setTouchedFields(prev => ({ ...prev, typeOfHome: true, numberOfFloors: true, squareMeters: true }));
          isValid = validateStep2();
        }
        break;
      case 3:
        console.log('Validating step 3');
        if (selectedCleaningType === 'Annan städning') {
          setTouchedFields({ comments: true });
        } else if (selectedCleaningType === 'Flyttstädning') {
          setTouchedFields({ wantsMovingHelp: true });
        } else {
          setTouchedFields({ 
            name: true, 
            email: true, 
            phone: true, 
            contactPersonName: localCustomerType === 'foretag' ? true : false
          });
        }
        isValid = validateStep3();
        break;
      case 4:
        console.log('Validating step 4');
        setTouchedFields({ 
          name: true, 
          email: true, 
          phone: true, 
          contactPersonName: localCustomerType === 'foretag' ? true : false
        });
        isValid = validateStep4();
        break;
      default:
        isValid = true;
    }
    console.log('Validation result:', isValid);
    if (isValid) {
      if (selectedCleaningType === 'Annan städning') {
        // For "Annan städning": step 0 -> 1 -> 3 -> 4
        if (step === 0 || step === 1 || step === 3) {
          console.log('Proceeding to next step for Annan städning');
          setStep((prev) => prev === 1 ? 3 : prev + 1);
          setErrors({});
          setTouchedFields({});
        }
      } else if (selectedCleaningType === 'Flyttstädning') {
        // For "Flyttstädning": step 0 -> 1 -> 2 -> 3 -> 4
        if (step < 4) {
          console.log('Proceeding to next step for Flyttstädning');
          // If we're on step 3 and user selected "Ja" for moving help, start moving form
          if (step === 3 && formData.wantsMovingHelp === 'Ja') {
            console.log('Starting moving form');
            setIsMovingForm(true);
            setMovingStep(1);
            setErrors({});
            setTouchedFields({});
          } else {
            setStep((prev) => prev + 1);
            setErrors({});
            setTouchedFields({});
          }
        }
      } else {
        // For other cleaning types: step 0 -> 1 -> 2 -> 3
        if (step < 3) {
          console.log('Proceeding to next step for other cleaning types');
          setStep((prev) => prev + 1);
          setErrors({});
          setTouchedFields({});
        }
      }
    } else {
      console.log('Not proceeding - isValid:', isValid, 'step:', step);
    }
  };

  const handlePrev = () => {
    if (selectedCleaningType === 'Annan städning') {
      setStep((prev) => {
        if (prev === 4) return 3; // from contact info to describe box
        if (prev === 3) return 1; // from describe box to address (skip step 2)
        return prev - 1;
      });
    } else {
      setStep((prev) => prev - 1);
    }
    setErrors({});
    setTouchedFields({});
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const emailData = {
        cleaningType: selectedCleaningType,
        ...formData,
        flexibleMovingDate: formData.wantsFlexibleDate ? formData.flexibleMovingDate : 'Nej',
        customerType: localCustomerType,
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

  const daysOfWeek = [
    'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'
  ];
  const timeSlots = [
    '06:00-09:00', '09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'
  ];

  // Calculate step indicator
  let displayStep = step + 1;
  let displayTotal = 4;
  if (isMovingForm) {
    displayStep = movingStep;
    displayTotal = 7;
  } else if (selectedCleaningType === 'Annan städning') {
    // Map step to visible step for Annan städning
    if (step === 0) displayStep = 1;
    else if (step === 1) displayStep = 2;
    else if (step === 3) displayStep = 3;
    else if (step === 4) displayStep = 4;
    displayTotal = 4;
  } else if (selectedCleaningType === 'Flyttstädning') {
    // Map step to visible step for Flyttstädning
    if (step === 0) displayStep = 1;
    else if (step === 1) displayStep = 2;
    else if (step === 2) displayStep = 3;
    else if (step === 3) displayStep = 4;
    else if (step === 4) displayStep = 5;
    displayTotal = 5;
  } else {
    displayStep = step + 1;
    displayTotal = 4;
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBZSNfM36ny9L-S04VbU0xzhkGdaPAm_gU&libraries=places`}
        strategy="lazyOnload"
        async
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/flyttella-logo.png"
            alt="Flyttella Logo"
            width={80}
            height={30}
            className="mx-auto"
            priority
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className=""
        >
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Steg {displayStep} av {displayTotal}</span>
              <span className="text-sm font-medium text-gray-700">{Math.round((displayStep / displayTotal) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#0F172A] to-[#10B981] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(displayStep / displayTotal) * 100}%` }}
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
              className="relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                if ((step === 3 && selectedCleaningType !== 'Flyttstädning') || 
                    (step === 4 && selectedCleaningType === 'Flyttstädning') ||
                    (step === 4 && selectedCleaningType === 'Annan städning')) {
                  handleFinalSubmit(e);
                }
              }} 
              noValidate
            >
              {step === 0 && (
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
                  <h2 className="text-xl font-bold text-[#0F172A] mb-4">Vilken typ av städtjänst vill du ha?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cleaningAlternatives.map((alt) => (
                      <button
                        key={alt}
                        type="button"
                        className={`px-4 py-3 rounded-lg border text-lg font-semibold focus:outline-none transition-colors duration-200 ${selectedCleaningType === alt ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-white text-[#10B981] border-[#10B981]'}`}
                        onClick={() => setSelectedCleaningType(alt)}
                      >
                        {alt}
                      </button>
                    ))}
                  </div>
                  {errors.cleaningType && (
                    <p className="mt-1 text-sm text-red-600">{errors.cleaningType}</p>
                  )}
                </div>
              )}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    {selectedCleaningType === 'Hemstädning' ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Hur ofta vill du ha städhjälp?</strong></label>
                        <select
                          name="cleaningFrequency"
                          value={formData.cleaningFrequency}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                            errors.cleaningFrequency ? 'border-red-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: 'white', color: 'black' }}
                        >
                          <option value="">-- Välj --</option>
                          <option value="Ett tillfälle">Ett tillfälle</option>
                          <option value="Varje vecka">Varje vecka</option>
                          <option value="Varannan vecka">Varannan vecka</option>
                          <option value="Var tredje vecka">Var tredje vecka</option>
                          <option value="Varje månad">Varje månad</option>
                          <option value="Annat">Annat</option>
                        </select>
                        {errors.cleaningFrequency && (
                          <p className="mt-1 text-sm text-red-600">{errors.cleaningFrequency}</p>
                        )}
                        {/* Move städdag and städtid dropdowns here */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Lägg till en passande städdag och tid</strong></label>
                          <div className="flex gap-2 items-center bg-white p-2 rounded shadow mb-2" style={{ backgroundColor: '#fff' }}>
                            <select
                              value={formData.cleaningDayTimePair.day}
                              onChange={e => setFormData(prev => ({ ...prev, cleaningDayTimePair: { ...prev.cleaningDayTimePair, day: e.target.value } }))}
                              className="px-2 py-1 border rounded w-32 bg-white text-black"
                              style={{ backgroundColor: 'white', color: 'black' }}
                            >
                              <option value="">Välj dag</option>
                              {daysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                            <select
                              value={formData.cleaningDayTimePair.time}
                              onChange={e => setFormData(prev => ({ ...prev, cleaningDayTimePair: { ...prev.cleaningDayTimePair, time: e.target.value } }))}
                              className="px-2 py-1 border rounded w-32 bg-white text-black"
                              style={{ backgroundColor: 'white', color: 'black' }}
                            >
                              <option value="">Välj tid</option>
                              {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                              ))}
                            </select>
                          </div>
                          {errors.cleaningDayTimePair && (
                            <p className="mt-1 text-sm text-red-600">{errors.cleaningDayTimePair}</p>
                          )}
                        </div>
                      </>
                    ) : selectedCleaningType === 'Storstädning' ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Önskat städdatum</strong></label>
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
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{selectedCleaningType === 'Fönsterputs' ? 'Önskat datum för fönsterputsning' : 'Önskat städdatum'}</strong></label>
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
                      </>
                    )}
                  </div>
                  <div className="space-y-4">
                    {selectedCleaningType === 'Hemstädning' ? (
                      <>
                        {/* Do not render the 'Jag är flexibel med städdatum' checkbox or flexibleMovingDate select here */}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="wantsFlexibleDate"
                            checked={formData.wantsFlexibleDate}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            {selectedCleaningType === 'Fönsterputs' ? 'Jag är flexibel med datum för fönsterputsning' : 'Jag är flexibel med städdatum'}
                          </label>
                        </div>
                        {formData.wantsFlexibleDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{selectedCleaningType === 'Fönsterputs' ? 'Flexibelt datum för fönsterputsning' : 'Flexibelt städdatum'}</strong></label>
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
                              {selectedCleaningType === 'Fönsterputs' 
                                ? 'Om du väljer ett flexibelt datum för fönsterputsning sker fönsterputsningen inom vald tidsperiod från det datum du har valt.'
                                : 'Om du väljer ett flexibelt städdatum sker städningen inom vald tidsperiod från det datum du har valt.'
                              }
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Adress</strong></label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Börja skriva din adress"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.address ? "border-red-500" : ""
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                        ref={addressRef}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                      )}
                    </div>
                    <div className="md:w-1/4">
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Gatunr.</strong></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Postnummer</strong></label>
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
                </div>
              )}
              {step === 2 && selectedCleaningType !== 'Annan städning' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1"><strong>{localCustomerType === 'foretag'
                        ? 'Vilken typ av lokal ska städas?'
                        : 'Vilken sorts bostad ska städas?'}</strong></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1"><strong>{formData.typeOfHome.toLowerCase() === 'lagenhet' ? 'Vilken våning ligger lägenheten på?' : 'Hur många våningar ska städas?'}</strong></label>
                    <select
                      name="numberOfFloors"
                      value={formData.numberOfFloors}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.numberOfFloors ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                      <option value="">{formData.typeOfHome.toLowerCase() === 'lagenhet' ? 'Välj våning' : 'Välj antal våningar'}</option>
                      {formData.typeOfHome.toLowerCase() === 'lagenhet' ? (
                        <>
                          <option value="entréplan">Entréplan</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10+">10+</option>
                        </>
                      ) : (
                        <>
                    <option value="1">1 våning</option>
                    <option value="2">2 våningar</option>
                    <option value="3">3 våningar</option>
                    <option value="4">4 våningar eller fler</option>
                        </>
                      )}
                    </select>
                    {errors.numberOfFloors && (
                      <p className="mt-1 text-sm text-red-600">{errors.numberOfFloors}</p>
                    )}
                  </div>

                  {selectedCleaningType !== 'Fönsterputs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>Ungefär hur stor yta ska städas?</strong></label>
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
                  )}

                  {selectedCleaningType === 'Fönsterputs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>Behöver vi ta med oss en stege för att nå alla fönster?</strong></label>
                      <div className="mt-2 flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-yes"
                            name="needsLadder"
                            value="Ja"
                            checked={formData.needsLadder === 'Ja'}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-yes" className="ml-2 text-sm text-gray-700">
                            Ja
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-no"
                            name="needsLadder"
                            value="Nej"
                            checked={formData.needsLadder === 'Nej'}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-no" className="ml-2 text-sm text-gray-700">
                            Nej
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-unknown"
                            name="needsLadder"
                            value="Vet ej"
                            checked={formData.needsLadder === 'Vet ej'}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-unknown" className="ml-2 text-sm text-gray-700">
                            Vet ej
                          </label>
                        </div>
                      </div>
                      {errors.needsLadder && (
                        <p className="mt-1 text-sm text-red-600">{errors.needsLadder}</p>
                      )}
                    </div>
                  )}

                  {selectedCleaningType === 'Fönsterputs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>Vilken typ av fönster har du?</strong></label>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="single-glass" name="windowTypes" type="checkbox" value="Englasfönster (2 sidor)" checked={formData.windowTypes.includes('Englasfönster (2 sidor)')} onChange={(e) => {
                              const value = e.target.value;
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                windowTypes: checked 
                                  ? [...prev.windowTypes, value]
                                  : prev.windowTypes.filter(item => item !== value)
                              }));
                            }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="single-glass" className="font-medium text-gray-700">Englasfönster (2 sidor)</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="double-glass" name="windowTypes" type="checkbox" value="Tvåglasfönster (4 sidor)" checked={formData.windowTypes.includes('Tvåglasfönster (4 sidor)')} onChange={(e) => {
                              const value = e.target.value;
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                windowTypes: checked 
                                  ? [...prev.windowTypes, value]
                                  : prev.windowTypes.filter(item => item !== value)
                              }));
                            }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="double-glass" className="font-medium text-gray-700">Tvåglasfönster (4 sidor)</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="triple-glass" name="windowTypes" type="checkbox" value="Treglasfönster (6 sidor)" checked={formData.windowTypes.includes('Treglasfönster (6 sidor)')} onChange={(e) => {
                              const value = e.target.value;
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                windowTypes: checked 
                                  ? [...prev.windowTypes, value]
                                  : prev.windowTypes.filter(item => item !== value)
                              }));
                            }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="triple-glass" className="font-medium text-gray-700">Treglasfönster (6 sidor)</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="unknown-windows" name="windowTypes" type="checkbox" value="Vet ej" checked={formData.windowTypes.includes('Vet ej')} onChange={(e) => {
                              const value = e.target.value;
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                windowTypes: checked 
                                  ? [...prev.windowTypes, value]
                                  : prev.windowTypes.filter(item => item !== value)
                              }));
                            }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="unknown-windows" className="font-medium text-gray-700">Vet ej</label>
                          </div>
                        </div>
                      </div>
                      {errors.windowTypes && (
                        <p className="mt-1 text-sm text-red-600">{errors.windowTypes}</p>
                      )}
                    </div>
                  )}

                  {selectedCleaningType === 'Fönsterputs' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>Antal fönster av varje typ</strong></label>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Fönster med spröjs</label>
                          <div className="flex items-center">
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithMullions: Math.max(0, (prev.windowsWithMullions || 0) - 1) }))} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                            <span className="px-4 py-1 border-t border-b text-black">{formData.windowsWithMullions || 0}</span>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithMullions: (prev.windowsWithMullions || 0) + 1 }))} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Fönster utan spröjs</label>
                          <div className="flex items-center">
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithoutMullions: Math.max(0, (prev.windowsWithoutMullions || 0) - 1) }))} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                            <span className="px-4 py-1 border-t border-b text-black">{formData.windowsWithoutMullions || 0}</span>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithoutMullions: (prev.windowsWithoutMullions || 0) + 1 }))} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Överkantshängda fönster</label>
                          <div className="flex items-center">
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, topHungWindows: Math.max(0, (prev.topHungWindows || 0) - 1) }))} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                            <span className="px-4 py-1 border-t border-b text-black">{formData.topHungWindows || 0}</span>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, topHungWindows: (prev.topHungWindows || 0) + 1 }))} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                          </div>
                        </div>
                      </div>
                      {errors.windowCount && (
                        <p className="mt-1 text-sm text-red-600">{errors.windowCount}</p>
                      )}
                    </div>
                  )}

                  {/* Tilläggstjänster section */}
                  {/* Debug: selectedCleaningType = ${selectedCleaningType} */}
                  {selectedCleaningType === 'Dödsbostädning' ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>Tilläggstjänster</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="estate-clearing" name="estateClearing" type="checkbox" checked={formData.estateClearing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="estate-clearing" className="font-medium text-gray-700">Önskar tömning/bortforsling och flytt av möbler</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedCleaningType === 'Byggstädning' ? (
                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4"><strong>Vilken sorts arbete har du gjort?</strong></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="renovering" name="constructionWorkType" type="checkbox" value="Renovering/Ombyggnad" checked={formData.constructionWorkType.includes('Renovering/Ombyggnad')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionWorkType: checked 
                                    ? [...prev.constructionWorkType, value]
                                    : prev.constructionWorkType.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="renovering" className="font-medium text-gray-700">Renovering/Ombyggnad</label>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="tillbyggnad" name="constructionWorkType" type="checkbox" value="Tillbyggnad/Utbyggnad" checked={formData.constructionWorkType.includes('Tillbyggnad/Utbyggnad')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionWorkType: checked 
                                    ? [...prev.constructionWorkType, value]
                                    : prev.constructionWorkType.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="tillbyggnad" className="font-medium text-gray-700">Tillbyggnad/Utbyggnad</label>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="malning" name="constructionWorkType" type="checkbox" value="Målning/Slipning" checked={formData.constructionWorkType.includes('Målning/Slipning')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionWorkType: checked 
                                    ? [...prev.constructionWorkType, value]
                                    : prev.constructionWorkType.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="malning" className="font-medium text-gray-700">Målning/Slipning</label>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="golvlaggning" name="constructionWorkType" type="checkbox" value="Golvläggning/Golvslipning" checked={formData.constructionWorkType.includes('Golvläggning/Golvslipning')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionWorkType: checked 
                                    ? [...prev.constructionWorkType, value]
                                    : prev.constructionWorkType.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="golvlaggning" className="font-medium text-gray-700">Golvläggning/Golvslipning</label>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="annat-arbete" name="constructionWorkType" type="checkbox" value="Annat" checked={formData.constructionWorkType.includes('Annat')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionWorkType: checked 
                                    ? [...prev.constructionWorkType, value]
                                    : prev.constructionWorkType.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="annat-arbete" className="font-medium text-gray-700">Annat</label>
                            </div>
                          </div>
                        </div>
                        {errors.constructionWorkType && (
                          <p className="mt-1 text-sm text-red-600">{errors.constructionWorkType}</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4"><strong>Tilläggstjänster</strong></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="slang-skrap" name="constructionCleaningServices" type="checkbox" value="Släng skräp och avfall" checked={formData.constructionCleaningServices.includes('Släng skräp och avfall')} onChange={(e) => {
                                const value = e.target.value;
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                  ...prev,
                                  constructionCleaningServices: checked 
                                    ? [...prev.constructionCleaningServices, value]
                                    : prev.constructionCleaningServices.filter(item => item !== value)
                                }));
                              }} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="slang-skrap" className="font-medium text-gray-700">Släng skräp och avfall</label>
                            </div>
                          </div>
                        </div>
                        {errors.constructionCleaningServices && (
                          <p className="mt-1 text-sm text-red-600">{errors.constructionCleaningServices}</p>
                        )}
                      </div>
                    </div>
                  ) : selectedCleaningType === 'Hemstädning' ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>Tilläggstjänster</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="window-cleaning" name="windowCleaning" type="checkbox" checked={formData.windowCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="window-cleaning" className="font-medium text-gray-700">Önskar fönsterputsning</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="bed-making" name="bedMaking" type="checkbox" checked={formData.bedMaking} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="bed-making" className="font-medium text-gray-700">Önskar bäddning</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="dish-washing" name="dishWashing" type="checkbox" checked={formData.dishWashing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="dish-washing" className="font-medium text-gray-700">Önskar diskning</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="ironing" name="ironing" type="checkbox" checked={formData.ironing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="ironing" className="font-medium text-gray-700">Önskar strykning</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedCleaningType === 'Storstädning' ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>Tilläggstjänster</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="bed-making-storstädning" name="bedMaking" type="checkbox" checked={formData.bedMaking} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="bed-making-storstädning" className="font-medium text-gray-700">Önskar bäddning</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="dish-washing-storstädning" name="dishWashing" type="checkbox" checked={formData.dishWashing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="dish-washing-storstädning" className="font-medium text-gray-700">Önskar diskning</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="ironing-storstädning" name="ironing" type="checkbox" checked={formData.ironing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="ironing-storstädning" className="font-medium text-gray-700">Önskar strykning</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedCleaningType !== 'Fönsterputs' ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>Tilläggstjänster</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="balcony-cleaning" name="hasBalconyCleaning" type="checkbox" checked={formData.hasBalconyCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="balcony-cleaning" className="font-medium text-gray-700">Balkong, max 5 kvm</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="storage-cleaning" name="hasStorageCleaning" type="checkbox" checked={formData.hasStorageCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="storage-cleaning" className="font-medium text-gray-700">Källare/Vindsförråd, max 5 kvm</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="garage-cleaning" name="hasGarageCleaning" type="checkbox" checked={formData.hasGarageCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="garage-cleaning" className="font-medium text-gray-700">Garage, max 15 kvm</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="glazed-balcony-cleaning" name="hasGlazedBalconyCleaning" type="checkbox" checked={formData.hasGlazedBalconyCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="glazed-balcony-cleaning" className="font-medium text-gray-700">Inglasad balkong, max 10 kvm</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="glazed-patio-cleaning" name="hasGlazedPatioCleaning" type="checkbox" checked={formData.hasGlazedPatioCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="glazed-patio-cleaning" className="font-medium text-gray-700">Inglasad altan, max 10 kvm</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="freezer-defrosting" name="hasFreezerDefrosting" type="checkbox" checked={formData.hasFreezerDefrosting} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="freezer-defrosting" className="font-medium text-gray-700">Avfrostning av frys</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="ml-3 text-sm">
                            <label htmlFor="water-trap-cleaning" className="font-medium text-gray-700">Demontering/rengöring av vattenlås</label>
                            <div className="flex items-center mt-1">
                              <button type="button" onClick={() => handleServiceCountChange('waterTrapCleaningCount', -1)} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                              <span className="px-4 py-1 border-t border-b text-black">{formData.waterTrapCleaningCount}</span>
                              <button type="button" onClick={() => handleServiceCountChange('waterTrapCleaningCount', 1)} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="ml-3 text-sm">
                            <label htmlFor="blinds-cleaning" className="font-medium text-gray-700">Rengöring av persienner</label>
                            <div className="flex items-center mt-1">
                              <button type="button" onClick={() => handleServiceCountChange('blindsCleaningCount', -1)} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                              <span className="px-4 py-1 border-t border-b text-black">{formData.blindsCleaningCount}</span>
                              <button type="button" onClick={() => handleServiceCountChange('blindsCleaningCount', 1)} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  {selectedCleaningType === 'Annan städning' ? (
                    <>
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Beskriv din städtjänst</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Beskriv vad uppdraget går ut på</strong></label>
                          <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            placeholder="Beskriv här vad för typ av städtjänst du behöver. Ju mer detaljerad beskrivning, desto bättre kan vi hjälpa dig."
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                            style={{ backgroundColor: 'white', color: 'black' }}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : selectedCleaningType === 'Flyttstädning' ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                        Flytthjälp
                      </h2>
                      <p className="text-sm text-gray-700 mb-6">
                        Vill du även få hjälp med flytten?
                      </p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <strong>Vill du även få flytthjälp?</strong>
                          </label>
                          <div className="mt-2 flex space-x-6">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="moving-help-yes"
                                name="wantsMovingHelp"
                                value="Ja"
                                checked={formData.wantsMovingHelp === 'Ja'}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                              />
                              <label htmlFor="moving-help-yes" className="ml-2 text-sm text-gray-700">
                                Ja
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="moving-help-no"
                                name="wantsMovingHelp"
                                value="Nej"
                                checked={formData.wantsMovingHelp === 'Nej'}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                              />
                              <label htmlFor="moving-help-no" className="ml-2 text-sm text-gray-700">
                                Nej
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : !isMovingForm && (
                    <>
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? 'Företagsnamn' : 'Ditt namn'}</strong></label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Kontaktperson för och efternamn</strong></label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>E-post</strong></label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Telefon</strong></label>
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Kommentarer (frivilligt)</strong></label>
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
                    </>
                  )}
                </div>
              )}

              {/* Moving Form Steps */}
              {isMovingForm && (
                <div className="space-y-6">
                  {movingStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Flyttinformation</h2>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2"><strong>Önskat flyttdatum</strong></label>
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
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                            errors.movingDate ? "border-red-500" : ""
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
                            Jag är flexibel med flyttdatum
                          </label>
                        </div>
                        {formData.wantsFlexibleDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Flexibelt flyttdatum</strong></label>
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
                          </div>
                        )}
                      </div>

                      {/* Packing help question */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <strong>Vill du ha hjälp med packning?</strong>
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsPacking"
                              value="true"
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
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsPacking"
                              value="false"
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
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsPacking && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsPacking}</p>
                        )}
                      </div>

                      {/* Storage question */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <strong>Behöver du magasinering?</strong>
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsStorage"
                              value="true"
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
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsStorage"
                              value="false"
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
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsStorage && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsStorage}</p>
                        )}
                      </div>

                      {/* Disposal question */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <strong>Vill du ha bortforsling?</strong>
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsDisposal"
                              value="true"
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
                            <span className="ml-2 text-sm text-gray-700">Ja</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="needsDisposal"
                              value="false"
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
                            <span className="ml-2 text-sm text-gray-700">Nej</span>
                          </label>
                        </div>
                        {errors.needsDisposal && (
                          <p className="mt-1 text-sm text-red-600">{errors.needsDisposal}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {movingStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Nuvarande adress</h2>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Nuvarande adress</strong></label>
                          <input
                            type="text"
                            name="currentAddress"
                            value={formData.currentAddress}
                            onChange={handleInputChange}
                            placeholder="Börja skriva din adress"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                              errors.currentAddress ? "border-red-500" : ""
                            }`}
                            style={{ backgroundColor: 'white', color: 'black' }}
                          />
                          {errors.currentAddress && (
                            <p className="mt-1 text-sm text-red-600">{errors.currentAddress}</p>
                          )}
                        </div>
                        <div className="md:w-1/4">
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Gatunr.</strong></label>
                          <input
                            type="text"
                            name="apartmentNumber"
                            value={formData.apartmentNumber}
                            onChange={handleInputChange}
                            placeholder="1A"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                              errors.apartmentNumber ? "border-red-500" : ""
                            }`}
                            style={{ backgroundColor: 'white', color: 'black' }}
                          />
                          {errors.apartmentNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.apartmentNumber}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Postnummer</strong></label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="12345"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <strong>Bostadens storlek (kvm)</strong>
                        </label>
                        <input
                          type="text"
                          name="apartmentSize"
                          value={formData.apartmentSize}
                          onChange={handleInputChange}
                          placeholder="100"
                          className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                            errors.apartmentSize ? "border-red-500" : ""
                          }`}
                          style={{ backgroundColor: 'white', color: 'black' }}
                        />
                        {errors.apartmentSize && (
                          <p className="mt-1 text-sm text-red-600">{errors.apartmentSize}</p>
                        )}
                      </div>

                      {localCustomerType === 'privat' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <strong>Typ av bostad</strong>
                          </label>
                          <select
                            name="typeOfHome"
                            value={formData.typeOfHome}
                            onChange={handleInputChange}
                            className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                              errors.typeOfHome ? "border-red-500" : ""
                            }`}
                            style={{ backgroundColor: 'white', color: 'black' }}
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

                      {localCustomerType === 'foretag' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <strong>Hur många arbetsplatser finns det?</strong>
                          </label>
                          <input
                            type="text"
                            name="workplaceCount"
                            value={formData.workplaceCount}
                            onChange={handleInputChange}
                            placeholder="Ange antal"
                            className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                              errors.workplaceCount ? "border-red-500" : ""
                            }`}
                            style={{ backgroundColor: 'white', color: 'black' }}
                          />
                          {errors.workplaceCount && (
                            <p className="mt-1 text-sm text-red-600">{errors.workplaceCount}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                                     {movingStep === 3 && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Nuvarande adress - Detaljer</h2>
                       
                       {localCustomerType === 'privat' && formData.typeOfHome === 'lagenhet' && (
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>På vilken våning ligger lägenheten?</strong>
                           </label>
                           <select
                             name="floor"
                             value={formData.floor}
                             onChange={handleInputChange}
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.floor ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
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
                       )}

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Finns det hiss?</strong>
                         </label>
                         <div className="flex gap-6">
                           <label className="flex items-center">
                             <input
                               type="radio"
                               name="hasElevator"
                               value="yes"
                               checked={formData.hasElevator === 'yes'}
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
                               checked={formData.hasElevator === 'no'}
                               onChange={handleInputChange}
                               className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                             />
                             <span className="ml-2 text-sm text-gray-700">Nej</span>
                           </label>
                         </div>
                       </div>

                       {formData.hasElevator === 'yes' && (
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>Hissens storlek (mått)</strong>
                           </label>
                           <input
                             type="text"
                             name="elevatorSize"
                             value={formData.elevatorSize}
                             onChange={handleInputChange}
                             placeholder="t.ex. 2x2 meter"
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.elevatorSize ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
                           />
                           {errors.elevatorSize && (
                             <p className="mt-1 text-sm text-red-600">{errors.elevatorSize}</p>
                           )}
                         </div>
                       )}

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Parkeringsavstånd (meter)</strong>
                         </label>
                         <input
                           type="text"
                           name="parkingDistance"
                           value={formData.parkingDistance}
                           onChange={handleInputChange}
                           placeholder="Ange avstånd"
                           className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                             errors.parkingDistance ? "border-red-500" : ""
                           }`}
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                         {errors.parkingDistance && (
                           <p className="mt-1 text-sm text-red-600">{errors.parkingDistance}</p>
                         )}
                       </div>
                     </div>
                   )}

                   {movingStep === 4 && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress</h2>
                       
                       <div className="flex flex-col md:flex-row gap-4">
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Ny adress</strong></label>
                           <input
                             type="text"
                             name="newAddress"
                             value={formData.newAddress}
                             onChange={handleInputChange}
                             placeholder="Börja skriva din nya adress"
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.newAddress ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
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
                             onChange={handleInputChange}
                             placeholder="1A"
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.toApartmentNumber ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
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
                           onChange={handleInputChange}
                           placeholder="12345"
                           className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                             errors.toPostalCode ? "border-red-500" : ""
                           }`}
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                         {errors.toPostalCode && (
                           <p className="mt-1 text-sm text-red-600">{errors.toPostalCode}</p>
                         )}
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Bostadens storlek (kvm)</strong>
                         </label>
                         <input
                           type="text"
                           name="toApartmentSize"
                           value={formData.toApartmentSize}
                           onChange={handleInputChange}
                           placeholder="100"
                           className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                             errors.toApartmentSize ? "border-red-500" : ""
                           }`}
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                         {errors.toApartmentSize && (
                           <p className="mt-1 text-sm text-red-600">{errors.toApartmentSize}</p>
                         )}
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Typ av bostad</strong>
                         </label>
                         <select
                           name="toTypeOfHome"
                           value={formData.toTypeOfHome}
                           onChange={handleInputChange}
                           className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                             errors.toTypeOfHome ? "border-red-500" : ""
                           }`}
                           style={{ backgroundColor: 'white', color: 'black' }}
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
                     </div>
                   )}

                   {movingStep === 5 && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Ny adress - Detaljer</h2>
                       
                       {formData.toTypeOfHome === 'lagenhet' && (
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>På vilken våning ligger lägenheten?</strong>
                           </label>
                           <select
                             name="toFloor"
                             value={formData.toFloor}
                             onChange={handleInputChange}
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.toFloor ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
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
                       )}

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Finns det hiss?</strong>
                         </label>
                         <div className="flex gap-6">
                           <label className="flex items-center">
                             <input
                               type="radio"
                               name="toHasElevator"
                               value="yes"
                               checked={formData.toHasElevator === 'yes'}
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
                               checked={formData.toHasElevator === 'no'}
                               onChange={handleInputChange}
                               className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                             />
                             <span className="ml-2 text-sm text-gray-700">Nej</span>
                           </label>
                         </div>
                       </div>

                       {formData.toHasElevator === 'yes' && (
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>Hissens storlek (mått)</strong>
                           </label>
                           <input
                             type="text"
                             name="toElevatorSize"
                             value={formData.toElevatorSize}
                             onChange={handleInputChange}
                             placeholder="t.ex. 2x2 meter"
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.toElevatorSize ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
                           />
                           {errors.toElevatorSize && (
                             <p className="mt-1 text-sm text-red-600">{errors.toElevatorSize}</p>
                           )}
                         </div>
                       )}

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Parkeringsavstånd (meter)</strong>
                         </label>
                         <input
                           type="text"
                           name="toParkingDistance"
                           value={formData.toParkingDistance}
                           onChange={handleInputChange}
                           placeholder="Ange avstånd"
                           className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                             errors.toParkingDistance ? "border-red-500" : ""
                           }`}
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                         {errors.toParkingDistance && (
                           <p className="mt-1 text-sm text-red-600">{errors.toParkingDistance}</p>
                         )}
                       </div>
                     </div>
                   )}

                   {movingStep === 6 && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Tunga och ömtåliga föremål</h2>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Har du tunga föremål som behöver särskild hantering?</strong>
                         </label>
                         <div className="flex gap-6">
                           <label className="flex items-center">
                             <input
                               type="radio"
                               name="hasHeavyItems"
                               value="yes"
                               checked={formData.hasHeavyItems === 'yes'}
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
                               checked={formData.hasHeavyItems === 'no'}
                               onChange={handleInputChange}
                               className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                             />
                             <span className="ml-2 text-sm text-gray-700">Nej</span>
                           </label>
                         </div>
                         {errors.hasHeavyItems && (
                           <p className="mt-1 text-sm text-red-600">{errors.hasHeavyItems}</p>
                         )}
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Har du ömtåliga föremål som behöver särskild försiktighet?</strong>
                         </label>
                         <div className="flex gap-6">
                           <label className="flex items-center">
                             <input
                               type="radio"
                               name="hasDelicateItems"
                               value="yes"
                               checked={formData.hasDelicateItems === 'yes'}
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
                               checked={formData.hasDelicateItems === 'no'}
                               onChange={handleInputChange}
                               className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                             />
                             <span className="ml-2 text-sm text-gray-700">Nej</span>
                           </label>
                         </div>
                         {errors.hasDelicateItems && (
                           <p className="mt-1 text-sm text-red-600">{errors.hasDelicateItems}</p>
                         )}
                       </div>

                       {formData.hasDelicateItems === 'yes' && (
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>Beskriv de ömtåliga föremålen</strong>
                           </label>
                           <textarea
                             name="delicateItemsDescription"
                             value={formData.delicateItemsDescription}
                             onChange={handleInputChange}
                             placeholder="Beskriv vilka ömtåliga föremål du har och hur de ska hanteras"
                             rows={4}
                             className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                               errors.delicateItemsDescription ? "border-red-500" : ""
                             }`}
                             style={{ backgroundColor: 'white', color: 'black' }}
                           />
                           {errors.delicateItemsDescription && (
                             <p className="mt-1 text-sm text-red-600">{errors.delicateItemsDescription}</p>
                           )}
                         </div>
                       )}
                     </div>
                   )}

                   {movingStep === 7 && (
                     <div className="space-y-6">
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>{localCustomerType === 'foretag' ? 'Företagsnamn' : 'Ditt namn'}</strong>
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
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             <strong>Kontaktperson för och efternamn</strong>
                           </label>
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
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>E-post</strong>
                         </label>
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
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Telefon</strong>
                         </label>
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

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>Övriga önskemål (frivilligt)</strong>
                         </label>
                         <textarea
                           name="additionalInfo"
                           value={formData.additionalInfo}
                           onChange={handleInputChange}
                           placeholder="Här kan du nämna särskilda önskemål eller information"
                           rows={4}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                       </div>
                     </div>
                   )}
                 </div>
               )}
              {step === 4 && selectedCleaningType === 'Flyttstädning' && formData.wantsMovingHelp === 'Nej' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? 'Företagsnamn' : 'Ditt namn'}</strong></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Kontaktperson för och efternamn</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>E-post</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Telefon</strong></label>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Övriga önskemål (frivilligt)</strong></label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Här kan du nämna särskilda önskemål eller information"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && selectedCleaningType === 'Annan städning' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Kontaktinformation</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? 'Företagsnamn' : 'Ditt namn'}</strong></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Kontaktperson för och efternamn</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>E-post</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>Telefon</strong></label>
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
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-8">
                {isMovingForm ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (movingStep > 1) {
                          setMovingStep(prev => prev - 1);
                          setErrors({});
                          setTouchedFields({});
                        } else {
                          setIsMovingForm(false);
                          setMovingStep(1);
                          setErrors({});
                          setTouchedFields({});
                        }
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
                    >
                      Tillbaka
                    </button>
                    {movingStep < 7 ? (
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
                  </>
                ) : (
                  <>
                    {step === 0 ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onCancel();
                        }}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
                      >
                        Tillbaka
                      </button>
                    ) : step > 0 && (
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
                    {(selectedCleaningType === 'Annan städning' ? (step < 4) : 
                      selectedCleaningType === 'Flyttstädning' ? (step < 4) : 
                      (step < 3)) ? (
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
                  </>
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
      </div>
    </>
  );
};

export default StadningOffertForm; 
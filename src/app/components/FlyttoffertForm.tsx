"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StadningOffertForm from './StadningOffertForm';
import { useLanguage } from '../contexts/LanguageContext';

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
  cleaningCardSubtitle?: string; // optional override for cleaning card subtitle
  defaultCustomerType?: 'privat' | 'foretag'; // optional default customer type
  autoStartService?: string; // automatically start with this service type
  backgroundImage?: string; // optional custom background image
}

export default function FlyttoffertForm({ mode: _mode = 'full', swapServiceOrder = false, onServiceTypeSelect, cleaningCardSubtitle, defaultCustomerType = 'privat', autoStartService, backgroundImage = '/ostermalm.avif' }: FlyttoffertFormProps) {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItem, setCustomItem] = useState({ type: "", weight: "" });
  const [customItemError, setCustomItemError] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [lastValidCurrentAddress, setLastValidCurrentAddress] = useState("");
  const [lastValidNewAddress, setLastValidNewAddress] = useState("");
  
  // Custom address autocomplete states
  const [currentAddressSuggestions, setCurrentAddressSuggestions] = useState<any[]>([]);
  const [newAddressSuggestions, setNewAddressSuggestions] = useState<any[]>([]);
  const [showCurrentSuggestions, setShowCurrentSuggestions] = useState(false);
  const [showNewSuggestions, setShowNewSuggestions] = useState(false);
  const [isLoadingCurrentSuggestions, setIsLoadingCurrentSuggestions] = useState(false);
  const [isLoadingNewSuggestions, setIsLoadingNewSuggestions] = useState(false);
  
  // Track if addresses were selected from dropdown (not manually typed)
  const [isCurrentAddressValid, setIsCurrentAddressValid] = useState(false);
  const [isNewAddressValid, setIsNewAddressValid] = useState(false);
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
    movingDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })(),
    flexibleMovingDate: "",
    needsPacking: false,
    needsStorage: false,
    needsCleaning: false,
    additionalInfo: "",
    wantsFlexibleDate: false,
    elevatorSize: "",
    toElevatorSize: "",
    customerType: defaultCustomerType, // use prop or default to 'privat'
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
  
  // Custom address search function using Swedish address API
  const searchAddresses = async (query: string, isCurrentAddress: boolean = true) => {
    if (query.length < 2) {
      if (isCurrentAddress) {
        setCurrentAddressSuggestions([]);
        setShowCurrentSuggestions(false);
      } else {
        setNewAddressSuggestions([]);
        setShowNewSuggestions(false);
      }
      return;
    }

    if (isCurrentAddress) {
      setIsLoadingCurrentSuggestions(true);
    } else {
      setIsLoadingNewSuggestions(true);
    }

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

        if (isCurrentAddress) {
          setCurrentAddressSuggestions(suggestions);
          setShowCurrentSuggestions(suggestions.length > 0);
        } else {
          setNewAddressSuggestions(suggestions);
          setShowNewSuggestions(suggestions.length > 0);
        }
      } else {
        if (isCurrentAddress) {
          setCurrentAddressSuggestions([]);
          setShowCurrentSuggestions(false);
        } else {
          setNewAddressSuggestions([]);
          setShowNewSuggestions(false);
        }
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      if (isCurrentAddress) {
        setCurrentAddressSuggestions([]);
        setShowCurrentSuggestions(false);
      } else {
        setNewAddressSuggestions([]);
        setShowNewSuggestions(false);
      }
    } finally {
      if (isCurrentAddress) {
        setIsLoadingCurrentSuggestions(false);
      } else {
        setIsLoadingNewSuggestions(false);
      }
    }
  };

  // Debounced search
  const debounceSearch = useRef<NodeJS.Timeout>();
  const handleAddressSearch = (query: string, isCurrentAddress: boolean = true) => {
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }
    debounceSearch.current = setTimeout(() => {
      searchAddresses(query, isCurrentAddress);
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

  useEffect(() => {
    if (currentAddressRef.current) {
      const input = currentAddressRef.current;
      input.scrollLeft = input.scrollWidth;
    }
  }, [formData.currentAddress]);

  // Handle autoStartService prop
  useEffect(() => {
    if (autoStartService === 'flytt') {
      // Check if there's address data from the cleaning form
      const cleaningFormAddress = sessionStorage.getItem('cleaningFormAddress');
      let addressData: { currentAddress?: string; apartmentNumber?: string; postalCode?: string } = {};
      
      if (cleaningFormAddress) {
        try {
          const parsedAddress = JSON.parse(cleaningFormAddress);
          addressData = {
            currentAddress: parsedAddress.address,
            apartmentNumber: parsedAddress.streetNumber,
            postalCode: parsedAddress.postalCode
          };
          // Clear the stored data after using it
          sessionStorage.removeItem('cleaningFormAddress');
        } catch (error) {
          console.error('Error parsing cleaning form address:', error);
        }
      }
      
      setFormData(prev => ({ 
        ...prev, 
        serviceType: 'flytt',
        needsCleaning: true, // Set flyttstädning to "Ja" since they came from the cleaning form
        ...addressData // Prefill address data from cleaning form
      }));
      
      // If we have address data, mark it as valid since it came from the cleaning form
      if (addressData.currentAddress) {
        setIsCurrentAddressValid(true);
        setLastValidCurrentAddress(addressData.currentAddress);
      }
      
      setShowSteps(true);
      setStep(1);
      if (onServiceTypeSelect) onServiceTypeSelect('flytt');
    }
  }, [autoStartService, onServiceTypeSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Clear elevator-related fields when property type changes
    if (name === 'typeOfHome') {
      const shouldShowElevator = value === 'Lägenhet' || value === 'magasin';
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
    
    // Clear elevator-related fields when new address property type changes
    if (name === 'toTypeOfHome') {
      const shouldShowElevator = value === 'Lägenhet' || value === 'magasin';
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
      newErrors.serviceType = t('hero.form.validation.selectService');
      isValid = false;
    }
    if (!formData.movingDate || !formData.movingDate.trim()) {
      newErrors.movingDate = t('hero.form.validation.selectMovingDate');
      isValid = false;
    } else {
      const selectedDate = new Date(formData.movingDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      if (selectedDate < tomorrow) {
        newErrors.movingDate = t('hero.form.validation.movingDateTomorrow');
        isValid = false;
      }
    }
    if (formData.wantsFlexibleDate && (!formData.flexibleMovingDate || !formData.flexibleMovingDate.trim())) {
      newErrors.flexibleMovingDate = t('hero.form.validation.selectFlexibleDate');
      isValid = false;
    }
    if (formData.needsPacking === undefined) {
      newErrors.needsPacking = t('hero.form.validation.selectPackingHelp');
      isValid = false;
    }
    if (formData.needsStorage === undefined) {
      newErrors.needsStorage = t('hero.form.validation.selectStorage');
      isValid = false;
    }
    if (formData.needsCleaning === undefined) {
      newErrors.needsCleaning = t('hero.form.validation.selectCleaning');
      isValid = false;
    }
    if (formData.needsDisposal === undefined) {
      newErrors.needsDisposal = t('hero.form.validation.selectDisposal');
      isValid = false;
    }



    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.currentAddress || !formData.currentAddress.trim()) {
      newErrors.currentAddress = t('hero.form.validation.enterValidAddress');
      isValid = false;
    } else if (!isCurrentAddressValid) {
      newErrors.currentAddress = t('hero.form.validation.selectAddressFromList');
      isValid = false;
    }
    if (!formData.apartmentNumber || !formData.apartmentNumber.trim()) {
      newErrors.apartmentNumber = t('hero.form.validation.enterStreetNumber');
      isValid = false;
    } else if (!/^[0-9]+[A-Za-z]?$/.test(formData.apartmentNumber)) {
      newErrors.apartmentNumber = "Gatunummer måste börja med siffror och kan avslutas med en bokstav";
      isValid = false;
    }
    if (!formData.postalCode || !formData.postalCode.trim()) {
      newErrors.postalCode = t('hero.form.validation.enterPostalCode');
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = t('hero.form.validation.postalCodeFiveDigits');
      isValid = false;
    }
    if (!formData.apartmentSize || !formData.apartmentSize.trim()) {
      newErrors.apartmentSize = formData.customerType === 'foretag' ? t('hero.form.validation.enterOfficeSize') : t('hero.form.validation.enterApartmentSize');
      isValid = false;
    } else if (isNaN(Number(formData.apartmentSize)) || Number(formData.apartmentSize) <= 0) {
      newErrors.apartmentSize = formData.customerType === 'foretag' ? t('hero.form.validation.officeSizePositive') : t('hero.form.validation.apartmentSizePositive');
      isValid = false;
    }
    if (formData.customerType !== 'foretag') {
    if (!formData.typeOfHome || !formData.typeOfHome.trim()) {
      newErrors.typeOfHome = t('hero.form.validation.selectHomeType');
      isValid = false;
      }
    }
    if (formData.customerType === 'foretag') {
      if (!formData.workplaceCount || !formData.workplaceCount.trim()) {
        newErrors.workplaceCount = t('hero.form.validation.enterWorkplaceCount');
        isValid = false;
      } else if (isNaN(Number(formData.workplaceCount)) || Number(formData.workplaceCount) <= 0) {
        newErrors.workplaceCount = t('hero.form.validation.workplaceCountPositive');
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
      newErrors.floor = t('hero.form.validation.selectFloor');
      isValid = false;
    }
    if (formData.typeOfHome === "Lägenhet" && !formData.hasElevator) {
      newErrors.hasElevator = t('hero.form.validation.selectElevator');
      isValid = false;
    }
    if (formData.hasElevator === "yes" && !formData.elevatorSize) {
      newErrors.elevatorSize = t('hero.form.validation.selectElevatorSize');
      isValid = false;
    }
    if (!formData.parkingDistance || !formData.parkingDistance.trim()) {
      newErrors.parkingDistance = t('hero.form.validation.enterParkingDistance');
      isValid = false;
    } else if (isNaN(Number(formData.parkingDistance)) || Number(formData.parkingDistance) < 0) {
      newErrors.parkingDistance = t('hero.form.validation.parkingDistancePositive');
      isValid = false;
    }
    if (!formData.hasAttic) {
      newErrors.hasAttic = t('hero.form.validation.selectAttic');
      isValid = false;
    }
    if (formData.hasAttic === "yes" && (!formData.atticArea || !formData.atticArea.trim())) {
      newErrors.atticArea = t('hero.form.validation.enterAtticArea');
      isValid = false;
    } else if (formData.hasAttic === "yes" && (isNaN(Number(formData.atticArea)) || Number(formData.atticArea) <= 0)) {
      newErrors.atticArea = t('hero.form.validation.areaPositive');
      isValid = false;
    }
    if (!formData.hasBasementStorage) {
      newErrors.hasBasementStorage = t('hero.form.validation.selectBasementStorage');
      isValid = false;
    }
    if (formData.hasBasementStorage === "yes" && (!formData.basementStorageArea || !formData.basementStorageArea.trim())) {
      newErrors.basementStorageArea = t('hero.form.validation.enterBasementStorageArea');
      isValid = false;
    } else if (formData.hasBasementStorage === "yes" && (isNaN(Number(formData.basementStorageArea)) || Number(formData.basementStorageArea) <= 0)) {
      newErrors.basementStorageArea = t('hero.form.validation.areaPositive');
      isValid = false;
    }
    if (!formData.hasGarage) {
      newErrors.hasGarage = t('hero.form.validation.selectGarage');
      isValid = false;
    }
    if (formData.hasGarage === "yes" && (!formData.garageArea || !formData.garageArea.trim())) {
      newErrors.garageArea = t('hero.form.validation.enterGarageArea');
      isValid = false;
    } else if (formData.hasGarage === "yes" && (isNaN(Number(formData.garageArea)) || Number(formData.garageArea) <= 0)) {
      newErrors.garageArea = t('hero.form.validation.areaPositive');
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.newAddress || !formData.newAddress.trim()) {
      newErrors.newAddress = t('hero.form.validation.enterNewAddress');
      isValid = false;
    } else if (!isNewAddressValid) {
      newErrors.newAddress = t('hero.form.validation.selectNewAddressFromList');
      isValid = false;
    }
    if (!formData.toApartmentNumber || !formData.toApartmentNumber.trim()) {
      newErrors.toApartmentNumber = t('hero.form.validation.enterNewStreetNumber');
      isValid = false;
    }
    if (!formData.toPostalCode || !formData.toPostalCode.trim()) {
      newErrors.toPostalCode = t('hero.form.validation.enterNewPostalCode');
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.toPostalCode)) {
      newErrors.toPostalCode = t('hero.form.validation.newPostalCodeFiveDigits');
      isValid = false;
    }
    if (!formData.toApartmentSize || !formData.toApartmentSize.trim()) {
      newErrors.toApartmentSize = formData.customerType === 'foretag' ? t('hero.form.validation.enterNewOfficeSize') : t('hero.form.validation.enterNewApartmentSize');
      isValid = false;
    } else if (isNaN(Number(formData.toApartmentSize)) || Number(formData.toApartmentSize) <= 0) {
      newErrors.toApartmentSize = formData.customerType === 'foretag' ? t('hero.form.validation.newOfficeSizePositive') : t('hero.form.validation.newApartmentSizePositive');
      isValid = false;
    }
    if (formData.customerType !== 'foretag') {
      if (!formData.toTypeOfHome || !formData.toTypeOfHome.trim()) {
        newErrors.toTypeOfHome = t('hero.form.validation.selectNewHomeType');
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep5 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Lägenhet-specific validation
    if ((formData.customerType as string) !== 'foretag' && formData.toTypeOfHome === 'Lägenhet') {
      if (!formData.toFloor) {
        newErrors.toFloor = t('hero.form.validation.selectNewFloor');
        isValid = false;
      }
      if (!formData.toHasElevator) {
        newErrors.toHasElevator = t('hero.form.validation.selectNewElevator');
        isValid = false;
      }
      if (formData.toHasElevator === "yes" && !formData.toElevatorSize) {
        newErrors.toElevatorSize = t('hero.form.validation.selectNewElevatorSize');
        isValid = false;
      }
    } else {
      // Validation for other property types (företag, villa, etc.)
      if (!formData.toFloor) {
        if (formData.customerType === 'foretag') {
          newErrors.toFloor = t('hero.form.validation.selectNewFloor');
        } else {
          newErrors.toFloor = t('hero.form.validation.enterNewFloorCount');
        }
        isValid = false;
      }
      
      // Elevator validation for företag and magasin
      if ((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.toTypeOfHome === 'magasin')) {
        if (!formData.toHasElevator) {
          newErrors.toHasElevator = t('hero.form.validation.selectNewElevator');
          isValid = false;
        }
        if (formData.toHasElevator === "yes" && !formData.toElevatorSize) {
          newErrors.toElevatorSize = t('hero.form.validation.selectNewElevatorSize');
          isValid = false;
        }
      }
    }
    
    if (!formData.toParkingDistance || !formData.toParkingDistance.trim()) {
      newErrors.toParkingDistance = t('hero.form.validation.enterUnloadingDistance');
      isValid = false;
    } else if (isNaN(Number(formData.toParkingDistance)) || Number(formData.toParkingDistance) < 0) {
      newErrors.toParkingDistance = t('hero.form.validation.unloadingDistancePositive');
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep6 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (formData.hasHeavyItems === "yes" && (!formData.heavyItems || formData.heavyItems.length === 0)) {
      newErrors.heavyItems = t('hero.form.validation.enterHeavyItems');
      isValid = false;
    }
    if (formData.hasDelicateItems === "yes" && !formData.delicateItemsDescription.trim()) {
      newErrors.delicateItemsDescription = t('hero.form.validation.enterDelicateItems');
      isValid = false;
    }
    if (!formData.hasHeavyItems) {
      newErrors.hasHeavyItems = t('hero.form.validation.selectOption');
      isValid = false;
    }
    if (!formData.hasDelicateItems) {
      newErrors.hasDelicateItems = t('hero.form.validation.selectOption');
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateStep7 = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = t('hero.form.validation.enterName');
      isValid = false;
    }
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = t('hero.form.validation.enterEmail');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('hero.form.validation.enterValidEmail');
      isValid = false;
    }
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = t('hero.form.validation.enterPhone');
      isValid = false;
    } else if (!/^[0-9\s-+()]*$/.test(formData.phone)) {
      newErrors.phone = t('hero.form.validation.enterValidPhone');
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
      <div className="relative rounded-2xl shadow-2xl border-2 border-[#10B981] p-6 md:p-12 max-w-xl w-full mx-auto overflow-hidden bg-gradient-to-br from-white to-blue-50">
        {/* Background image for mobile only - first step only */}
        {!showSteps && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 md:hidden"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <div className="flex flex-col items-center relative z-10">
          <Image src="/flyttella-logo.png" alt="Flyttella logo" width={80} height={80} className="mb-4 hidden md:block" />
          {!showSteps && (
            <>
          <h1 className="text-2xl md:text-4xl font-extrabold text-center text-[#0F172A] mb-8 md:mb-2 leading-tight">
            <span className="md:hidden">
              {t('hero.formSubtitleMobile').split(' ').map((word: string, index: number, array: string[]) => (
                <React.Fragment key={index}>
                  {word}
                  {index < array.length - 1 && (
                    index === 1 || index === 3 || index === 6 ? <br /> : ' '
                  )}
                </React.Fragment>
              ))}
            </span>
            <span className="hidden md:inline">
              {t('hero.formSubtitle')}
            </span>
          </h1>
          <h2 className="text-lg md:text-xl font-black text-center text-[#0F172A] mb-8 hidden md:block drop-shadow-sm">
            {t('hero.responseTime')}
          </h2>
            </>
          )}
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
                kontaktTyp: formData.customerType === 'foretag' ? 'Företag' : 'Privat',
                datum: formData.movingDate,
                flyttaFran: {
                  address: formData.currentAddress,
                  gatunummer: formData.apartmentNumber,
                  postnummer: formData.postalCode,
                  bostadstyp: formData.typeOfHome,
                  kvadrat: formData.apartmentSize,
                  antalRum: formData.numberOfRooms,
                  vaningNr: formData.floor,
                  hasElevator: formData.hasElevator === "yes" ? t('hero.form.yes') : t('hero.form.no'),
                  elevatorSize: formData.hasElevator === "yes" ? (formData.elevatorSize === "small" ? t('hero.form.options.elevator.small') : formData.elevatorSize === "large" ? t('hero.form.options.elevator.largeResidential') : formData.elevatorSize) : undefined,
                  parkeringsAvstand: formData.parkingDistance,
                  workplaceCount: formData.customerType === 'foretag' ? formData.workplaceCount : undefined,
                  hasAttic: formData.hasAttic === "yes" ? t('hero.form.yes') : t('hero.form.no'),
                  atticArea: formData.hasAttic === "yes" ? formData.atticArea : undefined,
                  hasBasementStorage: formData.hasBasementStorage === "yes" ? t('hero.form.yes') : t('hero.form.no'),
                  basementStorageArea: formData.hasBasementStorage === "yes" ? formData.basementStorageArea : undefined,
                  hasGarage: formData.hasGarage === "yes" ? t('hero.form.yes') : t('hero.form.no'),
                  garageArea: formData.hasGarage === "yes" ? formData.garageArea : undefined,
                  hasLoadingDock: formData.customerType === 'foretag' ? (formData.hasLoadingDock === "yes" ? t('hero.form.yes') : t('hero.form.no')) : undefined
                },
                flyttaTill: {
                  address: formData.newAddress,
                  gatunummer: formData.toApartmentNumber,
                  postnummer: formData.toPostalCode,
                  bostadstyp: formData.toTypeOfHome,
                  kvadrat: formData.toApartmentSize,
                  antalRum: formData.toNumberOfRooms,
                  vaningNr: formData.toFloor,
                  hasElevator: formData.toHasElevator === "yes" ? t('hero.form.yes') : t('hero.form.no'),
                  elevatorSize: formData.toHasElevator === "yes" ? (formData.toElevatorSize === "small" ? t('hero.form.options.elevator.small') : formData.toElevatorSize === "large" ? t('hero.form.options.elevator.largeResidential') : formData.toElevatorSize) : undefined,
                  parkeringsAvstand: formData.toParkingDistance,
                  hasLoadingDock: formData.customerType === 'foretag' ? (formData.toHasLoadingDock === "yes" ? t('hero.form.yes') : t('hero.form.no')) : undefined
                },
                flexibeltDatum: formData.wantsFlexibleDate ? formData.flexibleMovingDate : t('hero.form.no'),
                villDuHaPackhjalp: formData.needsPacking ? t('hero.form.yes') : t('hero.form.no'),
                villDuHaLagring: formData.needsStorage ? t('hero.form.yes') : t('hero.form.no'),
                villDuHaStadning: formData.needsCleaning ? t('hero.form.yes') : t('hero.form.no'),
                villDuHaBortforsling: formData.needsDisposal ? t('hero.form.yes') : t('hero.form.no'),
                tungaForemal: formData.hasHeavyItems === "yes" ? 
                  formData.heavyItems.map(item => `${item.type}${item.description ? ` (${item.description})` : ''}`).join(", ") : 
                  t('hero.form.no'),
                omtaligaForemal: formData.hasDelicateItems === "yes" ? formData.delicateItemsDescription : t('hero.form.no'),
                kontaktInfo: {
                  namn: formData.name,
                  email: formData.email,
                  telefon: formData.phone,
                  contactPersonName: formData.customerType === 'foretag' ? formData.contactPersonName : undefined
                },
                additionalInfo: formData.additionalInfo || "Inga övriga önskemål",
                language: locale
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
                  // Redirect to thank you page
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
                        className="relative rounded-xl py-6 px-3 md:py-8 md:px-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
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
                          <span className="text-3xl md:text-5xl mb-3 md:mb-5">✨</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{swapServiceOrder ? t('hero.services.stadning') : t('hero.services.flyttstad')}</h3>
                          <p className="text-base md:text-lg opacity-90">
                            <span className="md:hidden">{t('hero.services.stadningDesc')}</span>
                            <span className="hidden md:inline">{t('hero.services.flyttstadDesc')}</span>
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="relative rounded-xl py-6 px-3 md:py-8 md:px-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
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
                          <span className="text-3xl md:text-5xl mb-3 md:mb-5">🏠</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('hero.services.flytt')}</h3>
                          <p className="text-base md:text-lg opacity-90">
                            <span className="md:hidden">{t('hero.services.flyttDesc')}</span>
                            <span className="hidden md:inline">{t('hero.services.flyttDesc')}</span>
                          </p>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="relative rounded-xl py-6 px-3 md:py-8 md:px-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
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
                          <span className="text-3xl md:text-5xl mb-3 md:mb-5">🏠</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('hero.services.flytt')}</h3>
                          <p className="text-base md:text-lg opacity-90">
                            <span className="md:hidden">{t('hero.services.flyttDesc')}</span>
                            <span className="hidden md:inline">{t('hero.services.flyttDesc')}</span>
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="relative rounded-xl py-6 px-3 md:py-8 md:px-6 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white shadow-lg"
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
                          <span className="text-3xl md:text-5xl mb-3 md:mb-5">✨</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{swapServiceOrder ? t('hero.services.stadning') : t('hero.services.stad')}</h3>
                          <p className="text-base md:text-lg opacity-90">
                            <span className="md:hidden">{t('hero.services.stadningDesc')}</span>
                            <span className="hidden md:inline">{cleaningCardSubtitle ?? t('hero.services.stadningDesc')}</span>
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
                
                {/* Five Years Badge for mobile */}
                <div className="md:hidden mt-12 pt-4">
                  <div className="flex justify-center">
                    <Image 
                      src="/badgeSixYearsNew.png" 
                      alt="Five Years Badge" 
                      width={220} 
                      height={110} 
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                </div>
                
                {/* Recommended company badges for mobile */}
                <div className="md:hidden -mt-8 mr-8 ">
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
                      alt="Rekommenderat företag 2025" 
                      width={120} 
                      height={120} 
                      className="w-24 h-24 object-contain relative z-50 mt-2 translate-x-2"
                    />
                    <Image 
                      src="/rekommenderad2026.png" 
                      alt="Rekommenderat företag 2026" 
                      width={100} 
                      height={120} 
                      className="w-[84px] h-[84px] object-contain relative z-[60] mt-3 translate-x-8"
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
                  {t('hero.buttons.privat')}
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-r-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 -ml-px ${formData.customerType === 'foretag' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                  onClick={() => setFormData(prev => ({ ...prev, customerType: 'foretag' }))}
                >
                  {t('hero.buttons.foretag')}
                </button>
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.title')}</h2>
              <div>
                                  <label className="block text-lg font-medium text-gray-700 mb-2"><strong>{t('hero.form.desiredMovingDate')}</strong></label>
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
                    {t('hero.form.flexibleWithDate')}
                  </label>
                </div>
                {formData.wantsFlexibleDate && (
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>{t('hero.form.flexibleMovingDate')}</strong></label>
                    <select
                      name="flexibleMovingDate"
                      value={formData.flexibleMovingDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg bg-white appearance-none${errors.flexibleMovingDate ? " border-red-500" : " border-gray-300"}`}
                    >
                      <option value="">{t('hero.form.select')}</option>
                      <option value="1">{t('hero.form.options.flexibleDate.1')}</option>
                      <option value="2">{t('hero.form.options.flexibleDate.2')}</option>
                      <option value="3">{t('hero.form.options.flexibleDate.3')}</option>
                      <option value="4">{t('hero.form.options.flexibleDate.4')}</option>
                      <option value="5">{t('hero.form.options.flexibleDate.5')}</option>
                      <option value="6">{t('hero.form.options.flexibleDate.6')}</option>
                      <option value="7">{t('hero.form.options.flexibleDate.7')}</option>
                      <option value="14">{t('hero.form.options.flexibleDate.14')}</option>
                      <option value="21">{t('hero.form.options.flexibleDate.21')}</option>
                      <option value="30">{t('hero.form.options.flexibleDate.30')}</option>
                      <option value="31+">{t('hero.form.options.flexibleDate.31plus')}</option>
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
                  <strong>{formData.customerType === 'foretag' ? t('hero.form.packingHelpBusiness') : t('hero.form.packingHelp')}</strong>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.yes')}</span>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.no')}</span>
                  </label>
                </div>
                {errors.needsPacking && (
                  <p className="mt-1 text-base text-red-600">{errors.needsPacking}</p>
                )}
              </div>



              {/* Storage question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? t('hero.form.storageBusiness') : t('hero.form.storage')}</strong>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.yes')}</span>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.no')}</span>
                  </label>
                </div>
                {errors.needsStorage && (
                  <p className="mt-1 text-base text-red-600">{errors.needsStorage}</p>
                )}
              </div>



              {/* Cleaning question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? t('hero.form.cleaningBusiness') : t('hero.form.cleaning')}</strong>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.yes')}</span>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.no')}</span>
                  </label>
                </div>
                {errors.needsCleaning && (
                  <p className="mt-1 text-base text-red-600">{errors.needsCleaning}</p>
                )}
              </div>

              {/* Disposal question */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  <strong>{formData.customerType === 'foretag' ? t('hero.form.disposalBusiness') : t('hero.form.disposal')}</strong>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.yes')}</span>
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
                    <span className="ml-2 text-lg text-gray-700">{t('hero.form.no')}</span>
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
                    {t('hero.buttons.tillbaka')}
                  </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {t('hero.buttons.nasta')}
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
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>{t('hero.form.currentAddress')}</strong></label>
                    <div className="relative">
                      <input
                        type="text"
                        id="currentAddress"
                        name="currentAddress"
                        ref={currentAddressRef}
                        value={formData.currentAddress}
                        onChange={(e) => {
                          setFormData({ ...formData, currentAddress: e.target.value });
                          setErrors({ ...errors, currentAddress: "" });
                          setIsCurrentAddressValid(false); // Invalidate when manually edited
                          handleAddressSearch(e.target.value, true);
                        }}
                        onFocus={() => {
                          if (formData.currentAddress.length >= 2) {
                            setShowCurrentSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding suggestions to allow for selection
                          setTimeout(() => setShowCurrentSuggestions(false), 200);
                        }}
                        placeholder={t('hero.form.placeholders.startTypingAddress')}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg ${
                          errors.currentAddress 
                            ? "border-red-500" 
                            : isCurrentAddressValid 
                              ? "border-green-500" 
                              : "border-gray-300"
                        }`}
                        style={{ WebkitOverflowScrolling: 'touch' }}
                      />
                      

                      
                      {/* Custom dropdown */}
                      {showCurrentSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {isLoadingCurrentSuggestions && (
                            <div className="p-4 text-center text-gray-500">
                              {t('hero.form.searchingAddresses')}
                            </div>
                          )}
                          {!isLoadingCurrentSuggestions && currentAddressSuggestions.length === 0 && formData.currentAddress.length >= 2 && (
                            <div className="p-4 text-center text-gray-500">
                              {t('hero.form.noAddressesFound')}
                            </div>
                          )}
                          {!isLoadingCurrentSuggestions && currentAddressSuggestions.map((suggestion, index) => (
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
                                  currentAddress: cleanAddress,
                                  apartmentNumber: suggestion.address_components.street_number || formData.apartmentNumber,
                                  postalCode: suggestion.address_components.postcode || formData.postalCode
                                });
                                setLastValidCurrentAddress(cleanAddress);
                                setIsCurrentAddressValid(true); // Mark as valid when selected from dropdown
                                setShowCurrentSuggestions(false);
                                setErrors({ 
                                  ...errors, 
                                  currentAddress: "",
                                  apartmentNumber: "",
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
                    {errors.currentAddress && (
                      <p className="mt-1 text-base text-red-600">{errors.currentAddress}</p>
                    )}
                  </div>
                  <div className="md:w-1/4">
                    <label className="block text-lg font-medium text-gray-700 mb-2"><strong>{t('hero.form.streetNumber')}</strong></label>
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
                  <label className="block text-lg font-medium text-gray-700 mb-2"><strong>{t('hero.form.postalCode')}</strong></label>
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
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.apartmentSizeBusiness') : t('hero.form.apartmentSize')}</strong>
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
                      <strong>{t('hero.form.workplaceCount')}</strong>
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
                      placeholder={t('hero.form.enterCount')}
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
                      <strong>{t('hero.form.typeOfHome')}</strong>
                    </label>
                  <select
                    name="typeOfHome"
                    value={formData.typeOfHome}
                    onChange={handleInputChange}
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none${errors.typeOfHome ? " border-red-500" : ""}`}
                  >
                    <option value="">-- Välj --</option>
                    <option value="Lägenhet">{t('hero.form.options.apartment')}</option>
                    <option value="villa">{t('hero.form.options.house')}</option>
                    <option value="parhus">{t('hero.form.options.rowHouse')}</option>
                    <option value="radhus">{t('hero.form.options.townhouse')}</option>
                    <option value="fritidshus">{t('hero.form.options.vacationHome')}</option>
                    <option value="magasin">{t('hero.form.storageOption')}</option>
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
                  {t('hero.buttons.tillbaka')}
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
                {formData.customerType === 'foretag' ? t('hero.form.currentBusinessAddress') : t('hero.form.currentAddressStep3')}
              </h2>
              <div className="space-y-6">
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.typeOfHome === 'Lägenhet')) ? (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.floorBusiness') : t('hero.form.floor')}</strong>
                    </label>
                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={(e) => {
                      handleInputChange(e);
                      setErrors(prev => ({ ...prev, floor: "" }));
                    }}
                    required
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none ${
                      errors.floor ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">-- Välj --</option>
                    <option value="-2">{t('hero.form.options.floor.minus2')}</option>
                    <option value="-1">{t('hero.form.options.floor.minus1')}</option>
                    <option value="entreplan">{t('hero.form.options.floor.ground')}</option>
                    <option value="1">{t('hero.form.options.floor.1')}</option>
                    <option value="2">{t('hero.form.options.floor.2')}</option>
                    <option value="3">{t('hero.form.options.floor.3')}</option>
                    <option value="4">{t('hero.form.options.floor.4')}</option>
                    <option value="5">{t('hero.form.options.floor.5')}</option>
                    <option value="6+">{t('hero.form.options.floor.6plus')}</option>
                  </select>
                  {errors.floor && (
                    <p className="mt-1 text-sm text-red-600">{errors.floor}</p>
                  )}
                </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.typeOfHome === 'magasin' ? t('hero.form.floorStorage') : t('hero.form.floors')}</strong>
                    </label>
                    <select
                      name="floor"
                      value={formData.floor}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, floor: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none ${
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
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && (formData.typeOfHome === 'Lägenhet' || formData.typeOfHome === 'magasin'))) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.elevatorInBuilding')}</strong></label>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.yes')}</span>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.no')}</span>
                      </label>
                    </div>
                    {errors.hasElevator && (
                      <p className="mt-1 text-sm text-red-600">{errors.hasElevator}</p>
                    )}
                  </div>
                )}
                {formData.hasElevator === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.elevatorSize')}</strong></label>
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
                          <option value="small">{t('hero.form.options.elevator.small')}</option>
                          <option value="medium">{t('hero.form.options.elevator.medium')}</option>
                          <option value="large">{t('hero.form.options.elevator.large')}</option>
                        </>
                      ) : (
                        <>
                      <option value="small">{t('hero.form.options.elevator.small')}</option>
                      <option value="large">{t('hero.form.options.elevator.largeResidential')}</option>
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
                      <strong>{t('hero.form.loadingDistance')}</strong>
                    </label>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.customerType === 'foretag' ? t('hero.form.loadingDistanceDescription') : t('hero.form.loadingDistanceDescriptionPrivate')}
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
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.hasAtticBusiness') : t('hero.form.hasAttic')}</strong>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.yes')}</span>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.no')}</span>
                    </label>
                  </div>
                  {errors.hasAttic && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasAttic}</p>
                  )}
                </div>

                {formData.hasAttic === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.atticArea')}</strong></label>
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
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.hasStorageRoomBusiness') : t('hero.form.hasStorageRoom')}</strong>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.yes')}</span>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.no')}</span>
                    </label>
                  </div>
                  {errors.hasBasementStorage && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasBasementStorage}</p>
                  )}
                </div>

                {formData.hasBasementStorage === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{t('hero.form.basementStorageArea')}</strong>
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
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.hasGarageBusiness') : t('hero.form.hasGarage')}</strong>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.yes')}</span>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.no')}</span>
                    </label>
                  </div>
                  {errors.hasGarage && (
                    <p className="mt-1 text-sm text-red-600">{errors.hasGarage}</p>
                  )}
                </div>

                {formData.hasGarage === "yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{t('hero.form.garageArea')}</strong>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.hasLoadingDock')}</strong></label>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.yes')}</span>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.no')}</span>
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
                  {t('hero.buttons.tillbaka')}
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
                {formData.customerType === 'foretag' ? t('hero.form.newBusinessAddress') : t('hero.form.newAddressStep4')}
              </h2>
              <p className="text-sm text-gray-700 mb-6">
                {formData.customerType === 'foretag' ? t('hero.form.newBusinessInfo') : t('hero.form.newAddressInfo')}
              </p>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.newAddress')}</strong></label>
                    <div className="relative">
                      <input
                        type="text"
                        id="newAddress"
                        name="newAddress"
                        value={formData.newAddress}
                        onChange={(e) => {
                          setFormData({ ...formData, newAddress: e.target.value });
                          setErrors({ ...errors, newAddress: "" });
                          setIsNewAddressValid(false); // Invalidate when manually edited
                          handleAddressSearch(e.target.value, false);
                        }}
                        onFocus={() => {
                          if (formData.newAddress.length >= 2) {
                            setShowNewSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding suggestions to allow for selection
                          setTimeout(() => setShowNewSuggestions(false), 200);
                        }}
                        placeholder={t('hero.form.placeholders.startTypingAddress')}
                        required
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] ${
                          errors.newAddress 
                            ? "border-red-500" 
                            : isNewAddressValid 
                              ? "border-green-500" 
                              : "border-gray-300"
                        }`}
                        style={{ WebkitOverflowScrolling: 'touch' }}
                      />
                      

                      
                      {/* Custom dropdown */}
                      {showNewSuggestions && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {isLoadingNewSuggestions && (
                            <div className="p-4 text-center text-gray-500">
                              {t('hero.form.searchingAddresses')}
                            </div>
                          )}
                          {!isLoadingNewSuggestions && newAddressSuggestions.length === 0 && formData.newAddress.length >= 2 && (
                            <div className="p-4 text-center text-gray-500">
                              {t('hero.form.noAddressesFound')}
                            </div>
                          )}
                          {!isLoadingNewSuggestions && newAddressSuggestions.map((suggestion, index) => (
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
                                  newAddress: cleanAddress,
                                  toApartmentNumber: suggestion.address_components.street_number || formData.toApartmentNumber,
                                  toPostalCode: suggestion.address_components.postcode || formData.toPostalCode
                                });
                                setLastValidNewAddress(cleanAddress);
                                setIsNewAddressValid(true); // Mark as valid when selected from dropdown
                                setShowNewSuggestions(false);
                                setErrors({ 
                                  ...errors, 
                                  newAddress: "",
                                  toApartmentNumber: "",
                                  toPostalCode: ""
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
                    {errors.newAddress && (
                      <p className="mt-1 text-sm text-red-600">{errors.newAddress}</p>
                    )}
                  </div>
                  <div className="md:w-1/4">
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.streetNumber')}</strong></label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.postalCode')}</strong></label>
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
                    <strong>{formData.customerType === 'foretag' ? t('hero.form.apartmentSizeBusiness') : t('hero.form.apartmentSize')}</strong>
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
                      <strong>{t('hero.form.typeOfHome')}</strong>
                    </label>
                  <select
                    name="toTypeOfHome"
                    value={formData.toTypeOfHome}
                    onChange={handleInputChange}
                    required
                    className={`w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none${errors.toTypeOfHome ? " border-red-500" : ""}`}
                  >
                    <option value="">{t('hero.form.select')}</option>
                    <option value="Lägenhet">{t('hero.form.options.apartment')}</option>
                    <option value="villa">{t('hero.form.options.house')}</option>
                    <option value="parhus">{t('hero.form.options.rowHouse')}</option>
                    <option value="radhus">{t('hero.form.options.townhouse')}</option>
                    <option value="fritidshus">{t('hero.form.options.vacationHome')}</option>
                    <option value="magasin">{t('hero.form.storageOption')}</option>
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
                  {t('hero.buttons.tillbaka')}
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
                {formData.customerType === 'foretag' ? t('hero.form.newBusinessAddress') : t('hero.form.newAddressStep4')}
              </h2>
              <div className="space-y-6">
                {/* Lägenhet-specific questions */}
                {((formData.customerType as string) !== 'foretag' && formData.toTypeOfHome === 'Lägenhet') ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <strong>{t('hero.form.floor')}</strong>
                      </label>
                      <select
                        name="toFloor"
                        value={formData.toFloor}
                        onChange={(e) => {
                          handleInputChange(e);
                          setErrors(prev => ({ ...prev, toFloor: "" }));
                        }}
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none ${
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <strong>{t('hero.form.elevatorInBuilding')}</strong>
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
                          <span className="ml-2 text-sm text-gray-700">{t('hero.form.yes')}</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="toHasElevator"
                            value="no"
                            checked={formData.toHasElevator === "no"}
                            onChange={(e) => {
                              handleInputChange(e);
                              setErrors(prev => ({ ...prev, toHasElevator: "" }));
                            }}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{t('hero.form.no')}</span>
                        </label>
                      </div>
                      {errors.toHasElevator && (
                        <p className="mt-1 text-sm text-red-600">{errors.toHasElevator}</p>
                      )}
                    </div>
                    {formData.toHasElevator === "yes" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <strong>{t('hero.form.elevatorSize')}</strong>
                        </label>
                        <select
                          name="toElevatorSize"
                          value={formData.toElevatorSize}
                          onChange={(e) => {
                            handleInputChange(e);
                            setErrors(prev => ({ ...prev, toElevatorSize: "" }));
                          }}
                          required
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none ${
                            errors.toElevatorSize ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">-- Välj --</option>
                          <option value="small">{t('hero.form.options.elevator.small')}</option>
                          <option value="large">{t('hero.form.options.elevator.largeResidential')}</option>
                        </select>
                        {errors.toElevatorSize && (
                          <p className="mt-1 text-sm text-red-600">{errors.toElevatorSize}</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Antal våningar for other property types */
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{formData.customerType === 'foretag' ? t('hero.form.floorBusiness') : (formData.toTypeOfHome === 'magasin' ? t('hero.form.floorStorage') : t('hero.form.floors'))}</strong>
                    </label>
                    <select
                      name="toFloor"
                      value={formData.toFloor}
                      onChange={(e) => {
                        handleInputChange(e);
                        setErrors(prev => ({ ...prev, toFloor: "" }));
                      }}
                      required
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none ${
                        errors.toFloor ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">{t('hero.form.select')}</option>
                      {formData.customerType === 'foretag' ? (
                        <>
                          <option value="-2">{t('hero.form.options.floor.minus2')}</option>
                          <option value="-1">{t('hero.form.options.floor.minus1')}</option>
                          <option value="entreplan">{t('hero.form.options.floor.ground')}</option>
                          <option value="1">{t('hero.form.options.floor.1')}</option>
                          <option value="2">{t('hero.form.options.floor.2')}</option>
                          <option value="3">{t('hero.form.options.floor.3')}</option>
                          <option value="4">{t('hero.form.options.floor.4')}</option>
                          <option value="5">{t('hero.form.options.floor.5')}</option>
                          <option value="6+">{t('hero.form.options.floor.6plus')}</option>
                        </>
                      ) : formData.toTypeOfHome === 'magasin' ? (
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
                {/* Elevator questions for företag and magasin (not lägenhet) */}
                {((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.toTypeOfHome === 'magasin')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.elevatorInBuilding')}</strong></label>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.yes')}</span>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.no')}</span>
                      </label>
                    </div>
                    {errors.toHasElevator && (
                      <p className="mt-1 text-sm text-red-600">{errors.toHasElevator}</p>
                    )}
                  </div>
                )}
                {formData.toHasElevator === "yes" && ((formData.customerType as string) === 'foretag' || ((formData.customerType as string) === 'privat' && formData.toTypeOfHome === 'magasin')) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.elevatorSize')}</strong></label>
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
                      <option value="">{t('hero.form.select')}</option>
                      <option value="small">{t('hero.form.options.elevator.small')}</option>
                      <option value="medium">{t('hero.form.options.elevator.medium')}</option>
                      <option value="large">{t('hero.form.options.elevator.large')}</option>
                    </select>
                    {errors.toElevatorSize && (
                      <p className="mt-1 text-sm text-red-600">{errors.toElevatorSize}</p>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <strong>{t('hero.form.unloadingDistance')}</strong>
                  </label>
                  <p className="text-sm text-gray-600 mb-2">
                    {formData.customerType === 'foretag' ? t('hero.form.loadingDistanceDescription') : t('hero.form.loadingDistanceDescriptionPrivate')}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.hasLoadingDock')}</strong></label>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.yes')}</span>
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
                        <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.no')}</span>
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
                  {t('hero.buttons.tillbaka')}
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
                {formData.customerType === 'foretag' ? t('hero.form.heavyAndDelicateItemsBusiness') : t('hero.form.heavyAndDelicateItems')}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    {formData.customerType === 'foretag' ? t('hero.form.hasHeavyItemsBusiness') : t('hero.form.hasHeavyItems')}
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.customerType === 'foretag'
                      ? <span className="font-bold">{t('hero.form.heavyItemsWarningBusiness')}</span>
                      : <span className="font-bold">{t('hero.form.heavyItemsWarning')}</span>
                    } {t('hero.form.heavyItemsExamples')}
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.yes')}</span>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.no')}</span>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('hero.form.addHeavyItem')}</label>
                        <div className="space-y-4">
                          <select
                            name="heavyItemType"
                            id="heavyItemType"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] bg-white appearance-none"
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
                            <option value="">{t('hero.form.select')}</option>
                            <option value="Piano">{t('hero.form.options.heavyItems.piano')}</option>
                            <option value="Flygel">{t('hero.form.options.heavyItems.grandPiano')}</option>
                            <option value="Kassaskåp">{t('hero.form.options.heavyItems.safe')}</option>
                            <option value="Akvarium (över 400L)">{t('hero.form.options.heavyItems.aquarium')}</option>
                            <option value="Stenbänkskiva">{t('hero.form.options.heavyItems.stoneCountertop')}</option>
                            <option value="Annan tung maskin (över 100kg)">{t('hero.form.options.heavyItems.heavyMachine')}</option>
                            <option value="other">{t('hero.form.options.heavyItems.other')}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-3">
                    {formData.customerType === 'foretag' ? t('hero.form.hasDelicateItemsBusiness') : t('hero.form.hasDelicateItems')}
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.customerType === 'foretag'
                      ? t('hero.form.delicateItemsDescriptionBusiness')
                      : t('hero.form.delicateItemsDescription')}
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.yes')}</span>
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
                      <span className="ml-2 text-sm text-gray-700">{t('hero.form.options.no')}</span>
                    </label>
                  </div>
                  {errors.hasDelicateItems && (
                    <p className="text-sm text-red-600 mt-1">{errors.hasDelicateItems}</p>
                  )}
                  {formData.hasDelicateItems === "yes" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('hero.form.whichDelicateItems')}</label>
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
                  {t('hero.buttons.tillbaka')}
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
                {formData.customerType === 'foretag' ? t('hero.form.contactInfoBusiness') : t('hero.form.contactInfo')}
              </h2>
              {formData.customerType === 'foretag' && (
                <>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.contactPersonName')}</strong></label>
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
                  <strong>{formData.customerType === 'foretag' ? t('hero.form.companyName') : t('hero.form.name')}</strong>
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
                <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.email')}</strong></label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.phone')}</strong></label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <strong>{locale === 'en' ? 'Other requests' : 'Övriga önskemål'}</strong>
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={locale === 'en' ? 'Any additional information or special requests...' : 'Eventuell ytterligare information eller särskilda önskemål...'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] resize-none"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-[#0F172A]"
                >
                  {t('hero.buttons.tillbaka')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {t('hero.buttons.skicka')}
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
                {t('hero.buttons.avbryt')}
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
                {t('hero.buttons.laggTill')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useLanguage } from '../contexts/LanguageContext';

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
  areaSize: string;
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
  /* NEW: whether the whole home should be cleaned */
  entireHome?: 'yes' | 'no';
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  typeOfHome?: string;
  areaSize?: string;
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
  const { t } = useLanguage();
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
  
  // Custom address autocomplete states
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [isLoadingAddressSuggestions, setIsLoadingAddressSuggestions] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  // Moving form state
  const [isMovingForm, setIsMovingForm] = useState(false);
  const [movingStep, setMovingStep] = useState(1);
  const [formData, setFormData] = useState<StadningFormData>({
    name: '',
    email: '',
    phone: '',
    typeOfHome: '',
    areaSize: '',
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
    comments: '',
    movingDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })(),
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
    entireHome: 'yes',
  } as StadningFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  // Debug log for current step
  // console.log('Current step:', step);

  // 1. Add the cleaning alternatives array
  const allCleaningAlternatives = [
    t('hero.form.options.cleaningTypes.flyttstadning'),
    t('hero.form.options.cleaningTypes.hemstadning'),
    t('hero.form.options.cleaningTypes.storstadning'),
    t('hero.form.options.cleaningTypes.visningsstadning'),
    t('hero.form.options.cleaningTypes.byggstadning'),
    t('hero.form.options.cleaningTypes.dodsboStadning'),
    t('hero.form.options.cleaningTypes.fonsterputs'),
    t('hero.form.options.cleaningTypes.otherCleaning'),
  ];

  const cleaningAlternatives = localCustomerType === 'foretag'
    ? [t('hero.form.options.cleaningTypes.kontorsstadning'), t('hero.form.options.cleaningTypes.byggstadning')]
    : allCleaningAlternatives;

  // Adjust step count for progress bar (now 4 steps)
  const totalSteps = 4;

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
  const debounceSearch = useRef<NodeJS.Timeout>();
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



  useEffect(() => {
    if (addressRef.current) {
      const input = addressRef.current;
      input.scrollLeft = input.scrollWidth;
    }
  }, [formData.address]);

  // Smooth scroll to the step progress bar (aligns with flytt form behavior)
  const scrollToStepBar = () => {
    setTimeout(() => {
      if (typeof window === 'undefined') return;
      const allSpans = document.querySelectorAll('span');
      const stepTextElement = Array.from(allSpans).find(span => span.textContent && span.textContent.includes('Steg'));
      if (stepTextElement) {
        const elementRect = stepTextElement.getBoundingClientRect();
        const headerHeight = 100;
        const scrollTop = window.pageYOffset + elementRect.top - headerHeight - 50;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }, 150);
  };

  // Auto-scroll whenever the visible step changes (cleaning or moving steps)
  useEffect(() => {
    scrollToStepBar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, movingStep]);

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
    if (selectedCleaningType === 'Hemstädning' || selectedCleaningType === 'Home cleaning') {
      if (!formData.cleaningDayTimePair || !formData.cleaningDayTimePair.day || !formData.cleaningDayTimePair.time) {
        newErrors.cleaningDayTimePair = t('hero.form.validation.selectCleaningDayTime');
      }
    } else if (selectedCleaningType === 'Storstädning' || selectedCleaningType === 'Deep cleaning' || selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
      if (!formData.movingDate.trim()) {
        newErrors.movingDate = t('hero.form.validation.selectCleaningDate');
      }
      if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
        newErrors.flexibleMovingDate = t('hero.form.validation.selectFlexibleCleaningDate');
      }
    } else if (selectedCleaningType !== 'Annan städning') {
      if (!formData.movingDate.trim()) {
        newErrors.movingDate = t('hero.form.validation.selectCleaningDate');
      }
      if (formData.wantsFlexibleDate && !formData.flexibleMovingDate.trim()) {
        newErrors.flexibleMovingDate = t('hero.form.validation.selectFlexibleCleaningDate');
      }
    }
    if (!formData.address.trim()) {
      newErrors.address = t('hero.form.validation.enterAddress');
    } else if (!isAddressValid) {
      newErrors.address = t('hero.form.validation.selectAddressFromList');
    }
    if (!formData.streetNumber.trim()) {
      newErrors.streetNumber = t('hero.form.validation.enterStreetNumber');
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = t('hero.form.validation.enterPostalCode');
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postnummer måste vara exakt 5 siffror';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Byggstädning: require at least one work type and one cleaning service
    if (selectedCleaningType === 'Byggstädning' || selectedCleaningType === 'Construction cleaning') {
      if (!formData.constructionWorkType || formData.constructionWorkType.length === 0) {
        newErrors.constructionWorkType = t('hero.form.validation.selectConstructionWork');
      }
      // Additional services are optional for construction cleaning
      // if (!formData.constructionCleaningServices || formData.constructionCleaningServices.length === 0) {
      //   newErrors.constructionCleaningServices = t('hero.form.validation.selectConstructionCleaning');
      // }
    } else if (selectedCleaningType !== 'Annan städning' && selectedCleaningType !== 'Fönsterputs' && selectedCleaningType !== 'Window cleaning') {
      if (!formData.typeOfHome.trim()) {
        newErrors.typeOfHome = t('hero.form.validation.selectHomeType');
      }
      if (!formData.areaSize.trim()) {
        newErrors.areaSize = t('hero.form.validation.enterAreaSize');
      } else if (isNaN(Number(formData.areaSize)) || Number(formData.areaSize) <= 0) {
        newErrors.areaSize = t('hero.form.validation.areaPositive');
      }
    }
    if ((selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && !formData.needsLadder.trim()) {
      newErrors.needsLadder = t('hero.form.validation.selectLadderNeed');
    }
    if ((selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && (!formData.windowTypes || formData.windowTypes.length === 0)) {
      newErrors.windowTypes = t('hero.form.validation.selectWindowType');
    }
    if ((selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && 
        (formData.windowsWithMullions || 0) + (formData.windowsWithoutMullions || 0) + (formData.topHungWindows || 0) === 0) {
      newErrors.windowCount = t('hero.form.validation.enterWindowCount');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
      // For "Annan städning", only validate the comments field
      if (!formData.comments.trim()) {
        newErrors.comments = t('hero.form.validation.describeCleaningService');
      }
    } else if (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') {
      // For "Flyttstädning", validate the moving help question
      if (!formData.wantsMovingHelp) {
        newErrors.wantsMovingHelp = t('hero.form.validation.selectMovingHelp');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
      // For "Annan städning", only validate contact fields
      if (!formData.name.trim()) {
        newErrors.name = t('hero.form.validation.enterName');
      }
      if (localCustomerType === 'foretag' && !formData.contactPersonName?.trim()) {
        newErrors.contactPersonName = t('hero.form.validation.enterContactPersonName');
      }
      if (!formData.email.trim()) {
        newErrors.email = t('hero.form.validation.enterEmail');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('hero.form.validation.enterValidEmail');
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t('hero.form.validation.enterPhone');
      }
    } else if ((selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') && (formData.wantsMovingHelp === 'Nej' || formData.wantsMovingHelp === 'No')) {
      // For "Flyttstädning" with "Nej"/"No", only validate contact fields
      if (!formData.name.trim()) {
        newErrors.name = t('hero.form.validation.enterName');
      }
      if (localCustomerType === 'foretag' && !formData.contactPersonName?.trim()) {
        newErrors.contactPersonName = t('hero.form.validation.enterContactPersonName');
      }
      if (!formData.email.trim()) {
        newErrors.email = t('hero.form.validation.enterEmail');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('hero.form.validation.enterValidEmail');
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t('hero.form.validation.enterPhone');
      }
    } else {
      // For other cleaning types, validate all fields
      if (!formData.name.trim()) {
        newErrors.name = t('hero.form.validation.enterName');
      }
      if (localCustomerType === 'foretag' && !formData.contactPersonName?.trim()) {
        newErrors.contactPersonName = t('hero.form.validation.enterContactPersonName');
      }
      if (!formData.email.trim()) {
        newErrors.email = t('hero.form.validation.enterEmail');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('hero.form.validation.enterValidEmail');
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t('hero.form.validation.enterPhone');
      }
      if (!formData.address.trim()) {
        newErrors.address = t('hero.form.validation.enterAddress');
      }
      if (!formData.streetNumber.trim()) {
        newErrors.streetNumber = t('hero.form.validation.enterStreetNumber');
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = t('hero.form.validation.enterPostalCode');
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
          newErrors.movingDate = t('hero.form.validation.selectDesiredMovingDate');
        } else {
          const selectedDate = new Date(formData.movingDate);
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);
          if (selectedDate < tomorrow) {
            newErrors.movingDate = t('hero.form.validation.movingDateMustBeTomorrow');
          }
        }
        if (formData.wantsFlexibleDate && (!formData.flexibleMovingDate || !formData.flexibleMovingDate.trim())) {
          newErrors.flexibleMovingDate = t('hero.form.validation.selectMovingDateFlexibility');
        }
        if (formData.needsPacking === undefined) {
          newErrors.needsPacking = t('hero.form.validation.selectPackingHelp');
        }
        if (formData.needsStorage === undefined) {
          newErrors.needsStorage = t('hero.form.validation.selectStorageNeed');
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
      setErrors({ cleaningType: t('hero.form.validation.selectCleaningService') });
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
        if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
          // Skip step 2 for "Annan städning" - go directly to step 3
          console.log('Skipping step 2 for Annan städning');
          setStep(3);
          return;
        } else {
          setTouchedFields(prev => ({ ...prev, typeOfHome: true }));
          isValid = validateStep2();
        }
        break;
      case 3:
        console.log('Validating step 3');
        if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
          setTouchedFields({ comments: true });
        } else if (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') {
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
      if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
        // For "Annan städning": step 0 -> 1 -> 3 -> 4
        if (step === 0 || step === 1 || step === 3) {
          console.log('Proceeding to next step for Annan städning');
          setStep((prev) => prev === 1 ? 3 : prev + 1);
          setErrors({});
          setTouchedFields({});
        }
      } else if (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') {
        // For "Flyttstädning": step 0 -> 1 -> 2 -> 3 -> 4
        if (step < 4) {
          console.log('Proceeding to next step for Flyttstädning');
          // If we're on step 3 and user selected "Ja"/"Yes" for moving help, redirect to FlyttOffertForm
          if (step === 3 && (formData.wantsMovingHelp === 'Ja' || formData.wantsMovingHelp === 'Yes')) {
            console.log('Redirecting to FlyttOffertForm');
            // Store address data in sessionStorage to prefill in the moving form
            sessionStorage.setItem('cleaningFormAddress', JSON.stringify({
              address: formData.address,
              streetNumber: formData.streetNumber,
              postalCode: formData.postalCode
            }));
            // Redirect to the main page with flytt service type selected
            window.location.href = '/?service=flytt';
            return;
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
    if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
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
        areaSize: formData.areaSize,
        entireHome: formData.entireHome,
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
    t('hero.form.options.daysOfWeek.monday'), 
    t('hero.form.options.daysOfWeek.tuesday'), 
    t('hero.form.options.daysOfWeek.wednesday'), 
    t('hero.form.options.daysOfWeek.thursday'), 
    t('hero.form.options.daysOfWeek.friday'), 
    t('hero.form.options.daysOfWeek.saturday'), 
    t('hero.form.options.daysOfWeek.sunday')
  ];
  const timeSlots = [
    t('hero.form.options.timeSlots.morning'), 
    t('hero.form.options.timeSlots.lateMorning'), 
    t('hero.form.options.timeSlots.afternoon'), 
    t('hero.form.options.timeSlots.lateAfternoon'), 
    t('hero.form.options.timeSlots.evening')
  ];

  // Calculate step indicator
  let displayStep = step + 1;
  let displayTotal = 4;
  if (isMovingForm) {
    displayStep = movingStep;
    displayTotal = 7;
  } else if (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') {
    // Map step to visible step for Annan städning
    if (step === 0) displayStep = 1;
    else if (step === 1) displayStep = 2;
    else if (step === 3) displayStep = 3;
    else if (step === 4) displayStep = 4;
    displayTotal = 4;
  } else if (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') {
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
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/flyttella-logo.png"
            alt="Flyttella Logo"
            width={80}
            height={30}
            className="mx-auto hidden md:block"
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
              <span className="text-sm font-medium text-gray-700">{t('hero.form.step')} {displayStep} {t('hero.form.of')} {displayTotal}</span>
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
              <strong className="font-bold">{t('hero.form.thankYou')}</strong>
              <span className="block sm:inline"> {t('hero.form.weWillGetBack')}</span>
            </div>
          ) : (
            <form 
              className="relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                if ((step === 3 && selectedCleaningType !== 'Flyttstädning' && selectedCleaningType !== 'Moving cleaning') || 
                    (step === 4 && (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning')) ||
                    (step === 4 && (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning'))) {
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
                      {t('hero.buttons.privat')}
                    </button>
                    <button
                      type="button"
                      className={`px-6 py-2 rounded-r-lg border border-[#10B981] text-lg font-semibold focus:outline-none transition-colors duration-200 -ml-px ${localCustomerType === 'foretag' ? 'bg-[#10B981] text-white' : 'bg-white text-[#10B981]'}`}
                      onClick={() => setLocalCustomerType('foretag')}
                    >
                      {t('hero.buttons.foretag')}
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-4">{t('hero.form.cleaningType')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {cleaningAlternatives.map((alt) => (
                      <button
                        key={alt}
                        type="button"
                        className={`px-3 py-4 rounded-lg border text-sm md:text-lg font-semibold focus:outline-none transition-colors duration-200 text-center whitespace-nowrap overflow-hidden ${selectedCleaningType === alt ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-white text-[#10B981] border-[#10B981]'}`}
                        onClick={() => setSelectedCleaningType(alt)}
                      >
                        <span className="block truncate">{alt}</span>
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
                    {(selectedCleaningType === 'Hemstädning' || selectedCleaningType === 'Home cleaning') ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.cleaningFrequency')}</strong></label>
                        <select
                          name="cleaningFrequency"
                          value={formData.cleaningFrequency}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                            errors.cleaningFrequency ? 'border-red-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: 'white', color: 'black' }}
                        >
                          <option value="">{t('hero.form.options.cleaningFrequency.select')}</option>
                          <option value="Ett tillfälle">{t('hero.form.options.cleaningFrequency.oneTime')}</option>
                          <option value="Varje vecka">{t('hero.form.options.cleaningFrequency.weekly')}</option>
                          <option value="Varannan vecka">{t('hero.form.options.cleaningFrequency.biweekly')}</option>
                          <option value="Var tredje vecka">{t('hero.form.options.cleaningFrequency.everyThreeWeeks')}</option>
                          <option value="Varje månad">{t('hero.form.options.cleaningFrequency.monthly')}</option>
                          <option value="Annat">{t('hero.form.options.cleaningFrequency.other')}</option>
                        </select>
                        {errors.cleaningFrequency && (
                          <p className="mt-1 text-sm text-red-600">{errors.cleaningFrequency}</p>
                        )}
                        {/* Move städdag and städtid dropdowns here */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.addCleaningDayTime')}</strong></label>
                          <div className="flex gap-2 items-center bg-white p-2 rounded shadow mb-2" style={{ backgroundColor: '#fff' }}>
                            <select
                              value={formData.cleaningDayTimePair.day}
                              onChange={e => setFormData(prev => ({ ...prev, cleaningDayTimePair: { ...prev.cleaningDayTimePair, day: e.target.value } }))}
                              className="px-2 py-1 border rounded w-32 bg-white text-black"
                              style={{ backgroundColor: 'white', color: 'black' }}
                            >
                              <option value="">{t('hero.form.selectDay')}</option>
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
                              <option value="">{t('hero.form.selectTime')}</option>
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
                    ) : (selectedCleaningType === 'Storstädning' || selectedCleaningType === 'Deep cleaning') ? (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.desiredCleaningDate')}</strong></label>
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
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg bg-white appearance-none min-h-[44px] h-[44px]${
                            errors.movingDate ? ' border-red-500' : ''
                          }`}
                        />
                        {errors.movingDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.movingDate}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') ? t('hero.form.desiredWindowCleaningDate') : t('hero.form.desiredCleaningDate')}</strong></label>
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
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent text-[#0F172A] text-lg bg-white appearance-none min-h-[44px] h-[44px]${
                            errors.movingDate ? ' border-red-500' : ''
                          }`}
                        />
                        {errors.movingDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.movingDate}</p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="space-y-4">
                    {(selectedCleaningType === 'Hemstädning' || selectedCleaningType === 'Home cleaning') ? (
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
                            {(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') ? t('hero.form.flexibleWithWindowCleaningDate') : t('hero.form.flexibleWithCleaningDate')}
                          </label>
                        </div>
                        {formData.wantsFlexibleDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') ? t('hero.form.flexibleWindowCleaningDate') : t('hero.form.flexibleCleaningDate')}</strong></label>
                            <select
                              name="flexibleMovingDate"
                              value={formData.flexibleMovingDate}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                                errors.flexibleMovingDate ? 'border-red-500' : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: 'white', color: 'black' }}
                            >
                              <option value="">{t('hero.form.select')}</option>
                              <option value="+- 1 dag">{t('hero.form.plusMinus1Day')}</option>
                              <option value="+- 2 dagar">{t('hero.form.plusMinus2Days')}</option>
                              <option value="+- 3 dagar">{t('hero.form.plusMinus3Days')}</option>
                              <option value="+- 4 dagar">{t('hero.form.plusMinus4Days')}</option>
                              <option value="+- 5 dagar">{t('hero.form.plusMinus5Days')}</option>
                              <option value="+- 6 dagar">{t('hero.form.plusMinus6Days')}</option>
                              <option value="+- 1 vecka">{t('hero.form.plusMinus1Week')}</option>
                              <option value="+- 2 veckor">{t('hero.form.plusMinus2Weeks')}</option>
                              <option value="+- 3 veckor">{t('hero.form.plusMinus3Weeks')}</option>
                              <option value="+- 1 månad">{t('hero.form.plusMinus1Month')}</option>
                              <option value="mer än 1 månad">{t('hero.form.moreThan1Month')}</option>
                            </select>
                            {errors.flexibleMovingDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.flexibleMovingDate}</p>
                            )}
                            <p className="mt-2 text-sm text-gray-600">
                              {(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning')
                                ? t('hero.form.flexibleWindowCleaningDateExplanation')
                                : t('hero.form.flexibleCleaningDateExplanation')
                              }
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.address')}</strong></label>
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
                          placeholder={t('hero.form.placeholders.startTypingAddress')}
                          required
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                            errors.address 
                              ? "border-red-500" 
                              : isAddressValid 
                                ? "border-green-500" 
                                : "border-gray-300"
                          }`}
                          style={{ backgroundColor: 'white', color: 'black' }}
                          ref={addressRef}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.streetNumber')}</strong></label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.postalCode')}</strong></label>
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
                        ? t('hero.form.whatTypeOfOffice')
                        : t('hero.form.whatTypeOfHome')}</strong></label>
                    <select
                      name="typeOfHome"
                      value={formData.typeOfHome}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                        errors.typeOfHome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                      <option value="">{localCustomerType === 'foretag' ? t('hero.form.selectOfficeType') : t('hero.form.selectHomeType')}</option>
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
                    <option value="villa">{t('hero.form.house')}</option>
                    <option value="lagenhet">{t('hero.form.apartment')}</option>
                    <option value="parhus">{t('hero.form.townhouse')}</option>
                    <option value="radhus">{t('hero.form.rowHouse')}</option>
                    <option value="fritidshus">{t('hero.form.vacationHome')}</option>
                    <option value="annat">{t('hero.form.other')}</option>
                        </>
                      )}
                    </select>
                    {errors.typeOfHome && (
                      <p className="mt-1 text-sm text-red-600">{errors.typeOfHome}</p>
                    )}
                  </div>

                  {selectedCleaningType !== 'Fönsterputs' && selectedCleaningType !== 'Window cleaning' && (
                    <div>
                      {/* Move Entire home radio group ABOVE area size */}
                      <div className="mt-0">
                        <label className="block text-sm font-medium text-gray-700 mb-1"><strong>{t('common.shouldEntireHomeBeCleaned')}</strong></label>
                        <div className="mt-2 flex space-x-6">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="entireHome-yes"
                              name="entireHome"
                              value="yes"
                              checked={formData.entireHome === 'yes'}
                              onChange={(e) => setFormData({ ...formData, entireHome: e.target.value as 'yes' | 'no' })}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <label htmlFor="entireHome-yes" className="ml-2 text-sm text-gray-700">
                              {t('common.yes')}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="entireHome-no"
                              name="entireHome"
                              value="no"
                              checked={formData.entireHome === 'no'}
                              onChange={(e) => setFormData({ ...formData, entireHome: e.target.value as 'yes' | 'no' })}
                              className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                            />
                            <label htmlFor="entireHome-no" className="ml-2 text-sm text-gray-700">
                              {t('common.no')}
                            </label>
                          </div>
                        </div>
                      </div>

                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6">
                        <strong>{t('hero.form.validation.approximatelyHowBigArea')}</strong>
                      </label>
                      <input
                        type="text"
                        name="areaSize"
                        value={formData.areaSize}
                        onChange={handleInputChange}
                        placeholder="100"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                          errors.areaSize ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                      {errors.areaSize && (
                        <p className="mt-1 text-sm text-red-600">{errors.areaSize}</p>
                      )}
                    </div>
                  )}



                  {(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>{t('hero.form.doWeNeedLadder')}</strong></label>
                      <div className="mt-2 flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-yes"
                            name="needsLadder"
                            value={t('hero.form.yes')}
                            checked={formData.needsLadder === t('hero.form.yes')}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-yes" className="ml-2 text-sm text-gray-700">
                            {t('hero.form.yes')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-no"
                            name="needsLadder"
                            value={t('hero.form.no')}
                            checked={formData.needsLadder === t('hero.form.no')}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-no" className="ml-2 text-sm text-gray-700">
                            {t('hero.form.no')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="ladder-unknown"
                            name="needsLadder"
                            value={t('hero.form.dontKnow')}
                            checked={formData.needsLadder === t('hero.form.dontKnow')}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                          />
                          <label htmlFor="ladder-unknown" className="ml-2 text-sm text-gray-700">
                            {t('hero.form.dontKnow')}
                          </label>
                        </div>
                      </div>
                      {errors.needsLadder && (
                        <p className="mt-1 text-sm text-red-600">{errors.needsLadder}</p>
                      )}
                    </div>
                  )}

                  {(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>{t('hero.form.whatTypeOfWindows')}</strong></label>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="single-glass" name="windowTypes" type="checkbox" value={t('hero.form.singleGlassWindows')} checked={formData.windowTypes.includes(t('hero.form.singleGlassWindows'))} onChange={(e) => {
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
                            <label htmlFor="single-glass" className="font-medium text-gray-700">{t('hero.form.singleGlassWindows')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="double-glass" name="windowTypes" type="checkbox" value={t('hero.form.doubleGlassWindows')} checked={formData.windowTypes.includes(t('hero.form.doubleGlassWindows'))} onChange={(e) => {
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
                            <label htmlFor="double-glass" className="font-medium text-gray-700">{t('hero.form.doubleGlassWindows')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="triple-glass" name="windowTypes" type="checkbox" value={t('hero.form.tripleGlassWindows')} checked={formData.windowTypes.includes(t('hero.form.tripleGlassWindows'))} onChange={(e) => {
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
                            <label htmlFor="triple-glass" className="font-medium text-gray-700">{t('hero.form.tripleGlassWindows')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="unknown-windows" name="windowTypes" type="checkbox" value={t('hero.form.dontKnow')} checked={formData.windowTypes.includes(t('hero.form.dontKnow'))} onChange={(e) => {
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
                            <label htmlFor="unknown-windows" className="font-medium text-gray-700">{t('hero.form.dontKnow')}</label>
                          </div>
                        </div>
                      </div>
                      {errors.windowTypes && (
                        <p className="mt-1 text-sm text-red-600">{errors.windowTypes}</p>
                      )}
                    </div>
                  )}

                  {(selectedCleaningType === 'Fönsterputs' || selectedCleaningType === 'Window cleaning') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 mt-6"><strong>{t('hero.form.numberOfWindowsEachType')}</strong></label>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">{t('hero.form.windowsWithMullions')}</label>
                          <div className="flex items-center">
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithMullions: Math.max(0, (prev.windowsWithMullions || 0) - 1) }))} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                            <span className="px-4 py-1 border-t border-b text-black">{formData.windowsWithMullions || 0}</span>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithMullions: (prev.windowsWithMullions || 0) + 1 }))} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">{t('hero.form.windowsWithoutMullions')}</label>
                          <div className="flex items-center">
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithoutMullions: Math.max(0, (prev.windowsWithoutMullions || 0) - 1) }))} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                            <span className="px-4 py-1 border-t border-b text-black">{formData.windowsWithoutMullions || 0}</span>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, windowsWithoutMullions: (prev.windowsWithoutMullions || 0) + 1 }))} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">{t('hero.form.topHungWindows')}</label>
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
                  {(selectedCleaningType === 'Dödsbostädning' || selectedCleaningType === 'Estate cleaning') ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>{t('hero.form.additionalServices')}</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="estate-clearing" name="estateClearing" type="checkbox" checked={formData.estateClearing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="estate-clearing" className="font-medium text-gray-700">{t('hero.form.wantsEstateClearing')}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedCleaningType === 'Byggstädning' || selectedCleaningType === 'Construction cleaning' ? (
                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4"><strong>{t('hero.form.whatTypeOfWork')}</strong></h3>
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
                              <label htmlFor="renovering" className="font-medium text-gray-700">{t('hero.form.renovationRebuilding')}</label>
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
                              <label htmlFor="tillbyggnad" className="font-medium text-gray-700">{t('hero.form.extensionExpansion')}</label>
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
                              <label htmlFor="malning" className="font-medium text-gray-700">{t('hero.form.paintingSanding')}</label>
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
                              <label htmlFor="golvlaggning" className="font-medium text-gray-700">{t('hero.form.flooringFloorSanding')}</label>
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
                              <label htmlFor="annat-arbete" className="font-medium text-gray-700">{t('hero.form.otherWork')}</label>
                            </div>
                          </div>
                        </div>
                        {errors.constructionWorkType && (
                          <p className="mt-1 text-sm text-red-600">{errors.constructionWorkType}</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4"><strong>{t('hero.form.additionalServices')}</strong></h3>
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
                              <label htmlFor="slang-skrap" className="font-medium text-gray-700">{t('hero.form.disposeWaste')}</label>
                            </div>
                          </div>
                        </div>
                        {errors.constructionCleaningServices && (
                          <p className="mt-1 text-sm text-red-600">{errors.constructionCleaningServices}</p>
                        )}
                      </div>
                    </div>
                  ) : (selectedCleaningType === 'Hemstädning' || selectedCleaningType === 'Home cleaning') ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>{t('hero.form.additionalServices')}</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="window-cleaning" name="windowCleaning" type="checkbox" checked={formData.windowCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="window-cleaning" className="font-medium text-gray-700">{t('hero.form.wantsWindowCleaning')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="bed-making" name="bedMaking" type="checkbox" checked={formData.bedMaking} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="bed-making" className="font-medium text-gray-700">{t('hero.form.wantsBedMaking')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="dish-washing" name="dishWashing" type="checkbox" checked={formData.dishWashing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="dish-washing" className="font-medium text-gray-700">{t('hero.form.wantsDishWashing')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="ironing" name="ironing" type="checkbox" checked={formData.ironing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="ironing" className="font-medium text-gray-700">{t('hero.form.wantsIroning')}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (selectedCleaningType === 'Storstädning' || selectedCleaningType === 'Deep cleaning') ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>{t('hero.form.additionalServices')}</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="bed-making-storstädning" name="bedMaking" type="checkbox" checked={formData.bedMaking} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="bed-making-storstädning" className="font-medium text-gray-700">{t('hero.form.wantsBedMaking')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="dish-washing-storstädning" name="dishWashing" type="checkbox" checked={formData.dishWashing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="dish-washing-storstädning" className="font-medium text-gray-700">{t('hero.form.wantsDishWashing')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="ironing-storstädning" name="ironing" type="checkbox" checked={formData.ironing} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="ironing-storstädning" className="font-medium text-gray-700">{t('hero.form.wantsIroning')}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedCleaningType !== 'Fönsterputs' && selectedCleaningType !== 'Window cleaning' ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900"><strong>{t('hero.form.additionalServices')}</strong></h3>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="balcony-cleaning" name="hasBalconyCleaning" type="checkbox" checked={formData.hasBalconyCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="balcony-cleaning" className="font-medium text-gray-700">{t('hero.form.balconyMax5sqm')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="storage-cleaning" name="hasStorageCleaning" type="checkbox" checked={formData.hasStorageCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="storage-cleaning" className="font-medium text-gray-700">{t('hero.form.basementStorageMax5sqm')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="garage-cleaning" name="hasGarageCleaning" type="checkbox" checked={formData.hasGarageCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="garage-cleaning" className="font-medium text-gray-700">{t('hero.form.garageMax15sqm')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="glazed-balcony-cleaning" name="hasGlazedBalconyCleaning" type="checkbox" checked={formData.hasGlazedBalconyCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="glazed-balcony-cleaning" className="font-medium text-gray-700">{t('hero.form.glazedBalconyMax10sqm')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="glazed-patio-cleaning" name="hasGlazedPatioCleaning" type="checkbox" checked={formData.hasGlazedPatioCleaning} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="glazed-patio-cleaning" className="font-medium text-gray-700">{t('hero.form.glazedPatioMax10sqm')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="freezer-defrosting" name="hasFreezerDefrosting" type="checkbox" checked={formData.hasFreezerDefrosting} onChange={handleInputChange} className="focus:ring-[#10B981] h-4 w-4 text-[#10B981] border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="freezer-defrosting" className="font-medium text-gray-700">{t('hero.form.freezerDefrosting')}</label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="ml-3 text-sm">
                            <label htmlFor="water-trap-cleaning" className="font-medium text-gray-700">{t('hero.form.waterTrapCleaning')}</label>
                            <div className="flex items-center mt-1">
                              <button type="button" onClick={() => handleServiceCountChange('waterTrapCleaningCount', -1)} className="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300 text-black">-</button>
                              <span className="px-4 py-1 border-t border-b text-black">{formData.waterTrapCleaningCount}</span>
                              <button type="button" onClick={() => handleServiceCountChange('waterTrapCleaningCount', 1)} className="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300 text-black">+</button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="ml-3 text-sm">
                            <label htmlFor="blinds-cleaning" className="font-medium text-gray-700">{t('hero.form.blindsCleaning')}</label>
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
                  {(selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') ? (
                    <>
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.describeCleaningService')}</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.describeTask')}</strong></label>
                          <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            placeholder={t('hero.form.describeTaskPlaceholder')}
                            rows={8}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                            style={{ backgroundColor: 'white', color: 'black' }}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') && step === 3 ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                        {t('hero.form.movingHelp')}
                      </h2>
                      <p className="text-sm text-gray-700 mb-6">
                        {t('hero.form.wantMovingHelp')}
                      </p>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <strong>{t('hero.form.wantMovingHelpQuestion')}</strong>
                          </label>
                          <div className="mt-2 flex space-x-6">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="moving-help-yes"
                                name="wantsMovingHelp"
                                value={t('hero.form.options.yes')}
                                checked={formData.wantsMovingHelp === t('hero.form.options.yes')}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                              />
                              <label htmlFor="moving-help-yes" className="ml-2 text-sm text-gray-700">
                                {t('hero.form.options.yes')}
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id="moving-help-no"
                                name="wantsMovingHelp"
                                value={t('hero.form.options.no')}
                                checked={formData.wantsMovingHelp === t('hero.form.options.no')}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300"
                              />
                              <label htmlFor="moving-help-no" className="ml-2 text-sm text-gray-700">
                                {t('hero.form.options.no')}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (!isMovingForm || step !== 3) && (
                    <>
                      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.contactInformation')}</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? t('hero.form.companyName') : t('hero.form.yourName')}</strong></label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.email')}</strong></label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.phone')}</strong></label>
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
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.commentsOptional')}</strong></label>
                          <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            placeholder={t('hero.form.commentsPlaceholder')}
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
                              <option value="">{t('hero.form.select')}</option>
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
                          <div className="relative">
                            <input
                              type="text"
                              name="currentAddress"
                              value={formData.currentAddress}
                              onChange={(e) => {
                                setFormData({ ...formData, currentAddress: e.target.value });
                                setErrors({ ...errors, currentAddress: "" });
                                setIsAddressValid(false);
                                handleAddressSearch(e.target.value);
                              }}
                              onFocus={() => {
                                if (formData.currentAddress.length >= 2) {
                                  setShowAddressSuggestions(true);
                                }
                              }}
                              onBlur={() => {
                                setTimeout(() => setShowAddressSuggestions(false), 200);
                              }}
                              placeholder={t('hero.form.placeholders.startTypingAddress')}
                              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                                errors.currentAddress ? "border-red-500" : ""
                              }`}
                              style={{ backgroundColor: 'white', color: 'black' }}
                              ref={addressRef}
                            />
                            {showAddressSuggestions && (
                              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {isLoadingAddressSuggestions && (
                                  <div className="p-4 text-center text-gray-500">Söker adresser...</div>
                                )}
                                {!isLoadingAddressSuggestions && addressSuggestions.length === 0 && formData.currentAddress.length >= 2 && (
                                  <div className="p-4 text-center text-gray-500">Inga adresser hittades</div>
                                )}
                                {!isLoadingAddressSuggestions && addressSuggestions.map((suggestion: any, index: number) => (
                                  <div
                                    key={index}
                                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      const streetName = suggestion.address_components.street_name || '';
                                      const city = suggestion.address_components.city || '';
                                      const cleanAddress = `${streetName}, ${city}, Sweden`;
                                      setFormData({
                                        ...formData,
                                        currentAddress: cleanAddress,
                                        apartmentNumber: suggestion.address_components.street_number || formData.apartmentNumber,
                                        postalCode: suggestion.address_components.postcode || formData.postalCode,
                                      });
                                      setLastValidAddress(cleanAddress);
                                      setIsAddressValid(true);
                                      setShowAddressSuggestions(false);
                                      setErrors({ ...errors, currentAddress: "", apartmentNumber: "", postalCode: "" });
                                    }}
                                  >
                                    <div className="font-medium text-sm text-gray-900">{suggestion.full_text}</div>
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
                            <p className="mt-1 text-sm text-red-600">{errors.currentAddress}</p>
                          )}
                        </div>
                        <div className="md:w-1/4">
                          <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.streetNumber')}</strong></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.postalCode')}</strong></label>
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
                            <option value="">{t('hero.form.select')}</option>
                            <option value="lagenhet">{t('hero.form.apartment')}</option>
                            <option value="villa">{t('hero.form.house')}</option>
                            <option value="parhus">{t('hero.form.townhouse')}</option>
                            <option value="radhus">{t('hero.form.rowHouse')}</option>
                            <option value="fritidshus">{t('hero.form.vacationHome')}</option>
                            <option value="magasin">{t('hero.form.storage')}</option>
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
                             <option value="">{t('hero.form.select')}</option>
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
                           <div className="relative">
                             <input
                               type="text"
                               name="newAddress"
                               value={formData.newAddress}
                               onChange={(e) => {
                                 setFormData({ ...formData, newAddress: e.target.value });
                                 setErrors({ ...errors, newAddress: "" });
                                 setIsAddressValid(false);
                                 handleAddressSearch(e.target.value);
                               }}
                               onFocus={() => {
                                 if (formData.newAddress.length >= 2) {
                                   setShowAddressSuggestions(true);
                                 }
                               }}
                               onBlur={() => {
                                 setTimeout(() => setShowAddressSuggestions(false), 200);
                               }}
                               placeholder="Börja skriva din nya adress"
                               className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black ${
                                 errors.newAddress ? "border-red-500" : ""
                               }`}
                               style={{ backgroundColor: 'white', color: 'black' }}
                               ref={addressRef}
                             />
                             {showAddressSuggestions && (
                               <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                 {isLoadingAddressSuggestions && (
                                   <div className="p-4 text-center text-gray-500">Söker adresser...</div>
                                 )}
                                 {!isLoadingAddressSuggestions && addressSuggestions.length === 0 && formData.newAddress.length >= 2 && (
                                   <div className="p-4 text-center text-gray-500">Inga adresser hittades</div>
                                 )}
                                 {!isLoadingAddressSuggestions && addressSuggestions.map((suggestion: any, index: number) => (
                                   <div
                                     key={index}
                                     className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                     onMouseDown={(e) => {
                                       e.preventDefault();
                                       const streetName = suggestion.address_components.street_name || '';
                                       const city = suggestion.address_components.city || '';
                                       const cleanAddress = `${streetName}, ${city}, Sweden`;
                                       setFormData({
                                         ...formData,
                                         newAddress: cleanAddress,
                                         toApartmentNumber: suggestion.address_components.street_number || formData.toApartmentNumber,
                                         toPostalCode: suggestion.address_components.postcode || formData.toPostalCode,
                                       });
                                       setLastValidAddress(cleanAddress);
                                       setIsAddressValid(true);
                                       setShowAddressSuggestions(false);
                                       setErrors({ ...errors, newAddress: "", toApartmentNumber: "", toPostalCode: "" });
                                     }}
                                   >
                                     <div className="font-medium text-sm text-gray-900">{suggestion.full_text}</div>
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
                         <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.postalCode')}</strong></label>
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
                             <option value="">{t('hero.form.select')}</option>
                           <option value="lagenhet">Lägenhet</option>
                           <option value="villa">Villa</option>
                           <option value="parhus">Parhus</option>
                           <option value="radhus">Radhus</option>
                           <option value="fritidshus">Fritidshus</option>
                           <option value="magasin">Vill du ha hjälp med magasinering?</option>
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
                             <option value="">{t('hero.form.select')}</option>
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
                       <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.contactInformation')}</h2>
                       
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           <strong>{localCustomerType === 'foretag' ? t('hero.form.companyName') : t('hero.form.yourName')}</strong>
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
                           <strong>{t('hero.form.email')}</strong>
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
                           <strong>{t('hero.form.phone')}</strong>
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
                           <strong>{t('hero.form.additionalInfoOptional')}</strong>
                         </label>
                         <textarea
                           name="additionalInfo"
                           value={formData.additionalInfo}
                           onChange={handleInputChange}
                           placeholder={t('hero.form.additionalInfoPlaceholder')}
                           rows={4}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                           style={{ backgroundColor: 'white', color: 'black' }}
                         />
                       </div>
                     </div>
                   )}
                 </div>
               )}
              {step === 4 && (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') && (formData.wantsMovingHelp === 'Nej' || formData.wantsMovingHelp === 'No') && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.contactInformation')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? t('hero.form.companyName') : t('hero.form.yourName')}</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.email')}</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.phone')}</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.additionalInfoOptional')}</strong></label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder={t('hero.form.additionalInfoPlaceholder')}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-white text-black"
                        style={{ backgroundColor: 'white', color: 'black' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">{t('hero.form.contactInformation')}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{localCustomerType === 'foretag' ? t('hero.form.companyName') : t('hero.form.yourName')}</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.email')}</strong></label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2"><strong>{t('hero.form.phone')}</strong></label>
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
                      {t('hero.buttons.tillbaka')}
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
                        {t('hero.buttons.nasta')}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? t('hero.buttons.sending') : t('hero.buttons.sendQuoteRequest')}
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
                        {t('hero.buttons.tillbaka')}
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
                        {t('hero.buttons.tillbaka')}
                      </button>
                    )}
                    {((selectedCleaningType === 'Annan städning' || selectedCleaningType === 'Other cleaning') ? (step < 4) : 
                      (selectedCleaningType === 'Flyttstädning' || selectedCleaningType === 'Moving cleaning') ? (step < 4) : 
                      (step < 3)) ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNext();
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        {t('hero.buttons.nasta')}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? t('hero.buttons.sending') : t('hero.buttons.sendQuoteRequest')}
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
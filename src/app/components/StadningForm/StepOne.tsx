'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sv from 'date-fns/locale/sv';

interface StepOneProps {
  onNext: (data: StepOneData) => void;
  initialData?: StepOneData;
}

export interface StepOneData {
  preferredDate: Date | null;
  isFlexible: boolean;
  flexibilityRange: string;
}

export default function StepOne({ onNext, initialData }: StepOneProps) {
  const [formData, setFormData] = useState<StepOneData>(initialData || {
    preferredDate: null,
    isFlexible: false,
    flexibilityRange: '1-week'
  });

  const [errors, setErrors] = useState<{
    preferredDate?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Vänligen välj ett datum';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">När vill du ha städningen utförd?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Önskat datum för städning
          </label>
          <DatePicker
            selected={formData.preferredDate}
            onChange={(date) => setFormData({ ...formData, preferredDate: date })}
            locale={sv}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Välj datum"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent ${
              errors.preferredDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.preferredDate && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isFlexible}
                onChange={(e) => setFormData({ ...formData, isFlexible: e.target.checked })}
                className="h-4 w-4 text-[#10B981] focus:ring-[#10B981] border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Jag är flexibel med datumet
              </span>
            </label>
          </div>

          {formData.isFlexible && (
            <div className="pl-7">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hur flexibel är du?
              </label>
              <select
                value={formData.flexibilityRange}
                onChange={(e) => setFormData({ ...formData, flexibilityRange: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
              >
                <option value="1-week">±1 vecka från valt datum</option>
                <option value="2-weeks">±2 veckor från valt datum</option>
                <option value="1-month">±1 månad från valt datum</option>
                <option value="very-flexible">Mycket flexibel</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0F172A] to-[#10B981] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Nästa steg
          </button>
        </div>
      </form>
    </div>
  );
} 
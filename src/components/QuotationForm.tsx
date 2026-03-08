import type { QuotationData } from '../types/quotation';

type QuotationFormProps = {
  formData: QuotationData;
  onChange: (field: keyof QuotationData, value: string) => void;
};

type TextFieldConfig = {
  key: keyof QuotationData;
  label: string;
  rows?: number;
  helpText?: string;
  placeholder?: string;
};

const topFields: Array<{ key: keyof QuotationData; label: string; type?: string }> = [
  { key: 'tripTitle', label: 'Trip Title' },
  { key: 'tripSubtitle', label: 'Trip Subtitle' },
  { key: 'travelDate', label: 'Travel Date' },
  { key: 'totalNetPrice', label: 'Total Net Price' },
  { key: 'feedbackPhone', label: 'Feedback Phone' },
  { key: 'thankYouText', label: 'Thank You Text' },
  { key: 'pickupIconUrl', label: 'Pickup Icon URL' },
  { key: 'dropIconUrl', label: 'Drop Icon URL' },
];

const hotelJsonPlaceholder = `[
  {
    "name": "FX Hotel Pattaya",
    "city": "Pattaya",
    "checkIn": "09 Feb, 2026",
    "checkOut": "12 Feb, 2026",
    "roomsGuests": "2 Room | 4 Adult(s)",
    "roomType": "2 Superior Double | 3 Night(s)",
    "mealType": "Bed and Breakfast",
    "stars": 3,
    "image": "https://example.com/hotel.jpg"
  }
]`;

const textFields: TextFieldConfig[] = [
  { key: 'inclusions', label: 'Inclusions (one per line)', rows: 5 },
  { key: 'inclusionIconsJson', label: 'Inclusion Icons JSON (array)', rows: 4 },
  { key: 'guests', label: 'Guest Details (one per line)', rows: 4 },
  {
    key: 'hotelsJson',
    label: 'Hotels JSON (array)',
    rows: 10,
    helpText:
      'Each hotel should include: name, city, checkIn, checkOut, roomsGuests, roomType, mealType, stars, and optional image.',
    placeholder: hotelJsonPlaceholder,
  },
  { key: 'sightseeingJson', label: 'Sightseeing JSON (array)', rows: 8 },
  { key: 'itineraryJson', label: 'Itinerary JSON (array)', rows: 12 },
];

function QuotationForm({ formData, onChange }: QuotationFormProps) {
  return (
    <form className="quotation-form">
      <h1>Itinerary PDF Generator</h1>
      <p className="form-note">
        Edit summary fields directly. Keep JSON blocks as valid arrays to render repeating sections.
      </p>

      <div className="form-grid">
        {topFields.map(({ key, label, type = 'text' }) => (
          <label key={key} className="field">
            <span>{label}</span>
            <input
              type={type}
              value={formData[key]}
              onChange={(event) => onChange(key, event.target.value)}
            />
          </label>
        ))}
      </div>

      {textFields.map(({ key, label, rows = 4, helpText, placeholder }) => (
        <label key={key} className="field full">
          <span>{label}</span>
          {helpText ? <small className="field-help">{helpText}</small> : null}
          <textarea
            rows={rows}
            value={formData[key]}
            placeholder={placeholder}
            onChange={(event) => onChange(key, event.target.value)}
          />
        </label>
      ))}
    </form>
  );
}

export default QuotationForm;

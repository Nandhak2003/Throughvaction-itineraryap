import { useEffect, useMemo, useRef, useState } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import QuotationForm from './components/QuotationForm';
import QuotationPDF from './components/QuotationPDF';
import { defaultQuotationData, type QuotationData } from './types/quotation';
import './app.css';

const FIXED_HEADER = {
  companyName: 'Through Vacations',
  companyAddress:
    'No.30, Gangaiamman Koil Street, Abishegapakkam, Puducherry,\nPuducherry - 605007',
  companyPhone: '918015950987',
  companyEmail: 'throughvacations@gmail.com',
  logoDataUrl: '/image/logo.png',
  pickupIconUrl: '/image/picup.png',
  dropIconUrl: '/image/drop.png',
};

const withFixedHeader = (data: QuotationData): QuotationData => ({
  ...data,
  ...FIXED_HEADER,
});

const REACT_BRIDGE_KEY = 'quotation_builder_data_v1';
const STORAGE_DB_NAME = 'quotation_builder_storage';
const STORAGE_STORE_NAME = 'documents';

const getSearchParams = () =>
  typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);

const getInitialFormData = (): QuotationData => withFixedHeader(defaultQuotationData);

const getStorageDb = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(STORAGE_DB_NAME, 1);

    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORAGE_STORE_NAME)) {
        request.result.createObjectStore(STORAGE_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Unable to open browser storage.'));
  });

const getStoredBridgeData = async (): Promise<QuotationData | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window.indexedDB) {
    const raw = localStorage.getItem(REACT_BRIDGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuotationData;
  }

  const db = await getStorageDb();
  const stored = await new Promise<QuotationData | null>((resolve, reject) => {
    const tx = db.transaction(STORAGE_STORE_NAME, 'readonly');
    const request = tx.objectStore(STORAGE_STORE_NAME).get(REACT_BRIDGE_KEY);
    request.onsuccess = () => resolve((request.result as QuotationData | undefined) ?? null);
    request.onerror = () => reject(request.error ?? new Error('Unable to load bridge data.'));
  });

  return stored;
};

function App() {
  const [formData, setFormData] = useState<QuotationData>(getInitialFormData);
  const autoDownloadTriggered = useRef(false);
  const searchParams = getSearchParams();
  const fromBuilder = searchParams.get('fromBuilder') === '1';
  const autoDownload = searchParams.get('autoDownload') === '1';
  const [bridgeReady, setBridgeReady] = useState(!fromBuilder);

  const handleChange = (field: keyof QuotationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fileName = useMemo(() => {
    const safeTrip = (formData.tripTitle || 'itinerary').replace(/[^a-z0-9]+/gi, '-');
    return `${safeTrip.toLowerCase()}-itinerary.pdf`;
  }, [formData.tripTitle]);

  useEffect(() => {
    if (!fromBuilder) return;

    let active = true;

    const loadBridgeData = async () => {
      try {
        const stored = await getStoredBridgeData();
        if (active && stored) {
          setFormData(withFixedHeader(stored));
        }
      } catch {
        // Keep defaults if bridge data cannot be loaded.
      } finally {
        if (active) {
          setBridgeReady(true);
        }
      }
    };

    void loadBridgeData();

    return () => {
      active = false;
    };
  }, [fromBuilder]);

  useEffect(() => {
    if (!autoDownload || !bridgeReady || autoDownloadTriggered.current) return;

    autoDownloadTriggered.current = true;

    let objectUrl = '';

    const downloadPdf = async () => {
      const blob = await pdf(<QuotationPDF data={formData} />).toBlob();
      objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      if (window.parent !== window) {
        window.parent.postMessage({ type: 'quotation-pdf-download-complete' }, window.location.origin);
      }
    };

    void downloadPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [autoDownload, bridgeReady, fileName, formData]);

  if (autoDownload) {
    return null;
  }

  return (
    <main className="app-shell">
      <section className="panel">
        <QuotationForm formData={formData} onChange={handleChange} />
      </section>

      <aside id="download-panel" className="panel download-panel">
        <h2>Download PDF</h2>
        <p>Fill form fields and download your dynamic quotation PDF.</p>
        <PDFDownloadLink
          document={<QuotationPDF data={formData} />}
          fileName={fileName}
          className="download-btn"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Quotation PDF')}
        </PDFDownloadLink>
      </aside>
    </main>
  );
}

export default App;

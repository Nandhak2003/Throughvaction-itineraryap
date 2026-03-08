import { renderToFile } from '@react-pdf/renderer';
import { createElement } from 'react';
import { resolve } from 'node:path';
import QuotationPDF from '../src/components/QuotationPDF.tsx';
import { defaultQuotationData } from '../src/types/quotation.ts';

const outputPath = resolve(process.cwd(), 'quotation-output.pdf');

await renderToFile(createElement(QuotationPDF, { data: defaultQuotationData }), outputPath);
console.log(outputPath);

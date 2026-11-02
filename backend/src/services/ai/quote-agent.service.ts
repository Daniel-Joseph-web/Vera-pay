import { QuoteComparisonResult } from '../../types/index.js';

// Simulated verified building supplier network across Nigerian commercial hubs
const REGIONAL_BENCHMARKS: Record<string, { avgUnitCost: number; suppliers: any[] }> = {
  'cement-50kg-ibadan': {
    avgUnitCost: 10800,
    suppliers: [
      { name: 'Alhaji Ganiyu Building Depot (Ibadan)', location: 'Bodija Market', price: 10500, phone: '+234 803 234 5678' },
      { name: 'Oyo State Direct Cement Supply', location: 'Dugbe Commercial Ave', price: 10700, phone: '+234 802 987 6543' },
      { name: 'Westfield Materials Depot', location: 'Iwo Road Hub', price: 10900, phone: '+234 814 112 2334' }
    ]
  },
  'granite-30ton-ibadan': {
    avgUnitCost: 280000,
    suppliers: [
      { name: 'Oluwole Quarries Ltd', location: 'Moniya Axis', price: 275000, phone: '+234 805 123 4567' },
      { name: 'Standard Aggregate Depot', location: 'Challenge Terminal', price: 285000, phone: '+234 809 888 7766' }
    ]
  }
};

export async function runQuoteAgentCheck(
  materialType: string,
  quantity: number,
  quotedTotalNGN: number,
  city = 'ibadan'
): Promise<QuoteComparisonResult> {
  const key = `${materialType.toLowerCase()}-${city.toLowerCase()}`;
  const benchmark = REGIONAL_BENCHMARKS[key] || {
    avgUnitCost: quotedTotalNGN / quantity,
    suppliers: []
  };

  const quotedUnitPrice = quotedTotalNGN / quantity;
  const marketAverage = benchmark.avgUnitCost;
  const deltaPercent = ((quotedUnitPrice - marketAverage) / marketAverage) * 100;

  let recommendation: 'PRICE_FAIR' | 'PRICE_HIGH' | 'PRICE_EXTORTION' = 'PRICE_FAIR';
  let isPadded = false;

  if (deltaPercent > 25) {
    recommendation = 'PRICE_EXTORTION';
    isPadded = true;
  } else if (deltaPercent > 8) {
    recommendation = 'PRICE_HIGH';
    isPadded = true;
  }

  return {
    isPadded,
    quotedPrice: quotedUnitPrice,
    marketAveragePrice: marketAverage,
    deltaPercentage: parseFloat(deltaPercent.toFixed(1)),
    recommendation,
    cheaperSuppliers: isPadded ? benchmark.suppliers : []
  };
}

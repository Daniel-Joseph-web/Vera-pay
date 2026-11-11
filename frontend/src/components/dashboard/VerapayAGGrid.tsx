'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ArrowRight, CheckCircle2, Clock, Download, Search, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeContext';
import { usePaymentStore } from '@/stores/usePaymentStore';

interface PaymentRow {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Verified' | 'Verifying' | 'Review Required';
  verifyUrl: string;
}

export const VerapayAGGrid: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridRef = useRef<AgGridReact>(null);
  const [quickFilterText, setQuickFilterText] = useState('');
  const { transactions } = usePaymentStore();

  const rowData: PaymentRow[] = useMemo(() => {
    return transactions.map((t) => ({
      id: t.id,
      date: t.date,
      description: t.description,
      category: t.category,
      amount: t.amount,
      status: t.status === 'Refunded' ? 'Review Required' : (t.status as any),
      verifyUrl: t.verifyUrl,
    }));
  }, [transactions]);

  const columnDefs: ColDef<PaymentRow>[] = useMemo(
    () => [
      {
        headerName: 'Date',
        field: 'date',
        width: 150,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{params.value}</span>
        ),
      },
      {
        headerName: 'Payment Description',
        field: 'description',
        flex: 2,
        minWidth: 300,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <div className="flex items-center gap-2 font-bold py-1">
            <span className="text-slate-900 dark:text-white text-base font-bold">{params.value}</span>
          </div>
        ),
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 150,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <span className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
            {params.value}
          </span>
        ),
      },
      {
        headerName: 'Amount (NGN)',
        field: 'amount',
        width: 190,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) => `₦${Number(params.value).toLocaleString()}`,
        cellClass: 'font-black text-base text-slate-900 dark:text-white',
      },
      {
        headerName: 'Forensic Status',
        field: 'status',
        width: 180,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => {
          const val = params.value;
          if (val === 'Verified') {
            return (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" /> Verified
              </span>
            );
          }
          if (val === 'Review Required') {
            return (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Clock className="w-4 h-4" /> Quote Alert
              </span>
            );
          }
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Clock className="w-4 h-4" /> Protected Hold
            </span>
          );
        },
      },
      {
        headerName: 'Forensic Proof',
        width: 140,
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <Link
            href={params.data?.verifyUrl || '/dashboard'}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            Audit <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: true,
      suppressMovable: true,
    }),
    []
  );

  const onExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: `verapay-forensic-audit-${Date.now()}.csv`,
    });
  }, []);

  return (
    <div className="space-y-4">
      {/* AG Grid Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search payments, invoice IDs, contractors..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-base rounded-xl border border-slate-200 dark:border-[#1E2D4A] bg-white dark:bg-[#070B12] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onExportCsv}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-[#1E2D4A] bg-white dark:bg-[#070B12] text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#162238] text-sm font-bold flex items-center gap-2.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-500" /> Export Forensic CSV Audit
          </button>
        </div>
      </div>

      {/* AG Grid Container - Expanded View */}
      <div
        className={`${isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E2D4A] shadow-md`}
        style={{ height: 620 }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          animateRows={true}
          rowHeight={64}
          headerHeight={52}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
};

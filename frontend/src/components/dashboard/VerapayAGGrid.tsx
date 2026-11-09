'use client';

import React, { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ArrowRight, CheckCircle2, Clock, Download, Search, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/layout/ThemeContext';

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

  const rowData: PaymentRow[] = useMemo(
    () => [
      {
        id: 'pay_school_fees',
        date: 'Today, 2:15 PM',
        description: 'Bright Future Academy • Tuition & Books',
        category: 'Education',
        amount: 660000,
        status: 'Verified',
        verifyUrl: '/pay/pay_school_fees/verify?scenario=green',
      },
      {
        id: 'pay_padded_cement',
        date: 'Yesterday',
        description: 'Engr. Kayode • 500 Bags Dangote Cement',
        category: 'Construction',
        amount: 7100000,
        status: 'Review Required',
        verifyUrl: '/pay/pay_padded_cement/verify?scenario=amber',
      },
      {
        id: 'pay_hospital_bill',
        date: 'Oct 28, 2026',
        description: "LUTH Hospital • Dad's Eye Surgery Pot",
        category: 'Healthcare',
        amount: 2475000,
        status: 'Verified',
        verifyUrl: '/family',
      },
      {
        id: 'pay_project_milestone',
        date: 'Oct 24, 2026',
        description: '4-Bedroom Duplex • Blockwork to Lintel',
        category: 'Capital Build',
        amount: 5280000,
        status: 'Verifying',
        verifyUrl: '/projects/proj-881',
      },
      {
        id: 'pay_groceries_mother',
        date: 'Oct 20, 2026',
        description: 'Alhaji Ganiyu Depot • Monthly Family Food',
        category: 'Living Support',
        amount: 350000,
        status: 'Verified',
        verifyUrl: '/dashboard',
      },
    ],
    []
  );

  const columnDefs: ColDef<PaymentRow>[] = useMemo(
    () => [
      {
        headerName: 'Date',
        field: 'date',
        width: 140,
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Payment Description',
        field: 'description',
        flex: 2,
        minWidth: 260,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <div className="flex items-center gap-2 font-bold py-1">
            <span className="text-slate-900 dark:text-white">{params.value}</span>
          </div>
        ),
      },
      {
        headerName: 'Category',
        field: 'category',
        width: 130,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {params.value}
          </span>
        ),
      },
      {
        headerName: 'Amount (NGN)',
        field: 'amount',
        width: 160,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) => `₦${Number(params.value).toLocaleString()}`,
        cellClass: 'font-extrabold text-slate-900 dark:text-white',
      },
      {
        headerName: 'Forensic Status',
        field: 'status',
        width: 160,
        sortable: true,
        filter: true,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => {
          const val = params.value;
          if (val === 'Verified') {
            return (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            );
          }
          if (val === 'Review Required') {
            return (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Clock className="w-3.5 h-3.5" /> Quote Alert
              </span>
            );
          }
          return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Clock className="w-3.5 h-3.5" /> Protected Hold
            </span>
          );
        },
      },
      {
        headerName: 'Forensic Proof',
        width: 130,
        sortable: false,
        filter: false,
        cellRenderer: (params: ICellRendererParams<PaymentRow>) => (
          <Link
            href={params.data?.verifyUrl || '/dashboard'}
            className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
          >
            Audit <ArrowRight className="w-3 h-3 ml-1" />
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search payments, payee, CAC..."
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-[#1E2D4A] bg-white dark:bg-[#070B12] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by AG Grid
          </span>
          <button
            onClick={onExportCsv}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E2D4A] bg-white dark:bg-[#070B12] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#162238] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-500" /> Export CSV
          </button>
        </div>
      </div>

      {/* AG Grid Container */}
      <div
        className={`${isDark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'} w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E2D4A] shadow-sm`}
        style={{ height: 320 }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          animateRows={true}
          rowHeight={52}
          headerHeight={44}
          suppressCellFocus={true}
        />
      </div>
    </div>
  );
};

import {
  User,
  Building2,
  FileText,
  Briefcase,
  Landmark,
} from 'lucide-react';

export const PRODUCTS = [
  {
    id: 'npwp-pribadi',
    title: 'NPWP Pribadi',
    price: 99000,
    icon: User,
    popular: true,
    description: 'Pembuatan NPWP untuk individu/wajib pajak orang pribadi.',
    requirements: ['KTP', 'KK', 'Email', 'Nomor HP'],
  },
  {
    id: 'npwp-badan',
    title: 'NPWP Badan',
    price: 330000,
    icon: Building2,
    description: 'Pembuatan NPWP untuk badan usaha, CV, atau PT.',
    requirements: [
      'Scan Akte Pendirian',
      'Scan SK Kemenkumham',
      'NIK Notaris',
    ],
  },
  {
    id: 'nib-pribadi',
    title: 'NIB Pribadi',
    price: 280000,
    icon: FileText,
    description: 'Nomor Induk Berusaha untuk usaha perorangan/UMKM.',
    requirements: ['Fotokopi KTP', 'Data Usaha', 'Email & No HP'],
  },
  {
    id: 'nib-badan',
    title: 'NIB Badan',
    price: 350000,
    icon: Briefcase,
    description: 'NIB untuk badan usaha berbadan hukum.',
    requirements: [
      'KTP',
      'NPWP',
      'Akte Pendirian',
      'Scan SK Kemenkumham',
      'NIK Notaris',
      'Data KBLI',
    ],
  },
  {
    id: 'pt-perorangan',
    title: 'PT Perorangan',
    price: 850000,
    icon: Landmark,
    popular: true,
    description: 'Pendirian PT Perorangan sesuai regulasi terbaru.',
    requirements: [
      'KTP',
      'NPWP Pribadi',
      'Email & Nomor HP',
      'Data KBLI',
    ],
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

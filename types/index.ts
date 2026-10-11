export type OrderStatus = 'PENDING_VERIFICATION' | 'CONFIRMED' | 'REJECTED' | 'REFUNDED';

export interface Chapter {
  number: number;
  title: string;
  pages?: number;
  summary?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  author: string;
  description: string;
  price: number; // in INR (₹)
  salePrice?: number; // in INR (₹)
  coverImage?: string;
  coverAccentColor?: string;
  fileUrl?: string; // Private Supabase storage path or secure digital asset
  fileName?: string;
  fileSize?: string;
  pageCount?: number;
  format?: string; // 'PDF + ePub', 'Interactive PDF'
  category: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  chapters?: Chapter[];
  previewSnippet?: string;
  readTimeHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ORD-2026-8492
  bookId: string;
  bookTitle: string;
  bookPrice: number;
  customerName: string;
  customerEmail: string;
  customerWhatsApp: string;
  status: OrderStatus;
  utrNumber: string;
  screenshotUrl?: string;
  rejectionReason?: string;
  accessToken: string; // Secure random token for zero-login order retrieval
  createdAt: string;
  updatedAt: string;
  verifiedAt?: string;
}

export interface PaymentSubmission {
  id: string;
  orderId: string;
  utrNumber: string;
  screenshotUrl?: string;
  submittedAt: string;
  customerName: string;
  amount: number;
}

export interface AdminAuditLog {
  id: string;
  orderId: string;
  orderNumber: string;
  adminEmail: string;
  action: 'CONFIRM_PAYMENT' | 'REJECT_PAYMENT' | 'REFUND_ORDER' | 'UPDATE_STATUS' | 'STORE_SETTINGS_UPDATE' | 'PRODUCT_MUTATION';
  details: string;
  timestamp: string;
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  ownerName: string;
  upiId: string;
  upiQrImage?: string;
  whatsappNumber: string;
  supportEmail: string;
  currency: string;
  announcement?: string;
}

import { Product, Order, OrderStatus, AdminAuditLog, StoreSettings } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-freelance-blueprint',
    title: 'The 6-Figure Freelance Blueprint',
    subtitle: 'How to land high-paying US & European clients directly from India',
    slug: 'freelance-blueprint',
    author: 'Tuhin Sadhukhan',
    description: 'A battle-tested tactical guide for Indian developers, designers, and marketers to bypass competitive race-to-the-bottom freelancing platforms. Learn how to pitch foreign clients on LinkedIn, price in USD, set up international wire transfers with minimal fees, and build long-term retainer agreements.',
    price: 999,
    salePrice: 499,
    coverAccentColor: '#0F172A',
    category: 'Freelancing & Career',
    featured: true,
    published: true,
    pageCount: 148,
    fileSize: '4.8 MB',
    format: 'PDF + ePub + Notion Checklist',
    readTimeHours: 4,
    tags: ['Freelancing', 'Remote Work', 'USD Income', 'LinkedIn Outreach', 'Pricing'],
    chapters: [
      { number: 1, title: 'Positioning: Escaping the Freelancer Commodity Trap', pages: 22, summary: 'How to stop competing on low hourly rates and define your high-value niche.' },
      { number: 2, title: 'The Cold Outreach System that Generates $2k+ Deals', pages: 28, summary: 'Exact email and LinkedIn pitch templates with a 34% response rate.' },
      { number: 3, title: 'Pricing in USD & Value-Based Proposals', pages: 26, summary: 'Contract structuring, deposit strategies, and negotiation tactics.' },
      { number: 4, title: 'International Banking & Tax Compliance for Indians', pages: 24, summary: 'Setting up Wise, Payoneer, GST Lut, and FIRC documentation legally.' },
      { number: 5, title: 'Retainers & Client Retention Systems', pages: 24, summary: 'Turning one-time projects into dependable monthly recurring cash flow.' },
      { number: 6, title: 'Case Studies: From ₹25,000/mo to ₹3,50,000/mo', pages: 24, summary: 'Three real breakdowns with invoices and communication transcripts.' }
    ],
    previewSnippet: `CHAPTER 1: ESCAPING THE COMMODITY TRAP\n\nIf you are bidding on Fiverr or Upwork against 50 other applicants within 5 minutes of a job posting, you are participating in a race to zero.\n\nForeign clients do not hire Indian professionals because they are cheap; bad clients hire cheap labor. Great clients hire specific problem-solvers who can communicate clearly and take ownership of business outcomes.\n\nIn this chapter, we restructure your service offer so that when a US or UK founder reads your pitch, they immediately see a specialist capable of generating $10,000 in value, making your $1,500 invoice an undeniable bargain...`,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prod-personal-wealth-india',
    title: 'Mastering Wealth in India',
    subtitle: 'Practical guide to index funds, equity compounding, tax optimization & debt freedom',
    slug: 'mastering-wealth-india',
    author: 'Tuhin Sadhukhan',
    description: 'No hype, no speculative trading, no crypto scams. A grounded, mathematical framework for middle-class Indians to achieve genuine financial independence. Covers Nifty 50 indexing, emergency liquidity, health insurance selection, new vs old tax regime optimization, and real estate reality checks.',
    price: 799,
    salePrice: 399,
    coverAccentColor: '#064E3B',
    category: 'Personal Finance',
    featured: true,
    published: true,
    pageCount: 164,
    fileSize: '5.2 MB',
    format: 'PDF + Excel Financial Model',
    readTimeHours: 5,
    tags: ['Personal Finance', 'Mutual Funds', 'Tax Optimization', 'FIRE India', 'Compounding'],
    chapters: [
      { number: 1, title: 'The Modern Indian Wealth Pyramid', pages: 20, summary: 'Emergency funds, pure term insurance, and catastrophic health coverage.' },
      { number: 2, title: 'The Nifty Indexing Blueprint', pages: 30, summary: 'Why 85% of active mutual funds fail to beat index funds in India.' },
      { number: 3, title: 'Debt Traps & Credit Score Mastery', pages: 22, summary: 'Eliminating high-interest personal loans and credit card debt.' },
      { number: 4, title: 'Tax Optimization without Headaches', pages: 28, summary: 'Navigating Section 80C, 80D, capital gains, and regimes.' },
      { number: 5, title: 'Real Estate vs Equity: The Real Mathematical Truth', pages: 34, summary: 'Rental yield analysis vs compounding liquid equity in urban India.' },
      { number: 6, title: 'The 15-Year Early Retirement Framework', pages: 30, summary: 'Calculating your exact freedom number adjusted for 7% Indian inflation.' }
    ],
    previewSnippet: `INTRODUCTION: THE INDIAN MIDDLE-CLASS MONEY TRAP\n\nMost Indians are raised with traditional financial advice that worked in 1985: Buy physical gold, put money in Bank Fixed Deposits, and buy a flat on a 25-year home loan.\n\nIn 2026, real inflation on education and healthcare is running at 8-10%, while Bank FDs offer 6.5% pre-tax. In reality, traditional savers are losing purchasing power every single month.\n\nFinancial freedom in modern India requires systematic equity accumulation, ruthless debt elimination, and low-cost index investing...`,
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prod-organic-growth-playbook',
    title: 'The Organic Social & WhatsApp Playbook',
    subtitle: 'Turn Instagram reels and WhatsApp broadcasts into predictable daily sales',
    slug: 'social-whatsapp-playbook',
    author: 'Tuhin Sadhukhan',
    description: 'Learn the exact social media conversion funnels engineered specifically for direct-to-consumer digital products in India. How to hook viewers in 3 seconds, guide them into high-trust WhatsApp broadcasts, and close sales without high advertising costs.',
    price: 599,
    salePrice: 299,
    coverAccentColor: '#7C2D12',
    category: 'Marketing & Sales',
    featured: true,
    published: true,
    pageCount: 112,
    fileSize: '3.6 MB',
    format: 'PDF + 50 Plug-and-Play Story Scripts',
    readTimeHours: 3,
    tags: ['Instagram Growth', 'WhatsApp Funnels', 'Content Creation', 'Direct Sales', 'Conversion'],
    chapters: [
      { number: 1, title: 'Content Hooks That Stop the Thumb Scroll', pages: 20, summary: 'The psychological frameworks behind viral educational carousels and reels.' },
      { number: 2, title: 'The Instagram to WhatsApp Direct Bridge', pages: 24, summary: 'Why WhatsApp has a 92% open rate in India vs 18% email open rates.' },
      { number: 3, title: 'The 7-Day Nurture Sequence for Digital Buyers', pages: 24, summary: 'Daily story structures that build undeniable authority and trust.' },
      { number: 4, title: 'Closing Sales in Direct Messages Without Being Pushy', pages: 22, summary: 'Handling price objections, skepticism, and payment method doubts.' },
      { number: 5, title: 'Scaling to 500 Daily Orders Organically', pages: 22, summary: 'Collaborations, micro-creator shoutouts, and viral referral loops.' }
    ],
    previewSnippet: `CHAPTER 1: WHY WHATSAPP IS INDIA'S #1 REVENUE ENGINE\n\nIn Western markets, direct sales thrive over long email newsletters. In India, email is checked once a week, but WhatsApp is checked 40+ times every single day.\n\nWhen a potential buyer expresses interest in your eBook, directing them to a formal checkout flow often leads to drop-offs. But providing a friendly, 1-click WhatsApp checkout bridge with instant UPI QR payments increases conversions by over 300%...`,
    createdAt: '2026-02-20T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prod-digital-product-empire',
    title: 'Zero to 100K: Profitable eBooks',
    subtitle: 'The complete system to write, package, price, and sell high-margin digital downloads',
    slug: 'zero-to-100k-ebooks',
    author: 'Tuhin Sadhukhan',
    description: 'Everything you need to know about creating valuable digital information products from scratch. From validating demand before writing a single word, to designing premium covers, structuring actionable chapters, and setting up friction-free Indian UPI checkout.',
    price: 1299,
    salePrice: 599,
    coverAccentColor: '#1E1B4B',
    category: 'Digital Business',
    featured: false,
    published: true,
    pageCount: 182,
    fileSize: '6.1 MB',
    format: 'PDF + ePub + Canva Cover Templates',
    readTimeHours: 6,
    tags: ['eBook Creation', 'Digital Products', 'Passive Income', 'Self-Publishing', 'Pricing Strategy'],
    chapters: [
      { number: 1, title: 'Finding Your ₹100,000 Topic & Demand Validation', pages: 24, summary: 'Validating willingness-to-pay before writing chapter one.' },
      { number: 2, title: 'The 14-Day Writing & Structuring Framework', pages: 30, summary: 'How to write a punchy, actionable 120-page manual without writer block.' },
      { number: 3, title: 'Packaging for Prestige: Covers, Formatting & Assets', pages: 26, summary: 'Designing covers that command ₹499 to ₹1,499 price tags.' },
      { number: 4, title: 'The UPI Checkout & Instant Delivery Architecture', pages: 28, summary: 'Creating friction-free manual & automated payment workflows.' },
      { number: 5, title: 'Launch Week: Generating Your First 50 Paying Customers', pages: 34, summary: 'Early-bird discounts, teaser content, and testimonial flywheels.' },
      { number: 6, title: 'Evergreen Traffic & Scaling Past ₹1,00,000 Monthly', pages: 40, summary: 'Cross-selling, bundle discounts, and community building.' }
    ],
    previewSnippet: `CHAPTER 1: WILL THEY ACTUALLY PAY FOR THIS?\n\nThe biggest mistake aspiring authors make is spending 3 months in isolation writing a 200-page book that nobody wants to buy.\n\nBefore you write a sentence, you must answer one question: What painful, expensive, or time-consuming problem will this guide solve for the reader?\n\nPeople do not buy pages; they buy shortcuts, clarity, and results...`,
    createdAt: '2026-02-28T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Tuhin's Digital Book Vault",
  storeTagline: 'Battle-tested guides & tactical playbooks for ambitious Indian creators and freelancers',
  ownerName: 'Tuhin Sadhukhan',
  upiId: 'sadhukhantuhin12@okaxis',
  whatsappNumber: '919876543210',
  supportEmail: 'sadhukhantuhin12@gmail.com',
  currency: 'INR',
  announcement: '🎉 Special launch pricing: Flat 50% discount on all bestselling digital editions today!',
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-seed-001',
    orderNumber: 'ORD-2026-9182',
    bookId: 'prod-freelance-blueprint',
    bookTitle: 'The 6-Figure Freelance Blueprint',
    bookPrice: 499,
    customerName: 'Rahul Verma',
    customerEmail: 'rahul.verma.dev@gmail.com',
    customerWhatsApp: '+91 98230 45678',
    status: 'PENDING_VERIFICATION',
    utrNumber: '610283948123',
    accessToken: 'tok_live_demo_pending_9182',
    createdAt: '2026-03-10T14:32:00Z',
    updatedAt: '2026-03-10T14:32:00Z',
  },
  {
    id: 'ord-seed-002',
    orderNumber: 'ORD-2026-8451',
    bookId: 'prod-personal-wealth-india',
    bookTitle: 'Mastering Wealth in India',
    bookPrice: 399,
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@outlook.com',
    customerWhatsApp: '+91 99871 23456',
    status: 'CONFIRMED',
    utrNumber: '609482710492',
    accessToken: 'tok_live_demo_confirmed_8451',
    verifiedAt: '2026-03-09T18:45:00Z',
    createdAt: '2026-03-09T18:30:00Z',
    updatedAt: '2026-03-09T18:45:00Z',
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'audit-seed-001',
    orderId: 'ord-seed-002',
    orderNumber: 'ORD-2026-8451',
    adminEmail: 'sadhukhantuhin12@gmail.com',
    action: 'CONFIRM_PAYMENT',
    details: 'Verified UTR 609482710492 against bank account credit of ₹399. Access granted.',
    timestamp: '2026-03-09T18:45:00Z',
  }
];

// In-Memory Storage Cache for fast server and isomorphic access
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryOrders: Order[] = [...INITIAL_ORDERS];
let memorySettings: StoreSettings = { ...INITIAL_SETTINGS };
let memoryAuditLogs: AdminAuditLog[] = [...INITIAL_AUDIT_LOGS];

const STORAGE_KEYS = {
  PRODUCTS: 'ebook_store_products_v1',
  ORDERS: 'ebook_store_orders_v1',
  SETTINGS: 'ebook_store_settings_v1',
  AUDIT_LOGS: 'ebook_store_audit_logs_v1',
};

function getClientStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const productListeners = new Set<() => void>();
const orderListeners = new Set<() => void>();
const settingListeners = new Set<() => void>();

export function subscribeProducts(listener: () => void) {
  productListeners.add(listener);
  return () => { productListeners.delete(listener); };
}

export function subscribeOrders(listener: () => void) {
  orderListeners.add(listener);
  return () => { orderListeners.delete(listener); };
}

export function subscribeSettings(listener: () => void) {
  settingListeners.add(listener);
  return () => { settingListeners.delete(listener); };
}

function notifyProducts() {
  productListeners.forEach(fn => fn());
}

function notifyOrders() {
  orderListeners.forEach(fn => fn());
}

function notifySettings() {
  settingListeners.forEach(fn => fn());
}

export function getInitialProducts(): Product[] {
  return INITIAL_PRODUCTS;
}

export function getInitialSettings(): StoreSettings {
  return INITIAL_SETTINGS;
}

export function getInitialOrders(): Order[] {
  return INITIAL_ORDERS;
}

function setClientStorage<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to write to localStorage', err);
  }
}

// -------------------------------------------------------------
// PRODUCT OPERATIONS
// -------------------------------------------------------------

export function getAllProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const clientData = getClientStorage<Product[]>(STORAGE_KEYS.PRODUCTS, memoryProducts);
    if (clientData && clientData.length > 0) return clientData;
  }
  return memoryProducts;
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id || p.slug === id);
}

export function saveProduct(productData: Partial<Product> & { title: string; price: number }): Product {
  const products = getAllProducts();
  const now = new Date().toISOString();
  
  if (productData.id) {
    const index = products.findIndex(p => p.id === productData.id);
    if (index >= 0) {
      const updated: Product = {
        ...products[index],
        ...productData,
        updatedAt: now,
      };
      products[index] = updated;
      memoryProducts = [...products];
      setClientStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
      notifyProducts();
      return updated;
    }
  }

  const newProduct: Product = {
    id: productData.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: productData.title,
    subtitle: productData.subtitle || '',
    slug: productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    author: productData.author || memorySettings.ownerName || 'Tuhin Sadhukhan',
    description: productData.description || '',
    price: Number(productData.price),
    salePrice: productData.salePrice ? Number(productData.salePrice) : undefined,
    coverAccentColor: productData.coverAccentColor || '#0F172A',
    coverImage: productData.coverImage || '',
    category: productData.category || 'Business',
    featured: Boolean(productData.featured),
    published: productData.published !== undefined ? productData.published : true,
    pageCount: productData.pageCount || 100,
    fileSize: productData.fileSize || '3.5 MB',
    format: productData.format || 'PDF + ePub',
    readTimeHours: productData.readTimeHours || 3,
    tags: productData.tags || ['Digital Guide'],
    chapters: productData.chapters || [
      { number: 1, title: 'Introduction & Foundations', pages: 20 },
      { number: 2, title: 'Core Strategy & Action Steps', pages: 35 },
      { number: 3, title: 'Implementation & Case Studies', pages: 30 }
    ],
    previewSnippet: productData.previewSnippet || `Introduction to ${productData.title}.\n\nThis guide contains battle-tested methods to accelerate your results. Read further upon purchase verification.`,
    createdAt: now,
    updatedAt: now,
  };

  memoryProducts = [newProduct, ...products];
  setClientStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
  notifyProducts();
  return newProduct;
}

export function deleteProduct(id: string): boolean {
  const products = getAllProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length !== products.length) {
    memoryProducts = filtered;
    setClientStorage(STORAGE_KEYS.PRODUCTS, memoryProducts);
    notifyProducts();
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// ORDER OPERATIONS
// -------------------------------------------------------------

export function getAllOrders(): Order[] {
  if (typeof window !== 'undefined') {
    const clientData = getClientStorage<Order[]>(STORAGE_KEYS.ORDERS, memoryOrders);
    if (clientData && clientData.length > 0) return clientData;
  }
  return memoryOrders;
}

export function getOrderById(id: string): Order | undefined {
  const orders = getAllOrders();
  return orders.find(o => o.id === id || o.orderNumber === id);
}

export function getOrderByToken(token: string): Order | undefined {
  const orders = getAllOrders();
  return orders.find(o => o.accessToken === token);
}

export function generateOrderNumber(): string {
  const random4 = Math.floor(1000 + Math.random() * 9000);
  return `ORD-2026-${random4}`;
}

export function generateAccessToken(): string {
  return `tok_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
}

export function createOrder(data: {
  bookId: string;
  bookTitle: string;
  bookPrice: number;
  customerName: string;
  customerEmail: string;
  customerWhatsApp: string;
  utrNumber: string;
  screenshotUrl?: string;
}): Order {
  const orders = getAllOrders();
  const now = new Date().toISOString();
  const orderNumber = generateOrderNumber();
  const accessToken = generateAccessToken();

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    bookId: data.bookId,
    bookTitle: data.bookTitle,
    bookPrice: data.bookPrice,
    customerName: data.customerName.trim(),
    customerEmail: data.customerEmail.trim().toLowerCase(),
    customerWhatsApp: data.customerWhatsApp.trim(),
    // IMPORTANT: Per prompt, a UPI QR scan or UTR is NOT proof of successful payment.
    // Every new order starts as PENDING_VERIFICATION!
    status: 'PENDING_VERIFICATION',
    utrNumber: data.utrNumber.trim(),
    screenshotUrl: data.screenshotUrl,
    accessToken,
    createdAt: now,
    updatedAt: now,
  };

  memoryOrders = [newOrder, ...orders];
  setClientStorage(STORAGE_KEYS.ORDERS, memoryOrders);
  notifyOrders();

  // Record audit trail
  logAdminAction({
    orderId: newOrder.id,
    orderNumber: newOrder.orderNumber,
    adminEmail: 'system',
    action: 'UPDATE_STATUS',
    details: `Order created by customer ${newOrder.customerName} (${newOrder.customerEmail}). Status: PENDING_VERIFICATION with UTR ${newOrder.utrNumber}.`,
  });

  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  options?: { reason?: string; adminEmail?: string }
): Order | null {
  const orders = getAllOrders();
  const index = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
  if (index === -1) return null;

  const order = orders[index];
  const oldStatus = order.status;
  const now = new Date().toISOString();

  const updated: Order = {
    ...order,
    status: newStatus,
    rejectionReason: newStatus === 'REJECTED' ? options?.reason || 'Payment could not be verified against bank transactions.' : order.rejectionReason,
    verifiedAt: newStatus === 'CONFIRMED' ? now : order.verifiedAt,
    updatedAt: now,
  };

  orders[index] = updated;
  memoryOrders = [...orders];
  setClientStorage(STORAGE_KEYS.ORDERS, memoryOrders);
  notifyOrders();

  // Record audit log
  logAdminAction({
    orderId: updated.id,
    orderNumber: updated.orderNumber,
    adminEmail: options?.adminEmail || 'admin@tuhinebooks.com',
    action: newStatus === 'CONFIRMED' ? 'CONFIRM_PAYMENT' : newStatus === 'REJECTED' ? 'REJECT_PAYMENT' : 'UPDATE_STATUS',
    details: `Changed status from ${oldStatus} to ${newStatus}. ${options?.reason ? `Reason: ${options.reason}` : ''}`,
  });

  return updated;
}

// -------------------------------------------------------------
// SETTINGS OPERATIONS
// -------------------------------------------------------------

export function getStoreSettings(): StoreSettings {
  if (typeof window !== 'undefined') {
    const clientSettings = getClientStorage<StoreSettings>(STORAGE_KEYS.SETTINGS, memorySettings);
    if (clientSettings && clientSettings.storeName) return clientSettings;
  }
  return memorySettings;
}

export function updateStoreSettings(newSettings: Partial<StoreSettings>): StoreSettings {
  const current = getStoreSettings();
  const updated: StoreSettings = {
    ...current,
    ...newSettings,
  };
  memorySettings = updated;
  setClientStorage(STORAGE_KEYS.SETTINGS, updated);
  notifySettings();

  logAdminAction({
    orderId: 'system',
    orderNumber: 'CONFIG',
    adminEmail: 'admin@tuhinebooks.com',
    action: 'STORE_SETTINGS_UPDATE',
    details: 'Store settings updated (UPI ID, store name, or contact details).',
  });

  return updated;
}

// -------------------------------------------------------------
// AUDIT LOG OPERATIONS
// -------------------------------------------------------------

export function getAuditLogs(): AdminAuditLog[] {
  if (typeof window !== 'undefined') {
    const clientLogs = getClientStorage<AdminAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, memoryAuditLogs);
    if (clientLogs && clientLogs.length > 0) return clientLogs;
  }
  return memoryAuditLogs;
}

export function logAdminAction(entry: Omit<AdminAuditLog, 'id' | 'timestamp'>): AdminAuditLog {
  const logs = getAuditLogs();
  const newLog: AdminAuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    ...entry,
    timestamp: new Date().toISOString(),
  };
  memoryAuditLogs = [newLog, ...logs];
  setClientStorage(STORAGE_KEYS.AUDIT_LOGS, memoryAuditLogs);
  return newLog;
}

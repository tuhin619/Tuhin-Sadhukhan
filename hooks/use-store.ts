'use client';

import { useSyncExternalStore } from 'react';
import {
  subscribeProducts,
  getAllProducts,
  getInitialProducts,
  subscribeSettings,
  getStoreSettings,
  getInitialSettings,
  subscribeOrders,
  getAllOrders,
  getInitialOrders,
} from '@/lib/store';
import { Product, StoreSettings, Order } from '@/types';

export function useStoreProducts(): Product[] {
  return useSyncExternalStore(subscribeProducts, getAllProducts, getInitialProducts);
}

export function useStoreSettings(): StoreSettings {
  return useSyncExternalStore(subscribeSettings, getStoreSettings, getInitialSettings);
}

export function useStoreOrders(): Order[] {
  return useSyncExternalStore(subscribeOrders, getAllOrders, getInitialOrders);
}

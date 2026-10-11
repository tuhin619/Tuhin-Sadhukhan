import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder } from '@/lib/store';

export async function GET(req: NextRequest) {
  try {
    const orders = getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookId, bookTitle, bookPrice, customerName, customerEmail, customerWhatsApp, utrNumber, screenshotUrl } = body;

    if (!bookId || !customerName || !customerEmail || !customerWhatsApp || !utrNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields or UTR number.' },
        { status: 400 }
      );
    }

    const newOrder = createOrder({
      bookId,
      bookTitle,
      bookPrice: Number(bookPrice),
      customerName,
      customerEmail,
      customerWhatsApp,
      utrNumber,
      screenshotUrl,
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process order creation.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, getProductById } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.nextUrl.searchParams.get('token');

    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    // Verify token or access rights
    if (order.accessToken && token && order.accessToken !== token) {
      return NextResponse.json({ error: 'Unauthorized access token.' }, { status: 403 });
    }

    // Strictly enforce payment confirmation rule:
    // Do not allow customers to download an unconfirmed order!
    if (order.status !== 'CONFIRMED') {
      return NextResponse.json(
        { 
          error: 'Download locked. Your payment is currently under manual verification (status: ' + order.status + '). Once confirmed by Tuhin, this link unlocks immediately.' 
        }, 
        { status: 403 }
      );
    }

    const product = getProductById(order.bookId);
    const title = product?.title || order.bookTitle;
    const cleanFileName = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;

    // Generate secure dynamic PDF asset content
    const securePdfPayload = `%PDF-1.4
% DIGITAL ASSET LICENSE
% BOOK TITLE: ${title}
% LICENSED TO: ${order.customerName} (${order.customerEmail})
% ORDER ID: ${order.orderNumber}
% VERIFIED STATUS: CONFIRMED
% DATE: ${new Date().toISOString()}

1 0 obj
<< /Title (${title})
   /Author (Tuhin Sadhukhan)
   /Subject (Verified Customer Edition) >>
endobj
% END OF HEADER`;

    return new NextResponse(securePdfPayload, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cleanFileName}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process download.' }, { status: 500 });
  }
}

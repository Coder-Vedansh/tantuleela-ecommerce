import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { sendEmailNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, internalOrderId } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is successful, update DB order status
      const updatedOrder = await prisma.order.update({
        where: { id: internalOrderId },
        data: { status: "PAID" },
        include: { orderItems: true }
      });

      const itemsList = updatedOrder.orderItems.map(item => `<li>${item.quantity}x ${item.productName}</li>`).join('');
      const htmlMessage = `
        <h2>🎉 New Paid Order!</h2>
        <p><strong>Order ID:</strong> ${updatedOrder.id}</p>
        <p><strong>Amount:</strong> ₹${updatedOrder.totalAmount}</p>
        <p><strong>Name:</strong> ${updatedOrder.shippingName}</p>
        <p><strong>Phone:</strong> ${updatedOrder.shippingPhone}</p>
        <p><strong>Address:</strong> ${updatedOrder.shippingAddress}</p>
        <h3>Items:</h3>
        <ul>${itemsList}</ul>
      `;
      
      await sendEmailNotification(`New Order: ₹${updatedOrder.totalAmount} from ${updatedOrder.shippingName}`, htmlMessage);

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message || 'Error verifying payment' }, { status: 500 });
  }
}

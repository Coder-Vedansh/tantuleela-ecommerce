import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { sendTelegramNotification } from '@/lib/telegram';

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

      const itemsList = updatedOrder.orderItems.map(item => `- ${item.quantity}x ${item.productName}`).join('\n');
      const message = `🎉 <b>New Paid Order!</b>\n\n<b>Amount:</b> ₹${updatedOrder.totalAmount}\n<b>Name:</b> ${updatedOrder.shippingName}\n<b>Phone:</b> ${updatedOrder.shippingPhone}\n<b>Address:</b> ${updatedOrder.shippingAddress}\n\n<b>Items:</b>\n${itemsList}`;
      
      await sendTelegramNotification(message);

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message || 'Error verifying payment' }, { status: 500 });
  }
}

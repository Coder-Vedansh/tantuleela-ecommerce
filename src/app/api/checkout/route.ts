import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
});

export async function POST(req: Request) {
  try {
    const { items, shipping } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calculate total amount from items (in a real app, verify prices from DB)
    const totalAmount = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    
    // Create Order in Database first
    // For this example, we assume Guest Checkout and create a mock user if no session
    // In production, you'd extract the userId from NextAuth session
    const internalOrder = await prisma.order.create({
      data: {
        totalAmount: totalAmount,
        shippingName: shipping.name,
        shippingPhone: shipping.phone,
        shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`,
        orderItems: {
          create: items.map((item: any) => ({
            productName: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: internalOrder.id,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update internal order with Razorpay ID
    await prisma.order.update({
      where: { id: internalOrder.id },
      data: { razorpayId: razorpayOrder.id }
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      internalOrderId: internalOrder.id
    });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message || 'Error processing checkout' }, { status: 500 });
  }
}

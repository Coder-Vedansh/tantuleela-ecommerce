import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductClient from './ProductClient';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const dbProduct = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!dbProduct) {
    notFound();
  }

  const product = {
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
    description: dbProduct.description,
    materials: ["100% Premium Cotton Yarn", "Gold-plated accent beads", "Soft inner lining"],
    images: [
      dbProduct.imageUrl,
      "https://placehold.co/800x1000/D6E4F0/2C3E50?text=Back+View",
      "https://placehold.co/800x1000/D6E4F0/2C3E50?text=Detail+View"
    ],
    sizes: ["Size 0 (0-2 inches)", "Size 1 (2-3 inches)", "Size 2 (3-4 inches)", "Size 3 (4-5 inches)", "Size 4 (5-6 inches)"],
    inStock: dbProduct.stock > 0,
  };

  return <ProductClient product={product} />;
}

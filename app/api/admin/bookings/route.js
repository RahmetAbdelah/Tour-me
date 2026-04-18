export async function PATCH(req) {
  // Logic to change status from 'pending' to 'confirmed'
  const { bookingId, status } = await req.json();
  
  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status }
  });
  
  return NextResponse.json({ success: true, updated });
}
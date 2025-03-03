import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;
    console.log('Received message:', message); // Debug log

    // Kodiere die Nachricht für die URL
    const encodedMessage = encodeURIComponent(message);
    const url = `https://morefire2.app.n8n.cloud/webhook/dfae1f8e-6d95-4026-95b6-888fdac20298?message=${encodedMessage}`;
    console.log('Sending request to:', url); // Debug log
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    console.log('Response status:', response.status); // Debug log
    const data = await response.json();
    console.log('Response data:', data); // Debug log
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

interface Product {
  title: string;
  url: string;
  image: string;
  price: string;
}

interface WebhookResponse {
  products?: Product[];
  error?: string;
}

const N8N_DETAILED_WEBHOOK = 'https://morefire2.app.n8n.cloud/webhook/detailed search';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, type } = body;

    if (!message) {
      console.log('Error: No message provided');
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    console.log('Processing request:', message, 'Type:', type);

    // Quick response
    if (type === 'quick') {
      const quickResponse = await fetch('https://morefire2.app.n8n.cloud/webhook/smartpresent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message,
          timestamp: new Date().toISOString()
        })
      });

      const quickResponseText = await quickResponse.text();
      console.log('Quick response status:', quickResponse.status);
      console.log('Raw quick response text:', quickResponseText);

      let quickProducts: Product[] = [];
      let quickError = null;

      if (quickResponseText.includes('<!DOCTYPE html>')) {
        console.log('Error: Received HTML response from quick n8n');
        quickError = 'Der Quick-Response Workflow ist möglicherweise nicht aktiv.';
      } else if (!quickResponse.ok) {
        console.log('Error: Quick response not OK');
        quickError = 'Der Quick-Response Workflow konnte nicht ausgeführt werden.';
      } else {
        try {
          const quickData = JSON.parse(quickResponseText);
          if (quickData.products && Array.isArray(quickData.products)) {
            quickProducts = quickData.products;
            console.log('Quick products found:', quickProducts.length);
          }
        } catch (e) {
          console.error('Error parsing quick response:', e);
          quickError = 'Fehler beim Verarbeiten der schnellen Antwort';
        }
      }

      return NextResponse.json({
        quick_response: {
          products: quickProducts,
          error: quickError
        }
      });
    }

    // Detailed response
    if (type === 'detailed') {
      const detailedResponse = await fetch(N8N_DETAILED_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString()
        })
      });

      const detailedResponseText = await detailedResponse.text();
      console.log('Detailed response status:', detailedResponse.status);
      console.log('Raw detailed response text:', detailedResponseText);

      let detailedProducts: Product[] = [];
      let detailedError = null;

      if (detailedResponseText.includes('<!DOCTYPE html>')) {
        console.log('Error: Received HTML response from detailed n8n');
        detailedError = 'Der Detailed-Response Workflow ist möglicherweise nicht aktiv.';
      } else if (!detailedResponse.ok) {
        console.log('Error: Detailed response not OK');
        detailedError = 'Der Detailed-Response Workflow konnte nicht ausgeführt werden.';
      } else {
        try {
          const detailedData = JSON.parse(detailedResponseText);
          // Check for single product format
          if (detailedData.product) {
            const product: Product = {
              title: detailedData.product.name,
              price: detailedData.product.price,
              url: detailedData.product.url,
              image: detailedData.product.image_url
            };
            detailedProducts = [product];
            console.log('Detailed product found:', product);
          }
          // Also check for array format as fallback
          else if (detailedData.products && Array.isArray(detailedData.products)) {
            detailedProducts = detailedData.products;
            console.log('Detailed products found:', detailedProducts.length);
          }
        } catch (e) {
          console.error('Error parsing detailed response:', e);
          detailedError = 'Fehler beim Verarbeiten der detaillierten Antwort';
        }
      }

      return NextResponse.json({
        detailed_response: {
          products: detailedProducts,
          error: detailedError
        }
      });
    }

    return NextResponse.json({
      error: 'Invalid request type',
      message: 'Der Anfrage-Typ muss entweder "quick" oder "detailed" sein.'
    }, { status: 400 });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({
      error: 'Server error',
      message: 'Es gab einen Fehler bei der Verarbeitung Ihrer Anfrage.'
    }, { status: 500 });
  }
} 
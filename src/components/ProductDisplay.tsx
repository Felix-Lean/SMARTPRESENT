interface Product {
  title: string;
  url: string;
  image: string;
  price: string;
}

interface ProductDisplayProps {
  products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  console.log('ProductDisplay received products:', products);
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Keine Produkte gefunden</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div 
          key={index} 
          className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <div className="aspect-square w-full bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const fallbackImage = 'https://placehold.co/400x400?text=Bild+nicht+verfügbar';
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </div>
          <div className="p-4">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group-hover:no-underline"
            >
              <h3 
                className="text-base font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-primary"
                title={product.title}
              >
                {product.title}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-semibold text-primary">{product.price}</p>
                <span className="inline-flex items-center text-sm text-primary transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                  Details
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
} 
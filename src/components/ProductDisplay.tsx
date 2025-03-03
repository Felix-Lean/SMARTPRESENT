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
    console.log('No products to display');
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
      {products.map((product, index) => {
        console.log('Rendering product:', product);
        return (
          <div key={index} className="group relative overflow-hidden transition-all duration-300 hover:transform hover:scale-105">
            <div className="aspect-[4/3] w-full bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="text-base sm:text-xl font-medium text-gray-900 transition-colors duration-300 group-hover:text-primary line-clamp-2">
                  {product.title}
                </h3>
                <div className="mt-1 sm:mt-2 flex items-center justify-between">
                  <p className="text-base sm:text-lg text-gray-600">{product.price}</p>
                  <span className="inline-flex items-center text-xs sm:text-sm text-primary transition-transform duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
                    Mehr erfahren
                    <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
} 
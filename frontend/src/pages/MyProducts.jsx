import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProductCard from '../components/products/ProductCard';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('simple');
  const [hasMounted, setHasMounted] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://mini-e-commerce-platform-with-two-tabs.onrender.com/api/products');
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    try {
      const response = await axios.get(`https://mini-e-commerce-platform-with-two-tabs.onrender.com/api/products/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch {
      toast.error('Error searching products');
    }
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  useEffect(() => {
    fetchProducts();
    setHasMounted(true);
  }, []);

  // Only fetch all products if searchQuery is cleared after initial mount
  useEffect(() => {
    if (hasMounted && searchQuery.trim() === '') {
      fetchProducts();
    }
  }, [searchQuery, hasMounted]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Products</h1>
        
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center sm:items-end">
            <div className="w-full max-w-xs mx-auto">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                Search Products
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or keywords..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="w-full max-w-xs mx-auto">
              <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-1 text-center">
                Search Type
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="simple">Simple Search</option>
                <option value="contextual">Contextual Search</option>
              </select>
            </div>

            <div className="w-full max-w-xs mx-auto">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts; 
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="glass rounded-xl overflow-hidden card-hover">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image.startsWith('http') ? product.image : `${API_URL}${product.image}`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-primary text-white text-xs font-medium">
            ${product.price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 truncate">{product.title}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs capitalize">{product.category}</span>
            <span className="text-gray-500 text-xs">
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

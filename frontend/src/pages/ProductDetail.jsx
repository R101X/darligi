import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ordering, setOrdering] = useState(false)
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`)
      setProduct(res.data.product)
    } catch (error) {
      console.error('Error fetching product:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleBuy = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setOrdering(true)
    setError('')

    try {
      // Create order
      const orderRes = await axios.post(`${API_URL}/orders`, {
        productId: product._id,
        amount: product.price
      })

      // Simulate payment (in real app, integrate with payment gateway)
      await axios.put(`${API_URL}/orders/pay/${orderRes.data.order._id}`)

      alert('Purchase successful! You can now download your product.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order')
    } finally {
      setOrdering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="glass rounded-xl overflow-hidden">
            <img
              src={product.image.startsWith('http') ? product.image : `${API_URL}${product.image}`}
              alt={product.title}
              className="w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">{product.title}</h1>

            <div className="flex items-center mb-6">
              <img
                src={product.user?.avatar || `https://ui-avatars.com/api/?name=${product.user?.name}&background=7c3aed&color=fff`}
                alt={product.user?.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="text-white font-medium">{product.user?.name}</p>
                <p className="text-gray-400 text-sm">Seller</p>
              </div>
            </div>

            <div className="text-4xl font-bold gradient-text mb-6">${product.price}</div>

            <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleBuy}
              disabled={ordering || product.status !== 'approved'}
              className="w-full py-4 rounded-lg btn-gradient text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {ordering ? 'Processing...' : product.status === 'approved' ? 'Buy Now' : 'Not Available'}
            </button>

            <div className="glass rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">What's Included</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Instant Download
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime Access
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Premium Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    } else if (user) {
      fetchData()
    }
  }, [user, authLoading])

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(`${API_URL}/products/my/products`),
        axios.get(`${API_URL}/orders/my`)
      ])
      setProducts(productsRes.data.products)
      setOrders(ordersRes.data.orders)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const myProducts = products.filter(p => p.status === 'approved')
  const pendingProducts = products.filter(p => p.status === 'pending')
  const totalSales = orders.filter(o => o.status === 'paid').length

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Approved Products</h3>
            <p className="text-3xl font-bold text-green-400">{myProducts.length}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Pending Approval</h3>
            <p className="text-3xl font-bold text-yellow-400">{pendingProducts.length}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-primary">{totalSales}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/upload"
            className="glass rounded-xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Upload New Product</h3>
                <p className="text-gray-400 text-sm">Add a new digital product to sell</p>
              </div>
            </div>
          </Link>

          <Link
            to="/"
            className="glass rounded-xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Browse Products</h3>
                <p className="text-gray-400 text-sm">Explore the marketplace</p>
              </div>
            </div>
          </Link>
        </div>

        {/* My Products */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">My Products</h2>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{product.title}</td>
                      <td className="py-3 px-4 text-white">${product.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.status === 'approved' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No products yet. Start selling by uploading your first product!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Admin = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    } else if (user && user.role !== 'admin') {
      navigate('/dashboard')
    } else if (user && user.role === 'admin') {
      fetchData()
    }
  }, [user, authLoading])

  const fetchData = async () => {
    try {
      const [productsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/products/pending`),
        axios.get(`${API_URL}/users`)
      ])
      setProducts(productsRes.data.products)
      setUsers(usersRes.data.users)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (productId) => {
    try {
      await axios.put(`${API_URL}/products/approve/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
    } catch (error) {
      console.error('Error approving product:', error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`${API_URL}/products/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`${API_URL}/users/${userId}`)
      setUsers(users.filter(u => u._id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manage products and users</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Pending Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeTab === 'users'
                ? 'bg-primary text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Users ({users.length})
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Pending Products</h2>
            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Seller</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id} className="border-b border-white/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <span className="text-white truncate max-w-xs">{product.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{product.user?.name}</td>
                        <td className="py-3 px-4 text-white">${product.price}</td>
                        <td className="py-3 px-4 text-gray-300 capitalize">{product.category}</td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(product._id)}
                              className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No pending products</p>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">All Users</h2>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white">{u.name}</td>
                        <td className="py-3 px-4 text-gray-300">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            u.role === 'admin' ? 'bg-primary text-white' : 'bg-gray-600 text-gray-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No users found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin

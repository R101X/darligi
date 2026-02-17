import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-darker border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="DARLIGI" className="h-8" />
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted marketplace for premium digital products. Quality templates, presets, e-books, and more.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link to="/?category=template" className="text-gray-400 hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/?category=preset" className="text-gray-400 hover:text-primary transition-colors">Presets</Link></li>
              <li><Link to="/?category=ebook" className="text-gray-400 hover:text-primary transition-colors">E-books</Link></li>
              <li><Link to="/?category=website" className="text-gray-400 hover:text-primary transition-colors">Website Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} DARLIGI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

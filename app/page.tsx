'use client'

import { useRouter } from 'next/navigation'
import {
  Heart,
  ArrowRight,
  CreditCard,
  Smile,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section id="home" className="pt-10 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-6xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Hygeia-Kenya
              </h2>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Menstrual Products,
                </span>
                <br />
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Accessible through Blockchain
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Hygeia-Kenya leverages blockchain technology to make menstrual
                products more accessible and affordable for girls across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  onClick={() => router.push('/sign-in')}
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/images/menstrualProducts.png"
                  alt="Hygeia-Kenya Menstrual Products"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pink-500 mb-4">
              Why Choose Hygeia-Kenya?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing access to menstrual health products through
              blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Blockchain Payments
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Use your crypto wallet to make secure, fast, and transparent
                purchases without traditional banking limitations.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mb-6">
                <Smile className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Support Local Communities
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Every purchase supports local manufacturing initiatives and
                community-based distribution networks.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Quality Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                All products meet the highest safety and quality standards,
                ensuring health and comfort for users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pink-500 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Purchasing menstrual products with blockchain has never been
              easier
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-pink-200 dark:bg-pink-800"></div>

            {[
              {
                number: 1,
                title: 'Connect Your Wallet',
                description:
                  'Link your blockchain wallet to our secure platform',
              },
              {
                number: 2,
                title: 'Select Products',
                description: 'Browse our range of quality menstrual products',
              },
              {
                number: 3,
                title: 'Confirm Payment',
                description: 'Securely pay using your preferred cryptocurrency',
              },
              {
                number: 4,
                title: 'Receive Products',
                description:
                  'Get your products delivered directly to your location',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-48">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pink-500 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Transforming lives and communities through improved menstrual
              health access
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { number: '50+', description: 'Girls Supported' },
              { number: '24', description: 'Counties Reached' },
              { number: '10', description: 'Local Jobs Created' },
              { number: '98%', description: 'Customer Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-pink-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-pink-50 dark:bg-gray-700 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-lg italic mb-6 text-gray-800 dark:text-gray-200">
                "Hygeia-Kenya has transformed how we access menstrual products
                in our community. The blockchain payment system means we no
                longer need to worry about bank transfers or mobile money
                issues."
              </p>
              <div className="font-semibold text-gray-800 dark:text-white">
                Sarah Mwangi
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Beneficiary
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-400 to-purple-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-pink-100 mb-8">
            Join our newsletter for updates, promotions, and menstrual health
            information
          </p>

          <form className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full sm:rounded-r-none text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white mb-4 sm:mb-0"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full sm:rounded-l-none transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-pink-500">
                  Hygeia-Kenya
                </h1>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering girls and women through accessible menstrual health
                solutions using blockchain technology.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-lg font-semibold text-pink-500 mb-4">
                Explore
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#impact"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    Impact
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-lg font-semibold text-pink-500 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    Menstrual Health Guide
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-pink-500 mb-4">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/Lady_Hygeia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Hygeia-Kenya. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import NextLayout from "@/layouts/NextLayout";
import ProjectSlider from "@/components/ProjectSlider";
export default function Home() {
  return (
    <NextLayout header={1}>
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Marketplace</h1>
          <p className="text-xl mb-8">Discover our wide range of products</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Browse Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <ProjectSlider />
        </div>
      </section>

      {/* User Type Selection */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Join Our Platform</h2>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
              <h3 className="text-xl font-semibold mb-4">Customer</h3>
              <p className="mb-4">Shop directly from our marketplace</p>
              <Link href="/auth/register?role=customer" className="text-blue-600">
                Register as Customer
              </Link>/
              <Link href="/auth/login" className="text-blue-600">
                Login
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
              <h3 className="text-xl font-semibold mb-4">Dealer/Retailer</h3>
              <p className="mb-4">Sell our products to your customers</p>
              <Link href="/auth/register?role=dealer" className="text-blue-600">
                Register as Dealer
              </Link>/
              <Link href="/auth/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </NextLayout>
  );
}
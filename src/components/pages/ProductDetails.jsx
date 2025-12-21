export default function ProductDetails() {
return (
<div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg">
<div className="h-64 bg-gray-200 mb-6" />
<h2 className="text-3xl font-bold mb-2">Sample Product Name</h2>
<p className="text-gray-600 mb-4">This is a detailed description of the product.</p>
<p className="text-2xl font-bold text-blue-600 mb-6">₹9999</p>
<button className="px-6 py-3 bg-green-600 text-white rounded">Add to Cart</button>
</div>
);
}
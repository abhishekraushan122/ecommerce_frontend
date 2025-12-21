export default function Products() {
const items = [
{ id: 1, title: "Laptop X5", price: 65000 },
{ id: 2, title: "Smartphone A1", price: 15000 },
{ id: 3, title: "Smartwatch Pro", price: 3999 }
];


return (
<div>
<h2 className="text-3xl font-bold mb-6">Products</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{items.map(p => (
<a key={p.id} href={`/product/${p.id}`} className="p-4 bg-white shadow rounded-lg">
<div className="h-40 bg-gray-200 mb-3" />
<h3 className="font-bold text-lg">{p.title}</h3>
<p className="text-blue-600 font-bold mt-2">₹{p.price}</p>
</a>
))}
</div>
</div>
);
}
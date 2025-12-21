export default function Cart(){
const cart = [
{ id: 1, title: "Laptop X5", price: 65000, qty: 1 },
{ id: 2, title: "Smartwatch Pro", price: 3999, qty: 2 }
];


return (
<div>
<h2 className="text-3xl font-bold mb-6">Your Cart</h2>
{cart.map(item => (
<div key={item.id} className="p-4 bg-white shadow rounded mb-4 flex justify-between items-center">
<div>
<h3 className="font-bold text-lg">{item.title}</h3>
<p>Quantity: {item.qty}</p>
</div>
<p className="font-bold text-blue-600">₹{item.price}</p>
</div>
))}
<button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded">Checkout</button>
</div>
);
}


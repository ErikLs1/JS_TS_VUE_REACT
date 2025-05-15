// 'use client'
//
// import Image from 'next/image'
// import Link from 'next/link'
// import { useCart } from '@/Context/CartContext'
//
// export default function BasketPage() {
// 	const { items, updateQty, clear } = useCart()
// 	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
// 	const shipping = items.length ? 3.99 : 0
// 	const tax = items.length ? 2.0 : 0
// 	const total = subtotal + shipping + tax
//
// 	return (
// 		<div className="container py-5">
// 			<h1 className="mb-4">Basket <small className="text-muted">{items.length} items</small></h1>
//
// 			<div className="row">
// 				<div className="col-md-8">
// 					{items.map((i) => (
// 						<div key={i.id} className="d-flex align-items-center bg-light rounded p-3 mb-3">
// 							<Image
// 								src={i.img}
// 								alt={i.name}
// 								width={100}
// 								height={75}
// 								style={{ objectFit: 'cover' }}
// 								className="rounded"
// 							/>
// 							<div className="ms-3 flex-fill">
// 								<h5>{i.name}</h5>
// 								<p className="mb-1 text-success">${i.price.toFixed(2)}</p>
// 								<div className="d-flex align-items-center">
// 									<button
// 										className="btn btn-outline-secondary btn-sm"
// 										onClick={() => updateQty(i.id, i.quantity - 1)}
// 									>–</button>
// 									<span className="px-3">{i.quantity}</span>
// 									<button
// 										className="btn btn-outline-secondary btn-sm"
// 										onClick={() => updateQty(i.id, i.quantity + 1)}
// 									>+</button>
// 								</div>
// 							</div>
// 							<div className="fw-bold">${(i.price * i.quantity).toFixed(2)}</div>
// 						</div>
// 					))}
// 				</div>
//
// 				<div className="col-md-4">
// 					<div className="bg-white rounded p-4 shadow-sm">
// 						<h5>Order summary</h5>
// 						<dl className="row">
// 							<dt className="col">Subtotal</dt><dd className="col text-end">${subtotal.toFixed(2)}</dd>
// 							<dt className="col">Shipping</dt><dd className="col text-end">${shipping.toFixed(2)}</dd>
// 							<dt className="col">Tax</dt><dd className="col text-end">${tax.toFixed(2)}</dd>
// 							<dt className="col">Total</dt><dd className="col text-end fw-bold">${total.toFixed(2)}</dd>
// 						</dl>
// 						<button className="btn btn-success w-100">Continue to payment →</button>
// 						<button className="btn btn-link mt-2" onClick={clear}>Empty basket</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

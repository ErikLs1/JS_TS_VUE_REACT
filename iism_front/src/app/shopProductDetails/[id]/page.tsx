"use client"

import { notFound } from 'next/navigation'
import Image from 'next/image'
import luxuryTable from "../../../../public/luxuryTable.jpg";
import {useCart} from "@/Context/CartContext";

type Product = {
	id: number
	name: string
	price: number
	location: string
	img: object,
	description: string[]
}

interface Props {
	params: { id: string }
}

const products: Product[] = [
	{ id: 1, name: 'Product 1', price: 5.99,  location: 'San Juan Capistrano, CA', img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 2, name: 'Product 2', price: 12.99, location: 'Huntington Beach, CA',  img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 3, name: 'Product 3', price: 2.99,  location: 'Huntington Beach, CA',  img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 4, name: 'Product 4', price: 8.50,  location: 'San Diego, CA',         img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 5, name: 'Product 5', price: 4.75,  location: 'Irvine, CA',           img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 6, name: 'Product 6', price: 9.25,  location: 'Laguna Beach, CA',     img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
]

export default function ProductPage({ params }: Props) {
	const id = parseInt(params.id, 10)

	const product = products.find((p) => p.id === +params.id)
	const { addItem } = useCart()

	if (!product) return notFound()

	return (
		<div className="container py-5">
			<div className="card mb-5" style={{ borderRadius: '12px' }}>
				<div className="row g-0">
					<div className="col-md-6">
						<Image
							src={product.img}
							alt={product.name}
							width={600}
							height={450}
							className="img-fluid rounded-start"
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className="col-md-6">
						<div className="card-body">
							<h2 className="card-title">{product.name}</h2>
							<p className="card-text">
								<strong>Price:</strong> ${product.price.toFixed(2)}
							</p>
							<p className="card-text">
								<strong>Location:</strong> {product.location}
							</p>

							<div className="mb-3">
								<label htmlFor="quantity" className="form-label">
									Quantity
								</label>
								<input
									type="number"
									id="quantity"
									className="form-control w-25"
									defaultValue={1}
									min={1}
								/>
							</div>

							<button
								className="btn btn-dark mb-4"
								onClick={() => addItem({
									id: product.id,
									name: product.name,
									price: product.price,
									img: product?.img,
								})}
							>Add to Cart</button>

							<div className="p-3 bg-warning-subtle rounded">
								<h5>Description</h5>
								<ul className="mb-0">
									{product.description.map((pt, i) => (
										<li key={i}>{pt}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

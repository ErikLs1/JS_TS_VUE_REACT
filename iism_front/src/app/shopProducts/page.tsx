"use client"

import Image from "next/image";
import luxuryTable from '@/../public/luxuryTable.jpg'
import Link from "next/link";

type Product = {
	id: number
	name: string
	price: number
	location: string
	img: object,
	description: string[]
}

const products: Product[] = [
	{ id: 1, name: 'Product 1', price: 5.99,  location: 'San Juan Capistrano, CA', img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 2, name: 'Product 2', price: 12.99, location: 'Huntington Beach, CA',  img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 3, name: 'Product 3', price: 2.99,  location: 'Huntington Beach, CA',  img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 4, name: 'Product 4', price: 8.50,  location: 'San Diego, CA',         img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 5, name: 'Product 5', price: 4.75,  location: 'Irvine, CA',           img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
	{ id: 6, name: 'Product 6', price: 9.25,  location: 'Laguna Beach, CA',     img: luxuryTable, description: ['Point 1: asfasf', 'Point 2: saasgag', 'Point 3: fasfas', 'Point 4: ffsegawj',] },
]

export default function ShopProducts() {
	return (
		<div className="container py-5">
			<h1 className="mb-4">Products</h1>
			{/* filters… */}
			<div className="row g-3 mb-4 align-items-center">
				<div className="col">
					<input
						type="text"
						className="form-control"
						placeholder="Search…"
					/>
				</div>
				<div className="col-auto">
					<select className="form-select">
						<option value="all">All locations</option>
						{Array.from(new Set(products.map(p => p.location))).map(loc => (
							<option key={loc} value={loc}>{loc}</option>
						))}
					</select>
				</div>
			</div>
			<div className="row row-cols-1 row-cols-md-2 g-4">
				{products.map((p) => (
					<div key={p.id} className="col d-flex">
						{/* Wrap the entire card in a Link */}
						<Link href={`/shopProductDetails/${p.id}`} className="card flex-fill h-100 text-decoration-none">
							<Image
								src={p.img}
								alt={p.name}
								width={400}
								height={300}
								className="card-img-top"
								style={{ objectFit: 'cover' }}
							/>
							<div className="card-body">
								<h5 className="card-title text-dark">{p.name}</h5>
								<p className="card-text text-success fw-bold">
									${p.price.toFixed(2)}
								</p>
								<p className="card-text text-muted">
									Grown in {p.location}
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

"use client"

import Image from "next/image";
import luxuryTable from '@/../public/luxuryTable.jpg'

type Product = {
	id: number
	name: string
	price: number
	location: string
	img: object
}

const products: Product[] = [
	{ id: 1, name: 'Product 1', price: 5.99,  location: 'San Juan Capistrano, CA', img: luxuryTable },
	{ id: 2, name: 'Product 2', price: 12.99, location: 'Huntington Beach, CA',  img: luxuryTable },
	{ id: 3, name: 'Product 3', price: 2.99,  location: 'Huntington Beach, CA',  img: luxuryTable },
	{ id: 4, name: 'Product 4', price: 8.50,  location: 'San Diego, CA',         img: luxuryTable },
	{ id: 5, name: 'Product 5', price: 4.75,  location: 'Irvine, CA',           img: luxuryTable },
	{ id: 6, name: 'Product 6', price: 9.25,  location: 'Laguna Beach, CA',     img: luxuryTable },
]

export default function ShopProducts() {
	return (
		<div className="shop-products">
			<h1 className="product-heading">Products</h1>

			{/* Filters bar */}
			<div className="filters">
				<input placeholder="Search…" />
				<select>
					<option value="all">All locations</option>
				</select>
			</div>

			{/* Products grid */}
			<div className="products-grid">
				{products.map(p => (
					<div key={p.id} className="card">
						<Image
							src={p.img}
							alt={p.name}
							width={400}
							height={300}
							style={{ objectFit: 'cover' }}
						/>
						<div className="card-content">
							<h2>{p.name}</h2>
							<div className="price">${p.price.toFixed(2)}</div>
							<div className="location">Grown in {p.location}</div>
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
				.shop-products {
					padding: 2rem 1rem;
				}
				.product-heading {
					margin-bottom: 1rem;
				}
				.filters {
					display: flex;
					gap: 1rem;
					margin-bottom: 1.5rem;
				}
				.filters input,
				.filters select {
					padding: 0.5rem 0.75rem;
					border: 1px solid #ccd0d5;
					border-radius: 6px;
					font-size: 1rem;
				}
				.filters input {
					flex: 1;
				}
				.filters select {
					flex: 0 0 200px;
				}

				.products-grid {
					display: grid;
					/* exactly 2 columns, each max 350px */
					grid-template-columns: repeat(2, 350px);
					justify-content: center; /* center if viewport > 2*350px + gap */
					gap: 24px;
				}

				.card {
					width: 100%;
					max-width: 350px;
					background: #fff;
					border-radius: 12px;
					overflow: hidden;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
					display: flex;
					flex-direction: column;
				}
				.card img {
					width: 100%;
					height: auto;
				}
				.card-content {
					padding: 16px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.card-content h2 {
					margin: 0 0 8px;
					font-size: 1.1rem;
				}
				.price {
					font-weight: bold;
					color: #2f855a;
					margin-bottom: 8px;
				}
				.location {
					font-size: 0.9rem;
					color: #718096;
				}

				/* Make it responsive: fall back to 1 column on small screens */
				@media (max-width: 380px) {
					.products-grid {
						grid-template-columns: 1fr;
					}
				}
			`}</style>
		</div>
	)
}

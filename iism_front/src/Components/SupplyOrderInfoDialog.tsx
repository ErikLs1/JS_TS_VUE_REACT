import {TextField, Typography} from "@mui/material";
import {SupplyItem} from "@/app/supplyMarket/page";

export default function SupplyOrderInfoDialog({ item, quantity, setQuantity } : { item: SupplyItem; quantity: number; setQuantity: (q: number) => void }) {
	return (
		<>
			<Typography>Category: {item.category}</Typography>
			<Typography>{item.description}</Typography>
			<Typography variant="subtitle2">Supplier info:</Typography>
			<Typography>Name: {item.supplierName}</Typography>
			<Typography>Address: {item.supplierAddress}</Typography>
			<Typography>Email: {item.supplierEmail}</Typography>
			<Typography>Phone: {item.supplierPhone}</Typography>
			<TextField
				size="small"
				label="Qty"
				type="number"
				InputProps={{ inputProps: { min: 1 } }}
				value={quantity}
				onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
			/>
		</>
	)
}

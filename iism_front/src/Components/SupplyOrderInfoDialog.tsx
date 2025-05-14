import {TextField, Typography} from "@mui/material";

interface SupplyOrderInfoDialogProps {
	item: {
		productName: string;
		description: string;
		supplierName: string;
		supplierAddress: string;
		supplierEmail: string;
		supplierPhone: string;
		unitCost: number;
	};
	quantity: number;
	setQuantity: (q: number) => void;
}

export default function SupplyOrderInfoDialog({ item, quantity, setQuantity } : SupplyOrderInfoDialogProps) {
	return (
		<>
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

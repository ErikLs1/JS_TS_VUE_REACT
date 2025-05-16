import {Box, Divider, Paper, TextField, Typography} from "@mui/material";

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
		<Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
				<Typography variant="subtitle1" gutterBottom>
					Supplier Information
				</Typography>
				<Divider sx={{ mb: 1 }} />
				<Typography><strong>Name:</strong> {item.supplierName}</Typography>
				<Typography><strong>Address:</strong> {item.supplierAddress}</Typography>
				<Typography><strong>Email:</strong> {item.supplierEmail}</Typography>
				<Typography><strong>Phone:</strong> {item.supplierPhone}</Typography>
			</Paper>

			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
				<TextField
					size="small"
					label="Quantity"
					type="number"
					value={quantity}
					onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
					sx={{ width: 100 }}
				/>
				<Typography variant="subtitle1" sx={{ ml: 2 }}>
					Unit Cost: ${item.unitCost.toFixed(2)}
				</Typography>
			</Box>
		</Box>
	)
}

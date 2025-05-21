"use client"

import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";

interface SupplyCardProps {
	item: {
		productName: string;
		supplierName: string;
		unitCost: number;
	};
	onClick: () => void;
}
export default function SupplyCard({ item, onClick } : SupplyCardProps) {
	return (
		<>
			<Grid size={{ xs: 12, sm: 6, md: 4}}>
				<Card>
					<CardActionArea onClick={onClick}>
						<CardContent>
							<Typography variant="h6">
								{item.productName}
							</Typography>
							<Typography variant="subtitle2" color="text.secondary">
								{item.supplierName}
							</Typography>
							<Typography variant="body2">
								${item.unitCost} / unit
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		</>
	)
}

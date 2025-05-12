import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {SupplyItem} from "@/app/supplyMarket/page";

export default function SupplyCard({ item, onClick } : { item: SupplyItem; onClick: (item: SupplyItem) => void }) {
	return (
		<>
			<Grid size={{ xs: 12, sm: 6, md: 4}}>
				<Card>
					<CardActionArea onClick={ () => onClick(item)}>
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

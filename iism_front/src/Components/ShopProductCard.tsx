import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";

interface ShopProductCardProps {
	item: InventoryProductsDto;
	onSelect: (productId: string) => void;
}

export default function ShopProductCard({ item, onSelect } : ShopProductCardProps) {
	return (
		<Card>
			<CardActionArea onClick={() => onSelect(item.productId)}>
				<CardMedia
					component="img"
					height={200}
					image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.1Ci7Tf9gz235soLOWO_K3gHaIT%26cb%3Diwc2%26pid%3DApi&f=1&ipt=36cb3347d06202f7d724086e9edaaea9c827eb4ab7046daaad82f2c203c00e8c&ipo=images"
					alt={item.productName}
				/>
				<CardContent>
					<Typography variant="h6">{item.productName}</Typography>
					<Typography variant="body2" color="textSecondary">
						{item.categoryName}
					</Typography>
					<Typography variant="subtitle1" color="primary">
						${item.productPrice.toFixed(2)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

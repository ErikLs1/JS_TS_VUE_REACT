"use client"

import {AlertColor, Snackbar} from "@mui/material";
import Alert from "@mui/material/Alert";

interface SnackbarAlertProps {
	open: boolean;
	alertType: AlertColor;
	message: string;
	duration?: number;
	action: () => void;
}

export default function SnackBarAlert( {
	open,
	alertType,
	message,
	duration,
	action
} : SnackbarAlertProps) {
	return (
		<Snackbar open={open} autoHideDuration={duration} onClose={action}>
			<Alert severity={alertType} onClose={action} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	)
}

import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar, Button, CssBaseline, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static" color="transparent">
				<Toolbar sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
					<Typography variant="h6" color="GrayText" noWrap>
						<Button variant="text" onClick={() => {
							navigate(`/`);
						}}> Sniffspot </Button>

					</Typography>
					<Divider />
					<Button variant="outlined" onClick={() => {
						navigate(`/spot/create`);
					}}> Create Spot </Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;

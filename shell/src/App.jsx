import { useState } from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import UsersPage from "./components/UsersPage";
import TicketsPage from "./components/TicketsPage";
import PurchasesPage from "./components/PurchasesPage";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<div className="bodyWrapper">
				<Header />
				<Box className="content" w={"100%"} height="100%">
					<Routes>
						<Route path="/" element={<UsersPage />} />
						<Route path="tickets" element={<TicketsPage />} />
						<Route path="purchases" element={<PurchasesPage />} />
					</Routes>
				</Box>
			</div>
		</>
	);
}

export default App;

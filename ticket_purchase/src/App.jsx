import React, { useState } from "react";
import "./App.css";
import { Stack, Heading, Center, Spinner } from "@chakra-ui/react";
import PurchaseTable from "./components/PurchaseTable";
import InputPurchase from "./components/InputPurchase";
import { useQuery } from "@tanstack/react-query";

function App() {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: "tickets",
		queryFn: async () => {
			const response = await fetch("http://localhost:8085/api/purchases");
			const resJson = await response.json();
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			await console.log("response was", resJson[0].entity);
			return resJson[0].entity;
		},
	});

	const handleDelete = async (purchaseId) => {
		console.log("handle delete is called");
		const response = await fetch(
			`http://localhost:8085/api/purchases/${purchaseId}`,
			{
				method: "DELETE",
			}
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response was", response);
		refetch();
		return response.json();
	};

	const handleAdd = async (ticket) => {
		console.log("handle add is called", ticket);
		const response = await fetch(`http://localhost:8085/api/purchases`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ticket),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response was", response);
		refetch();
		return response.json();
	};

	const handleEdit = async (ticket) => {
		const response = await fetch(
			`http://localhost:8085/api/purchases/${ticket.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(ticket),
			}
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		refetch();
		console.log("response was", response);
		return response.json();
	};

	if (isLoading) {
		return (
			<Center>
				<Spinner size="xl" />
			</Center>
		);
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Stack spacing={6}>
			<Heading as="h2" size="xl">
				Purchases List
			</Heading>
			<InputPurchase onAdd={handleAdd} />
			<PurchaseTable
				purchases={data}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</Stack>
	);
}

export default App;

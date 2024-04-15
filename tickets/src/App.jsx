import React, { useState } from "react";
import "./App.css";
import { Stack, Heading, Center, Spinner } from "@chakra-ui/react";
import TicketTable from "./components/TicketTable";
import InputTicket from "./components/InputTicket";
import { useQuery } from "@tanstack/react-query";

function App() {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: "tickets",
		queryFn: async () => {
			const response = await fetch("http://localhost:8085/api/tickets/list");
			console.log("reponse was", response);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json().then((data) => data.tickets);
		},
	});

	const handleDelete = async (ticketId) => {
		console.log("handle delete is called");
		const response = await fetch(
			`http://localhost:8085/api/tickets/remove/${ticketId}`,
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
		const response = await fetch(`http://localhost:8085/api/tickets/create`, {
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
			`http://localhost:8085/api/tickets/update/${ticket.id}`,
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
				Tickets List
			</Heading>
			<InputTicket onAdd={handleAdd} />
			<TicketTable tickets={data} onDelete={handleDelete} onEdit={handleEdit} />
		</Stack>
	);
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { Stack, Heading, Center, Spinner } from "@chakra-ui/react";
import UserTable from "./components/UserTable";
import InputUser from "./components/InputUser";
import { useQuery } from "@tanstack/react-query";

function App() {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: "users",
		queryFn: async () => {
			const response = await fetch("http://localhost:8085/api/users");
			console.log("reponse was", response);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
	});

	const handleDelete = async (userId) => {
		console.log("handle delete is called");
		const response = await fetch(`http://localhost:8085/api/users/${userId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response was", response);
		refetch();
		return response.json();
	};

	const handleAdd = async (user) => {
		const response = await fetch(`http://localhost:8085/api/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		console.log("response was", response);
		refetch();
		return response.json();
	};

	const handleEdit = async (user) => {
		const response = await fetch(`http://localhost:8085/api/users/${user.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
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
				Users List
			</Heading>
			<InputUser onAdd={handleAdd} />
			<UserTable users={data} onDelete={handleDelete} onEdit={handleEdit} />
		</Stack>
	);
}

export default App;

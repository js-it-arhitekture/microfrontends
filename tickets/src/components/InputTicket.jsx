import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const InputTicket = ({ onAdd }) => {
	const [ticket, setTicket] = useState({
		eventID: "",
		type: "",
		price: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTicket({
			...ticket,
			[name]: value,
		});
	};

	const handleAddClick = () => {
		// Check if any ticket value is empty
		if (Object.values(ticket).some((value) => value === "")) {
			alert("Please fill in all fields");
			return;
		}
		onAdd(ticket);
		setTicket({
			eventID: "",
			type: "",
			price: "",
		});
	};

	return (
		<Flex align="center">
			<Input
				name="eventID"
				value={ticket.eventID}
				onChange={handleChange}
				placeholder="Event ID"
				marginRight="2"
			/>
			<Input
				name="type"
				value={ticket.type}
				onChange={handleChange}
				placeholder="Type"
				marginRight="2"
			/>
			<Input
				name="price"
				value={ticket.price ? parseFloat(ticket.price).toFixed(2) : "20.00"}
				onChange={handleChange}
				placeholder="Price"
				marginRight="2"
			/>
			<Button width={"250px"} colorScheme="blue" onClick={handleAddClick}>
				Add
			</Button>
		</Flex>
	);
};

export default InputTicket;

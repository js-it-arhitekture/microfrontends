import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const InputPurchase = ({ onAdd }) => {
	const [purchase, setPurchase] = useState({
		userId: "",
		ticketId: "",
		quantity: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPurchase({
			...purchase,
			[name]: value,
		});
	};

	const handleAddClick = () => {
		// Check if any purchase value is empty
		if (Object.values(purchase).some((value) => value === "")) {
			alert("Please fill in all fields");
			return;
		}
		onAdd(purchase);
		setPurchase({
			userId: "",
			ticketId: "",
			quantity: "",
		});
	};

	return (
		<Flex align="center">
			<Input
				name="userId"
				value={purchase.userId}
				onChange={handleChange}
				placeholder="Event ID"
				marginRight="2"
			/>
			<Input
				name="ticketId"
				value={purchase.ticketId}
				onChange={handleChange}
				placeholder="ticketId"
				marginRight="2"
			/>
			<Input
				name="quantity"
				value={purchase.quantity}
				onChange={handleChange}
				placeholder="quantity"
				marginRight="2"
			/>
			<Button width={"250px"} colorScheme="blue" onClick={handleAddClick}>
				Add
			</Button>
		</Flex>
	);
};

export default InputPurchase;

import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const InputUser = ({ onAdd }) => {
	const [user, setUser] = useState({
		username: "",
		name: "",
		password: "",
		age: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleAddClick = () => {
		// Check if any user value is empty
		if (Object.values(user).some((value) => value === "")) {
			alert("Please fill in all fields");
			return;
		}
		onAdd(user);
		setUser({
			username: "",
			name: "",
			password: "",
			age: "",
		});
	};

	return (
		<Flex align="center">
			<Input
				name="username"
				value={user.username}
				onChange={handleChange}
				placeholder="Username"
				marginRight="2"
			/>
			<Input
				name="name"
				value={user.name}
				onChange={handleChange}
				placeholder="Name"
				marginRight="2"
			/>
			<Input
				name="password"
				value={user.password}
				onChange={handleChange}
				placeholder="Password"
				marginRight="2"
			/>
			<Input
				name="age"
				value={user.age}
				onChange={handleChange}
				placeholder="Age"
				marginRight="2"
			/>
			<Button width={"250px"} colorScheme="blue" onClick={handleAddClick}>
				Add
			</Button>
		</Flex>
	);
};

export default InputUser;

import React, { useState } from "react";
import {
	Table,
	Tbody,
	Tr,
	Td,
	Button,
	Thead,
	Th,
	Input,
} from "@chakra-ui/react";

const UserTable = ({ users, onDelete, onEdit }) => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState(null);

	const handleRowClick = (user) => {
		setSelectedUser(user);
		setEditedUser(user);
		setIsEditing(true);
	};

	const handleDelete = (user) => {
		console.log("Delete user:", user);
		onDelete(user.id);
		setSelectedUser(null);
		setIsEditing(false);
	};

	const handleEdit = () => {
		console.log("Edit user:", editedUser);
		setIsEditing(false);
		setEditedUser(null);
		onEdit(editedUser);
	};

	const handleStop = () => {
		setIsEditing(false);
		setSelectedUser(null);
		setEditedUser(null);
	};

	const passwordToStars = (password) => {
		return "*".repeat(password.length);
	};

	return (
		<Table variant="striped" colorScheme="messenger">
			<Thead>
				<Tr>
					<Th>Username</Th>
					<Th>Name</Th>
					<Th>Password</Th>
					<Th>Age</Th>
					<Th>User Actions</Th>
				</Tr>
			</Thead>
			<Tbody>
				{users.map((user) => (
					<Tr key={user.id}>
						<Td>
							{isEditing && selectedUser.id === user.id ? (
								<Input
									defaultValue={editedUser.username}
									onChange={(e) =>
										setEditedUser({
											...editedUser,
											username: e.target.value,
										})
									}
								/>
							) : (
								user.username
							)}
						</Td>
						<Td>
							{isEditing && selectedUser.id === user.id ? (
								<Input
									defaultValue={editedUser.name}
									onChange={(e) =>
										setEditedUser({
											...editedUser,
											name: e.target.value,
										})
									}
								/>
							) : (
								user.name
							)}
						</Td>
						<Td>
							{isEditing && selectedUser.id === user.id ? (
								<Input
									defaultValue={editedUser.password}
									onChange={(e) =>
										setEditedUser({
											...editedUser,
											password: e.target.value,
										})
									}
								/>
							) : (
								passwordToStars(user.password)
							)}
						</Td>
						<Td>
							{isEditing && selectedUser.id === user.id ? (
								<Input
									defaultValue={editedUser.age}
									onChange={(e) =>
										setEditedUser({
											...editedUser,
											age: e.target.value,
										})
									}
								/>
							) : (
								user.age
							)}
						</Td>
						<Td>
							{isEditing && selectedUser.id === user.id ? (
								<>
									<Button colorScheme="red" onClick={handleStop}>
										Stop
									</Button>
									<Button colorScheme="green" onClick={handleEdit}>
										Save
									</Button>
								</>
							) : (
								<>
									<Button colorScheme="red" onClick={() => handleDelete(user)}>
										Delete
									</Button>
									<Button
										colorScheme="blue"
										onClick={() => handleRowClick(user)}
									>
										Edit
									</Button>
								</>
							)}
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default UserTable;

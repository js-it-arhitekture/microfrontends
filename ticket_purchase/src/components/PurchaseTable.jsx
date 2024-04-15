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

const PurchaseTable = ({ purchases, onDelete, onEdit }) => {
	const [selectedPurchase, setSelectedPurchase] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedPurchase, setEditedPurchase] = useState(null);

	console.log("purchases", purchases);

	const handleRowClick = (purchase) => {
		setSelectedPurchase(purchase);
		setEditedPurchase(purchase);
		setIsEditing(true);
	};

	const handleDelete = (purchase) => {
		console.log("Delete purchase:", purchase);
		onDelete(purchase.id);
		setSelectedPurchase(null);
		setIsEditing(false);
	};

	const handleEdit = () => {
		console.log("Edit purchase:", editedPurchase);
		setIsEditing(false);
		setEditedPurchase(null);
		onEdit(editedPurchase);
	};

	const handleStop = () => {
		setIsEditing(false);
		setSelectedPurchase(null);
		setEditedPurchase(null);
	};

	return (
		<Table variant="striped" colorScheme="messenger">
			<Thead>
				<Tr>
					<Th>User ID</Th>
					<Th>Ticket Id</Th>
					<Th>Quantity</Th>
					<Th>Timestamp</Th>
					<Th>User Actions</Th> {/* Renamed column header */}
				</Tr>
			</Thead>
			<Tbody>
				{
					/* check if table not empty */
					purchases.length === 0 ? (
						<Tr>
							<Td colSpan={4}>No purchases available</Td>
						</Tr>
					) : (
						purchases.map((purchase) => (
							<Tr key={purchase.id}>
								<Td>
									{isEditing && selectedPurchase.id === purchase.id ? (
										<Input
											defaultValue={editedPurchase.userId}
											onChange={(e) =>
												setEditedPurchase({
													...editedPurchase,
													userId: e.target.value,
												})
											}
										/>
									) : (
										purchase.userId
									)}
								</Td>
								<Td>
									{isEditing && selectedPurchase.id === purchase.id ? (
										<Input
											defaultValue={editedPurchase.ticketId}
											onChange={(e) =>
												setEditedPurchase({
													...editedPurchase,
													ticketId: e.target.value,
												})
											}
										/>
									) : (
										purchase.ticketId
									)}
								</Td>
								<Td>
									{isEditing && selectedPurchase.id === purchase.id ? (
										<Input
											defaultValue={editedPurchase.quantity}
											onChange={(e) =>
												setEditedPurchase({
													...editedPurchase,
													quantity: e.target.value,
												})
											}
										/>
									) : (
										purchase.quantity
									)}
								</Td>
								<Td>{purchase.timestamp}</Td>
								<Td>
									{isEditing &&
									selectedPurchase.eventID === purchase.eventID ? (
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
											<Button
												colorScheme="red"
												onClick={() => handleDelete(purchase)}
											>
												Delete
											</Button>
											<Button
												colorScheme="blue"
												onClick={() => handleRowClick(purchase)}
											>
												Edit
											</Button>
										</>
									)}
								</Td>
							</Tr>
						))
					)
				}
			</Tbody>
		</Table>
	);
};

export default PurchaseTable;

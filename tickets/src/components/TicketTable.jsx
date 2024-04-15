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

const TicketTable = ({ tickets, onDelete, onEdit }) => {
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editedTicket, setEditedTicket] = useState(null);

	console.log("tickets", tickets);

	const handleRowClick = (ticket) => {
		setSelectedTicket(ticket);
		setEditedTicket(ticket);
		setIsEditing(true);
	};

	const handleDelete = (ticket) => {
		console.log("Delete ticket:", ticket);
		onDelete(ticket.id);
		setSelectedTicket(null);
		setIsEditing(false);
	};

	const handleEdit = () => {
		console.log("Edit ticket:", editedTicket);
		setIsEditing(false);
		setEditedTicket(null);
		onEdit(editedTicket);
	};

	const handleStop = () => {
		setIsEditing(false);
		setSelectedTicket(null);
		setEditedTicket(null);
	};

	return (
		<Table variant="striped" colorScheme="messenger">
			<Thead>
				<Tr>
					<Th>Event ID</Th>
					<Th>Type</Th>
					<Th>Price</Th>
					<Th>User Actions</Th> {/* Renamed column header */}
				</Tr>
			</Thead>
			<Tbody>
				{
					/* check if table not empty */
					tickets.length === 0 ? (
						<Tr>
							<Td colSpan={4}>No tickets available</Td>
						</Tr>
					) : (
						tickets.map((ticket) => (
							<Tr key={ticket.eventID}>
								<Td>
									{isEditing && selectedTicket.eventID === ticket.eventID ? (
										<Input
											defaultValue={editedTicket.eventID}
											onChange={(e) =>
												setEditedTicket({
													...editedTicket,
													eventID: e.target.value,
												})
											}
										/>
									) : (
										ticket.eventID
									)}
								</Td>
								<Td>
									{isEditing && selectedTicket.eventID === ticket.eventID ? (
										<Input
											defaultValue={editedTicket.type}
											onChange={(e) =>
												setEditedTicket({
													...editedTicket,
													type: e.target.value,
												})
											}
										/>
									) : (
										ticket.type
									)}
								</Td>
								<Td>
									{isEditing && selectedTicket.eventID === ticket.eventID ? (
										<Input
											defaultValue={editedTicket.price}
											onChange={(e) =>
												setEditedTicket({
													...editedTicket,
													price: e.target.value,
												})
											}
										/>
									) : (
										ticket.price
									)}
								</Td>
								<Td>
									{isEditing && selectedTicket.eventID === ticket.eventID ? (
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
												onClick={() => handleDelete(ticket)}
											>
												Delete
											</Button>
											<Button
												colorScheme="blue"
												onClick={() => handleRowClick(ticket)}
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

export default TicketTable;

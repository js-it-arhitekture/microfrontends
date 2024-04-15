// AppWrapper.js
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

const AppWrapper = () => {
	return (
		<ChakraProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ChakraProvider>
	);
};

export default AppWrapper;

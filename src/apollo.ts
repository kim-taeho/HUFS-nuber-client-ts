import ApolloClient, { Operation } from "apollo-boost";

const client = new ApolloClient({
    request: async (operation: Operation) => {
        operation.setContext({
            header: {
                "X-JWT": localStorage.getItem("jwt") || ""
            }
        });
    },
    uri: "http://localhost:4000/graphql"
});

export default client;
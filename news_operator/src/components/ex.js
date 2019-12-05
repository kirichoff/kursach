import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import {useQuery} from "@apollo/react-hooks";

const ADD_TODO = gql`
     query ($type: String!) {
        addTodo(type: $type) {
            id
            type
        }
    }
`;

const AddTodo = () => {
    let input;
    const { loading, error, data } = useQuery();

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <Mutation mutation={ADD_TODO}>
            {(addTodo, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addTodo({ variables: { type: input.value } });
                            input.value = '';
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button type="submit">Add Todo</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};

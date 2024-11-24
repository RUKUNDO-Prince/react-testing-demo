import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    // TEST TO CHECK IF THE COMPONENT RENDERS CORRECTLY
    test('renders My Todos heading', () => {
        render(<App />);
        const headingElement = screen.getByText(/my todos/i);
        expect(headingElement).toBeInTheDocument();
    });

    // TEST TO CHECK IF A NEW TODO CAN BE ADDED
    test('can add a new todo', () => {
        render(<App />);
        
        // INPUT NEW TITLE AND DESCRIPTION
        fireEvent.change(screen.getByPlaceholderText(/what's the task title?/i), { target: { value: 'Test Todo' } });
        fireEvent.change(screen.getByPlaceholderText(/what's the task description?/i), { target: { value: 'Test Description' } });
        
        // CLICK THE ADD BUTTON
        fireEvent.click(screen.getByText(/add/i));
        
        // CHECK IF THE NEW TODO IS DISPLAYED
        const todoElement = screen.getByText(/test todo/i);
        expect(todoElement).toBeInTheDocument();
    });

    // TEST TO CHECK IF A TODO CAN BE DELETED
    test('can delete a todo', () => {
        render(<App />);
        
        // ADD A NEW TODO FIRST
        fireEvent.change(screen.getByPlaceholderText(/what's the task title?/i), { target: { value: 'Todo to Delete' } });
        fireEvent.change(screen.getByPlaceholderText(/what's the task description?/i), { target: { value: 'Description' } });
        fireEvent.click(screen.getByText(/add/i));
        
        // DELETE THE TODO
        const deleteButtons = screen.getAllByTitle(/delete\?/i);
        fireEvent.click(deleteButtons[0]); // CLICK THE FIRST DELETE BUTTON
        
        // CHECK IF THE TODO IS REMOVED
        const todoElement = screen.queryByText(/todo to delete/i);
        expect(todoElement).not.toBeInTheDocument();
    });

    // TEST TO CHECK IF A TODO CAN BE MARKED AS COMPLETE
    test('can complete a todo', () => {
        render(<App />);
        
        // ADD A NEW TODO FIRST
        fireEvent.change(screen.getByPlaceholderText(/what's the task title?/i), { target: { value: 'Todo to Complete' } });
        fireEvent.change(screen.getByPlaceholderText(/what's the task description?/i), { target: { value: 'Description' } });
        fireEvent.click(screen.getByText(/add/i));
        
        // COMPLETE THE TODO
        const completeButtons = screen.getAllByTitle(/complete\?/i);
        fireEvent.click(completeButtons[0]); // CLICK THE FIRST COMPLETE BUTTON
        
        // SWITCH TO COMPLETED TODOS VIEW
        fireEvent.click(screen.getByText(/completed/i));
        
        // CHECK IF THE COMPLETED TODO IS DISPLAYED
        const completedTodoElement = screen.getByText(/todo to complete/i);
        expect(completedTodoElement).toBeInTheDocument();
    });

    // TEST TO CHECK IF A TODO CAN BE EDITED
    test('can edit a todo', () => {
        render(<App />);
        
        // ADD A NEW TODO FIRST
        fireEvent.change(screen.getByPlaceholderText(/what's the task title?/i), { target: { value: 'Todo to Edit' } });
        fireEvent.change(screen.getByPlaceholderText(/what's the task description?/i), { target: { value: 'Description' } });
        fireEvent.click(screen.getByText(/add/i));
        
        // CLICK THE EDIT BUTTON
        const editButtons = screen.getAllByTitle(/edit\?/i);
        fireEvent.click(editButtons[0]); // CLICK THE FIRST EDIT BUTTON
        
        // CHANGE THE TITLE AND DESCRIPTION
        fireEvent.change(screen.getByPlaceholderText(/updated title/i), { target: { value: 'Updated Todo' } });
        fireEvent.change(screen.getByPlaceholderText(/updated description/i), { target: { value: 'Updated Description' } });
        
        // CLICK THE UPDATE BUTTON
        const updateButtons = screen.getAllByText(/update/i);
        fireEvent.click(updateButtons[0]); // CLICK THE FIRST UPDATE BUTTON
        
        // CHECK IF THE UPDATED TODO IS DISPLAYED
        const updatedTodoElement = screen.getByText(/updated todo/i);
        expect(updatedTodoElement).toBeInTheDocument();
    });
});
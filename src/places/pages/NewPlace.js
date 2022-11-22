import React, {useCallback, useReducer} from "react";
import './NewPlace.css';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/valiodators";


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    //use prev formIsValid to make sure if one false the whole will be fasle
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    //dynamic update the object
                    [action.inputId]: {value: action.value, isValid: action.isValid},
                },
                isValid: formIsValid
            }

        default:
            return state;
    }
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });
    console.log("state",formState);
    //use useCallback to prevent regenerate the new function to go into dead loop
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, inputId: id, isValid: isValid});
    }, []);


    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                errorText="please enter a valid title"/>

            <Input
                id="description"
                element="textarea"
                type="text"
                label="description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText="please enter a valid description (at least 5 characters)"/>
            <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
        </form>);
};

export default NewPlace;
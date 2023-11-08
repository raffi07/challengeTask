import {error} from "next/dist/build/output/log";

export const checkNumberInput = (number, minLength, maxLength) => {
    if (number.length > maxLength){
        new error("This number is not valid");
    }else if (number.length < minLength){
        new error("This number is not valid");
    }
    return number.substring(0, maxLength);
}

export const checkTextInput = (text) => {
    const sanitizedText = text.replace(/[^\w\s]/gi, ''); // Regex to remove special characters
    if(sanitizedText !== text){
        new error("Special characters and spaces are not allowed.");
    }
    return sanitizedText;
}
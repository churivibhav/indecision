import isSeniorCitizen, { isAdult, canDrink } from "./archieve/person";
import validator from "validator";

console.log(`Jamie is ${isAdult(18) ? "an adult" : "not an adult"}`);
console.log(`James is ${isSeniorCitizen(18) ? "a senior" : "not a senior"}`);
console.log(validator.isEmail("xyz@pqr.com"));

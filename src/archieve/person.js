export const isAdult = age => !!age && age >= 18;
export const canDrink = age => !!age && age >= 21;

export default age => !!age && age >= 65;

//export { isAdult as default, canDrink };

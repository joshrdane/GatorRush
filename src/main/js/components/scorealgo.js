//Add to Pedro's score component code for timed mode (in sprint 2?)
const incrementScore = () => {
    let lowerOperand = leftOperand;
    if (rightOperand < lowerOperand)
        lowerOperand = rightOperand;

    let incrementAmount = 0;

    if (lowerOperand < 2)
        incrementAmount = 1;
    else if (lowerOperand < 11)
        incrementAmount = 2;
    else
        incrementAmount = 3;

    if (operator === '*' || operator === '/')
        ++incrementAmount;

    setScore((score) => score + incrementAmount);
}
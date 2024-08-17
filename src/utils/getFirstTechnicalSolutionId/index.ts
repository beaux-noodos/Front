// Function to find and store the first technicalSolution id in local storage
export function storeFirstTechnicalSolutionId(arrayOfObjects) {
    for (const obj of arrayOfObjects) {
        if (obj.technicalSolution && obj.technicalSolution.id) {
            const id = obj.technicalSolution.id;
            localStorage.setItem('technicalSolutionId', id); // Store the id in local storage
            return id; // Return the id
        }
    }
    localStorage.removeItem('technicalSolutionId'); // Clear the storage if no id is found
    return null; // Return null if no id is found
}
export const validateUserInput = (input:string[]) => {
    let valid = true;
    input.forEach((value) => {
      if (value.includes("$") || value.includes("{") || value.includes("}")) {
        valid = false;
      }
    });
    return valid;
    
  
  }
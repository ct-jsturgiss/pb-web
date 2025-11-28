export const compareAsString = (x:any, y: any):boolean => {
    return String(x).toLocaleLowerCase().trim() === String(y).toLocaleLowerCase().trim();
}

export const containsAsString = (x: any, y: any):boolean => {
    return String(x).toLocaleLowerCase().trim().includes(String(y).toLocaleLowerCase().trim());
}
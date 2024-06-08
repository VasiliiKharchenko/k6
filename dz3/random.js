export const generationId = () => {
    const min = 100000; 
    const max = 999999;
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
};

export const generationString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

export const generationPhone = () => {
    const characters = '123456789';
    let result = '';
    for (let i = 0; i < 11; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

export const generationStatusForPet = () =>{
    let status = ["available", "pendin", "sold"];
    let result;
    const randomIndex = Math.floor(Math.random() * status.length);
    result = status[randomIndex];
    return result;
};
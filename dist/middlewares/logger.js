export const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
export const checkAdmin = (req, res, next) => {
    console.log("Checking Admin...");
    next();
};

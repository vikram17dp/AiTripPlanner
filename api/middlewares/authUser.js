import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; 
        if (!authHeader) {
            return res.json({ success: false, message: "Not Authorized, Login Again" });
        }

        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        req.body.userId = decoded.id;
        req.user = decoded; 
        next(); 
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;

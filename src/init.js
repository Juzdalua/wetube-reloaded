import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 3000;
//express code 
const handleListening = () => 
    console.log(`✅ Server listening on port https://localhost:${PORT} 🚀`)
app.listen(PORT, handleListening);


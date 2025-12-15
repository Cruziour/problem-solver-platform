import { ApiResponse } from '../utils/index.js';
const healthCheck = async (req, res) => {
  const healthStatus = {
    uptime: process.uptime(), // How long the server has been running
    message: 'OK',
    timestamp: new Date().toISOString(),
    // Add checks for DB connection, Redis, etc., here if needed
  };

  res
    .status(200)
    .json(new ApiResponse(200, healthStatus, 'Server is healthy.'));
};

export default healthCheck;

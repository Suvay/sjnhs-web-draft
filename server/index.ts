import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { discordLoggingMiddleware, setupGlobalErrorHandlers, discordLogger } from "./discord-logger";
import { mongoConnection } from "./mongodb-connection";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup global error handlers and Discord logging
setupGlobalErrorHandlers();

// Use Discord-enhanced logging middleware
app.use(discordLoggingMiddleware());

(async () => {
  // Initialize MongoDB connection
  try {
    await mongoConnection.connect();
    console.log('MongoDB connection initialized successfully');
  } catch (error) {
    console.error('Failed to initialize MongoDB connection:', error);
    // Continue with PostgreSQL if MongoDB fails
  }

  const server = await registerRoutes(app);

  app.use(async (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error to Discord
    await discordLogger.logError(err, `Express Error Handler - ${_req.method} ${_req.path}`);

    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, async () => {
    const startupMessage = `Server started on port ${port} in ${process.env.NODE_ENV || 'development'} mode`;
    log(startupMessage);
    await discordLogger.logServerEvent("Server Started", startupMessage);
  });
})();

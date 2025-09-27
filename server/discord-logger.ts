import { Request, Response, NextFunction } from "express";

interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  timestamp?: string;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}

interface DiscordMessage {
  content?: string;
  embeds?: DiscordEmbed[];
}

class DiscordLogger {
  private webhookUrl: string;
  private userId: string;
  private isEnabled: boolean;

  constructor() {
    this.webhookUrl = process.env.DISCORD_WEBHOOK_URL || "";
    this.userId = process.env.DISCORD_USER_ID || "";
    this.isEnabled = !!(this.webhookUrl && this.userId);
    
    if (!this.isEnabled) {
      console.warn("Discord logging disabled - missing webhook credentials");
    }
  }

  private async sendToDiscord(message: DiscordMessage): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        console.error(`Discord webhook failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to send Discord message:", error);
    }
  }

  private formatLogLevel(level: string): { color: number; emoji: string } {
    switch (level.toLowerCase()) {
      case "error":
        return { color: 0xff4757, emoji: "🔴" }; // Red
      case "warn":
      case "warning":
        return { color: 0xffa726, emoji: "🟡" }; // Orange
      case "info":
        return { color: 0x2196f3, emoji: "🔵" }; // Blue
      case "debug":
        return { color: 0x9c27b0, emoji: "🟣" }; // Purple
      case "success":
        return { color: 0x4caf50, emoji: "🟢" }; // Green
      default:
        return { color: 0x607d8b, emoji: "⚪" }; // Gray
    }
  }

  private truncateString(str: string, maxLength: number = 1000): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + "...";
  }

  async logConsole(level: string, message: string, ...args: any[]): Promise<void> {
    const { color, emoji } = this.formatLogLevel(level);
    const fullMessage = [message, ...args].join(" ");
    const timestamp = new Date().toISOString();

    const embed: DiscordEmbed = {
      title: `${emoji} Console ${level.toUpperCase()}`,
      description: this.truncateString(fullMessage),
      color,
      timestamp,
      fields: [
        {
          name: "Environment",
          value: process.env.NODE_ENV || "development",
          inline: true,
        },
        {
          name: "Time",
          value: new Date().toLocaleString(),
          inline: true,
        },
      ],
    };

    await this.sendToDiscord({
      content: level.toLowerCase() === "error" ? `<@${this.userId}>` : undefined,
      embeds: [embed],
    });
  }

  async logError(error: Error, context?: string): Promise<void> {
    const timestamp = new Date().toISOString();

    const embed: DiscordEmbed = {
      title: "🚨 Application Error",
      description: this.truncateString(error.message),
      color: 0xff4757, // Red
      timestamp,
      fields: [
        {
          name: "Error Name",
          value: error.name,
          inline: true,
        },
        {
          name: "Context",
          value: context || "Unknown",
          inline: true,
        },
        {
          name: "Stack Trace",
          value: this.truncateString(error.stack || "No stack trace available"),
          inline: false,
        },
      ],
    };

    await this.sendToDiscord({
      content: `<@${this.userId}> **Critical Error Detected**`,
      embeds: [embed],
    });
  }

  async logApiRequest(req: Request, res: Response, duration: number, responseData?: any): Promise<void> {
    const statusColor = res.statusCode >= 400 ? 0xff4757 : res.statusCode >= 300 ? 0xffa726 : 0x4caf50;
    const statusEmoji = res.statusCode >= 400 ? "🔴" : res.statusCode >= 300 ? "🟡" : "🟢";

    const embed: DiscordEmbed = {
      title: `${statusEmoji} API Request`,
      description: `${req.method} ${req.path}`,
      color: statusColor,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Status Code",
          value: res.statusCode.toString(),
          inline: true,
        },
        {
          name: "Duration",
          value: `${duration}ms`,
          inline: true,
        },
        {
          name: "User Agent",
          value: this.truncateString(req.get("User-Agent") || "Unknown", 100),
          inline: false,
        },
      ],
    };

    if (responseData && res.statusCode >= 400) {
      embed.fields?.push({
        name: "Response",
        value: this.truncateString(JSON.stringify(responseData, null, 2)),
        inline: false,
      });
    }

    // Only log API errors and important requests to avoid spam
    if (res.statusCode >= 400) {
      await this.sendToDiscord({
        content: res.statusCode >= 500 ? `<@${this.userId}>` : undefined,
        embeds: [embed],
      });
    }
  }

  async logServerEvent(event: string, details: string): Promise<void> {
    const embed: DiscordEmbed = {
      title: "📢 Server Event",
      description: event,
      color: 0x2196f3, // Blue
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Details",
          value: this.truncateString(details),
          inline: false,
        },
      ],
    };

    await this.sendToDiscord({
      embeds: [embed],
    });
  }

  async logAuthEvent(event: string, username: string, ip: string): Promise<void> {
    const isFailure = event.toLowerCase().includes("fail") || event.toLowerCase().includes("error");
    const color = isFailure ? 0xff4757 : 0x4caf50;
    const emoji = isFailure ? "🔒" : "🔓";

    const embed: DiscordEmbed = {
      title: `${emoji} Authentication Event`,
      description: event,
      color,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "Username",
          value: username,
          inline: true,
        },
        {
          name: "IP Address",
          value: ip,
          inline: true,
        },
      ],
    };

    await this.sendToDiscord({
      content: isFailure ? `<@${this.userId}>` : undefined,
      embeds: [embed],
    });
  }
}

// Create singleton instance
export const discordLogger = new DiscordLogger();

// Enhanced middleware for Discord logging
export function discordLoggingMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", async () => {
      const duration = Date.now() - start;
      
      if (path.startsWith("/api")) {
        // Log to Discord for errors and important events
        await discordLogger.logApiRequest(req, res, duration, capturedJsonResponse);
        
        // Still log to console for local development
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        console.log(logLine);
      }
    });

    next();
  };
}

// Override console methods to capture all output
function setupConsoleCapture() {
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
  };

  console.log = (...args) => {
    originalConsole.log(...args);
    discordLogger.logConsole("info", ...args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg) : String(arg)
    ));
  };

  console.error = (...args) => {
    originalConsole.error(...args);
    discordLogger.logConsole("error", ...args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg) : String(arg)
    ));
  };

  console.warn = (...args) => {
    originalConsole.warn(...args);
    discordLogger.logConsole("warn", ...args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg) : String(arg)
    ));
  };

  console.info = (...args) => {
    originalConsole.info(...args);
    discordLogger.logConsole("info", ...args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg) : String(arg)
    ));
  };

  console.debug = (...args) => {
    originalConsole.debug(...args);
    discordLogger.logConsole("debug", ...args.map(arg => 
      typeof arg === "object" ? JSON.stringify(arg) : String(arg)
    ));
  };
}

// Setup global error handlers
export function setupGlobalErrorHandlers() {
  // Handle uncaught exceptions
  process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception:", error);
    await discordLogger.logError(error, "Uncaught Exception");
    // Don't exit in development, but log the critical error
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", async (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    await discordLogger.logError(error, "Unhandled Promise Rejection");
  });

  // Handle process warnings
  process.on("warning", async (warning) => {
    console.warn("Process Warning:", warning);
    await discordLogger.logConsole("warn", `Process Warning: ${warning.name}: ${warning.message}`);
  });
}

// Initialize console capture
setupConsoleCapture();

export default discordLogger;
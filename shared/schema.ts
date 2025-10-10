import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (both customers and agents)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone"),
  username: text("username"),
  password: text("password"),
  role: text("role").notNull(), // 'customer' | 'agent'
  status: text("status").default("offline"), // 'online' | 'offline' | 'away' | 'busy'
});

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: text("conversation_id").notNull(),
  senderId: text("sender_id").notNull(),
  senderType: text("sender_type").notNull(), // 'customer' | 'agent' | 'bot'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").default("sent"), // 'sent' | 'delivered' | 'read'
});

// Conversations/Tickets table
export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: text("customer_id").notNull(),
  agentId: text("agent_id"),
  status: text("status").notNull(), // 'active' | 'pending' | 'resolved' | 'escalated'
  priority: text("priority").default("medium"), // 'low' | 'medium' | 'high' | 'urgent'
  category: text("category"), // 'loan_application' | 'documents' | 'status_check' | 'general'
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Loan Applications table
export const loanApplications = pgTable("loan_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: text("customer_id").notNull(),
  loanType: text("loan_type").notNull(), // 'Business' | 'Personal' | 'MSME'
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // 'pending' | 'under_review' | 'approved' | 'rejected'
  applicationDate: timestamp("application_date").defaultNow().notNull(),
});

// Agent Notes table
export const agentNotes = pgTable("agent_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: text("conversation_id").notNull(),
  agentId: text("agent_id").notNull(),
  note: text("note").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  timestamp: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  lastMessageAt: true,
  createdAt: true,
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  applicationDate: true,
});

export const insertAgentNoteSchema = createInsertSchema(agentNotes).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;

export type AgentNote = typeof agentNotes.$inferSelect;
export type InsertAgentNote = z.infer<typeof insertAgentNoteSchema>;

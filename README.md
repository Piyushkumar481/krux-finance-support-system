# KRUX Finance - Customer Support System

A comprehensive dual-chatbot customer support system built for KRUX Finance's technical assessment. The application features two distinct interfaces: a customer-facing chat interface and a support executive dashboard.

![KRUX Finance Support System](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

### Customer Chat Interface
- **AI Chatbot**: Intelligent bot for loan inquiries, document requirements, and application status
- **Mobile-First Design**: WhatsApp/Telegram-inspired clean interface
- **Quick Replies**: Pre-defined response buttons for common queries
- **Typing Indicators**: Real-time conversation feedback
- **Message Timestamps**: Track conversation timeline
- **Agent Escalation**: Seamlessly transfer to human support

### Support Executive Dashboard
- **Ticket Queue Management**: View and prioritize customer conversations
- **Real-Time Chat**: Communicate with customers in real-time
- **Customer Information Panel**: Access customer details and loan applications
- **Quick Reply Templates**: Pre-written responses for efficiency
- **Ticket Actions**: Resolve, escalate, or transfer conversations
- **Priority Indicators**: Visual priority levels for tickets
- **Search & Filter**: Find specific tickets quickly

### Additional Features
- **Dark/Light Mode**: Theme switching for both interfaces
- **Mock Authentication**: Sample users for customers and agents
- **Local Storage Persistence**: Chat history and ticket data saved locally
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Wouter** - Routing
- **TanStack Query** - Data fetching
- **Lucide React** - Icons

### State Management
- **React Context API** - Global state
- **LocalStorage** - Data persistence

### Backend (Mock)
- **Express.js** - Development server
- In-memory storage for demo purposes

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd krux-finance-support
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📱 Demo Credentials

### Customer Login
Use these phone numbers to login as a customer:
- **Rahul Sharma**: `+919876543210`
- **Priya Patel**: `+919876543211`

### Agent Login
Use these credentials to access the support dashboard:
- **Amit Kumar**: Username: `amit.kumar` | Password: `demo123`
- **Sneha Singh**: Username: `sneha.singh` | Password: `demo123`

## 🎨 Application Flow

### Customer Journey
1. Visit landing page → Click "Start Chat"
2. Login with phone number
3. Chat with AI bot about loans
4. Request to speak with an agent if needed
5. Agent takes over the conversation

### Agent Journey
1. Visit landing page → Click "Agent Login"
2. Login with username and password
3. View ticket queue in dashboard
4. Select a conversation to respond
5. Use quick replies and customer info panel
6. Resolve, escalate, or transfer tickets

## 🤖 Bot Conversation Flows

The chatbot handles these scenarios:

1. **Loan Application Help**
   - Guides through loan application process
   - Explains loan types (Business, Personal, MSME)
   - Provides requirements and next steps

2. **Document Requirements**
   - Lists required documents for each loan type
   - Explains document formats and specifications

3. **Application Status**
   - Checks application status by Application ID
   - Provides realistic status updates

4. **Agent Escalation**
   - Seamlessly transfers to human support
   - Creates support tickets for follow-up

## 📂 Project Structure

```
krux-finance-support/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React Context providers
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
│   └── index.html
├── server/                # Backend (Express)
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory storage
│   └── index.ts           # Server entry
├── shared/                # Shared types and schemas
│   └── schema.ts          # Data models
├── vercel.json            # Vercel deployment config
└── package.json
```

## 🚢 Deployment

### Deploy to Vercel

1. **Via Vercel Dashboard** (Recommended)
   - Push code to GitHub
   - Import repository to Vercel
   - Configure: Framework: Vite, Build Command: `npm run build`
   - Deploy

2. **Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Deploy to Replit
- This project is already configured for Replit
- Click the "Deploy" button in Replit
- Your app will be live instantly

## 🧪 Testing

The application includes comprehensive test IDs for E2E testing:

```typescript
// Example test IDs
data-testid="button-customer-chat"
data-testid="input-phone"
data-testid="button-login"
data-testid="input-message"
data-testid="button-send"
data-testid="ticket-{id}"
```

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check
```

## 📝 Key Components

### Customer Interface Components
- `MessageBubble` - Chat message display
- `TypingIndicator` - Animated typing indicator
- `QuickReplyButton` - Quick action buttons

### Dashboard Components
- `TicketCard` - Support ticket display
- `CustomerInfoPanel` - Customer details and loans
- `ThemeToggle` - Dark/light mode switch

### Context Providers
- `AuthContext` - User authentication
- `ChatContext` - Chat and ticket management
- `ThemeContext` - Theme preferences

## 🎯 Assessment Requirements Met

✅ **Customer Chatbot Interface** - Mobile-first, WhatsApp-style design  
✅ **Support Executive Dashboard** - Ticket queue and conversation management  
✅ **Bot Conversation Flows** - Loan help, documents, status, escalation  
✅ **Mock Authentication** - Phone and username/password login  
✅ **Local Storage Persistence** - All data saved locally  
✅ **Context API State Management** - Clean state handling  
✅ **TypeScript** - Full type safety  
✅ **React Hook Form + Zod** - Form validation  
✅ **Responsive Design** - Works on all devices  
✅ **Dark/Light Mode** - Theme switching  

## 🔮 Future Enhancements

- [ ] Real backend API integration
- [ ] Database persistence (PostgreSQL/MongoDB)
- [ ] WebSocket for real-time updates
- [ ] File upload for documents
- [ ] Voice input using Web Speech API
- [ ] Customer satisfaction ratings
- [ ] Performance metrics dashboard
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Multi-language support

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Built as a technical assessment for KRUX Finance Tech Intern position.

---

**Note**: This is a demo application using localStorage for data persistence. For production use, implement proper backend services, database, and authentication.

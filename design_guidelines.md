# Design Guidelines: KRUX Finance Customer Support System

## Design Approach

**Hybrid Approach**: This project requires two distinct design philosophies:
- **Customer Chat Interface**: Reference-based design inspired by WhatsApp and Telegram for familiarity and ease of use
- **Support Dashboard**: Design system approach using Material Design principles for productivity and information density

**Justification**: Customer-facing chat needs conversational familiarity, while the support dashboard requires efficient data visualization and workflow management.

---

## Core Design Elements

### A. Color Palette

**Primary Brand Colors (KRUX Finance)**
- Primary Blue: 220 85% 45% (dark mode: 220 80% 55%)
- Deep Navy: 220 40% 15% (backgrounds, dark mode base)
- Trust Teal: 180 60% 45% (success states, confirmations)

**Functional Colors**
- Success: 145 70% 45%
- Warning: 45 95% 55%
- Error: 0 75% 55%
- Info: 200 80% 50%

**Interface Colors (Dark Mode Default)**
- Background Base: 220 20% 10%
- Surface: 220 15% 14%
- Surface Elevated: 220 15% 18%
- Border: 220 15% 25%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

**Customer Chat Specific**
- User Message Bubble: 220 85% 45%
- Bot Message Bubble: 220 15% 18%
- Agent Message Bubble: 180 60% 45%

### B. Typography

**Font Families**
- Primary: Inter (Google Fonts) - Interface text, body copy
- Monospace: JetBrains Mono - Codes, timestamps, IDs

**Type Scale**
- Headings: font-bold text-2xl to text-4xl
- Subheadings: font-semibold text-lg to text-xl
- Body: font-normal text-sm to text-base
- Captions: font-medium text-xs
- Chat Messages: font-normal text-sm (user-friendly reading size)
- Timestamps: font-normal text-xs text-secondary

### C. Layout System

**Spacing Primitives (Tailwind)**
- Primary spacing units: 2, 4, 6, 8, 12, 16
- Chat message spacing: p-3 for bubbles, space-y-2 for messages
- Dashboard panels: p-6 to p-8
- Section gaps: gap-4 to gap-6

**Grid Structure**
- Customer Chat: Single column, max-w-3xl centered
- Support Dashboard: 
  - Ticket Queue Panel: w-80 to w-96 (fixed left sidebar)
  - Conversation Area: flex-1 (remaining space)
  - Customer Info Panel: w-80 (collapsible right sidebar)

### D. Component Library

**Customer Chat Interface**

*Chat Bubbles*
- User messages: Right-aligned, rounded-2xl rounded-tr-sm, primary blue background
- Bot messages: Left-aligned, rounded-2xl rounded-tl-sm, surface color
- Agent messages: Left-aligned, teal accent background
- Max width: max-w-[80%] for readability
- Padding: px-4 py-3

*Input Area*
- Fixed bottom position with sticky behavior
- Background: surface elevated with backdrop-blur
- Rounded input field: rounded-full with border
- Send button: Icon only, primary color
- Microphone icon for voice input (bonus feature)

*Message States*
- Typing indicator: Three animated dots in bot bubble style
- Message status: Single/double checkmarks (sent/delivered)
- Timestamp: text-xs below bubbles, text-secondary

**Support Dashboard Interface**

*Ticket Queue (Left Panel)*
- List view with card-based tickets
- Priority indicators: Colored left border (4px width)
- Ticket preview: 3 lines of last message
- Status badges: Rounded-full pills with status colors
- Search bar at top: rounded-lg with icon
- Filter chips: Multiple selection, outlined style

*Conversation Panel (Center)*
- Header: Customer name, status, actions toolbar
- Chat area: Scrollable with date separators
- Message composition: Expanded input with formatting toolbar
- Quick replies: Chip buttons above input area
- File attachment indicator area

*Customer Info Panel (Right)*
- Accordion sections for different data types
- Loan application cards: Bordered, with status badges
- Customer details: Key-value pairs, compact spacing
- Internal notes: Textarea with save button
- Action buttons: Stack vertically, outline style

**Navigation & Global Elements**

*Top Navigation Bar*
- Height: h-16
- KRUX Finance logo (left)
- Role indicator badge (Customer/Agent)
- User menu with avatar (right)
- Notification bell with count badge

*Authentication Pages*
- Centered card design: max-w-md
- Phone input with country code dropdown (customer)
- Username/password fields (agent)
- Primary CTA button: Full width, rounded-lg
- Role switcher toggle

### E. Interaction Patterns

**Chat Interactions**
- Auto-scroll to latest message on new message
- Smooth scroll animation when navigating history
- Hover states: Slight elevation on ticket cards
- Active states: Primary color borders on selected items

**Dashboard Interactions**
- Drag-to-resize panels (bonus feature consideration)
- Click ticket → Load conversation (smooth transition)
- Keyboard shortcuts for agents: Enter to send, Ctrl+K for search
- Real-time sync indication: Subtle pulse animation on new messages

**State Indicators**
- Loading: Skeleton screens with shimmer effect
- Empty states: Centered icon + message
- Error states: Red border + error message below field
- Success feedback: Green checkmark toast notification

### F. Responsive Behavior

**Mobile (< 768px)**
- Customer chat: Full screen, native app feel
- Dashboard: Stacked panels, swipe between views
- Bottom navigation for role switching
- Floating action button for new ticket

**Tablet (768px - 1024px)**
- Customer chat: max-w-2xl centered
- Dashboard: Side-by-side with collapsible panels
- Touch-optimized controls (larger tap targets)

**Desktop (> 1024px)**
- Full three-panel dashboard layout
- Hover states fully active
- Keyboard navigation support

### G. Accessibility & Consistency

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Focus indicators: 2px primary color ring with offset
- Screen reader labels on icon buttons
- Semantic HTML structure throughout
- Consistent dark mode implementation across all inputs and text fields

---

## Page-Specific Guidelines

**Landing Page**
- Split hero section: Left (Customer access), Right (Agent login)
- Feature highlights: Grid of 3 cards showcasing system capabilities
- CTA buttons: Large, prominent, with role-specific colors
- Background: Subtle gradient mesh in brand colors

**Customer Chat (/customer-chat)**
- WhatsApp-inspired clean interface
- Persistent header with KRUX Finance branding
- Conversation flows with clear bot responses
- Escalation button: Prominent but not intrusive
- Mobile-optimized touch targets (minimum 44px)

**Support Dashboard (/support-dashboard)**
- Information-dense productivity layout
- Quick access toolbar for common actions
- Performance metrics widget (optional: top-right corner)
- Ticket filters with clear active state indicators
- Multi-select capabilities for bulk actions

---

## Images & Iconography

**Icons**: Use Lucide React exclusively for consistency
- Chat: MessageSquare, Send, Mic, Paperclip
- Dashboard: LayoutDashboard, Users, Clock, AlertCircle
- Actions: Check, X, MoreVertical, Search
- Status: CheckCheck, Clock, AlertTriangle

**Avatars**
- Customer: Generated initials in colored circles
- Agent: Professional placeholder or uploaded photo
- Bot: KRUX Finance icon or robot symbol

**No Hero Images Required**: Functional interfaces prioritize utility over visual imagery. Use illustrations sparingly for empty states and error pages only.

---

## Animation Guidelines

**Minimal, Purposeful Animations**
- Message send: Subtle slide-up + fade-in (200ms)
- Typing indicator: Gentle bounce on dots (1s loop)
- Panel transitions: Smooth slide (300ms ease-in-out)
- Toast notifications: Slide-in from top (250ms)
- **Avoid**: Excessive hover effects, parallax, or decorative animations

---

This design system balances professional credibility for financial services with the approachability needed for customer support, while maintaining high usability standards for support agents' productivity.
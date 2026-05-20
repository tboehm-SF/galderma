# 🎯 Explore Rewards - Adaptive Overlay Feature

## Overview

Inspired by the **Immunexis "Explore Evidence"** feature, this adaptive overlay provides contextual information about the ASPIRE Galderma Rewards program.

## 🎨 Design

### Floating Button
- **Location:** Bottom-left corner
- **Style:** Navy pill button with icon
- **Text:** "EXPLORE REWARDS"
- **Behavior:** Opens the adaptive overlay panel

### Overlay Panel
- **Size:** 420px × 600px (max)
- **Position:** Bottom-left, above the button
- **Animation:** Smooth slide-in from bottom
- **Style:** White rounded card with shadow

## 🔧 Features

### 1. Three Pre-Defined Quick Actions

Users can instantly get answers to common questions:

1. **"How do I earn points? →"**
   - Shows point earning mechanisms
   - Qualifying treatments
   - Point values

2. **"Which treatments are eligible? →"**
   - Lists Dysport®, Restylane®, Sculptra®
   - Product descriptions
   - Program participation

3. **"How do I redeem my rewards? →"**
   - Redemption process
   - Available rewards
   - Point requirements

### 2. Two Category Views

**💰 Member Benefits**
- Detailed benefits list with checkmarks
- Points earning explanation
- Exclusive offers
- Progress tracking
- Download benefits guide button
- Navigation to eligibility view

**✨ Eligible Treatments**
- Dysport® information
- Restylane® family products
- Sculptra® Aesthetic details
- Download eligibility guide button
- Navigation back to benefits

### 3. Custom Question Input

- Text field: "Ask about ASPIRE Rewards..."
- Send button with icon
- Enter key support
- Disabled state when empty

## 📱 Adaptive Behavior

The overlay **contextually adapts** based on user interaction:

```
Home View
├── Quick Actions (3 buttons)
├── Category Buttons (2 buttons)
└── Text Input

Benefits View
├── Back Button
├── Benefits List
├── Download Button
└── Navigate to Eligibility

Eligibility View
├── Back Button
├── Treatment Details
├── Download Button
└── Navigate to Benefits
```

## 🎯 User Flow

### Flow 1: Quick Action
1. User clicks "EXPLORE REWARDS" button
2. Overlay opens to home view
3. User clicks "How do I earn points?"
4. System displays earning information

### Flow 2: Category Exploration
1. User opens overlay
2. Clicks "💰 Member Benefits"
3. Views detailed benefits
4. Clicks "Eligible Treatments ❯"
5. Views treatment information
6. Can navigate back or download guides

### Flow 3: Custom Question
1. User opens overlay
2. Types question in input field
3. Presses Enter or clicks Send
4. System processes question

## 🎨 Visual Design

### Colors
- **Primary:** #4A5D7F (Navy)
- **Hover:** #3A4D6F (Darker navy)
- **Background:** #F5F1EC (Cream)
- **Gradient:** #E8D5C4 (Warm beige)
- **Text:** #2C2C2C (Charcoal)

### Typography
- **Header:** 20px, semibold
- **Quick Actions:** 14px, medium
- **Category Buttons:** 14px, semibold
- **Content:** 14px, regular

### Spacing
- **Padding:** 24px (p-6)
- **Gaps:** 16px between elements
- **Rounded:** 16px (rounded-2xl)
- **Shadow:** Large drop shadow

## 🔄 Interactions

### Animations
- **Slide-in:** From bottom, 300ms duration
- **Hover effects:** Scale, color transitions
- **Button states:** Active, hover, disabled

### Transitions
- All transitions: 300ms ease
- Color changes: Smooth fade
- Scale: Hover grows to 105%

## ♿ Accessibility

### ARIA Labels
- Close button: "Close assistant"
- Send button: "Send message"
- Input: "Ask about ASPIRE Rewards"

### Keyboard Support
- Enter key: Send message
- Tab navigation: Through all interactive elements
- Escape key: Could be added to close overlay

### Screen Readers
- Semantic HTML structure
- Descriptive button labels
- Input placeholders

## 📱 Responsive Design

### Desktop (> 1024px)
- Full 420px width
- Bottom-left positioning
- Hover effects enabled

### Mobile (< 640px)
Would need adjustments for:
- Full-width overlay
- Bottom sheet style
- Touch-optimized buttons

## 🛠️ Technical Implementation

### Component: `ExploreRewards.tsx`

**State Management:**
```typescript
const [isOpen, setIsOpen] = useState(false);
const [activeView, setActiveView] = useState<"home" | "benefits" | "eligibility">("home");
const [message, setMessage] = useState("");
```

**Key Functions:**
- `handleQuickAction(actionId)` - Process quick action clicks
- `handleSendMessage()` - Process custom questions
- `setActiveView(view)` - Navigate between views

### Integration

Added to `app/page.tsx` after Footer component:
```tsx
<ExploreRewards />
```

Fixed positioning ensures it floats above all content.

## 🎯 Future Enhancements

### Suggested Improvements

1. **Real Chat Integration**
   - Connect to AI chatbot API
   - Natural language processing
   - Contextual responses

2. **Animation Polish**
   - Typing indicator when "thinking"
   - Message bubbles for conversation
   - Smooth content transitions

3. **More Quick Actions**
   - "Find a provider near me"
   - "Check my point balance"
   - "View available rewards"

4. **Enhanced Content**
   - Videos or GIFs
   - Interactive calculators
   - Treatment comparisons

5. **Mobile Optimization**
   - Bottom sheet on mobile
   - Swipe to dismiss
   - Full-screen on small devices

6. **Analytics**
   - Track which actions users click
   - Popular questions
   - Conversion from overlay to signup

7. **Personalization**
   - Remember user preferences
   - Show relevant content based on history
   - Suggest next steps

## 📊 Success Metrics

Track these metrics to measure effectiveness:

- **Engagement Rate:** % of visitors who click "Explore Rewards"
- **Popular Actions:** Which quick actions get most clicks
- **Navigation Patterns:** Benefits vs. Eligibility views
- **Custom Questions:** Most common queries
- **Conversion:** Users who go from overlay to "Join Now"

## 🎊 Current Status

✅ **Implemented:**
- Floating button with icon
- Adaptive overlay panel
- 3 quick action buttons
- 2 category views with content
- Navigation between views
- Custom text input
- Download buttons
- Close functionality
- Smooth animations
- Branded styling

📝 **Not Yet Implemented:**
- Actual chat AI backend
- Real-time responses
- Message history
- Mobile optimizations
- Analytics tracking

## 🚀 How to Test

1. **Open the site:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Click "EXPLORE REWARDS"** (bottom-left)

3. **Test quick actions:**
   - Click each of the 3 quick action buttons
   - Verify console logs the action

4. **Test category views:**
   - Click "💰 Member Benefits"
   - Review content
   - Click "Eligible Treatments ❯"
   - Navigate back with "← Back"

5. **Test custom input:**
   - Type a question
   - Press Enter or click Send
   - Verify console logs the message

6. **Test close button:**
   - Click X to close
   - Verify button reappears

## 📝 Customization

### Change Quick Actions

Edit the `quickActions` array in `ExploreRewards.tsx`:
```typescript
const quickActions = [
  {
    id: "your-id",
    label: "Your question text →",
    icon: YourIcon,
  },
];
```

### Add New Views

1. Add to state type:
   ```typescript
   type View = "home" | "benefits" | "eligibility" | "newview";
   ```

2. Add view content:
   ```tsx
   {activeView === "newview" && (
     <div>Your content</div>
   )}
   ```

### Style Customization

All colors use the ASPIRE brand palette:
- Primary: `#4A5D7F`
- Cream: `#F5F1EC`
- Change in the component's className props

---

**This adaptive overlay provides a modern, engaging way for users to explore the ASPIRE Rewards program without leaving the page!** 🎉

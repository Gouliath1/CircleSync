# Product Requirements Document (PRD)

# Working Title
Private Trip Coordination & Social Scheduling Tool

---

## 1. Objective

Develop a lightweight private web application that helps coordinate meetings and events with friends, family, and social circles during visits or trips.

The application should solve the complexity of manually coordinating many people with different schedules, social dynamics, family situations, travel constraints, and visibility requirements.

Primary goal:

Replace a large manually-maintained spreadsheet with an experience that is equally fast to use but significantly smarter.

The application is intended for a private network, not public social networking.

---

## 2. Product Principles

### Simplicity first
Entering availability should feel as fast as editing cells in Excel.

### Minimal user friction
Users should not be required to fill long profiles or configure many settings.

### Admin-controlled
The primary organizer (admin) manages most metadata and setup.

### Privacy by design
Users only see information intended for them.

### Social context awareness
The system understands relationship dynamics, family setups, and compatible groups.

---

## 3. Users

### Admin
Typically the trip organizer.

Capabilities:

- Creates people profiles
- Organizes groups
- Defines visibility rules
- Creates events
- Sends availability requests
- Views all schedules
- Defines relationship preferences
- Manages permissions

### Participants

Capabilities:

- Respond to invitations
- Fill availability
- View only authorized information
- Add comments
- Update schedule information

---

## 4. Authentication

Initial assumption of no login was reconsidered.

Some lightweight authentication is required to prevent spam and unauthorized access.

Requirements:

- Minimize friction
- Avoid traditional account creation if possible
- Browser persistence preferred
- Authentication options may include:
  - Magic link
  - One-time code
  - Invitation link
  - Session remembered by browser

Goals:

- No passwords
- No full signup flow
- Returning users should rarely need to authenticate again

---

## 5. User Profiles

Profiles are primarily created and managed by the admin.

Users should not need to configure detailed personal information.

Each profile contains:

### Basic information

- Name
- Country/location
- Notes/comments

### Family configuration

Important social categories:

- Individual / alone
- Couple
- Full family (including children)

Purpose:

This classification affects:

- Event compatibility
- Availability interpretation
- Matching recommendations

No further family details required.

---

## 6. Social Relationship Layer

The system should model social preferences.

Examples:

- Some people enjoy spending time together
- Some groups should not overlap
- Some families naturally combine
- Some events should exclude specific people

Admin can define:

- Compatible people
- Compatible groups
- Exclusions
- Preferred combinations

Future recommendation engine:

"These people frequently work well together."

---

## 7. Availability System

Core feature.

Users can provide availability using simplified time blocks.

Supported availability:

- Morning
- Afternoon
- Evening
- Full day
- Morning only
- Afternoon onward
- Evening only

Availability states:

- Available
- Unavailable
- Partial availability

Each entry may include:

- Comment
- Constraints
- Context

Examples:

- "Available only with children"
- "Available if local"
- "Only for dinner"
- "Can travel"

---

## 8. Family Context Availability

Availability may change depending on context.

Examples:

- Available alone
- Available as couple
- Available with children
- Available as full family

Example:

Saturday evening:

- Available alone
- Not available as family

This distinction is required.

---

## 9. Calendar Experience

The calendar UI is critical.

Current spreadsheet workflows are extremely efficient.

The application should preserve that speed.

Requirements:

### Interaction

- Drag-and-drop
- Click and drag across multiple days
- Copy availability
- Paste availability
- Duplicate schedules
- Batch editing

Goal:

Entering availability should take seconds.

---

## 10. Events & Availability Requests

Admin can create events.

Examples:

- Dinner
- Weekend trip
- Cottage stay
- Lunch
- Family gathering

Admin selects:

- Target people/groups
- Visibility
- Constraints

Examples:

"Who is available July 10?"

Users receive a request:

"Are you available?"

Responses:

- Yes
- No
- Partial
- Maybe

Responses may automatically update availability.

---

## 11. Groups

Users can belong to multiple groups.

Examples:

- Family
- Close friends
- School friends
- Couples
- Travel friends

Groups support:

- Invitations
- Permissions
- Visibility filtering
- Event targeting

---

## 12. Visibility & Permissions

Critical requirement.

Users should not automatically see everyone.

Examples:

Group A should not know Group B exists.

Permission levels:

### Admin

Full access

### Group access

Can view group members only

### Event visibility

Can only view invited events

### Schedule visibility

Can view:

- none
- limited
- aggregated
- full

Examples:

Visible:

"3 people available"

Not visible:

Names

---

## 13. Smart Matching Engine (Future)

The system should suggest:

- best meeting dates
- highest overlap
- compatible people
- family-compatible events
- travel-compatible events

Example:

"Saturday afternoon works for 7 people and includes 3 compatible families."

---

## 14. User Flow

### Admin flow

1. Open application
2. Create people profiles
3. Create groups
4. Configure visibility
5. Define social compatibility
6. Create event request
7. Invite participants
8. View optimized suggestions

### Participant flow

1. Open invitation
2. Authenticate with lightweight flow
3. Fill availability
4. Drag/copy schedules
5. Add comments
6. Respond to event requests

---

## 15. Non-functional Requirements

### Performance

Calendar interactions should feel immediate.

### Mobile first

Most users likely update availability from phones.

### Minimal effort

No long forms.

### Private by default

No public discovery.

### Fast onboarding

Users should contribute within seconds.

---

## 16. MVP Scope

Include:

- Lightweight authentication
- Admin-created profiles
- Family modes
- Availability calendar
- Drag-and-drop editing
- Groups
- Visibility permissions
- Event requests
- Comments
- Basic matching

Exclude:

- AI recommendations
- Advanced analytics
- Public discovery
- Complex social graph learning

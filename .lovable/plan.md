# EV Charging Station Finder — Coimbatore

## Project Architecture & Development Plan

---

# 1. Project Overview

**EV Charging Station Finder** is a **mobile-first web application** that helps EV users in **Coimbatore** locate, view, and book EV charging stations.

The system provides:

• Interactive EV station map  
• Real-time charging port availability  
• Slot booking system  
• Station reviews and ratings  
• Smart station recommendations  
• AI chatbot assistant  
• Admin management dashboard

The application is inspired by platforms like:

• **Tesla App**  
• **Google Maps** EV station finder  
• **PlugShare**

---

# 2. Core Objectives

The system should allow users to:

1️⃣ Discover nearby EV charging stations  
2️⃣ Filter stations by EV type  
3️⃣ View charging port availability  
4️⃣ Book charging slots  
5️⃣ Receive charging notifications  
6️⃣ Read and submit station reviews  
7️⃣ Get recommendations using AI assistant

Admins should be able to:

• Add new stations  
• Update station data  
• Manage port availability  
• Monitor bookings

---

# 3. Technology Stack

### Frontend

• React  
• TypeScript  
• TailwindCSS  
• Leaflet.js (map rendering)  
• Framer Motion (animations)

### Backend (future integration)

• Node.js  
• Express.js  
• MySQL

### State Management

• React Context API

### Map System

• Leaflet Map

### Deployment

• Vercel (Frontend)

---

# 4. Design System

### Color Palette

Primary Color  
Green — `#22C55E` (Eco / EV theme)

Secondary Color  
Dark Blue — `#1E3A5F`

Background  
Light Gray — `#F8FAFC`

---

### UI Style Guidelines

• Rounded corners  
• Soft shadow cards  
• Clean minimal interface  
• Smooth animations  
• Mobile-first layout

---

# 5. Application Pages

---

# 5.1 Homepage

### Components

Header Navigation

Logo  
EV Station Finder

Menu

• Home  
• Find Stations  
• My Bookings  
• Admin

Right Section

• Notification Bell

---

### Hero Section

Gradient EV themed background.

Components:

Search Input  
EV Type Filters

• 2-Wheeler  
• 3-Wheeler  
• 4-Wheeler

Primary CTA

**Find Charging Stations**

---

# 5.2 Map Page (Core Feature)

This is the **main feature** of the application.

### Map System

Leaflet map centered on **Coimbatore**.

### Map Markers

Each marker represents an EV charging station.

Example stations:

• Brookefields Mall  
• Radisson Blu Avinashi Road  
• Airport Road  
• Peelamedu  
• RS Puram  
• Race Course  
• Gandhipuram  
• Saravanampatti  
• Tidel Park  
• Kalapatti  
• Thudiyalur  
• Saibaba Colony

---

### EV Filter Bar

Filter stations by vehicle type:

• 2W  
• 3W  
• 4W

Map markers update dynamically.

---

# 5.3 Station Details Card

When a marker is clicked, display **Station Card**.

### Mobile

Draggable Bottom Sheet

### Desktop

Right Side Panel

---

### Station Information

Station Name  
Address

Charging Types

• AC Charger  
• DC Charger  
• Fast Charger

EV Support

• 2W  
• 3W  
• 4W

Charging Speed Example

AC Charger — 6kW  
DC Fast Charger — 50kW

---

### Ports Information

Example:

Total Ports: 10  
Available Ports: 4  
Occupied Ports: 6

Additional Information

• Estimated waiting time  
• Station rating  
• Review count

---

### Actions

Buttons:

Book Slot  
View Details  
View Reviews

---

# 5.4 Booking System

Booking modal appears when clicking **Book Slot**.

---

### Booking Fields

EV Type

• 2W  
• 3W  
• 4W

Charging Mode

• AC  
• DC  
• Fast Charger

Date Picker

Time Slot Selector

Available Ports Display

Example

Available Ports: 3

---

### Booking Confirmation

User clicks

Confirm Booking

System response:

Success toast notification.

---

# 5.5 My Bookings Page

Displays all user bookings.

Booking Card includes:

Station Name  
Charging Type  
Date  
Time  
Booking Status

---

### Booking Status Types

Upcoming  
Charging  
Completed

---

# 5.6 Charging Notifications

Users receive alerts for charging events.

Notifications include:

• Charging slot started  
• Charging completed  
• Charging session expiring soon

Types:

• Toast notifications  
• Notification bell alerts

---

# 5.7 Station Reviews System

Each station supports rating and review system.

Example rating

4.5 ⭐

Review examples:

• Fast charging  
• Good parking space  
• Clean station

Users can:

• View reviews  
• Submit reviews

---

# 5.8 AI Chatbot Assistant

Floating chatbot assistant.

Location

Bottom right corner.

Button:

⚡ Ask EV Assistant

---

### Chatbot Capabilities

• Find nearby stations  
• Check available ports  
• Recommend charging mode  
• Suggest best station  
• Help book slots

---

### Example Chat

User

"How many slots available in Brookefields?"

Bot

Brookefields Mall EV Station

Available Ports

2W : 5  
3W : 2  
4W : 4

Charging Types

AC  
DC Fast Charger

---

# 5.9 Smart Station Recommendation

Chatbot recommends stations based on:

• Available ports  
• Station rating  
• Distance  
• Charging speed  
• Waiting time

Example Recommendation

Tidel Park EV Charging Hub

Reason:

Fast charger available  
8 ports available  
Rating 4.7  
Low waiting time

---

# 6. Admin Panel

Admin dashboard manages station data.

---

### Dashboard Features

• View stations  
• Add station  
• Edit station  
• Delete station

---

### Add Station Form

Fields:

Station Name  
Address  
Latitude  
Longitude  
Charging Types  
EV Supported Types  
Total Ports  
Charging Speed

---

### Admin Updates

Admins can update:

• Available ports  
• Station status

---

# 7. Mobile Experience

Mobile-first design.

Mobile features include:

Bottom Navigation

• Home  
• Map  
• Bookings  
• Profile

---

### Mobile Map UX

Map should be **fullscreen**.

Station details appear as

**Draggable bottom sheet**

---

# 8. Animations

UI includes smooth animations.

Examples:

• Card fade-in  
• Modal fade-in  
• Marker scale animation  
• Bottom sheet slide-up  
• Smooth map zoom

---

# 9. Data Model

Example Station Object

```
{
 name: "Brookefields Mall EV Station",
 address: "Brookefields Mall, Coimbatore",
 latitude: 11.0183,
 longitude: 76.9725,
 chargingTypes: ["AC","DC","Fast"],
 evTypes: ["2W","3W","4W"],
 totalPorts: 12,
 availablePorts: 6,
 chargingSpeed: "50kW",
 rating: 4.5,
 reviews: 120
}
```

---

# 10. Project Structure

```
src

components
  Navbar
  MapView
  StationCard
  BookingModal
  EVFilter
  Chatbot
  ReviewCard
  NotificationBell

pages
  Home
  MapPage
  Bookings
  Admin

context
  StationContext
  BookingContext

services
  api.ts

data
  stations.ts
  reviews.ts
```

---

# 11. Performance Optimization

Ensure the application provides:

• Fast map rendering  
  
• Efficient state management  
  
• Optimized animations  
  
• Mobile responsive layouts  
  
• Lazy loading components

---

# 12. Final Product Vision

The application should behave like a **real EV charging platform**, similar to:

• **Tesla App**  
  
• **Google Maps** EV charging discovery  
  
• **PlugShare**

Core capabilities:

• EV station discovery  
  
• Charging slot booking  
  
• Live port tracking  
  
• Smart recommendations  
  
• User reviews  
  
• Admin management
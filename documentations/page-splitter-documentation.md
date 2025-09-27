# Page Splitter Component Documentation

## Overview

The Page Splitter is an interactive React component that allows users to recursively split a page into smaller cells by clicking on them. Each split alternates between horizontal and vertical divisions, creating a dynamic grid-like interface with colorful cells.

## Component Architecture

### File: `src/routes/page-splitter.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
```

## Main Components

### 1. Route Component

```tsx
export const Route = createFileRoute("/page-splitter")({
  component: PageSplitter,
});
```

- **Purpose**: Defines the TanStack Router route for `/page-splitter`
- **Exports**: The main PageSplitter component for routing

### 2. PageSplitter Component

```tsx
function PageSplitter() {
  return (
    <div className="w-full h-screen">
      <Cell isVertical={false} />
    </div>
  );
}
```

- **Purpose**: Entry point that renders the initial full-screen cell
- **Layout**: Takes full viewport width and height (`w-full h-screen`)
- **Initial State**: Starts with horizontal splitting (`isVertical={false}`)

### 3. Cell Component (Recursive Core)

```tsx
function Cell({ isVertical }: { isVertical: boolean }) {
  const [color, setColor] = useState(getRandomHexColor);
  const [cells, setCells] = useState<string[]>([]);

  function handleSplit() {
    setCells([...cells, getRandomId()]);
  }

  return (
    <div className={"w-full h-full flex " + (isVertical ? "flex-col" : "flex-row")}>
      <button className="w-full h-full" style={{ backgroundColor: color }} onClick={handleSplit}>
        Split
      </button>
      {cells.map((cell) => (
        <Cell key={cell} isVertical={!isVertical} />
      ))}
    </div>
  );
}
```

#### Props

- `isVertical: boolean` - Determines split direction (true = vertical, false = horizontal)

#### State

- `color: string` - Random hex color for cell background
- `cells: string[]` - Array of unique IDs for child cells

#### Methods

- `handleSplit()` - Adds new cell ID to create a split

#### Layout Logic

- **Flex Direction**:
  - `flex-row` when `isVertical = false` (horizontal split)
  - `flex-col` when `isVertical = true` (vertical split)
- **Recursive Rendering**: Maps over `cells` array to render child Cell components
- **Alternating Direction**: Each child gets `!isVertical` (opposite direction)

## Utility Functions

### 1. getRandomId()

```tsx
function getRandomId() {
  return Math.random().toString(36).substring(2, 15);
}
```

- **Purpose**: Generates unique identifiers for new cells
- **Method**: Uses Math.random() converted to base-36 string
- **Length**: 13 characters (positions 2-15 of the random string)

### 2. getRandomHexColor()

```tsx
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
```

- **Purpose**: Creates random hex color codes
- **Range**: `#000000` to `#ffffff` (full RGB spectrum)
- **Method**: Converts random number (0-16777215) to hexadecimal

## How It Works

### Splitting Algorithm

1. **Initial State**: Single cell occupies full screen
2. **User Interaction**: Click on any cell to split it
3. **Split Process**:
   - Current cell becomes a container
   - Original cell content becomes first child
   - New empty cell becomes second child
   - Both children share the container space equally
4. **Direction Alternation**:
   - First split: Horizontal (side-by-side)
   - Second split: Vertical (top-bottom)
   - Pattern continues recursively

### State Flow

```
Initial: [Single Cell]
Click →  [Original Cell] [New Cell] (horizontal)
Click →  [Original Cell]
         [New Cell 1]
         [New Cell 2] (vertical)
```

### Visual Behavior

- **Colors**: Each cell gets a random background color
- **Interaction**: Clicking "Split" button divides the current cell
- **Layout**: Flexbox automatically handles space distribution
- **Infinite Splitting**: No limit on subdivision depth

## Styling

Uses Tailwind CSS classes:

- `w-full h-screen` - Full viewport dimensions
- `w-full h-full` - Fill parent container
- `flex` - Enable flexbox layout
- `flex-row` / `flex-col` - Set flex direction

Inline styles:

- `backgroundColor: color` - Dynamic random colors

## Usage Example

1. Navigate to `/page-splitter` route
2. Click anywhere on the colored area
3. Cell splits in two with different colors
4. Click on any subcell to split it further
5. Creates increasingly complex grid patterns

## Technical Features

- **Recursive Component Architecture**: Each cell can contain infinite subcells
- **Alternating Layout Direction**: Creates balanced grid patterns
- **Dynamic Color Generation**: Visual distinction between cells
- **Responsive Design**: Works at any screen size
- **State Isolation**: Each cell manages its own splitting state

## Potential Enhancements

1. **Resize Handles**: Allow manual adjustment of split ratios
2. **Cell Removal**: Right-click to delete cells
3. **Predefined Layouts**: Templates for common grid patterns
4. **Export Functionality**: Save layouts as JSON/CSS Grid
5. **Animation**: Smooth transitions during splits
6. **Minimum Size**: Prevent splits below certain thresholds

## Browser Compatibility

- Modern browsers with ES6+ support
- CSS Flexbox support required
- No IE support (uses modern JavaScript features)

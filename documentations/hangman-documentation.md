# Hangman Game Implementation Guide

## Overview

This is a complete hangman game built with React and TypeScript. Players guess letters to reveal a hidden word, with a limited number of wrong guesses allowed.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Concepts](#key-concepts)
3. [State Management](#state-management)
4. [Game Logic](#game-logic)
5. [User Interface](#user-interface)
6. [Code Walkthrough](#code-walkthrough)
7. [Best Practices](#best-practices)

## Project Structure

```
hangman.tsx
├── Imports and Route Setup
├── Constants and Types
├── Component State
├── Helper Functions
└── UI Components
```

## Key Concepts

### 1. React Hooks Used

- **`useState`**: Manages component state (word, guesses, game status)
- **State updates**: How React re-renders when data changes

### 2. TypeScript Features

- **Type definitions**: `GameState` type for game status
- **Generic types**: `Set<string>` for letter collections
- **Type safety**: Prevents common JavaScript errors

### 3. Data Structures

- **Set**: Used for tracking guessed letters (prevents duplicates)
- **Array**: Used for the word list and word characters
- **String**: For the current word and user input

## State Management

### State Variables Explained

```typescript
// The current word to guess (selected randomly)
const [word, setWord] = useState<string>(() => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
});

// Letters that are in the word and have been guessed correctly
const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

// Letters that are NOT in the word (wrong guesses)
const [wrongLetters, setWrongLetters] = useState<Set<string>>(new Set());

// Current letter being typed by user
const [guess, setGuess] = useState<string>("");

// Current game status: playing, won, or lost
const [gameState, setGameState] = useState<GameState>("playing");
```

### Why Use Sets?

- **No duplicates**: Sets automatically prevent duplicate letters
- **Fast lookups**: Checking if a letter exists is very fast
- **Easy iteration**: Can convert to array when needed for display

## Game Logic

### 1. Input Validation (`handleGuessInput`)

```typescript
function handleGuessInput(value: string) {
  // Only allow single letters
  const letter = value.toLowerCase().replace(/[^a-z]/g, "");
  setGuess(letter.slice(0, 1));
}
```

**What it does:**

- Converts input to lowercase
- Removes non-letter characters (numbers, symbols)
- Limits to one character only

### 2. Processing a Guess (`handleGuess`)

```typescript
function handleGuess() {
  if (!guess || gameState !== "playing") return;

  const letter = guess.toLowerCase();

  // Check if letter was already guessed
  if (guessedLetters.has(letter) || wrongLetters.has(letter)) {
    setGuess("");
    return;
  }

  // Check if letter is in the word
  if (word.toLowerCase().includes(letter)) {
    // Correct guess logic
  } else {
    // Wrong guess logic
  }
}
```

**Step-by-step process:**

1. **Guard clauses**: Exit early if no guess or game over
2. **Duplicate check**: Prevent guessing same letter twice
3. **Letter validation**: Check if letter exists in word
4. **State updates**: Add to correct or wrong letters
5. **Win/lose check**: Determine if game should end

### 3. Win Condition Logic

```typescript
const wordLetters = new Set(word.toLowerCase().split(""));
const hasWon = [...wordLetters].every((wordLetter) => newGuessedLetters.has(wordLetter));
```

**How it works:**

- Convert word to Set of unique letters
- Check if ALL word letters have been guessed
- Uses `every()` method - returns true only if ALL letters match

### 4. Lose Condition Logic

```typescript
if (newWrongLetters.size >= maxWrongGuesses) {
  setGameState("lost");
}
```

**Simple check:**

- Count wrong letters
- If reached maximum (6), player loses

## User Interface

### 1. Conditional Rendering

```typescript
{gameState === "won" && <div>🎉 Congratulations!</div>}
{gameState === "lost" && <div>💀 Game Over!</div>}
```

**Concept**: Only show elements when condition is true

### 2. Dynamic Styling

```typescript
className={`font-bold ${remainingGuesses <= 2 ? "text-red-600" : "text-blue-600"}`}
```

**Concept**: Change styles based on data (red when low guesses)

### 3. Letter Display Logic

```typescript
{
  guessedLetters.has(letter.toLowerCase()) || gameState !== "playing" ? letter : "";
}
```

**Logic**: Show letter if guessed correctly OR game is over, otherwise show blank

## Code Walkthrough

### 1. Component Setup

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/hangman")({
  component: Hangman,
});
```

- **TanStack Router**: Modern routing library for React
- **Named exports**: Clean way to export components

### 2. Constants and Types

```typescript
const words = ["apple", "banana", "cherry", "date", "elderberry", "fig"];
type GameState = "playing" | "won" | "lost";
```

- **Word list**: Simple array of possible words
- **Union types**: TypeScript feature for limited string values

### 3. Event Handlers

```typescript
function handleKeyPress(e: React.KeyboardEvent) {
  if (e.key === "Enter") {
    handleGuess();
  }
}
```

- **Keyboard events**: Respond to Enter key for better UX
- **Event types**: TypeScript provides specific event types

### 4. Game Reset

```typescript
function resetGame() {
  const newRandomIndex = Math.floor(Math.random() * words.length);
  setWord(words[newRandomIndex]);
  setGuessedLetters(new Set());
  setWrongLetters(new Set());
  setGameState("playing");
  setGuess("");
}
```

- **State reset**: Return all state to initial values
- **New word**: Pick random word for next game

## Best Practices Demonstrated

### 1. **Immutable State Updates**

```typescript
const newGuessedLetters = new Set(guessedLetters);
newGuessedLetters.add(letter);
setGuessedLetters(newGuessedLetters);
```

**Why**: React needs new objects to detect changes

### 2. **Early Returns**

```typescript
if (!guess || gameState !== "playing") return;
```

**Why**: Reduces nesting and makes code more readable

### 3. **Descriptive Variable Names**

```typescript
const hasWon = [...wordLetters].every((wordLetter) => newGuessedLetters.has(wordLetter));
```

**Why**: Code is self-documenting

### 4. **Separation of Concerns**

- Logic functions handle game rules
- UI components handle display
- State management keeps data organized

### 5. **Type Safety**

```typescript
const [gameState, setGameState] = useState<GameState>("playing");
```

**Why**: Prevents typos and invalid values

## Common React Patterns

### 1. **Controlled Components**

```typescript
<input
  value={guess}
  onChange={(e) => handleGuessInput(e.target.value)}
/>
```

**Pattern**: React controls the input value through state

### 2. **Conditional Rendering**

```typescript
{gameState === "playing" ? <InputSection /> : <PlayAgainButton />}
```

**Pattern**: Show different UI based on state

### 3. **Array Mapping**

```typescript
{word.split("").map((letter, index) => (
  <LetterBox key={index} letter={letter} />
))}
```

**Pattern**: Convert data arrays to UI elements

### 4. **Event Handling**

```typescript
onClick={handleGuess}
onChange={(e) => handleGuessInput(e.target.value)}
```

**Pattern**: Functions respond to user interactions

## Learning Points for Junior Developers

### 1. **State vs Props**

- **State**: Data that belongs to this component
- **Props**: Data passed from parent component
- This game uses only state (no props)

### 2. **When to Use useEffect**

- **Not needed here**: All state changes are triggered by user actions
- **Would need if**: Making API calls or setting up timers

### 3. **Performance Considerations**

- **Sets for fast lookups**: O(1) vs O(n) for arrays
- **Early returns**: Avoid unnecessary processing
- **Key props**: Help React optimize re-renders

### 4. **Debugging Tips**

- **Console.log state**: See what's happening during development
- **React DevTools**: Browser extension for inspecting components
- **TypeScript errors**: Read them carefully - they prevent bugs

## Possible Enhancements

1. **Add animations** for letter reveals
2. **Sound effects** for correct/wrong guesses
3. **Difficulty levels** with different word lists
4. **Score tracking** across multiple games
5. **Multiplayer support** with turns
6. **Custom word lists** that users can add
7. **Hint system** for difficult words

## Testing Ideas

1. **Test win condition**: Guess all letters correctly
2. **Test lose condition**: Make 6 wrong guesses
3. **Test duplicate guesses**: Try same letter twice
4. **Test input validation**: Try numbers and symbols
5. **Test reset functionality**: Start new game after winning/losing

This implementation demonstrates fundamental React concepts while creating an engaging, fully-functional game. The code is structured to be maintainable and extensible for future improvements.

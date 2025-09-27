# Hangman Game Documentation

## Overview

This is a React-based Hangman word guessing game built using TanStack Router. Players attempt to guess a randomly selected word by entering individual letters, with a limited number of incorrect guesses allowed.

## File Location

`src/routes/hangman.tsx`

## Dependencies

- `@tanstack/react-router` - For routing functionality
- `react` - For component state management and UI

## Game Rules

1. A random word is selected from a predefined word list
2. Players have 6 maximum incorrect guesses
3. Players input one letter at a time to guess the word
4. The game ends when either:
   - All letters are correctly guessed (Win)
   - Maximum guesses are exceeded (Loss)

## Code Structure

### Constants

```typescript
const WORDS = ["date", "apple", "banana", "cherry", "elderberry", "fig"];
```

- **Purpose**: Predefined array of words that can be randomly selected for the game
- **Type**: `string[]`
- **Usage**: Source for random word selection

### Component: Hangman

#### State Variables

| State Variable | Type       | Initial Value                   | Purpose                                             |
| -------------- | ---------- | ------------------------------- | --------------------------------------------------- |
| `word`         | `string`   | Random word from WORDS array    | Current word to be guessed                          |
| `guessedWords` | `string[]` | Array filled with empty strings | Tracks correctly guessed letters in their positions |
| `maxGuesses`   | `number`   | 6                               | Remaining number of incorrect guesses allowed       |
| `guess`        | `string`   | ""                              | Current letter input by the player                  |

#### Functions

##### `handleGuess()`

**Purpose**: Processes a player's letter guess

**Logic Flow**:

1. Decrements `maxGuesses` by 1
2. Creates a copy of `guessedWords` array
3. If the guessed letter exists in the word, places it at the correct position
4. Updates the `guessedWords` state
5. Clears the current `guess` input
6. Checks win condition: all positions filled
7. Checks lose condition: no guesses remaining
8. Triggers appropriate game end actions

**Issues Identified**:

- ⚠️ **Bug**: The logic `word.indexOf(guess)` only finds the first occurrence of a letter
- ⚠️ **Bug**: Doesn't properly handle letters that don't exist in the word
- ⚠️ **Bug**: `guessedWords` array length is based on `WORDS.length` instead of current word length

##### `handleReset()`

**Purpose**: Resets the game to initial state

**Actions**:

- Resets `guessedWords` to empty array
- Resets `maxGuesses` to 6
- Clears current `guess` input
- **Note**: Does not select a new random word

## UI Components

### Word Display

```jsx
<div className="flex items-center justify-center gap-2 mt-20">
  {guessedWords.map((letter, index) => (
    <div key={index} className="bg-gray-200 p-4 w-[50px] h-[50px] border-2 border-gray-300">
      {letter}
    </div>
  ))}
</div>
```

- Displays individual letter boxes for each position in the word
- Shows guessed letters in their correct positions
- Empty boxes for unguessed positions

### Game Status

```jsx
<p className="text-center mt-10">Max guesses: {maxGuesses}</p>
```

- Shows remaining number of incorrect guesses

### Input Section

```jsx
<div className="flex items-center justify-center gap-2 mt-10">
  <input
    type="text"
    className="bg-gray-200 p-2 w-200 h-10 border-gray-300 border-2 rounded-md"
    value={guess}
    onChange={(e) => setGuess(e.target.value)}
  />
  <button className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleGuess}>
    Guess
  </button>
</div>
```

- Text input for letter guesses
- Submit button to process the guess

## Styling

- Uses Tailwind CSS for styling
- Responsive flexbox layout
- Gray color scheme with blue accent for the guess button

## Known Issues & Improvements Needed

### Critical Bugs

1. **Array Length Mismatch**: `guessedWords` array uses `WORDS.length` instead of current word length
2. **Incomplete Letter Matching**: Only finds first occurrence of letters in words
3. **No Validation**: Doesn't handle invalid inputs or repeated guesses
4. **Word Reset**: New word isn't selected on game reset

### Suggested Improvements

1. Fix array initialization to use current word length
2. Implement proper letter matching for all occurrences
3. Add input validation (single letters only)
4. Track and display incorrect guesses
5. Prevent duplicate letter guesses
6. Add visual hangman drawing
7. Select new random word on reset
8. Add keyboard support
9. Implement difficulty levels
10. Add game statistics

## Usage Example

```typescript
// Route configuration
export const Route = createFileRoute("/hangman")({
  component: Hangman,
});
```

The component is accessed via the `/hangman` route and renders a complete hangman game interface.

## Game Flow

1. **Initialization**: Random word selected, display shows empty letter boxes
2. **Player Input**: User enters a letter and clicks "Guess"
3. **Processing**: Letter is checked against the word
4. **Update Display**: Correct letters appear in their positions
5. **Game End Check**: Win (all letters guessed) or Loss (no guesses left)
6. **Reset**: Game can be reset to play again

## Technical Notes

- Component uses React hooks for state management
- TanStack Router handles routing
- Functional component architecture
- Event-driven user interactions
- Immediate DOM updates via React state changes

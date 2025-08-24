# TanStack Query Explanation - Random Quotes Example

## Overview

This document explains the key concepts of TanStack Query (React Query) using a practical example from our Random Quotes component. TanStack Query is a powerful data-fetching library that simplifies server state management in React applications.

## 🔗 Official Documentation

[TanStack Query Quick Start Guide](https://tanstack.com/query/latest/docs/framework/react/quick-start)

## Code Example Analysis

### The Complete Component

```typescript
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createFileRoute("/random-qoutes")({
  component: RandomQoutes,
});

type Qoute = {
  sentence: string;
  character: {
    name: string;
    slug: string;
    house: {
      name: string;
      slug: string;
    };
  };
};

function RandomQoutes() {
  const { data: qoute, isFetching, refetch } = useQuery({
    queryKey: ["qoute"],
    queryFn: () => getQoute()
  });

  const getQoute = async () => {
    const result = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
    return (await result.json()) as Qoute;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center border-2 border-gray-300 p-8 rounded-md gap-4">
        {isFetching ? <p>Loading...</p> : <p>"{qoute?.sentence}"</p>}
        <button className="bg-blue-500 text-white p-4 rounded mt-10" onClick={() => refetch()}>
          Next qoute
        </button>
      </div>
    </div>
  );
}
```

## 🔍 Key Concepts Breakdown

### 1. Query Function (`getQoute`)

```typescript
const getQoute = async () => {
  const result = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
  return (await result.json()) as Qoute;
};
```

**What it is:**

- A **pure function** that handles data fetching
- Returns a Promise that resolves to the data you want
- Should only be concerned with fetching - no state management

**Key Points:**

- ✅ **Async/Await**: Handles asynchronous API calls cleanly
- ✅ **Type Safety**: Uses TypeScript type assertion (`as Qoute`)
- ✅ **Single Responsibility**: Only fetches data, doesn't manage state

### 2. useQuery Hook

```typescript
const {
  data: qoute,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ["qoute"],
  queryFn: () => getQoute(),
});
```

**Parameters:**

- **`queryKey`**: Unique identifier for caching and refetching
- **`queryFn`**: The function that actually fetches the data

**Return Values:**

- **`data`** (aliased as `qoute`): The actual data from the API
- **`isFetching`**: Boolean indicating if a request is in progress
- **`refetch`**: Function to manually trigger a new fetch

### 3. Query Key Strategy

```typescript
queryKey: ["qoute"];
```

**What it does:**

- Acts as a unique identifier for this specific query
- Used for caching, invalidation, and refetching
- Can be more complex for related data: `["quotes", "gameofthrones", userId]`

## 🚀 Advantages Over Traditional Approach

### Before TanStack Query (Manual State Management):

```typescript
// ❌ Old way - lots of boilerplate
function RandomQuotesOldWay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetch("https://api.gameofthronesquotes.xyz/v1/random");
      const data = await result.json();
      setQuote(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // ... rest of component
}
```

### With TanStack Query:

```typescript
// ✅ New way - clean and declarative
function RandomQuotes() {
  const {
    data: qoute,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["qoute"],
    queryFn: getQoute,
  });

  // That's it! TanStack Query handles everything else
}
```

## 🎯 Benefits You Get for Free

### 1. **Automatic Caching**

- Data is cached automatically using the query key
- Subsequent renders don't trigger unnecessary API calls
- Smart cache invalidation strategies

### 2. **Background Refetching**

- Automatically refetches when window regains focus
- Configurable stale time and cache time
- Network status awareness

### 3. **Loading States**

- `isFetching`: Currently making a request
- `isLoading`: First time loading
- `isStale`: Data is considered stale

### 4. **Error Handling**

- Built-in error states and retry logic
- Configurable retry attempts and delays
- Error boundaries integration

### 5. **Optimistic Updates**

- Update UI immediately, rollback on failure
- Perfect for mutations and real-time feel

## 🛠️ Common Patterns

### Basic Query

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});
```

### Query with Parameters

```typescript
const { data } = useQuery({
  queryKey: ["todo", todoId],
  queryFn: () => fetchTodo(todoId),
  enabled: !!todoId, // Only run if todoId exists
});
```

### Mutations (for POST/PUT/DELETE)

```typescript
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
```

## 📚 Next Steps

1. **Read the Official Docs**: [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start)
2. **Explore Advanced Features**: Mutations, Infinite Queries, Optimistic Updates
3. **Setup DevTools**: Install React Query DevTools for debugging
4. **Learn Query Invalidation**: How to keep data fresh across your app

## 🔗 Related Resources

- [TanStack Query Examples](https://tanstack.com/query/latest/docs/framework/react/examples/simple)
- [TkDodo's Blog](https://tkdodo.eu/blog/) - Excellent React Query content
- [Official React Query Course](https://query.gg/) - Comprehensive learning resource

---

## Summary

TanStack Query transforms how you handle server state in React by:

- Eliminating boilerplate code
- Providing automatic caching and background refetching
- Managing loading and error states
- Offering powerful tools for complex scenarios

The random quotes example demonstrates these core concepts in a simple, practical way that you can apply to any data-fetching scenario in your React applications.

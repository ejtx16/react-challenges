import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

type Expense = {
  amount: number;
  category: string;
};

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState<number | undefined>(0);
  const [category, setCategory] = useState<string>("Expense");
  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExpenses([...expenses, { amount: amount as number, category }]);
    console.log('===  expenses.tsx [20] ===>', expenses);
  };
  const handleDeleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleAddExpense}>
        <input className="border-2 border-gray-300 rounded-md p-2" type="number" name="amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <select className="border-2 border-gray-300 rounded-md p-2" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit" >Add Expense</button>
      </form>
      <div className="flex flex-col items-center justify-center gap-4 mt-10">
        {expenses.map((expense, index) => (
          <div key={index} className="flex flex-row items-center justify-center gap-4">
            <p className="text-md font-bold">{expense.category === "Revenue" ? "+" : "-"}{expense.amount}</p>
            <p className="text-md font-bold">{expense.category}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" type="button" onClick={() => handleDeleteExpense(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-10">Profit: {expenses.reduce((acc, expense) => acc + (expense.category === "Revenue" ? expense.amount : -expense.amount), 0)}</div>
      
    </div>
  );
}

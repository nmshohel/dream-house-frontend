// HomePage.js
import React from 'react';
async function getDeposit() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/installments/pending");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getInterest() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/interest");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPenanty() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/penanty");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getExpense() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/expense");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
const HomePage =async () => {
  const depositData=await getDeposit();
  const interestData=await getInterest();
  const penantyData=await getPenanty();
  const expenseData=await getExpense();
  console.log(depositData)
  const totalDeposit = depositData?.data?.reduce((acc, item) => acc + parseInt(item.amount), 0);
  const totalInterest = interestData?.data?.reduce((acc, item) => acc + parseInt(item.amount), 0);
  const totalPenanty = penantyData?.data?.reduce((acc, item) => acc + parseInt(item.amount), 0);
  const totalExpense = expenseData?.data?.reduce((acc, item) => acc + parseInt(item.totalPrice), 0);
  const balance=(totalDeposit+totalInterest+totalPenanty)-totalExpense
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Summery Report</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 text-3xl px-4 border-b text-center">Title</th>
              <th className="py-2 text-3xl px-4 border-b text-center">Amount</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 text-2xl px-4 border-b text-center">Deposit</td>
              <td className="py-2 text-2xl px-4 border-b text-center">{totalDeposit}</td>
              {/* Add more data cells as needed */}
            </tr>
            <tr>
              <td className="py-2 text-2xl px-4 border-b text-center">Interest</td>
              <td className="py-2 text-2xl px-4 border-b text-center">{totalInterest}</td>
              {/* Add more data cells as needed */}
            </tr>
            <tr>
              <td className="py-2 text-2xl px-4 border-b text-center">Penanty</td>
              <td className="py-2 text-2xl px-4 border-b text-center">{totalPenanty}</td>
              {/* Add more data cells as needed */}
            </tr>
            <tr>
              <td className="py-2 text-2xl px-4 border-b text-center">Expense</td>
              <td className="py-2 text-2xl px-4 border-b text-center">{totalExpense}</td>
              {/* Add more data cells as needed */}
            </tr>
            <tr>
              <td className="py-2 font-bold text-2xl px-4 border-b text-center">Balence </td>
              <td className="py-2 font-bold text-2xl px-4 border-b text-center">{balance}</td>
              {/* Add more data cells as needed */}
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;

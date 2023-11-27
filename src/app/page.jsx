import React from 'react';

async function getData() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/installments");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
async function userList() {
  try {
    const res = await fetch("http://localhost:5000/api/v1/users");
    if (!res.ok) {
      throw new Error("API fetch failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const Page = async () => {
  const installmentList = await getData();
  const userData = await userList();
  console.log(userData);
  let users= [];
  userData?.data?.map((item)=>{
    users.push(item.userName)
  })

  // const users = [
  //   'shohel', 'robin', 'jabed', 'ashrap', 'nupur', 'samim', 'tuhin1',
  //   'tuhin2', 'mahfuj', 'ataur', 'rasel', 'washim'
  // ];

  // Convert and sort the month-year entries as Date objects in descending order
  const sortedMonthYearEntries = Object.entries(installmentList.data)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]));

  // Calculate total for each user
  const userTotals = users.reduce((totals, user) => {
    totals[user] = sortedMonthYearEntries.reduce((sum, [_, installments]) => {
      const userInstallment = installments.find(installment => installment.userName === user);
      return sum + (userInstallment ? parseInt(userInstallment.amount, 10) : 0);
    }, 0);
    return totals;
  }, {});

  return (
    <>
      <div className="overflow-x-auto p-5">
        <h1 className="text-2xl font-bold mb-4">Deposit</h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Month</th>
              {users.map((user, index) => (
                <th key={index} className="py-2 px-4 border-b">{capitalizeFirstLetter(user)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedMonthYearEntries.map(([monthYear, installments]) => (
              <tr key={monthYear}>
                <td className="py-2 px-4 border-b">{monthYear}</td>
                {users.map((user, index) => {
                  const userInstallment = installments.find(installment => installment.userName === user);
                  return (
                    <td key={index} className="py-2 px-4 border-b">{userInstallment ? userInstallment.amount : '-'}</td>
                  );
                })}
              </tr>
            ))}
            {/* Additional row for user totals */}
            <tr>
              <td className="py-2 px-4 border-b">Total</td>
              {users.map((user, index) => (
                <td key={index} className="py-2 px-4 border-b">{userTotals[user]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;

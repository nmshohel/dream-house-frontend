async function getData() {
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
  
  // Function to get month name from month number
  function getMonthName(month) {
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return monthNames[month - 1] || '';
  }
  
// ... (your existing code)

const page = async () => {
  const data = await getData();

  // Calculate the total interest
  const totalInterest = data.data.reduce((acc, item) => acc + parseInt(item.amount), 0);

  return (
    <>
      <div className="flex items-center justify-between">
<div className="text-center">
    <p className="text-3xl font-bold mb-4"></p>
  </div>
  <div className="text-center">
    <p className="text-3xl font-bold mb-4">Interest</p>
  </div>
  <div className="text-right">
    <button className="bg-blue-500 text-white px-4 py-2 mr-5 rounded">Add</button>
  </div>
</div>
      
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Month</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b text-center">
                  {getMonthName(item['month'])}
                </td>
                <td className="py-2 px-4 border-b text-center">{item['year']}</td>
                <td className="py-2 px-4 border-b text-center">{item['amount']}</td>
              </tr>
            ))}

            {/* Last row for total interest */}
            <tr>
   
              <td colSpan={2} className="py-2 px-4 border-b text-center font-bold">Total</td>
              <td className="py-2 px-4 border-b text-center font-bold">{totalInterest}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;

  
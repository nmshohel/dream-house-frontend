async function getData() {
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
  
  
  
  const page = async () => {
  const data = await getData();
  
  const dateConvert=(isoTimestamp)=>{
  const dateObject = new Date(isoTimestamp);
  const day = dateObject.getUTCDate().toString().padStart(2, '0');
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = dateObject.getUTCFullYear();
  const formattedDate = `${day}-${getMonthName(month)}-${year}`;
  return formattedDate
  }
  function getMonthName(month) {
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    return monthNames[month - 1] || '';
  }
  // Calculate the total interest
  const totalExpense = data?.data?.reduce((acc, item) => acc + parseInt(item.totalPrice), 0);
  
  return (
    <>
      <div className="flex items-center justify-between">
  <div className="text-center">
    <p className="text-3xl font-bold mb-4"></p>
  </div>
  <div className="text-center">
    <p className="text-3xl font-bold mb-4">Expense</p>
  </div>
  <div className="text-right">
    <button className="bg-blue-500 text-white px-4 py-2 mr-5 rounded">Add</button>
  </div>
  </div>
      
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">quantity</th>
              <th className="py-2 px-4 border-b">Unit</th>
              <th className="py-2 px-4 border-b">Unit Price</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b text-center">
                  {dateConvert(item['expenseDate'])}
                </td>
                <td className="py-2 px-4 border-b text-center">{item['description']}</td>
                <td className="py-2 px-4 border-b text-center">{item['quantity']}</td>
                <td className="py-2 px-4 border-b text-center">{item['unit']}</td>
                <td className="py-2 px-4 border-b text-center">{item['unitPrice']}</td>
                <td className="py-2 px-4 border-b text-center">{item['totalPrice']}</td>
                <td className="py-2 px-4 border-b text-center">{item['expenseBy']}</td>
                <td className="py-2 px-4 border-b text-center">{item['remarks']}</td>
              </tr>
            ))}
  
            {/* Last row for total interest */}
            <tr>
   
              <td colSpan={5} className="py-2 px-4 border-b text-center font-bold">Total</td>
              <td className="py-2 px-4 border-b text-center font-bold">{totalExpense}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
  };
  
  export default page;
  
  
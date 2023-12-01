async function getData() {
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
const totalPenanty = data?.data?.reduce((acc, item) => acc + parseInt(item.amount), 0);

return (
  <>
    <div className="flex items-center justify-between">
<div className="text-center">
  <p className="text-3xl font-bold mb-4"></p>
</div>
<div className="text-center">
  <p className="text-3xl font-bold mb-4">Penanty</p>
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
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b text-center">
                {dateConvert(item['penantyDate'])}
              </td>
              <td className="py-2 px-4 border-b text-center">{item['userName']}</td>
              <td className="py-2 px-4 border-b text-center">{item['amount']}</td>
            </tr>
          ))}

          {/* Last row for total interest */}
          <tr>
 
            <td colSpan={2} className="py-2 px-4 border-b text-center font-bold">Total</td>
            <td className="py-2 px-4 border-b text-center font-bold">{totalPenanty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);
};

export default page;


async function getUserData(){
  const res=await fetch("http://localhost:5000/api/v1/installments/user/shohel")
  if(!res.ok)
          {
            throw new Error("api fetch failed")
          }
  return res.json()
  }





  // Function to convert numeric month to month name
const getMonthName = (month) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return monthNames[month - 1] || ''; // Subtracting 1 to match array index
};

const Page = async () => {
  const data = await getUserData();
  let totalAmount = 0;

  data.data.forEach((item) => {
    totalAmount += parseInt(item?.amount);
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-r text-center">Month</th>
                <th className="py-2 px-4 border-b text-center">Amount</th>
                <th className="py-2 px-4 border-b text-center">Deposit Date</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((item, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-white'}
                >
                  <td className="py-2 px-4 border-b border-r text-center">
                    {getMonthName(item.month) + ' ' + item.year}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{item.amount}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {formatDepositDate(item.createdAt)}
                  </td>
                </tr>
              ))}
              <tr>
            
                <td colSpan={2} className="py-2 px-4 border-b text-center">Total</td>
                <td className="py-2 px-4 border-b text-center ">{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Function to format deposit date as dd-mm-yyyy
const formatDepositDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



export default Page
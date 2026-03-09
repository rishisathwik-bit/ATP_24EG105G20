/* Week-2
ASSIGNMENT 5: 
-------------
Bank Transaction Analyzer

You are building a bank statement summary.

Test data:
const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];


Tasks:
    1. filter() all credit transactions
    2. map() to extract only transaction amounts
    3. reduce() to calculate final account balance
    4. find() the first debit transaction
    5. findIndex() of transaction with amount 10000  */


    const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];


const creditTrans= transactions.filter(trans => trans.type === "credit")
console.log("Credit Transactions : ",creditTrans)


const amounts = transactions.map(trans=> trans.amount)
console.log("Amount: ",amounts)


const balance = transactions.reduce((total, amt) => {
  return amt.type==="credit" ? total + amt.amount : total -amt.amount}, 0)
console.log("Total Balance= ",balance)


const firstDebit = transactions.find(amt => amt.type === "debit");
console.log("First Debit Transaction:", firstDebit)


const index = transactions.findIndex(amt => amt.amount === 10000);
console.log("Index of 10000 Amount:", index);

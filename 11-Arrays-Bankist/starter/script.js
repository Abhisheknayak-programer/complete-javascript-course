'use strict';

/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');





// Function To display the transactions which are made
const displayTransactions = function(movements,sort = false){
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b)=> a-b) : movements;

  movs.forEach(function(element,index){
    const ValueType = element > 0 ? 'deposit' : 'withdrawal';

    const htmlToAdd = `  
    <div class="movements__row">
      <div class="movements__type movements__type--${ValueType}">${index + 1} ${ValueType}</div>
      <div class="movements__value">${element} $</div>
    </div> `;

    containerMovements.insertAdjacentHTML("afterbegin",htmlToAdd);
  });

}
// displayTransactions(account1.movements);









// Function to show the balance
const displayBalance = (account) => {
  const balance = account.movements.reduce((acc,element)=>{
    return acc + element;
  })  
  account.balance = balance;
  labelBalance.textContent = `${balance} $`
}

// displayBalance(account1.movements);












// Function To Show The Income And Outcome
const calcDisplayInAndOut = (account) => {
  const income = account.movements.filter(element => element > 0).reduce((acc,element)=>{
    return acc + element;
  })

  labelSumIn.textContent = `${income}$`

  const Out = account.movements.filter(element => element < 0).reduce((acc,element)=>{
    return acc + element;
  })

  labelSumOut.textContent = `${Math.abs(Out)}$`

  const interest =account.movements.filter(element => element > 0).map(deposits => (deposits * account.interestRate)/100).filter(element => element >= 1).reduce((acc,element)=>{
    return acc + element;
  },0)

  labelSumInterest.textContent = `${interest}$`
}

// calcDisplayInAndOut(account1.movements);







// Function For Creating UserNames

const CreateUserNames = (accounts) => {
  accounts.forEach(function(account){
    account.username = account.owner.toLowerCase().split(" ").map(name => name[0]).join('');
  })
}

CreateUserNames(accounts);









// Update UI
const updateUi = (acc) =>{
    // Display Movements
    displayTransactions(acc.movements);

    // Display Balance
    displayBalance(acc);
    
    // Display Summary
    calcDisplayInAndOut(acc);
}







//  Function To Check The Login Of The User
let currentUser;

btnLogin.addEventListener("click",(e)=>{
  e.preventDefault();

  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);

  if(currentUser?.pin === Number(inputLoginPin.value)){
      // Display UI and Welcome Balance
      labelWelcome.textContent = `Welcome back, ${currentUser.owner.split(' ')[0]}`
      containerApp.style.opacity = 1;
     
      // Clearing The Input Feilds
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      inputLoginPin.blur();

      // Updating The User Data
      updateUi(currentUser)
  }
  
})











// Function transferring the money from one account to anather

btnTransfer.addEventListener("click",(e)=>{
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const ReceverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if(amount > 0 && amount <= currentUser.balance && ReceverAcc && ReceverAcc?.username !== currentUser.username){
    // Doing The Transfer
    currentUser.movements.push(-amount);
    ReceverAcc.movements.push(amount);

    updateUi(currentUser);
  }

})











// Function to delete an account 
btnClose.addEventListener("click",(e)=>{
  e.preventDefault();
  if(inputCloseUsername.value === currentUser.username && Number(inputClosePin.value) === currentUser.pin){
    const index = accounts.findIndex(acc => acc.username === currentUser.username);
    
    // Delete Account
    accounts.splice(index,1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear The Input Fields
  inputClosePin.value = '';
  inputCloseUsername.value = '';
})














// Function To Take Loan To Account

btnLoan.addEventListener("click",(e)=>{
  e.preventDefault();
  
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentUser.movements.some(mov => mov >= amount * 0.1)){
    // Adding the movements
    currentUser.movements.push(amount);

    // Update UI
    updateUi(currentUser);
  }
})













// Btn Sort 
let sorted = false;
btnSort.addEventListener("click",(e)=>{
  e.preventDefault();
  displayTransactions(currentUser.movements, !sorted);
  sorted = !sorted;
})




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

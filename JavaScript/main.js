const Greeting = document.getElementById('Greeting')
const Form = document.querySelector('form')
const contractAbi = [
	{
		"inputs": [],
		"name": "greet",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_greeting",
				"type": "string"
			}
		],
		"name": "setGreeting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = '0xf9587Db17711c65Cdb366760c0A745034210dA85';
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}
const contract = new web3.eth.Contract(contractAbi, contractAddress);
contract.methods.greet().call(function(err, result) {
  Greeting.innerHTML=result;
});
Form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const _greeting = document.getElementById('InputValue').value;

  web3.eth.getAccounts().then(function(accounts) {
    contract.methods.setGreeting(_greeting).send({ from: accounts[0] }).then(res=>{
		if(res.status === true){
			document.getElementById("InputValue").value = ""
			document.getElementById("InputValue").placeholder = "Updated..."
			Greeting.innerHTML=_greeting;
			setTimeout(()=>{
				document.getElementById("InputValue").placeholder = "Greeting Text..."
			},500)
		}
	})
  });
})
/* 
    1. ASK for account name
    2. if acc does not exist => ASK to create or not

    3. ASK what command they want to execute
    4. execute command

    COMMANDS:
        a. view
        b. deposit
        c. withdraw
*/

const CommandLine = require("./CommandLine")
const Account = require("./Account")

async function main() {
	const accountName = await CommandLine.ask("what is ur account name?")

	let account = await Account.find(accountName)

	if (account == undefined) {
		account = await promptCreateAccount(accountName)
	}
	if (account == undefined) return

	const command = await promptCommand()
	if (command == "deposit") {
		const value = await promptValue()
		account.deposit(value)
	} else if (command == "withdraw") {
		const value = await promptValue()
		account.withdraw(value)
	}
	CommandLine.print(`Your balance is ${account.balance}`)
}

main()

async function promptCreateAccount(accountName) {
	const response = await CommandLine.ask(
		"acc with such a name does not exist. would u like to create acc?(yes/no)"
	)
	let account
	if (response === "yes") {
		account = Account.create(accountName)
	}
	return account
}

async function promptCommand() {
	return await CommandLine.ask(
		"which command would u like to execute? (view / deposit / withdraw)"
	)
}

async function promptValue() {
	return await CommandLine.ask("how much would u like?")
}

function Expentracker(formID,balanceId,expenseId,IncomeId,Input,noteId,cardholder){
    const form = document.getElementById(formID)
    const balanceDisplay = document.getElementById(balanceId);
    const expenseDisplay = document.getElementById(expenseId);
    const incomeDisplay = document.getElementById(IncomeId);
    let noteElement = document.getElementById(noteId)
    const cardholderSection = document.getElementById(cardholder)
    let newRecord;

    let IncomeArray = []
    let ExpenseArray = []
    form.addEventListener("submit",(event)=>{
        event.preventDefault();

        let amount = parseFloat(document.getElementById(Input).value)
        
        let noteValue = noteElement.value

        let selectedType = document.querySelector('input[name="input"]:checked')

        if(selectedType){
            selectedType = selectedType.value
        }else{
            alert("Please Select a type")
            return
        }

        // selectedType === "income" ? IncomeArray.push(amount) : ExpenseArray.push(amount)
        if(selectedType === "income"){
            IncomeArray.push(amount)
            addCard(amount,"income",noteValue)
        }else{
            ExpenseArray.push(amount)
            addCard(amount,"expense",noteValue)
        }

        updateDisplay()
        deletRecord()
    })


    // Update Display Function
    const updateDisplay = () => {
        const totalIncome = IncomeArray.reduce((total, amount) => amount + total,0)
        const totalExpense = ExpenseArray.reduce((total, expense) => total + expense,0)
        const totalBalace = totalIncome - totalExpense

        balanceDisplay.textContent = totalBalace
        expenseDisplay.textContent = totalExpense
        incomeDisplay.textContent = totalIncome
    }

    const addCard = (amountadd, type, note = "General") =>{
        let noteToDisplay = note.trim() === "" ? "General" : note.trim();
        newRecord = document.createElement("div")
        newRecord.setAttribute("class","card")
        // For aamount
        const amount = document.createElement("h2")
        amount.textContent = amountadd;
        amount.setAttribute("class","amount")

        // For type
        const typeOfIncome = document.createElement("h2")
        typeOfIncome.textContent = type;
        typeOfIncome.setAttribute("class","type")

        const noteholder = document.createElement("p")
        noteholder.textContent = noteToDisplay

        // Add icon
        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined");
        icon.textContent = "delete"; //

        
        let toAppendElemnt = [amount,typeOfIncome,noteholder,icon]
        for(let i = 0; i < toAppendElemnt.length; i++){
            newRecord.append(toAppendElemnt[i])
        }

        cardholderSection.append(newRecord)
    }

    function deletRecord(){
        newRecord.addEventListener("click",(e) =>{
            if(e.target.classList.contains("material-symbols-outlined")){
                const card = e.target.closest('.card')
                // To adjust the amount of balace
                //const type = e.target.closest('.type')

                //const amount = e.target.closest(".amount")
                if(card){
                    

                    let amount = card.querySelector(".amount").textContent
                    let type = card.querySelector(".type").textContent.trim()

                    // Update  the balace
                    if(type === "expense"){
                        ExpenseArray.push(-amount)
                    }else if(type === "income"){
                        IncomeArray.push(-amount)
                    }

                    // Remove the card after click on delet Icons
                    card.remove()
                    
                }

               
            }

            // Fresh the display
            updateDisplay()

            
        })

        
    }


}

Expentracker("record","balanceDisplay","ExpenseDisplay","IncomeDisplay","amount","note","cardholder")
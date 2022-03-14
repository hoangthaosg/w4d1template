/**
 * minibankapp.js
 */
"use strict";
window.onload = function() {
    let currentRowId = 0;
    const formNewAccount = document.querySelector("#formNewAccount");
    formNewAccount.addEventListener("submit", 
        async (event) => {
            event.preventDefault();
            const txtAccountNo = document.querySelector("#txtAccountNo");
            const txtCustomerName = document.querySelector("#txtCustomerName");
            const ddlAccountType = document.querySelector("#ddlAccountType");
            const strAccountNo = txtAccountNo.value;
            const strCustomerName = txtCustomerName.value;
            const strAccountType = ddlAccountType.value;
           
            const rawResponse = await fetch('http://localhost:3000/account', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({account_no: strAccountNo, 
                    customer_name: strCustomerName, 
                    account_type: strAccountType})
            });

            const content = await rawResponse.json();
            console.log(content);
            if (content.error) {
                console.error(content.error);
            } else {
                addNewAccountDataRow(strAccountNo, strCustomerName,strAccountType);
                txtAccountNo.value = "";
                txtCustomerName.value = "";
                ddlAccountType["selectedIndex"] = 0;
                txtAccountNo.focus();
            }
            

            
    });

    const addNewAccountDataRow = function(accountNo, customerName, accountType) {
        const tblAccounts = document.querySelector("#tblAccounts");
        const newRow = tblAccounts.insertRow(-1);
        const newCellRowId = newRow.insertCell(0);
        const strNewRowId = document.createTextNode(`${++currentRowId}.`);
        newCellRowId.appendChild(strNewRowId);
        const newCellAccountNo = newRow.insertCell(1);
        const strNewRowAccountNo = document.createTextNode(`${accountNo}`);
        newCellAccountNo.appendChild(strNewRowAccountNo);
        const newCellCustomerName = newRow.insertCell(2);
        const strNewRowCustomerName = document.createTextNode(`${customerName}`);
        newCellCustomerName.appendChild(strNewRowCustomerName);
        const newCellAccountType = newRow.insertCell(3);
        const strNewRowAccountType = document.createTextNode(`${accountType}`);
        newCellAccountType.appendChild(strNewRowAccountType);
    }
}
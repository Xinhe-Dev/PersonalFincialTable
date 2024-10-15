// 定义收入和支出类别
const incomeCategories = [
    { value: 'salary', text: 'Salary income' },
    { value: 'transfer', text: 'Transfer income' },
    { value: 'business', text: 'Business income' },
    { value: 'property', text: 'Property income' }
];

const expenseCategories = [
    { value: 'daily_expense', text: 'Daily consumption' },
    { value: 'housing', text: 'Housing expenses' },
    { value: 'transport', text: 'Transportation expenses' },
    { value: 'medical', text: 'Medical expenses' },
    { value: 'education', text: 'Education expenses' },
    { value: 'entertainment', text: 'Entertainment expenses' },
    { value: 'other', text: 'Other expenses' }
];

// 动态更新类别选项
document.getElementById('type').addEventListener('change', function() {
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = ''; 

    const selectedType = this.value;

    let categories = [];
    if (selectedType === 'income') {
        categories = incomeCategories;
    } else if (selectedType === 'expense') {
        categories = expenseCategories;
    }

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.text;
        categorySelect.appendChild(option);
    });
});

// 页面加载时默认显示收入类别
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('type').dispatchEvent(new Event('change'));

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    var day = today.getDate().toString().padStart(2, '0'); 

    var formattedDate = year + '-' + month + '-' + day;

    var viewDateInput = document.getElementById('view-date');
    viewDateInput.value = formattedDate;

    var transactionDateInput = document.getElementById('transaction-date');
    transactionDateInput.value = formattedDate;

    updateData();
});


// 获取当天或选定日期的收支记录
function updateData() {
    var selectedDate = document.getElementById('view-date').value;

    fetch('get_daily_transactions.php?date=' + selectedDate)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            var transactionData = document.getElementById('transaction-data');
            var totalIncome = 0;
            var totalExpense = 0;

            transactionData.innerHTML = '';

            if (data.length === 0) {
                transactionData.innerHTML = '<tr><td colspan="6">There is no record for this date.</td></tr>';
            } else {
                data.forEach(function(transaction, index) {
                    var row = document.createElement('tr');
                    var amount = parseFloat(transaction.amount);
                    
                    if (transaction.type === 'income') {
                        totalIncome += amount;
                    } else if (transaction.type === 'expense') {
                        totalExpense += amount;
                    }

                    row.innerHTML = `<td>${transaction.date}</td>
                                     <td>${transaction.type === 'income' ? 'Income' : 'Expense'}</td>
                                     <td>${transaction.category}</td>
                                     <td>$${amount.toFixed(2)}</td>
                                     <td>${transaction.description}</td>
                                     <td><button onclick="deleteTransaction(${transaction.transaction_id})">Delete</button></td>`;
                    transactionData.appendChild(row);
                });
            }

            var balance = totalIncome - totalExpense;

            document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
            document.getElementById('total-expense').textContent = `$${totalExpense.toFixed(2)}`;
            document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



// 删除记录
function deleteTransaction(id) {
    if (confirm('Are you sure to delete this record?？')) {
        console.log('Deleting transaction with ID:', id); 
        fetch('delete_transaction.php', {
            method: 'POST',
            body: JSON.stringify({ id: id }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(result => {
            console.log(result); 
            if (result.includes('Delete')) {
                updateData(); 
            } else {
                alert(result); 
            }
        })
        .catch(error => {
            alert('Deletion failed, please try again.');
            console.error('Error:', error);
        });
    }
}


// 阻止表单默认提交并显示弹窗
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    var formData = new FormData(this); 

 
    fetch('save_transaction.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        if (!result.includes('success')) { 
            alert(result);
        }
        updateData();
    })
    .catch(error => {
        alert('Save failed, please try again.');
        console.error('Error:', error);
    });
});

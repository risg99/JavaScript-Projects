// Listen for submit button
document.getElementById('loan-form').addEventListener('submit', function (e) {

    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateLoanResults, 2000);

    e.preventDefault();
});

// Calculate Loan Results
function calculateLoanResults() {
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculations
    const principal = parseFloat(amount.value);
    const interestRate = parseFloat(interest.value) / 100 / 12;
    const yearsOfRepayment = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + interestRate, yearsOfRepayment);
    const monthly = (principal * x * interestRate) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * yearsOfRepayment).toFixed(2);
        totalInterest.value = ((monthly * yearsOfRepayment) - principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check the entered numbers');
    }
}

// Show error
function showError(msg) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Create div
    const errorDiv = document.createElement('div');

    // Get parent elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(msg));

    // Insert error message above heading
    card.insertBefore(errorDiv, heading);

    // Clear error message after 2 seconds
    setTimeout(clearErrorMessage, 2000);
}

// Remove the error message after certain time
function clearErrorMessage() {
    document.querySelector('.alert').remove();
}
async function fetchEmployees() {
    try {
        const response = await fetch('http://localhost:9000/employee', {
            method: 'GET'
        });

        const data = await response.json();

        // Call a function to update the table with the fetched data
        updateTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to update the table with employee data
function updateTable(employees) {
    const tableBody = document.querySelector("#employeeTable tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Loop through the fetched employee data and create rows
    employees.forEach(employee => {
        const row = document.createElement("tr");

        // Create cells for each property
        const idCell = document.createElement("td");
        idCell.textContent = employee.id;
        row.appendChild(idCell);

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = employee.firstName;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = employee.lastName;
        row.appendChild(lastNameCell);

        const birthDateCell = document.createElement("td");
        birthDateCell.textContent = employee.birthDate;
        row.appendChild(birthDateCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Fetch employees when the page loads
fetchEmployees();
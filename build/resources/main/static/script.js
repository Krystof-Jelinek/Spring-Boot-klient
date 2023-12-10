async function printAllEmployees() {
    try {
        const response = await fetch('http://localhost:9000/employee', {
            method: 'GET'
        });

        const data = await response.json();

        updateEmployeeTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateEmployeeTable(employees) {
  const tableBody = document.querySelector("#employeeTable tbody");

    tableBody.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");

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

        const actionCell = document.createElement("td");
        const deleteButton = createActionButton("employee" ,employee.id, "delete");
        const updateButton = createActionButton("employee",employee.id, "update");

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(updateButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

async function printAllVehicles() {
  try {
      const response = await fetch('http://localhost:9000/vehicle', {
          method: 'GET'
      });

      const data = await response.json();

      updateVehicleTable(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function updateVehicleTable(vehicles) {
  const tableBody = document.querySelector("#vehicleTable tbody");

  tableBody.innerHTML = "";

  vehicles.forEach(vehicle => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = vehicle.id;
      row.appendChild(idCell);

      const spzCell = document.createElement("td");
      spzCell.textContent = vehicle.spz;
      row.appendChild(spzCell);

      const colorCell = document.createElement("td");
      colorCell.textContent = vehicle.color;
      row.appendChild(colorCell);

      const equipmentLevelCell = document.createElement("td");
      equipmentLevelCell.textContent = vehicle.equipmentLevel;
      row.appendChild(equipmentLevelCell);

      const actionCell = document.createElement("td");
      const deleteButton = createActionButton("vehicle",vehicle.id, "delete");
      const updateButton = createActionButton("vehicle",vehicle.id, "update");

      actionCell.appendChild(deleteButton);
      actionCell.appendChild(updateButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
  });
}

async function printAllOrders() {
  try {
      const response = await fetch('http://localhost:9000/order', {
          method: 'GET'
      });

      const data = await response.json();

      updateOrderTable(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function updateOrderTable(orders) {
  const tableBody = document.querySelector("#orderTable tbody");

  tableBody.innerHTML = "";

  orders.forEach(order => {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      idCell.textContent = order.id;
      row.appendChild(idCell);

      const costCell = document.createElement("td");
      costCell.textContent = order.cost;
      row.appendChild(costCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = order.date; // Update with the actual property name for the date
      row.appendChild(dateCell);

      const vehicleIdCell = document.createElement("td");
      vehicleIdCell.textContent = order.vehicleId; // Update with the actual property name for the vehicle ID
      row.appendChild(vehicleIdCell);

      const actionCell = document.createElement("td");
      const deleteButton = createActionButton("order",order.id, "delete");
      const updateButton = createActionButton("order",order.id, "update");

      actionCell.appendChild(deleteButton);
      actionCell.appendChild(updateButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);
  });
}

function createActionButton(entityType ,id , actionType) {
  const button = document.createElement("button");
  const icon = document.createElement("i");

  icon.classList.add("fas");

  if (actionType === "delete") {
      icon.classList.add("fa-trash");
      button.style.backgroundColor = '#e74c3c';
  } else if (actionType === "update") {
      icon.classList.add("fa-pencil-alt");
      button.style.backgroundColor = '#3498db';
  }

  button.style.color = 'white';
  button.style.border = 'none';
  button.style.padding = '8px';
  button.style.cursor = 'pointer';

  if (actionType === "update") {
    button.style.marginLeft = '16px';
  }

  // Add hover effect
  button.addEventListener("mouseover", () => {
      button.style.backgroundColor = (actionType === "delete") ? '#c0392b' : '#2980b9';
      button.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
  });

  // Reset styles on mouseout
  button.addEventListener("mouseout", () => {
      button.style.backgroundColor = (actionType === "delete") ? '#e74c3c' : '#3498db';
      button.style.boxShadow = 'none';
  });

  button.addEventListener("click", () => handleAction(entityType , id, actionType));

  button.appendChild(icon);

  return button;
}

// Function to handle the delete or update action
function handleAction(type ,id , actionType) {
  switch(type){
    case 'employee':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          // Implement your update logic here
          console.log(`Update ${type} with ID ${employeeId}`);
      }
    break;
    
    case 'order':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          // Implement your update logic here
          console.log(`Update ${type} with ID ${employeeId}`);
      }
    break;

    case 'vehicle':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          // Implement your update logic here
          console.log(`Update ${type} with ID ${employeeId}`);
      }
    break;

  }
}

async function deleteEntity(type, id) {
  switch(type){
    case 'employee':
      try {
          const response = await fetch(`http://localhost:9000/employee/${id}`, {
              method: 'DELETE'
          });
    
          if (response.ok) {
              printAllEmployees();
          } else {
              console.error('Error deleting employee:', response.status);
          }
      } catch (error) {
          console.error('Error deleting employee:', error);
      }
    break;

    case 'order':
      try {
          const response = await fetch(`http://localhost:9000/order/${id}`, {
              method: 'DELETE'
          });
    
          if (response.ok) {
              printAllOrders();
          } else {
              console.error('Error deleting order:', response.status);
          }
      } catch (error) {
          console.error('Error deleting order:', error);
      }
    break;

    case 'vehicle':
      try {
          const response = await fetch(`http://localhost:9000/vehicle/${id}`, {
              method: 'DELETE'
          });
    
          if (response.ok) {
              printAllVehicles();
          } else {
              console.error('Error deleting vehicle:', response.status);
          }
      } catch (error) {
          console.error('Error deleting vehicle:', error);
      }
    break;
  }
}

function openTab(tabName) {
    // Hide all tab contents
    const tabs = document.getElementsByClassName("tab-content");
    for (const tab of tabs) {
      tab.style.display = "none";
    }
  
    // Remove 'active' class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-button");
    for (const button of tabButtons) {
      button.classList.remove("active");
    }
  
    // Show the selected tab content and mark the tab button as active
    var active_button = document.getElementById("tab-button-" + tabName);
    active_button.classList.add("active");

    var active_table = document.getElementById(tabName);
    active_table.style.display = "block";

    populateTable(tabName);
}

function populateTable(tabName) {
    if(tabName == "employee"){
      var header = document.getElementById("table_header");
      header.innerHTML = "Employees";
      printAllEmployees();
    }

    if(tabName == "vehicle"){
      var header = document.getElementById("table_header");
      header.innerHTML = "Vehicles";
      printAllVehicles();
    }

    if(tabName == "order"){
      var header = document.getElementById("table_header");
      header.innerHTML = "Orders";
      printAllOrders();
    }

}

function start_page(){
  var header = document.getElementById("table_header");
  header.innerHTML = "Choose Table";

  // Hide all tab contents
  const tabs = document.getElementsByClassName("tab-content");
  for (const tab of tabs) {
    tab.style.display = "none";
  }

  // Remove 'active' class from all tab buttons
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const button of tabButtons) {
    button.classList.remove("active");
  }
}

start_page();
function showWarningMessage(message) {
  const msg = document.getElementById("warning_msg");
  console.log("WRONG");
        msg.style.display = "block";
        msg.style.opacity = 1;
        msg.style.transition = "none";
        msg.innerHTML = message
        msg.style.color = "red";
        msg.style.textAlign = "center";


        setTimeout(function() {
            msg.style.opacity = 0;
            msg.style.transition = "opacity 1s ease-in-out";
        }, 600);

        setTimeout(function() {
          msg.style.display = "none";
      }, 1600);
}

function showCorrectMessage(message) {
  const msg = document.getElementById("warning_msg");
  console.log("CORRECT");
        msg.style.display = "block";
        msg.style.opacity = 1;
        msg.style.transition = "none";
        msg.innerHTML = message
        msg.style.color = "green";
        msg.style.textAlign = "center";


        setTimeout(function() {
            msg.style.opacity = 0;
            msg.style.transition = "opacity 1s ease-in-out";
        }, 600);

        setTimeout(function() {
          msg.style.display = "none";
      }, 1600);
}

function toggleForm(type){

  var formContainer;
  var button;

  if(type == "employee"){
    formContainer = document.getElementById("employeeFormContainer");
    button = document.getElementById("addEmployeeButton");
  }
  if(type == "order"){
    formContainer = document.getElementById("orderFormContainer");
    button = document.getElementById("addOrderButton");
  }
  if(type == "vehicle"){
    formContainer = document.getElementById("vehicleFormContainer");
    button = document.getElementById("addVehicleButton");
  }

  if (formContainer.style.display === "none" || formContainer.style.display === "") {
    formContainer.offsetHeight;
      formContainer.style.display = "block";
      button.style.backgroundColor = "#1c7921";
      formContainer.style.height = formContainer.scrollHeight + "px";
  } else {
      formContainer.style.height = "0";
      button.style.backgroundColor = "#2ecc71";
      setTimeout(function () {
          formContainer.style.display = "none";
      }, 500);
  }
}

function toggleEmployeeForm() {
  toggleForm("employee");
}

function toggleOrderForm(){
  toggleForm("order");
}

function toggleVehicleForm(){
  toggleForm("vehicle");
}

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
        idCell.setAttribute("data-column", "id");
        idCell.setAttribute("employee-id-column", employee.id);
        row.appendChild(idCell);

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = employee.firstName;
        firstNameCell.setAttribute("data-column", "firstName");
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = employee.lastName;
        lastNameCell.setAttribute("data-column", "lastName");
        row.appendChild(lastNameCell);

        const birthDateCell = document.createElement("td");
        birthDateCell.textContent = employee.birthDate;
        birthDateCell.setAttribute("data-column", "birthDate");
        row.appendChild(birthDateCell);

        const actionCell = document.createElement("td");
        const deleteButton = createActionButton("employee" ,employee.id, "delete");
        const updateButton = createActionButton("employee",employee.id, "update");
        const showButton = createActionButton("employee", employee.id, "show");

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(updateButton);
        actionCell.appendChild(showButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);

        // Create an invisible div for orders after the row
        const ordersDiv = document.createElement("div");
        ordersDiv.id = "employeeOrderDiv" + employee.id;
        ordersDiv.style.display = "none"; // Initially hide the div
        tableBody.appendChild(ordersDiv);
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
      idCell.setAttribute("data-column", "id");
      row.appendChild(idCell);

      const costCell = document.createElement("td");
      costCell.textContent = order.cost;
      costCell.setAttribute("data-column", "cost");
      row.appendChild(costCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = order.date;
      dateCell.setAttribute("data-column", "dateOfPayment");
      row.appendChild(dateCell);

      const vehicleIdCell = document.createElement("td");
      if(order.vehicle != null){
        vehicleIdCell.textContent = order.vehicle.id;
      }
      else{
        vehicleIdCell.textContent = "-";
      }
      vehicleIdCell.setAttribute("data-column", "vehicle");
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
      idCell.setAttribute("data-column", "id");
      row.appendChild(idCell);

      const spzCell = document.createElement("td");
      spzCell.textContent = vehicle.spz;
      spzCell.setAttribute("data-column", "spz");
      row.appendChild(spzCell);

      const colorCell = document.createElement("td");
      colorCell.textContent = vehicle.color;
      colorCell.setAttribute("data-column", "color");
      row.appendChild(colorCell);

      const equipmentLevelCell = document.createElement("td");
      equipmentLevelCell.textContent = vehicle.equipmentLevel;
      equipmentLevelCell.setAttribute("data-column", "equipmentLevel");
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

function createActionButton(entityType ,id , actionType) {
  const button = document.createElement("button");
  const icon = document.createElement("i");

  icon.classList.add("fas");

  if (actionType === "delete") {
      icon.classList.add("fa-trash");
      button.style.backgroundColor = '#e74c3c';
  } 
  else if (actionType === "update") {
      icon.classList.add("fa-pencil-alt");
      button.style.backgroundColor = '#3498db';
  }
  else if (actionType === "show") {
    icon.classList.add("fa-list");
    button.style.backgroundColor = '#f39c12';
    button.style.transition = 'background-color 0.3s, box-shadow 0.3s';
  }

  button.style.color = 'white';
  button.style.border = 'none';
  button.style.padding = '8px';
  button.style.cursor = 'pointer';
  button.style.width = '29px';

  if (actionType === "update") {
    button.style.marginLeft = '10px';
  }

  button.addEventListener("mouseover", () => {
    if (actionType === "delete") {
      button.style.backgroundColor = '#c0392b';
    } else if (actionType === "show") {
    } else {
      button.style.backgroundColor = '#3498db';
    }
    button.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
  });
  
  // Reset styles on mouseout
  button.addEventListener("mouseout", () => {
    if (actionType === "delete") {
      button.style.backgroundColor = '#e74c3c';
    } else if (actionType === "show") {
    } else {
      button.style.backgroundColor = '#3498db';
    }
    button.style.boxShadow = 'none';
  });

  button.addEventListener("click", () => handleAction(entityType , id, actionType, button));

  button.appendChild(icon);

  return button;
}

function handleAction(type ,id , actionType, button) {
  switch(type){
    case 'employee':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          editEntity(type, button);
          console.log(`Update ${type} with ID ${id}`);
      }
      else if (actionType === "show"){
        showEntity(type, id, button);
      }
    break;
    
    case 'order':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          editEntity(type, button);
          console.log(`Update ${type} with ID ${id}`);
      }
      else if (actionType === "show"){
        showEntity(type, id, button);
      }
    break;

    case 'vehicle':
      if (actionType === "delete") {
          deleteEntity(type,id);
      } else if (actionType === "update") {
          editEntity(type, button);
          console.log(`Update ${type} with ID ${id}`);
      }
      else if (actionType === "show"){
        showEntity(type, id, button);
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

async function editEntity(type, button){
  var row = button.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  for (var i = 1; i < cells.length - 1; i++) {
    var cell = cells[i];
    var currentText = cell.textContent || cell.innerText;

    // Replace the cell content with an input field
    cell.innerHTML = '<input type="text" class="editable" value="' + currentText + '">';

    var actionCell = cells[cells.length - 1];

    actionCell.innerHTML = `
    <button onclick="saveRow(this)" data-type="${type}" class="custom-btn save-btn">
        <i class="fas fa-check"></i>
    </button>
    <button onclick="discardChanges(this)" class="custom-btn discard-btn">
        <i class="fas fa-times"></i>
    </button>`;
  }
}

async function showEntity(type, id, button) {
  try {
    const response = await fetch("http://localhost:9000/employee/" + id ,{
        method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      displayOrdersBelowRow(id, data.orders, button);
      //button.style.backgroundColor = '#f39c12';
        
    } else {
        console.error('Error loading employee:', response.status);
    }
} catch (error) {
    console.error('Error loading employee:', error);
}
}

function displayOrdersBelowRow(employeeId, orders, button) {
  var ordersDiv = document.getElementById("employeeOrderDiv" + employeeId);
  console.log(button);
  
  // Toggle the visibility of ordersDiv
  if (ordersDiv.style.display === 'none') {
    ordersDiv.style.display = 'block';
    button.style.backgroundColor = '#a56920';
  } else {
    ordersDiv.style.display = 'none';
    button.style.backgroundColor = '#f39c12';
  }

  // Clear existing content in ordersDiv
  ordersDiv.innerHTML = "";

  // Create a table element
  const table = document.createElement("table");

  // Create a table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const orderHeaderCells = ['Order ID', 'Cost', 'Date'];

  orderHeaderCells.forEach(headerText => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create a table body
  const tbody = document.createElement("tbody");

  // Iterate through orders and create rows in the table body
  orders.forEach(order => {
    const orderRow = document.createElement("tr");
    const orderCells = [order.id, order.cost, order.date];

    orderCells.forEach(cellValue => {
      const orderCell = document.createElement("td");
      orderCell.textContent = cellValue;
      orderRow.appendChild(orderCell);
    });

    tbody.appendChild(orderRow);
  });

  table.appendChild(tbody);

  // Append the table to the ordersDiv
  ordersDiv.appendChild(table);
}

async function saveRow(button) {
  var row = button.parentNode.parentNode;
  const cells_tmp = row.querySelectorAll("td:not(:first-child)"); 
  const cells = Array.from(cells_tmp);
  cells.pop();
  var id = row.querySelector("td:first-child");
  const rowData = { };
    cells.forEach(cell => {
        const input = cell.querySelector('input');
        const columnName = cell.getAttribute("data-column");
        rowData[columnName] = input.value;
    });

  if(button.getAttribute("data-type") == "employee"){
    await saveEmployeeRow(rowData, id);
    return;
  }

  if(button.getAttribute("data-type") == "order"){
    await saveOrderRow(rowData, id);
    return;
  }

  if(button.getAttribute("data-type") == "vehicle"){
    await saveVehicleRow(rowData, id);
    return;
  }
  
}

async function saveEmployeeRow(rowData, id) {
  try {
    const response = await fetch('http://localhost:9000/employee/' + id.innerHTML, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    const resp = await response;
    
    if (!response.ok) {
      showWarningMessage("The date is not valid");
      throw new Error('Network response was not ok');
    }

    console.log('Data updated successfully:', resp);
    openTab("employee");
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function saveOrderRow(rowData, id) {
  console.log(rowData);
  
  const keys = Object.keys(rowData);
  const lastKey = keys[keys.length - 1];
  var vehicle_id = rowData[lastKey];
  delete rowData[lastKey];

  try {
    const response = await fetch('http://localhost:9000/order/' + id.innerHTML, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    const resp = await response;
    
    if (!resp.ok) {
      showWarningMessage("The date is not valid");
      throw new Error('Network response was not ok');
    }

      try{
        if(vehicle_id.length == 0){
          const response = await fetch('http://localhost:9000/vehicle/order/' + id.innerHTML, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
              },
          });

        const resp = await response;
        
          if (!resp.ok) {
            showWarningMessage("You did something really wrong");
            throw new Error('Network response was not ok');
          }
        
        }
        else{
          const response = await fetch('http://localhost:9000/vehicle/order/'+ vehicle_id + '/' + id.innerHTML, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const resp = await response;
          
          if (!response.ok) {
            showWarningMessage("The id of vehicle is not valid");
            throw new Error('Network response was not ok');
          }
        }

    
        console.log('Data updated successfully:', resp);
        openTab("order");
    
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          return;
        }

    console.log('Data updated successfully:', resp);
    openTab("order");

  } catch(error){
    console.error('There was a problem with the fetch operation:', error);
    return;
  }
}

async function saveVehicleRow(rowData, id){
  try {
    const response = await fetch('http://localhost:9000/vehicle/' + id.innerHTML, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rowData),
    });

    const resp = await response;
    
    if (!response.ok) {
      showWarningMessage("EquipmentLevel can only be an number");
      throw new Error('Network response was not ok');
    }

    console.log('Data updated successfully:', resp);
    openTab("vehicle");
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function discardChanges(button) {
  openTab(button.parentNode.parentNode.parentNode.parentNode.parentNode.id);
}

async function addEmployee(){
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var birthDate = document.getElementById("birthDate").value;

  if (!firstName || !lastName || !birthDate) {
    alert("Please fill in all fields.");
    return;
  }

  var employeeData = {
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate
  };

  fetch('http://localhost:9000/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
  .then(response => {
    console.log(response);

    showCorrectMessage("New Employee added");

    // Clear the input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("birthDate").value = "";

    openTab("employee");
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function addOrder(){
  var cost = document.getElementById("cost").value;
  var dateOfPayment = document.getElementById("dateOfPayment").value;

  if (!cost || !dateOfPayment) {
    alert("Please fill in all fields.");
    return;
  }

  var orderData = {
    cost: cost,
    dateOfPayment: dateOfPayment,
  };

  fetch('http://localhost:9000/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => {
    console.log(response);

    showCorrectMessage("New Order added");

    // Clear the input fields
    document.getElementById("cost").value = "";
    document.getElementById("dateOfPayment").value = "";

    openTab("order");
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function addVehicle(){
  var spz = document.getElementById("spz").value;
  var color = document.getElementById("color").value;
  var equipmentLevel = document.getElementById("equipmentLevel").value;

  if (!spz || !color || !equipmentLevel) {
    alert("Please fill in all fields.");
    return;
  }

  var vehicleData = {
    spz: spz,
    color: color,
    equipmentLevel: equipmentLevel
  };

  fetch('http://localhost:9000/vehicle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicleData)
  })
  .then(response => {
    console.log(response);

    showCorrectMessage("New Vehicle added");

    // Clear the input fields
    document.getElementById("spz").value = "";
    document.getElementById("color").value = "";
    document.getElementById("equipmentLevel").value = "";

    openTab("vehicle");
  })
  .catch(error => {
    console.error('Error:', error);
  });
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
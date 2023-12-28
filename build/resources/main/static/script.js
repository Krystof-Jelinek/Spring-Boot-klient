function showWarningMessage(message) {
  console.log("WRONG");
  showFixedNotification(message, "red");
}

function showCorrectMessage(message) {
  console.log("CORRECT");
  showFixedNotification(message, "green");
}

function showFixedNotification(message, incolor) {
  const notificationElement = document.getElementById('fixedNotification');
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';
  notificationElement.style.backgroundColor = incolor;

  notificationElement.style.opacity = 1;
  notificationElement.style.transition = "opacity 1s ease-in-out";

  // Hide the fixed notification after the specified duration
  setTimeout(function() {
    notificationElement.style.opacity = 0;
  }, 3000);

  setTimeout(() => {
    notificationElement.style.display = 'none';
  }, 4000);
  
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

        actionCell.appendChild(updateButton);
        actionCell.appendChild(showButton);
        actionCell.appendChild(deleteButton);
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
      const showButton = createActionButton("order", order.id, "show");

      actionCell.appendChild(updateButton);
      actionCell.appendChild(showButton);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);

      // Create an invisible div for orders after the row
      const employeeDiv = document.createElement("div");
      employeeDiv.id = "orderEmployeeDiv" + order.id;
      employeeDiv.style.display = "none"; // Initially hide the div
      tableBody.appendChild(employeeDiv);
  });
}

async function printAllVehicles() {
  try {
      const response = await fetch('http://localhost:9000/vehicle', {
          method: 'GET'
      });

      const data = await response.json();

      updateVehicleTable(data);
      createDestructionButton();
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
      const showButton = createActionButton("vehicle", vehicle.id, "show");

      actionCell.appendChild(updateButton);
      actionCell.appendChild(showButton);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      tableBody.appendChild(row);

      // Create an invisible div for orders after the row
      const ordersDiv = document.createElement("div");
      ordersDiv.id = "vehicleOrderDiv" + vehicle.id;
      ordersDiv.style.display = "none"; // Initially hide the div
      tableBody.appendChild(ordersDiv);
  });
}

function createDestructionButton(){
  if(document.getElementById("destructionButton")){
    return;
  }
  
  const destructionButton = document.createElement('button');
  destructionButton.id = 'destructionButton';
  destructionButton.textContent = 'Scrap All Unused Vehicles';

  destructionButton.addEventListener('click', async function() {
    var confirmed = window.confirm('Are you sure you want to do this?');

    if (confirmed) {
      try {
        const response = await fetch('http://localhost:9000/vehicle', {
            method: 'DELETE'
        });
  
        if (response.ok) {
            printAllVehicles();
        } else {
            console.error("There was some unexpected error", response.status);
        }
    } catch (error) {
        console.error("There was some unexpected error", error);
    }
    } else {
        return;
    }
  });

  // Append the button to the body
  const vehicleDiv = document.getElementById("vehicle");
  vehicleDiv.appendChild(destructionButton);
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

  if (actionType === "show") {
    button.style.marginLeft = '10px';
  }
  if (actionType === "delete") {
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
  if(type == "employee"){
    displayOrdersBelowRow(id,button);
  }
  if(type == "order"){
    displayEmployeesBelowRow(id,button);
  }
  if(type == "vehicle"){
    displayOrdersBelowRowForVehicle(id,button);
  }
}

async function bussinessOperationCheck(employeeId, orderId){

  let dataEmployee;
  let dataOrder;

  try {
    const response = await fetch("http://localhost:9000/employee/" + employeeId ,{
        method: 'GET'
    });

    if (response.ok) {
      dataEmployee = await response.json();
        
    } else {
        console.error('Error loading employee:', response.status);
        return false;
    }
  } catch (error) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:9000/order/" + orderId ,{
        method: 'GET'
    });

    if (response.ok) {
      dataOrder = await response.json();
        
    } else {
        console.error('Error order order:', response.status);
        return false;
    }
  } catch (error) {
    return false;
  }

  let totalOrderCost = 0;

    for (let i = 0; i < dataEmployee.orders.length; i++) {
      totalOrderCost += dataEmployee.orders[i].cost;
    }

  console.log(totalOrderCost + dataOrder.cost);  
  if(totalOrderCost + dataOrder.cost > 100000){
    console.log("Employee cant manage more than 100 000 worth of orders");
    return false;
  }

  return true;
}

async function updateOrdersBelowDiv(employeeId){

  let data;

  try {
    const response = await fetch("http://localhost:9000/employee/" + employeeId ,{
        method: 'GET'
    });

    if (response.ok) {
      data = await response.json();
        
    } else {
        console.error('Error loading employee:', response.status);
    }
} catch (error) {
    console.error('Error loading employee:', error);
}

  const orders = data.orders;

  var ordersDiv = document.getElementById("employeeOrderDiv" + employeeId);

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

  const inputOrderID = document.createElement("input");
  inputOrderID.type = "number";
  inputOrderID.placeholder = "Enter Order ID";
  inputOrderID.style.marginLeft = "20px";
  ordersDiv.appendChild(inputOrderID);


  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "+";  // Change the text content to a plus sign
  submitButton.className = "custom-btn save-btn";  // Use predefined styles
  submitButton.style.marginLeft = "20px";
  submitButton.onclick = async function() {
    const orderId = inputOrderID.value;
    if(await bussinessOperationCheck(employeeId, orderId) === false){
      showWarningMessage("Employee or Order with this ID doesnt exist or the total cost is higher than 100 000");
      updateOrdersBelowDiv(employeeId);
      return;
    }
    try {
      const response = await fetch("http://localhost:9000/employee/order/" + employeeId + "/" + orderId ,{
          method: 'POST'
      });
      console.log(response);
      if (response.ok) {
          showCorrectMessage("Employee/Order Relation Added");
          updateOrdersBelowDiv(employeeId);
      } else {
          console.error('Error loading employee:', response.status);
          showWarningMessage("There is no order with this ID");
      }
  } catch (error) {
      console.error('Error loading employee:', error);
  }
  };
  ordersDiv.appendChild(submitButton);

  // Add a discard button
  const discardButton = document.createElement("button");
  discardButton.classList.add("custom-btn");
  discardButton.style.marginLeft = "10px";
  discardButton.style.marginBottom = "15px";


  // Add the specific style for the discard button
  discardButton.classList.add("discard-btn");

  // Create a span element for the minus sign
  const minusSign = document.createElement("span");
  minusSign.textContent = "−"; // Minus sign character

  // Append the minus sign to the discard button
  discardButton.appendChild(minusSign);

  discardButton.onclick = async function() {
    const orderId = inputOrderID.value;
    try {
      const response = await fetch("http://localhost:9000/employee/order/" + employeeId + "/" + orderId ,{
          method: 'DELETE'
      });
      console.log(response);
      if (response.ok) {
        showCorrectMessage("Employee/Order Relation Removed");
        updateOrdersBelowDiv(employeeId);
      } else {
          console.error('Error loading employee:', response.status);
          showWarningMessage("There is no order with this ID");
      }
    } catch (error) {
        console.error('Error loading employee:', error);
    }
  };
  ordersDiv.appendChild(discardButton);

}

async function updateEmployeesBelowDiv(orderId){

  let data;

  try {
    const response = await fetch("http://localhost:9000/order/" + orderId ,{
        method: 'GET'
    });

    if (response.ok) {
      data = await response.json();
        
    } else {
        console.error('Error loading order:', response.status);
    }
} catch (error) {
    console.error('Error loading order:', error);
}

  const employees = data.employees;

  var employeesDiv = document.getElementById("orderEmployeeDiv" + orderId);

  // Clear existing content in employeesDiv
  employeesDiv.innerHTML = "";

  // Create a table element
  const table = document.createElement("table");

  // Create a table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const orderHeaderCells = ['Employee ID', 'First Name', 'Last Name', 'Birth Date'];

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
  employees.forEach(employee => {
    const employeeRow = document.createElement("tr");
    const employeeCells = [employee.id, employee.firstName, employee.lastName, employee.birthDate];

    employeeCells.forEach(cellValue => {
      const employeeCell = document.createElement("td");
      employeeCell.textContent = cellValue;
      employeeRow.appendChild(employeeCell);
    });

    tbody.appendChild(employeeRow);
  });

  table.appendChild(tbody);

  // Append the table to the employeesDiv
  employeesDiv.appendChild(table);

  const inputEmployeeID = document.createElement("input");
  inputEmployeeID.type = "number";
  inputEmployeeID.placeholder = "Enter Employee ID";
  inputEmployeeID.style.marginLeft = "20px";
  employeesDiv.appendChild(inputEmployeeID);


  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "+";  // Change the text content to a plus sign
  submitButton.className = "custom-btn save-btn";  // Use predefined styles
  submitButton.style.marginLeft = "20px";
  submitButton.onclick = async function() {
    const employeeId = inputEmployeeID.value;
    if(await bussinessOperationCheck(employeeId, orderId) === false){
      showWarningMessage("Employee or Order with this ID doesnt exist or the total cost is higher than 100 000");
      updateEmployeesBelowDiv(orderId);
      return;
    }
    try {
      const response = await fetch("http://localhost:9000/employee/order/" + employeeId + "/" + orderId ,{
          method: 'POST'
      });
      console.log(response);
      if (response.ok) {
          showCorrectMessage("Employee/Order Relation Added");
          updateEmployeesBelowDiv(orderId);
      } else {
          console.error('Error loading order:', response.status);
          showWarningMessage("There is no employee with this ID");
      }
  } catch (error) {
      console.error('Error loading order:', error);
  }
  };
  employeesDiv.appendChild(submitButton);

  // Add a discard button
  const discardButton = document.createElement("button");
  discardButton.classList.add("custom-btn");
  discardButton.style.marginLeft = "10px";
  discardButton.style.marginBottom = "15px";


  // Add the specific style for the discard button
  discardButton.classList.add("discard-btn");

  // Create a span element for the minus sign
  const minusSign = document.createElement("span");
  minusSign.textContent = "−"; // Minus sign character

  // Append the minus sign to the discard button
  discardButton.appendChild(minusSign);

  discardButton.onclick = async function() {
    const employeeId = inputEmployeeID.value;
    try {
      const response = await fetch("http://localhost:9000/employee/order/" + employeeId + "/" + orderId ,{
          method: 'DELETE'
      });
      console.log(response);
      if (response.ok) {
        showCorrectMessage("Employee/Order Relation Removed");
        updateEmployeesBelowDiv(orderId);
      } else {
          console.error('Error loading order:', response.status);
          showWarningMessage("There is no order with this ID");
      }
    } catch (error) {
        console.error('Error loading order:', error);
    }
  };
  employeesDiv.appendChild(discardButton);

}

async function updateOrdersBelowDivForVehicle(vehicleId){

  let data;

  try {
    const response = await fetch("http://localhost:9000/vehicle/" + vehicleId ,{
        method: 'GET'
    });

    if (response.ok) {
      data = await response.json();
        
    } else {
        console.error('Error loading vehicle:', response.status);
    }
} catch (error) {
    console.error('Error loading vehicle:', error);
}

  const orders = data.orders;

  var orderDiv = document.getElementById("vehicleOrderDiv" + vehicleId);

  // Clear existing content in orderDiv
  orderDiv.innerHTML = "";

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
  orders.forEach(employee => {
    const employeeRow = document.createElement("tr");
    const employeeCells = [employee.id, employee.cost, employee.date];

    employeeCells.forEach(cellValue => {
      const employeeCell = document.createElement("td");
      employeeCell.textContent = cellValue;
      employeeRow.appendChild(employeeCell);
    });

    tbody.appendChild(employeeRow);
  });

  table.appendChild(tbody);

  
  // Append the table to the orderDiv
  orderDiv.appendChild(table);
}

function displayOrdersBelowRow(employeeId, button) {
  var ordersDiv = document.getElementById("employeeOrderDiv" + employeeId);
  
  // Toggle the visibility of ordersDiv
  if (ordersDiv.style.display === 'none') {
    ordersDiv.style.display = 'block';
    button.style.backgroundColor = '#a56920';
    updateOrdersBelowDiv(employeeId);
  } else {
    ordersDiv.style.display = 'none';
    button.style.backgroundColor = '#f39c12';
    return;
  }
  
}

function displayEmployeesBelowRow(orderId, button) {
  var employeeDiv = document.getElementById("orderEmployeeDiv" + orderId);
  
  // Toggle the visibility of employeeDiv
  if (employeeDiv.style.display === 'none') {
    employeeDiv.style.display = 'block';
    button.style.backgroundColor = '#a56920';
    updateEmployeesBelowDiv(orderId);
  } else {
    employeeDiv.style.display = 'none';
    button.style.backgroundColor = '#f39c12';
    return;
  }
  
}

function displayOrdersBelowRowForVehicle(vehicleId, button) {
  var vehicleDiv = document.getElementById("vehicleOrderDiv" + vehicleId);
  
  // Toggle the visibility of vehicleDiv
  if (vehicleDiv.style.display === 'none') {
    vehicleDiv.style.display = 'block';
    button.style.backgroundColor = '#a56920';
    updateOrdersBelowDivForVehicle(vehicleId);
  } else {
    vehicleDiv.style.display = 'none';
    button.style.backgroundColor = '#f39c12';
    return;
  }
  
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

  try {
    const response = await fetch('http://localhost:9000/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    const resp = await response;
    
    if (!response.ok) {
      showWarningMessage("The date is not valid");
      throw new Error('Network response was not ok');
    }

    console.log('Data updated successfully:', resp);
    openTab("employee");
    showCorrectMessage("New Employee added");
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("birthDate").value = "";

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
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

  try{
    const response = await fetch('http://localhost:9000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    if(!response.ok){
      showWarningMessage("the Date or Cost was not correct");
      throw new Error('Network response was not ok');
    }
      console.log(response);
      showCorrectMessage("New Order added");
      // Clear the input fields
      document.getElementById("cost").value = "";
      document.getElementById("dateOfPayment").value = "";
      openTab("order");
    }
    catch(error){
      console.error('Error:', error);
    };
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

  try{
    const response = await fetch('http://localhost:9000/vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    })
    if(!response.ok){
      showWarningMessage("Some of your input is incorrect");
      throw new Error('Network response was not ok');
    }
      console.log(response);
      showCorrectMessage("New Vehicle added");
      // Clear the input fields
      document.getElementById("spz").value = "";
      document.getElementById("color").value = "";
      document.getElementById("equipmentLevel").value = "";
  
      openTab("vehicle");
    }
    catch(error){
      console.error('Error:', error);
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

function restartData(){
  var confirmed = window.confirm('This action will delete all data insert default sandbox data');

    if (confirmed) {
      fetch('http://localhost:9000/database', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      })
      .then(response => {
          if (response.ok) {
              console.log('Data successfully restarted.');
              start_page();
          } else {
              console.error('Failed to restart data.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
    } else {
        return;
    }
}

start_page();
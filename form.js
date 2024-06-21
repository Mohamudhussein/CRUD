
const form = document.getElementById('newEmployeeForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const employee = {
        name: formData.get('name'),
        designation: formData.get('designation'),
        phone_number: formData.get('phone_number'),
        email: formData.get('email')
    };
    fetch('http://localhost:5500/addemployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error adding employee');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        form.reset();
        location.reload(); // Reload the page to update the employee list
    })
    .catch(error => {
        console.error('Error adding employee:', error);
    });
});

const updateForm = document.getElementById('updateEmployeeForm');
updateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(updateForm);
    const employee = {
        id: formData.get('id'),
        name: formData.get('name'),
        designation: formData.get('designation'),
        phone_number: formData.get('phone_number'),
        email: formData.get('email')
    };
    fetch(`http://localhost:5500/updateemployee/${employee.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error updating employee');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        updateForm.reset();
        location.reload(); // Reload the page to update the employee list
    })
    .catch(error => {
        console.error('Error updating employee:', error);
    });
});

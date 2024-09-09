const API_URL = 'http://localhost:3000';

let metadata = {};

async function init() {
    document.getElementById("add-user-form").addEventListener("submit", onAddUserFormSubmit);

    toggleAddUserFields(document.querySelector("[name=type]").value);
    fetchMeta();
    fetchUsers();
}

async function fetchMeta() {
    const response = await fetch(`${API_URL}/meta`);
    metadata = await response.json();
    renderSortOptions(metadata.userFields);
}

async function onAddUserFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    try {
        await addUser(Object.fromEntries(new FormData(form)));
        form.reset();
        toggleAddUserFields(document.querySelector("[name=type]").value);
    } catch (error) {
        // just let them try again
    }
}

async function addUser(newUser) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });

    const data = await response.json();

    if (data.error) {
        alert("Error: " + data.error);
        throw new Error(data.error);
    }
    else {
        alert(data.message);
    }

    fetchUsers();
}

async function fetchUsers(opts = {}) {
    const sortField = opts.sortField || "username";
    const response = await fetch(`${API_URL}/users?sort=${sortField}`);
    const json = await response.json();
    //const users = json.map(user => ({ ...user, createDate: new Date(user.createDate) }));
    const users = json;
    renderUsers(users);
}

function renderUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    // name of the fields to display, in order of table column
    const columns = ['type', 'createDate', 'username', 'age', 'title'];

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML =
            columns
                .map(field => `<td>${getUserFieldValue(user, field)}</td>`)
                .join('');
        userList.appendChild(tr);
    });
}

function getUserFieldValue(user, field) {
    const value = user[field];
    if (!value) return "";

    try {
        if (field === 'type') {
            return metadata.userTypes.find(f => f.field === value).name;
        }

        if (field === 'createDate') {
            return value.toLocaleDateString();
        }
    } catch (e) {
    }

    return value;
}

function renderSortOptions(fields) {
    const sortSelect = document.getElementById('sort-order');
    sortSelect.innerHTML = '';

    fields.forEach(({ field, name }) => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = name;
        sortSelect.appendChild(option);
    });
}

function toggleAddUserFields(selectedType) {
    document.querySelectorAll("[data-type]").forEach(field => {
        const show = field.getAttribute("data-type") === selectedType
        if (show) {
            field.classList.remove("hidden")
        } else {
            field.classList.add("hidden")
        }
    });
}
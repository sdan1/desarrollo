function getUsers(page) {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>'
    fetch("https://reqres.in/api/users?page="+page,{
        method: "GET",
        headers: {
            "Content-type": "application/json"
            // Nota: x-api-key no es necesario para reqres.in
        }
    })
    .then((result) => {
        return result.json().then(data => {
            return {
                status: result.status,
                body: data
            }
        });
    })
    .then((response) => {
        if (response.status === 200) {
            let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            response.body.data.forEach(user => {
                listUsers += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="Avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="showInfoUser('${user.id}')">Info</button>
                        </td>
                    </tr>
                `;
            });
            listUsers += `
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#" onclick="getUsers('1')">1</a></li>
                            <li class="page-item"><a class="page-link" href="#"onclick="getUsers('2')">2</a></li>
                            <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            `;
            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>';
        }
    })
    .catch(error => {
        console.error('Error al obtener usuarios:', error);
        document.getElementById('info').innerHTML = '<h3>Error al cargar los usuarios</h3>';
    });
}

function showInfoUser(userId) {
    fetch("https://reqres.in/api/users/" + userId, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((result) => {
        return result.json().then(data => {
            return {
                status: result.status,
                body: data
            }
        });
    })
    .then((response) => {
        if (response.status === 200) {
            showModalUser(response.body.data);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el usuario</h3>';
        }
    })
    .catch(error => {
        console.error('Error al obtener el usuario:', error);
        document.getElementById('info').innerHTML = '<h3>Error al cargar la información del usuario</h3>';
    });
}

function showModalUser(user) {
    const modalUser = `
        <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">View User</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img src="${user.avatar}" class="card-img-top" alt="User Avatar">
                            <div class="card-body">
                                <h5 class="card-title">User info</h5>
                                <p class="card-text">First Name: ${user.first_name}</p>
                                <p class="card-text">Last Name: ${user.last_name}</p>
                                <p class="card-text">Email: ${user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.getElementById('modalUser'));
    modal.show();
}

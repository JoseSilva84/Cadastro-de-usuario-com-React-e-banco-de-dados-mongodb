import './App.css';
import Trash from '../../assets/trash.png';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function App() {

  // const users = [
  //   {
  //     id: '1234gdhjd',
  //     name: 'Carlos',
  //     age: 32,
  //     email: 'carlos@gmail.com'
  //   },
  //   {
  //     id: '5634gdhjd',
  //     name: 'José',
  //     age: 41,
  //     email: 'jose@gmail.com'
  //   },
  //   {
  //     id: '78234gdhjd',
  //     name: 'Antônio',
  //     age: 25,
  //     email: 'antonio@gmail.com'
  //   }
  // ];

  //   return (
  //     <div className='container'>
  //       <form>
  //         <h1>Cadastro de Usuários</h1>
  //         <input placeholder='Nome' name="nome" type='text' />
  //         <input placeholder='Idade' name="idade" type='number' />
  //         <input placeholder='E-mail' name="email" type='email' />
  //         <button type="button">Cadastrar</button>
  //         {users.map((user) => (
  //           <div key={user.id} className='card'>
  //               <div>
  //                 <p>Nome: <span>{user.name}</span></p>
  //                 <p>Idade: <span>{user.age}</span></p>
  //                 <p>Email: <span>{user.email}</span></p>
  //               </div>
  //               <button>
  //                 <img src={Trash} alt="" />
  //               </button>
  //             </div>
  //         ))}
  //       </form>
  //     </div>
  //   )
  // }

  const [users, setUsers] = useState([]);

  // let users = [];

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputAddress = useRef();


  // Aqui eu pego/recupero os dados da api (backend) em comunicação com o frontend
  async function getUsers() {
    // users = await api.get('/usuarios');
    // console.log(users);
    
    const usersFromApi = await api.get('/usuarios');

    // users = usersFromApi.data;
    setUsers(usersFromApi.data);
  }
  // -----------------------------------------------------------------------------

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  async function createUsers() {
    // console.log(inputName);

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      address: inputAddress.current.value
    });
    getUsers();
    window.location.reload();
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name="nome" type='text' ref={inputName} />
        <input placeholder='Idade' name="idade" type='number' ref={inputAge} />
        <input placeholder='E-mail' name="email" type='email' ref={inputEmail} />
        <input placeholder='Endereço' name="address" type='address' ref={inputAddress} />
        {/* <button type="button">Cadastrar</button> */}
        <button id='botaoCadastrar' type="button" onClick={createUsers}>Cadastrar</button>
        {users.map((user) => (
          <div key={user.id} className='card'>
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>Email: <span>{user.email}</span></p>
                <p>Address: <span>{user.address}</span></p>
              </div>
              <button id='botaoLixo' onClick={() => deleteUsers(user.id)}>
                <img src={Trash} alt="" />
              </button>
            </div>
        ))}
      </form>
    </div>
  )
}

export default App

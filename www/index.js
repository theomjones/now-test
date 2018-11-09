import {h, app} from 'hyperapp';

const prod = process.env.NODE_ENV === 'production';
const url = prod ? '/api/names.js' : 'http://localhost:3000/users';
console.log(prod);

const state = {
    users: [],
}
const actions = {
    startFetchUsers: () => (state, actions) => {
        fetch(url)
            .then(res => res.json())
            .then(actions.updateUsers)
            .catch(console.error)
    },
    updateUsers: users => ({ users })
}

const view = (state, actions) => (
    <div
        oncreate={actions.startFetchUsers}
    >
        <h1>Hello HyperApp</h1>
        <ul>
            {state.users.map(u => <li>{u}</li>)}
        </ul>
    </div>
)

app(state, actions, view, document.getElementById('app'));
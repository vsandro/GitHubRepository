import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logoGitHub.svg'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import { Title, Form, UserInfo, Error } from './style'

interface User {
    login: string,
    name: string,
    avatar_url: string,
    location: string,
    bio: string,
}

const Dashboard: React.FC = () => {
    const [textSeach, setTextSeach] = useState('')
    const [inputError, setInputError] = useState('')
    const [users, setUsers] = useState<User[]>(() => {
        const storedUsers = localStorage.getItem('@GithubExplorer:users')

        if (storedUsers) {
            return JSON.parse(storedUsers)
        } else {
            return []
        }
    })
    
    useEffect(() => {
        localStorage.setItem('@GithubExplorer:users', JSON.stringify(users))
    }, [users])

    async function handAddUser(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()

        if (!textSeach) {
            setInputError('Digite nome do usuário no Github')
            return
        }

        try {
            const response = await api.get<User>(`users/${textSeach}`)        
            const user = response.data
    
            setUsers([...users, user])
            setTextSeach('')  
            setInputError('')  
        } catch {
            setInputError('Erro na busca pelo usuário')
        }

    }

    return (
    <>
        <img width="300px" src={logoImg} alt="Github Explorer" />
        <Title>Track Users on GitHub</Title>
        <Form hasError={!!inputError} onSubmit={handAddUser}>
            <input placeholder="Digite o nome do usuário"
                value={textSeach}
                onChange={(e) => setTextSeach(e.target.value)}
            />
            <button type="submit">Pesquisar</button>
        </Form>

        { inputError && <Error>{inputError}</Error>}

        <UserInfo>
            {users.map(user => (
                <Link key={user.name} to={`/repositories/${user.login}`}>
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                    />
                    <div>
                        <span>{user.login}</span> - <strong>{user.name}</strong>
                        <p>{user.location}</p>
                        <p>{user.bio}</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            ))}
        </UserInfo>
    </>
)}

export default Dashboard
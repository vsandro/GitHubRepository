import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import { Title, UserInfo } from './style'
import logoImg from '../../assets/logoGitHub.svg'

interface RepositoryParams {
    repository: string;
}
  
interface User {
    login: string,
    avatar_url: string,
}

const Following: React.FC = () => {
    const [user, setUser] = useState<User[]>([])

    const { params } = useRouteMatch<RepositoryParams>();
  
    useEffect(() => {
        api.get(`users/${params.repository}/following`).then(response => {
          setUser(response.data);
        });    
      }, [params.repository]);
      
    return (
    <>
        <Link to="/">
          <img width="300px" src={logoImg} alt="Github Explorer" />
        </Link>
        <Title>Track Users on Github</Title>

        <UserInfo>
            {user.map(user => (
                <Link key={user.login} to={`/repositories/${user.login}`}>
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                    />
                    <div>
                        <span>{user.login}</span> - <strong>{user.login}</strong>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            ))}
        </UserInfo>
    </>
)}

export default Following
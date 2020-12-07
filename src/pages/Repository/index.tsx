import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logoGitHub.svg'

import { Header, UserInfo, RepositoryInfo } from './styles';

interface RepositoryParams {
  repository: string;
}

interface User {
  login: string,
  name: string,
  avatar_url: string,
  location: string,
  bio: string,
  public_repos: number,
  followers: number,
  following: number,
}

interface Repository {
  name: string,
  description: string,
  language: number,
  html_url: string,
}

const UserRepository: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [repository, setRepository] = useState<Repository[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`users/${params.repository}`).then(response => {
      setUser(response.data);
    });

    api.get(`users/${params.repository}/repos`).then(response => {
      setRepository(response.data);
    });

  }, [params.repository]);

  return (
    <>
      <Header>
        <Link to="/">
          <img width="300px" src={logoImg} alt="Github Explorer" />
        </Link>
      </Header>

      {user && (
        <UserInfo>
          <header>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>
              <strong>{user.name + " - " + user.login}</strong>
              <p>{user.bio}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{user.public_repos}</strong>
              <span>Repositórios</span>
            </li>
            <li>
              <strong>{user.followers}</strong>
              <span>Seguidores</span>
            </li>
            <li>
              <Link key={user.name} to={`/users/${user.login}`}>
                <strong>{user.following}</strong>
              </Link>
              <span>Seguindo</span>
            </li>
          </ul>
        </UserInfo>
      )}

      <RepositoryInfo>
        {repository.map(item => (
          <a key={item.name} href={item.html_url}>
            <div>
              <strong>{item.html_url}</strong>
              <p>{item.language}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </RepositoryInfo>
    </>
  );
};

export default UserRepository;

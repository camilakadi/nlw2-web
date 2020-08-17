import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../Services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
};

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem:React.FC<TeacherItemProps> = ({teacher}) => {
    function criarNovaConexao() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={criarNovaConexao} href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={wppIcon} alt="Wpp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;
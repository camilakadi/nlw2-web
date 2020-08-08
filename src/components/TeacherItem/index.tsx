import React from 'react';

import wppIcon from '../../assets/images/icons/whatsapp.svg'; 

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://www.crmv.am.gov.br/wp-content/uploads/2017/10/coelho-filhote.png" alt="Coelho"/>
                <div>
                    <strong>Coelho</strong>
                    <span>Química</span>
                </div>
            </header>
            <p>
            Entusiasta das melhores tecnologias de química avançada.
            <br/>
            <br/>
            Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={wppIcon} alt="Wpp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
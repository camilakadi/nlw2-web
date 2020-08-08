import React from 'react';
import { Link } from 'react-router-dom';

import logoimg from '../../assets/images/logo.svg'; 
import backIcon from '../../assets/images/icons/back.svg'; 

import './styles.css';

interface PageHeaderProps {
    title: string;
}
//ou pode colocar FC tb no lugar de functionComponent
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoimg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.children}
            </div>

        </header>
    )
}

export default PageHeader;
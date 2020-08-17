import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';
import api from '../../Services/api';

function TeacherFrom() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        {
            week_day: 0,
            from: '',
            to: '',
        }
    ]);

    function adicionarNovoScheduleitem() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: '',
            }
        ]);
    }

    function adicionarDiaSemana(posicao: number, campo: string, valor: string) {
        const scheduleItemAtualizado = scheduleItems.map((scheduleItem, index) => {
            if (index === posicao) {
                return {
                    ...scheduleItem,
                    [campo]: valor
                }
            }
            return scheduleItem;
        });

        setScheduleItems(scheduleItemAtualizado);
    }

    function criarClass(evento: FormEvent) {
        evento.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('cadastro realizado com sucesso');

            history.push('/');
        }).catch(() => {
            alert('erro');
        });

        //console.log({name, avatar, whatsapp, bio, subject, cost, scheduleItems});
    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader
                title="Que incrivel que vc quer dar aulas"
                description="O primeiro passa é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={criarClass}>
                    <fieldset>
                        <legend>
                            Seus dados
                        </legend>

                        <Input name="name" label="Nome" value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input name="avatar" label="Avatar" value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input name="whatsapp" label="Whatsapp" value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }}></Textarea>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Sobre a aula
                        </legend>

                        <Select name="subject" label="Matéria" value={subject} onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                {value:'Artes', label:"Artes"},
                                {value:'Ciencias', label:"Ciencias"},
                                {value:'Matemática', label:"Matemática"}
                            ]}
                        />

                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={adicionarNovoScheduleitem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select name="week_day" label="Dia da Semana" value={scheduleItem.week_day}
                                    onChange={e => adicionarDiaSemana(index, 'week_day', e.target.value)}
                                        options={[
                                            {value:'0', label:"Dom"},
                                            {value:'1', label:"Seg"},
                                            {value:'2', label:"Ter"},
                                            {value:'3', label:"Qua"},
                                            {value:'4', label:"Qui"},
                                            {value:'5', label:"Sex"},
                                            {value:'6', label:"Sáb"}
                                        ]}
                                    />
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from}
                                        onChange={(e) => { adicionarDiaSemana(index, 'from', e.target.value) }}
                                    />
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to}
                                        onChange={(e) => { adicionarDiaSemana(index, 'to', e.target.value) }}
                                    />
                                </div>
                            );
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherFrom;
import React, { useState, FormEvent } from 'react';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../Services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState();
    const [week_day, setWeekDay] = useState();
    const [time, setTime] = useState();

    async function pesquisarProfessores(e: FormEvent) {
        e.preventDefault();

        const retorno = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(retorno.data);
    }

    return (
        <div id="page-teacher-list" className="container">
           <PageHeader title="Esses são os proffys disponiveis">
               <form id="search-teachers" onSubmit={pesquisarProfessores}>
                    <Select name="subject" label="Matéria"
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            {value:'Artes', label:"Artes"},
                            {value:'Ciencias', label:"Ciencias"},
                            {value:'Matemática', label:"Matemática"}
                        ]}
                    />

                   <Select name="week_day" label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value)}}
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

                   <Input type="time" name="time" label="Hora" value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                    />

                    <button type="submit">
                        Buscar
                    </button>
               </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher}></TeacherItem>
                    })
                }
            </main>
        </div>
    )
}

export default TeacherList;
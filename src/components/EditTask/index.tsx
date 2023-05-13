import { useState, useRef } from 'react'
import * as S from './styles';
import Modal from 'components/Modal';
import { Close } from 'components/Icons';
import TextArea from 'components/TextArea';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from 'services/firebaseConnect';

interface Props {
  onClose(): void,
  isOpen: boolean;
  task: {
    id: string;
    username: string;
    task: string;
    public: boolean;
    created_at: Date;
    updated_at: Date | null;
  };
}
export default function Editask({ isOpen, onClose, task }: Props) {

  const [isPublic, setIsPublic] = useState(task.public)
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const form = formRef.current;

    if (!form) return;

    const taskInput = form.elements.namedItem('task') as HTMLTextAreaElement;

    if (taskInput.value === '') return toast.error("Preencha os campos corretamente!");

    try {
      const task_ref = doc(db, "tasks", task.id);
      await updateDoc(task_ref, {
        task: taskInput.value,
        public: isPublic,
        updated_at: new Date(),
      })
      onClose()
      toast.success("Tarefa editada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Error ao editar tarefa!")
    }

  }

  return (
    <Modal isOpen={isOpen} close={() => onClose}>
      <S.Container>
        <S.Content>
          <S.Header>
            <S.Title>
              Editar tarefa
            </S.Title>
            <S.CloseButton
              onClick={() => onClose()}
            >
              <Close />
            </S.CloseButton>
          </S.Header>
          <S.Body>
            <S.Form ref={formRef} onSubmit={handleSubmit}>
              <TextArea
                style={{ height: '15rem' }}
                defaultValue={task.task}
                name='task'
              />
              <S.InputField>

                <S.Input
                  type='checkbox'
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                <S.Label>Deseja deixar pública?</S.Label>

              </S.InputField>
              <S.Button type="submit"> Editar tarefa</S.Button>
            </S.Form>

          </S.Body>
        </S.Content>
      </S.Container>
    </Modal>
  )
}
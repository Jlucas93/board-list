import { useState, useRef, useContext, useEffect, useCallback } from "react"
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { db } from 'services/firebaseConnect'
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import Head from "next/head"
import Link from 'next/link'
import * as S from 'components/pages/dashboard/styles'
import * as Icons from 'components/Icons'
import TextArea from "components/TextArea"
import Editask from "components/EditTask"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface Iuser {
  user: {
    name: string;
    email: string;
  }
}
interface Itasks {
  id: string;
  username: string;
  task: string;
  public: boolean;
  created_at: Date;
  updated_at: Date | null;
}

export default function Dashboard({ user }: Iuser) {

  const theme = useContext(ThemeContext)
  const formRef = useRef<HTMLFormElement>(null);
  const [tasks, setTasks] = useState<Itasks[]>([])
  const [isPublic, setIsPublic] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [editTask, setEditTask] = useState<Itasks>()

  async function shareTask(id: string) {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const form = formRef.current;

    if (!form) return;

    const taskInput = form.elements.namedItem('task') as HTMLTextAreaElement;

    if (taskInput.value === '') return toast.error("Não é possível criar tarefa em branco!");
    try {
      await addDoc(collection(db, "tasks"), {
        task: taskInput.value,
        user: user?.name,
        public: isPublic,
        created_at: new Date(),
      })
      form.reset()
      setIsPublic(false)
      toast.success("Tarefa publicada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Error ao criar tarefa!")
    }

  }

  const handleEdit = useCallback((task: Itasks) => {
    console.log('dentro do submit', task)
    setEditTask(task)
    setOpenModal(true)
  }, [editTask, openModal])

  async function deleteTask(id: string) {
    const task_ref = doc(db, 'tasks', id)
    try {
      await deleteDoc(task_ref)
      toast.success("Tarefa deleta com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar tarefa");
    }
  }

  useEffect(() => {
    async function getTasks() {

      const database = collection(db, 'tasks')

      const tasks = query(
        database,
        orderBy('created_at', 'desc'),
        where('user', '==', user?.name)
      )
      onSnapshot(tasks, (snap_shot) => {
        const my_tasks = [] as Itasks[];

        snap_shot.forEach((task) => {
          my_tasks.push({
            id: task.id,
            username: task.data().user,
            task: task.data().task,
            public: task.data().public,
            created_at: new Date(task.data().created_at.seconds * 1000),
            updated_at: task.data().updated_at ?
              new Date(task.data().created_at.seconds * 1000) : null,
          })
        })

        setTasks(my_tasks)
      })
    }

    getTasks()
  }, [user?.name])

  return (
    <S.Container>
      <ToastContainer theme={theme.title === 'dark' ? "dark" : "light"} />
      <Head>
        <title>Dashboard</title>
      </Head>
      <S.Main>
        <S.Content>
          <S.ContentForm>
            <S.Title>Qual sua próxima tarefa?</S.Title>
            <S.Form
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <TextArea
                placeholder={"Qual sua próxima tarefa?"}
                name="task"
              />
              <S.InputField>

                <S.Input
                  type='checkbox'
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                <S.Label>Deseja deixar pública?</S.Label>

              </S.InputField>
              <S.Button type="submit"> Cadastrar tarefa</S.Button>
            </S.Form>
          </S.ContentForm>
        </S.Content>

        <S.TaskContainer>
          <S.Title>Minhas tarefas</S.Title>

          {tasks ? tasks.map((task) => (
            <S.Article key={task.id}>
              {task.public
                ?
                <S.TagContainer>
                  <S.Tag>Pública</S.Tag>
                  <S.ShareButton onClick={() => shareTask(task.id)}>
                    <Icons.Share />
                  </S.ShareButton>
                  <S.SubTitle>
                    {task.created_at.toLocaleDateString()}
                  </S.SubTitle>
                </S.TagContainer>
                :
                <S.TagContainer>
                  <S.SubTitle>
                    {task.created_at.toLocaleDateString()}
                  </S.SubTitle>
                </S.TagContainer>
              }
              <S.TaskContent>
                {task.public
                  ?
                  <Link href={`/task/${task.id}`}>
                    <S.Text>{task.task}</S.Text>
                  </Link>
                  :
                  <S.Text>{task.task}</S.Text>
                }
                <S.Actions>
                  <S.DeleteButton onClick={() => deleteTask(task.id)}>
                    <Icons.Trash />
                  </S.DeleteButton>
                  <S.EditButton
                    onClick={() => handleEdit(task)} >
                    <Icons.Pen />
                  </S.EditButton>
                </S.Actions>
              </S.TaskContent>
              {task.updated_at ?
                <S.FadeTitle>
                  Editado em : {task.updated_at.toLocaleDateString()}
                </S.FadeTitle>
                : null}
            </S.Article>
          )) : null}
        </S.TaskContainer>
      </S.Main>

      {editTask ?
        <Editask
          isOpen={openModal}
          task={editTask}
          onClose={() => setOpenModal(false)} />
        : null}

    </S.Container >

  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const sesion = await getSession({ req })
  if (!sesion?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {
      user: {
        name: sesion?.user.name,
        email: sesion?.user.email,
      }
    }
  }
}


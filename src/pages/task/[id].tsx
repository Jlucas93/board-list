import { useRef, useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { useSession } from 'next-auth/react';
import Head from "next/head";
import * as S from 'components/pages/task/styles'
import { GetServerSideProps } from "next";
import { db } from '../../services/firebaseConnect'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc
} from 'firebase/firestore'
import { Trash } from 'components/Icons'
import TextArea from "components/TextArea";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
interface Iprops {

  item: {
    task_id: string;
    task: string;
    user: string;
    public: boolean;
    created_at: Date;
  },
  task_comments: Icomments[]
}

interface Icomments {
  id: string;
  comment: string;
  task_id: string;
  user: string;
  user_name: string;
  created_at: number | Date;
}

export default function Taks({ item, task_comments }: Iprops) {
  const { data: session } = useSession()
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useContext(ThemeContext)
  const [comments, setComments] = useState<Icomments[]>(task_comments || []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const form = formRef.current;

    if (!form) return;

    const comment_input = form.elements.namedItem('comment') as HTMLTextAreaElement;

    if (comment_input.value === '') return toast.error("Comentários em brancos não são permitidos!");
    try {

      const doc_ref = await addDoc(
        collection(db, 'comments'), {
        comment: comment_input.value,
        created_at: new Date(),
        user: session?.user?.email,
        user_name: session?.user?.name,
        task_id: item.task_id,
      })
      const data = {
        id: doc_ref.id,
        comment: comment_input.value,
        task_id: item.task_id,
        user: session?.user?.email || 'user',
        user_name: session?.user?.name || 'user_name',
        created_at: new Date(),
      }

      setComments((prevState) => [...prevState, data]
      )
      form.reset()
      toast.success("Comentário enviado!")
    } catch (error) {
      console.error(error)
      toast.error("Error ao comentar na tarefa!")
    }
  }

  async function deleteTask(id: string) {
    const comment_ref = doc(db, 'comments', id)
    try {
      await deleteDoc(comment_ref)

      setComments(comments.filter((comment) => comment.id !== id))

      toast.success("Comentário deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar comentário");
    }
  }

  return (
    <S.Container>
      <ToastContainer theme={theme.title === 'dark' ? "dark" : "light"} />
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>

      <S.Content>
        <S.TiTle>Tarefa</S.TiTle>
        <S.Article>
          <S.TaskContent>{item.task}</S.TaskContent>
        </S.Article>
      </S.Content>
      <S.Section>
        <S.TiTle>Deixar comentário</S.TiTle>
        <S.Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea
            placeholder={"Deixar um comentário"}
            name="comment"
          />
          <S.Button
            disabled={!session?.user}>
            Enviar Comentário
          </S.Button>
        </S.Form>
      </S.Section>

      <S.Section>
        <S.TiTle>Comentários</S.TiTle>
        {comments.length === 0
          ?
          <S.TiTle>Nenhum comentário</S.TiTle>
          :
          comments.map((comment) => (
            <S.Article key={comment.id}>
              <S.TagContainer>
                <S.Tag>{comment.user_name}</S.Tag>
                <S.SubTitle>
                  {new Date(comment.created_at).toLocaleDateString()}
                </S.SubTitle>
                {comment.user_name === session?.user?.name
                  ?
                  <S.DeleteButton onClick={() => deleteTask(comment.id)}>
                    <Trash />
                  </S.DeleteButton>
                  : null}
              </S.TagContainer>
              <S.CommentContent>{comment.comment}</S.CommentContent>

            </S.Article>
          ))
        }
      </S.Section>
    </S.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const task_id = params?.id as string

  const doc_ref = doc(db, 'tasks', task_id)

  const my_query = query(
    collection(db, 'comments'),
    where("task_id", "==", task_id)
  )
  const comments = await getDocs(my_query)

  const tasks = await getDoc(doc_ref)

  const task = {
    task_id,
    user: tasks.data()?.user,
    task: tasks.data()?.task,
    public: tasks.data()?.public,
    created_at: new Date(tasks.data()?.created_at.seconds * 1000).toLocaleDateString()
  }

  let task_comments: Icomments[] = []

  comments.forEach((comment) => {
    task_comments.push({
      id: comment.id,
      task_id: comment.data().task_id,
      comment: comment.data().comment,
      user: comment.data().user,
      user_name: comment.data().user_name,
      created_at: comment.data()?.created_at.seconds * 1000
    })
  })

  if (!tasks.data()) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  if (!tasks.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      item: task,
      task_comments
    }
  }
}
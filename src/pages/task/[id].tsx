import { useState, useRef, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { useSession } from 'next-auth/react';
import Head from "next/head";
import * as S from './styles'
import { GetServerSideProps } from "next";
import { db } from '../../services/firebaseConnect'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'
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
}

export default function Taks({ item }: Iprops) {
  const { data: session } = useSession()
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useContext(ThemeContext)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const form = formRef.current;

    if (!form) return;

    const comment_input = form.elements.namedItem('comment') as HTMLTextAreaElement;

    if (comment_input.value === '') return toast.error("Comentários em brancos não são permitidos!");
    try {

      const comment_ref = await addDoc(
        collection(db, 'comments'), {
        comment: comment_input.value,
        created_at: new Date(),
        user: session?.user?.email,
        user_name: session?.user?.name,
        task_id: item.task_id,
      })

      form.reset()
      toast.success("Comentário enviado!")
    } catch (error) {
      console.error(error)
      toast.error("Error ao comentar na tarefa!")
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
    </S.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const task_id = params?.id as string

  const doc_ref = doc(db, 'tasks', task_id)

  const sanp_shot = await getDoc(doc_ref)

  const task = {
    task_id,
    user: sanp_shot.data()?.user,
    task: sanp_shot.data()?.task,
    public: sanp_shot.data()?.public,
    created_at: new Date(sanp_shot.data()?.created_at.seconds * 1000).toLocaleDateString()
  }

  if (!sanp_shot.data()) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  if (!sanp_shot.data()?.public) {
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
    }
  }
}
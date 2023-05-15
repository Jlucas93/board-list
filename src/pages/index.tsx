import Image from "next/image"
import Head from "next/head"
import * as S from "components/pages/home/style"
import homeImage from "assests/hero.png"
import { GetStaticProps } from "next"
import { collection, getDocs } from "firebase/firestore"
import { db } from "services/firebaseConnect"

interface Iprops {
  tasks: number;
  comments: number;
}
export default function Home({ tasks, comments }: Iprops) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <S.Container>
        <S.Main>
          <S.Logo>
            <Image
              alt="logo"
              src={homeImage}
              priority
            />
            <S.SubTitle> Sistema para organizar estudo e tarefas</S.SubTitle>
          </S.Logo>
          <S.InfoContent>

            <S.Section>
              <S.Span>
                {tasks} posts
              </S.Span>
            </S.Section>
            <S.Section>
              <S.Span>
                {comments} comentários
              </S.Span>
            </S.Section>
          </S.InfoContent>
        </S.Main>
      </S.Container>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const commentRef = collection(db, 'comments')
  const taskRef = collection(db, 'tasks')

  const comments_spanpShot = await getDocs(commentRef)
  const tasks_spanpShot = await getDocs(taskRef)
  return {
    props: {
      tasks: tasks_spanpShot.size || 0,
      comments: comments_spanpShot.size || 0
    },
    revalidate: 60
  }
}
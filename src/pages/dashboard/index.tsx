import { GetServerSideProps } from "next"
import { useCallback, useState } from "react"
import { getSession } from "next-auth/react"
import Head from "next/head"
import * as S from './styles'
import * as Icons from 'components/Icons'
import TextArea from "components/TextArea"

export default function Dashboard() {
  const [task, setTaks] = useState("")
  const [isPublic, setIsPublic] = useState(false)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaks(event.target.value);
  }, [setTaks]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    if(task === "") return

    
  }
  return (
    <S.Container>

      <Head>
        <title>Dashboard</title>
      </Head>

      <S.Main>

        <S.content>
          <S.ContentForm>

            <S.Title>Qual sua próxima tarefa?</S.Title>
            <S.Form onSubmit={handleSubmit}>
              <TextArea
                placeholder={"Qual sua próxima tarefa?"}
                value={task}
                setValue={handleChange}
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
        </S.content>

        <S.TaskContainer>

          <S.Title>Minhas tarefas</S.Title>

          <S.Article>

            <S.TagContainer>

              <S.Tag>Público</S.Tag>
              <S.ShareButton>
                <Icons.Share />
              </S.ShareButton>
            </S.TagContainer>

            <S.TaskContent>
              <S.Text>Qualquer texto aqui</S.Text>

              <S.trashButton>
                <Icons.Trash />
              </S.trashButton>
            </S.TaskContent>

          </S.Article>
        </S.TaskContainer>

      </S.Main>
    </S.Container>

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
    props: {}
  }
}
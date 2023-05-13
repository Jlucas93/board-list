import Image from "next/image"
import Head from "next/head"
import * as S from "components/pages/home/style"
import homeImage from "assests/hero.png"

export default function Home() {
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
                +12 posts
              </S.Span>
            </S.Section>
            <S.Section>
              <S.Span>
                90 comentatarios
              </S.Span>
            </S.Section>
          </S.InfoContent>
        </S.Main>
      </S.Container>
    </>
  )
}

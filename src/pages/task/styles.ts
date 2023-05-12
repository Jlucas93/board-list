import styled from "styled-components";

export const Article = styled.article`
  border: 1.5px solid #909090;
  border-radius: 4px;
  padding: 1rem;
  line-height: 150%;

  display: flex;
  align-items: center;
  justify-content:center;
  background-color: ${({ theme }) => theme.header};
`

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  border: 0;
  border-radius: .2rem;
  padding: 1rem 0;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 18px;

  &:disabled{
    cursor: not-allowed;
  }
`

export const Container = styled.div`
  width: 100%;
  margin: 40px auto 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Content = styled.main`
  width: 100%;
`
export const ContentForm = styled.div`
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2rem;
  margin-top: 3.5rem;
`

export const Form = styled.form`

`

export const Section = styled.section`
  width: 100%;
  margin: 1rem 0;
`
export const TaskContent = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
`

export const TiTle = styled.h1`
  margin-bottom: 1rem;
`
import styled from "styled-components";

export const Article = styled.article`
  border: 1.5px solid #909090;
  border-radius: 4px;
  padding: 1rem;
  line-height: 150%;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content:center;
  flex-direction: column;
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
export const CommentContent = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
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
export const DeleteButton = styled.button`
  color: ${({ theme }) => theme.colors.secondary};
  background: transparent;
  border:0;
  margin: 0 .5rem;
`

export const Form = styled.form`

`

export const Section = styled.section`
  width: 100%;
  margin: 1rem 0;
`
export const SubTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`
export const TagContainer = styled.div`
  display: flex;
  align-items:center;
  margin-bottom: .5rem;
`
export const Tag = styled.label`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 2px 6px;
  margin-right: 5px;
  border-radius: 4px;
`

export const TaskContent = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
`

export const TiTle = styled.h1`
  margin-bottom: 1rem;
`
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`

export const Main = styled.main`

`

export const content = styled.section`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin: auto;
`
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
`
export const ContentForm = styled.div`
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2rem;
  margin-top: 3.5rem;
`

export const Form = styled.form`

`
export const InputField = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`
export const Input = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 1rem;
`

export const Label = styled.label`
  margin-left: .5rem;
  margin-top: 1rem;
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
`

export const TaskContainer = styled.section`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 2rem auto 0 auto;
  padding: 0 1rem;
`

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom:1rem;
  line-height: 150%;
  border: 1.5px solid #909090;
  border-radius: 4px;
  padding: 1rem;
  width: 80%;
  background-color: ${({ theme }) => theme.header};
`

export const TagContainer = styled.div`
  display: flex;
  align-items:center;
  margin-bottom: .5rem;
`
export const Tag = styled.label`
  padding: 2px 6px;
  border-radius: 4px;
`

export const ShareButton = styled.button`
  background: transparent;
  border:0;
  margin: 0 .5rem;
  color: ${({ theme }) => theme.text};
`
export const TaskContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
`

export const Text = styled.p`
  white-space: pre-wrap;
`

export const trashButton = styled.button`
  color: ${({ theme }) => theme.text};
  background: transparent;
  border:0;
  margin: 0 .5rem;
`
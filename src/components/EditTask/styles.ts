import styled from "styled-components";

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
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

export const CloseButton = styled.button`
  background-color: transparent;
  color:  ${({ theme }) => theme.text};
  outline: none;
  border: none;
  padding: 1rem;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const Content = styled.div`
  width: 70%;
  height: 80vh;
  background-color: ${({ theme }) => theme.header};
  border-radius: 8px;
`
export const Form = styled.form`
  width: 80%;
`

export const Header = styled.div`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem .8rem;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text};
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


export const Title = styled.h2`
  color: ${({ theme }) => theme.text};
`
import * as S from './styles'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea: React.FC<Props> = ({ ...rest }) => {
  return (
    <S.TextArea
      {...rest}
    />
  )
}

export default TextArea;

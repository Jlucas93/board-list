import * as S from './styles'

interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  value: string;
  setValue(event: React.ChangeEvent<HTMLTextAreaElement>): void;
}

const TextArea: React.FC<TextAreaProps> = ({ placeholder, rows, value, setValue }) => {
  return (
    <S.TextArea
      value={value}
      onChange={setValue}
      rows={rows}
      placeholder={placeholder} />
  )
}

export default TextArea;

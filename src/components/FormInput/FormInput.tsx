import './FormInput.scss';

interface Props {
  name: string;
  inputName?: string;
  placeholder?: string;
}

export function FormInput({ name, inputName = "", placeholder = "" }: Props) {
  return (
    <>
      <label className='form-input__title'>{inputName}</label>
      <input name={name} className='form-input__field' type="text" placeholder={placeholder} />
    </>
  );
}

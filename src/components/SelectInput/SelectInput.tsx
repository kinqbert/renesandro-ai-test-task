interface Props {
  name: string;
  options: unknown[];
}

export function SelectInput({ name }) {
  return (
    <>
      <label className='form-input__title'>{name}</label>
      <select name="name" id=""></select>
    </>
  );
}
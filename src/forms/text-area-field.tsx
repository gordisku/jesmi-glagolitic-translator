import classNames from "classnames"
import { UseFormRegister, } from "react-hook-form"

interface TextAreaProps {
  register: UseFormRegister<any>,
  name: string,
  label: string,
}

export const TextAreaField = ({ register, name, label }: TextAreaProps) => {

  const textAreaClasses = classNames('textarea', {  })
  
  return (
    <>
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <textarea cols={30} rows={10} 
            className={textAreaClasses} {...register(name)}></textarea>
        </div>
      </div>
    </>
  )
}

export default TextAreaField
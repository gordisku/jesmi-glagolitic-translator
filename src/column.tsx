import classNames from "classnames"

interface ColumnProps {
  children?: React.ReactNode,
  narrow?: boolean,
  size?: number,
  box?: boolean,
}

const Column = ({ children, narrow, size, box }: ColumnProps) => {

  const sizeClass = `is-${size}`
  
  const columnClasses = classNames('column', 
    { 'is-narrow': narrow, [sizeClass]: size, 'box': box },
  )

  return (
    <>
      <div className={columnClasses}>
        {children}
      </div>
    </>
  )
}

export default Column
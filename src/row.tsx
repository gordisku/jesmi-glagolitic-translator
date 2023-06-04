import classNames from "classnames"
import React from "react"

interface RowProps {
  children?: React.ReactNode,
  centered?: boolean,
}

const Row = ({ children, centered = false }: RowProps) => {

  const rowClasses = classNames('columns', {'is-centered': centered})

  return (
    <>
      <div className={rowClasses}>
        {children}
      </div>
    </>
  )
}

export default Row
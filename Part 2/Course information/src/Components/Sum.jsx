import Part from "./Part"

const Sum = ({ parts }) => {
  const total = parts.reduce((acc, curr) => curr.exercises + acc, 0)

  return (
    <p><h3>
        Total of {total} exercises
        </h3>
        </p>
  )
}

export default Sum


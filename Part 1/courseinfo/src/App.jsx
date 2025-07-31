import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
    return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts ={course.parts} />
    </div>
  )
}

export default App


// old practicessss!!!!!!

// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14

//   const Header=(props) =>{
//     return(
//       <>
//       <h1>{props.course}</h1>
//       </>
//     )
//   }

//   const Content = (props) =>{
//     return(
//       <>
//       <p>{props.pt} {props.ex}</p>
//       </>
//     )
//   } 

//   const Total =(props)=>{
//     return(
//       <>
//     <p>{props.ttl} {props.totl}</p>
//     </>
//     )
//   }

//   return (
//     <>
//       {/* <h1>{course}</h1>
//       <p>
//         {part1} {exercises1}
//       </p>
//       <p>
//         {part2} {exercises2}
//       </p>
//       <p>
//         {part3} {exercises3}
//       </p>
//       <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
//       <Header course= {course}/>
//       <Content pt ={part1} ex={exercises1} />
//       <Content pt ={part2} ex={exercises2} />
//       <Content pt ={part3} ex={exercises3} />
//       <Total ttl='Number of exercise' totl={exercises1+exercises3+exercises3} />
//     </>
//   )
// }

// export default App



  // const Header = ({course}) => {
  //   console.log(course)
  //   return (
  //     <>
  //       <h1>{course}</h1>
  //     </>
  //   )
  // }

  // const Content = ({parts}) => {
  //   console.log(parts)
  //   return (
  //     <>
  //       <Part part={parts[0]} />
  //       <Part part={parts[1]} />
  //       <Part part={parts[2]} />
  //     </>
  //   )
  // }

  // const Part = ({part}) => {
  //   console.log(part)
  //   return (
  //     <p>{part.name} {part.exercises}</p>
  //   )
  // }

  // const Total = ({parts}) => {
  //   console.log(parts)
  //   return (
  //     <p> Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises} </p>
  //   )
  // }


import '../pages/Main.scss'

const Loading = ({ center }) => {
    return <tr><td><div className={center ? 'loading loading-center' : 'loading'}></div></td></tr>
  }
  
  export default Loading
  
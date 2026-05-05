import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Studentlist from './Studentlist'

function App() {
  const [count, setCount] = useState(0)

  const students = [
    {name:'Aditya',age: 22, course: 'MERN'},
    {name:'Shri',age: 22, course: 'GenAI'},
    {name:'sarthak',age: 22, course: 'CyberSecurity'},
    {name:'pradeep',age: 22, course: 'DataScience'},
    {name:'Omkar',age: 22, course: 'MachineLearning'},
    {name:'Aman',age: 22, course: 'CloudComputing'},
    {name:'Suyog',age: 22, course: 'AI'},
    
  ];

  const showMessage = () => {
    alert("Button Clicked!");
  };
  return (
    <>
    <h1>Student List  </h1>
    <button onClick={showMessage}>Click Me</button>
    <Studentlist students={students} />
    </>
  );
}

export default App

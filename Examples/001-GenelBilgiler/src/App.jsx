import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// First App
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// JSX Example - 1 
// function App() {
//   let names = ["xxx", "yyy", "zzz"];

//   return (
//     <div>
//       {
//         names.map((name, index) => (
//           <div key={index}> {name} </div>
//         ))
//       }    
//     </div>
//   )
// }

// JSX Example - 2
function App() {
  const MyInformation = {
    name: "Enes",
    surname: "Akkaya",
    mail: "enes@abc.com",
    city: "İstanbul",
  };

  return (
    <>
      <h2>
        {MyInformation.name}, {MyInformation.surname}
      </h2>
      <p>Mail Adresi: {MyInformation.mail}</p>
      <p>Şehir: {MyInformation.city}</p>
    </>
  );
}

export default App

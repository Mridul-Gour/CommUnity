import React from 'react'
import { useState } from 'react'
import '../components/Apartmentt.css'

const Apartmentt = () => {
    const [isBlockA, setIsBlockA] = useState(true);
  return (
    <div className='mainn'>
        <div className='btnn'>
            <button className={isBlockA ? 'active' : ""} onClick={ () => setIsBlockA(true)}>Block A</button>
            <button className={!isBlockA ? 'active' : ""} onClick={()=> setIsBlockA(false)}>Block B</button>
        </div>
        {isBlockA ? <>
            <div className='blocks'> 
            <div className='Ablock'>
                Pavani <br />
                Block -A<br />
                A234 <br />
                97325475917<br />
                pavani@gmail.com <br />

            </div>
            <div className='Bblock'>
                Nihal Varma  <br />
                Block -A<br />
                A234 <br />
                97325475917<br />
                nihal@gmail.com <br />

            </div>
        </div> </>: <>
        <div className='blocks'> 
            <div className='Ablock'>
                Sowmya <br />
                Block -B<br />
                A234 <br />
                97325475917<br />
                sowmya@gmail.com <br />

            </div>
            <div className='Bblock'>
                Rakshith <br />
                Block -B<br />
                A234 <br />
                97325475917<br />
                rak@gmail.com <br />

            </div>
        </div> </>}
    </div>
  )
}

export default Apartmentt
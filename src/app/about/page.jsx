import Image from 'next/image';
import '@/app/ui/globals.css';

export default function About() {
    return (
      <main>
        <div className='flex gap-4 items-center'>
          <h1 className='pt-3 pb-3'>ABOUT ME AND THE PROJECT</h1>
        </div>
        <hr className='pb-1 pd-1'/>
        <div className='flex gap-10 items-center'>
            <Image className='rounded-lg' src={"/pixelartdp.png"} alt='display picture' sizes="100vw" style={{width: '25%', height: '25%'}} width='100' height='100'/>  
            <div>
                <h2 className='pt-3 pb-3'>ABOUT ME</h2>
                <p className='pb-3 max-w-prose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptates, earum animi 
                    voluptatem atque ut et ex alias, quis optio, aliquam culpa placeat molestiae! 
                    Cumque quasi voluptatem enim soluta facere.</p>
                <p className='pb-3 max-w-prose'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, voluptas iusto!
                     Nostrum, perferendis asperiores a autem debitis totam harum consectetur beatae, deleniti 
                     ullam tempora impedit fuga qui aspernatur cumque eaque!</p>
                 <h2 className='pt-3 pb-3'>ABOUT THIS PROJECT</h2>
                <p className='pb-3 max-w-prose'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore rerum ipsa nisi incidunt 
                tempora velit quam nulla sit eveniet molestiae eaque dolorem unde assumenda cum modi, numquam natus et facere.</p>
            </div>
        </div>
      </main>
    );
  }
  
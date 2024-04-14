import React from 'react';
import Stories from 'stories-react';
import 'stories-react/dist/index.css';



function ComponentWithInteractions() {
  return (
    <div
      className="w-full h-full"
     
    >
     
    
        <img src="https://images.pexels.com/photos/10955653/pexels-photo-10955653.jpeg?dpr=2&w=100" className='w-full h-full object-contain'/>
   
    
      
    </div>
  );
}



export default function ComponentStories() {
  const stories = [
    {
      type: 'component',
      duration: 9000,
      component: ComponentWithInteractions,
    
    },
    {
      type: 'component',
      duration: 900000,
      component: ComponentWithInteractions,
    
    },
    {
      duration: 9000,
      type: 'component',
      component: ComponentWithInteractions,
     
    },
    {
      type: 'component',
      duration: 9000,
      component: ComponentWithInteractions,
      
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '16px',
      }}
    >
      <Stories 
      width="400px" 
      height="600px" 
      stories={stories} 
      onStoryChange={(i)=>console.log(i)} 
      onAllStoriesEnd={()=>console.log('ses')}
      pauseStoryWhenInActiveWindow/>
     
    </div>
  );
}
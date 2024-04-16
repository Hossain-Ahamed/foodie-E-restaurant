import React from 'react';
import Stories from 'stories-react';
import 'stories-react/dist/index.css';



function ComponentWithInteractions({img}) {
  return (
    <div
      className="w-full h-full"
     
    >
     
    
        <img src={img} className='w-full h-full object-contain'/>
   
    
      
    </div>
  );
}



export default function ComponentStories({imgList}) {
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
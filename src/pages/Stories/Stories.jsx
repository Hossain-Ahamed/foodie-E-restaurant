import React from 'react';
import 'stories-react/dist/index.css';
import Stories from 'react-insta-stories';


function ComponentWithInteractions({img}) {
  return (
    <div
      className="w-full h-full"
     
    >
     
    
        <img src={img} className='w-full h-full object-contain'/>
   
    
      
    </div>
  );
}



export default function ComponentStories({imgList, onOpenChange}) {
  // const stories = [
  //   {
  //     type: 'component',
  //     duration: 9000,
  //     component: ComponentWithInteractions,
    
  //   },
  //   {
  //     type: 'component',
  //     duration: 900000,
  //     component: ComponentWithInteractions,
    
  //   },
  //   {
  //     duration: 9000,
  //     type: 'component',
  //     component: ComponentWithInteractions,
     
  //   },
  //   {
  //     type: 'component',
  //     duration: 9000,
  //     component: ComponentWithInteractions,
      
  //   },
  // ];
  const stories = [
    
    {
      url: 'https://images.unsplash.com/photo-1711987893415-0be6d8472460?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
      duration: 5000,
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 30m ago',
        profileImage: 'https://picsum.photos/100/100',
      },
    },
    {
      url: 'https://miro.medium.com/v2/resize:fit:1080/1*EPK0-nt5qMnZS-hBFjyD0Q.jpeg',
      duration: 5000,
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 30m ago',
        profileImage: 'https://picsum.photos/100/100',
      },
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
      width="100%"
      height="100vh"
      stories={imgList} 
      onStoryChange={(i)=>console.log(i)} 
      onAllStoriesEnd={()=>onOpenChange()}
      pauseStoryWhenInActiveWindow/>
     
    </div>
  );
}
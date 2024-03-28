import React from 'react'

import { Reels } from '@sayings/react-reels'
import '@sayings/react-reels/dist/index.css'

const reels = [
  {
    id: 1,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/trijit.svg?mood[]=happy&background=%23efefef',
        name: 'Trijit Goswami'
      },
      likes: {
        count: 0
      },
      dislikes: {
        count: 124
      },
      
    },
   
  },
  {
    id: 2,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/sourav.svg?mood[]=happy&background=%23efefef',
        name: 'Sourav Halder'
      },
      likes: {
        count: 559878
      },
      dislikes: {
        count: 12
      },
    
    },
    
    
  },
  {
    id: 3,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/sanjib.svg?mood[]=happy&background=%23efefef',
        name: 'Sanjib Kumar Mandal'
      },
      likes: {
        count: 123
      },
      dislikes: {
        count: 0
      },
      
    },
   
  },

  
]

const reelMetaInfo = {
  videoDimensions: {
    height: 580,
    width: 330,
  },
  backGroundColor: '#000000',
  borderRadius: 10
}

const Shorts = () => {
  return (
    <Reels
      reels={reels}
      reelMetaInfo={reelMetaInfo}
      onMenuItemClicked={(event) => console.log("onMenuItemClicked", event)}
      onLikeClicked={(reel) => console.log("onLikeClicked", reel)}
      onDislikeClicked={(reel) => console.log("onDislikeClicked", reel)}
      onCommentClicked={(reel) => console.log("onCommentClicked", reel)}
      onShareClicked={(reel) => console.log("onShareClicked", reel)}
      onAvatarClicked={(reel) => console.log("onAvatarClicked", reel)}
      onScrollEnd ={(reel)=>console.log('onScrollEnd')}
    />
  )
}

export default Shorts
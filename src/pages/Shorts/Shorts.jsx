import React from 'react'

import { Reels } from '@sayings/react-reels'
import '@sayings/react-reels/dist/index.css'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from 'react-query'
import LoadingPage from '../Shared/LoadingPages/LoadingPage/LoadingPage'
import ErrorPage from '../Shared/ErrorPage/ErrorPage'

// const reels = [
//   {
//     id: 1,
//     reelInfo: {
//       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//       type: 'video/mp4',
//       description: 'Lorem ipsum dolor sit amet?',
//       postedBy: {
//         avatar: 'https://avatars.dicebear.com/api/big-smile/trijit.svg?mood[]=happy&background=%23efefef',
//         name: 'Trijit Goswami'
//       },
//       likes: {
//         count: 759878
//       },
//       dislikes: {
//         count: 124
//       },
//       comments: {
//         count: 10089.345
//       },
//       shares: {
//         count: 299792458
//       }
//     },
//     rightMenu: {
//       options: [
//         {
//           id: 1,
//           label: 'Option 1',
//           value: 'option-1'
//         },
//         {
//           id: 2,
//           label: 'Option 2',
//           value: 'option-2'
//         },
//         {
//           id: 3,
//           label: 'Option 3',
//           value: 'option-3'
//         }
//       ]
//     }
//   },
//   {
//     id: 2,
//     reelInfo: {
//       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//       type: 'video/mp4',
//       description: 'Lorem ipsum dolor sit amet?',
//       postedBy: {
//         avatar: 'https://avatars.dicebear.com/api/big-smile/sourav.svg?mood[]=happy&background=%23efefef',
//         name: 'Sourav Halder'
//       },
//       likes: {
//         count: 559878
//       },
//       dislikes: {
//         count: 12
//       },
//       comments: {
//         count: 10089.345
//       },
//       shares: {
//         count: 299792458
//       }
//     },
//     rightMenu: {
//       options: [
//         {
//           id: 1,
//           label: 'Option 1',
//           value: 'option-1'
//         },
//         {
//           id: 2,
//           label: 'Option 2',
//           value: 'option-2'
//         },
//         {
//           id: 3,
//           label: 'Option 3',
//           value: 'option-3'
//         }
//       ]
//     }
//   },
//   {
//     id: 3,
//     reelInfo: {
//       url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//       type: 'video/mp4',
//       description: 'Lorem ipsum dolor sit amet?',
//       postedBy: {
//         avatar: 'https://avatars.dicebear.com/api/big-smile/sanjib.svg?mood[]=happy&background=%23efefef',
//         name: 'Sanjib Kumar Mandal'
//       },
//       likes: {
//         count: 123
//       },
//       dislikes: {
//         count: 0
//       },
//       comments: {
//         count: 14
//       },
//       shares: {
//         count: 0
//       }
//     },
//     rightMenu: {
//       options: [
//         {
//           id: 1,
//           label: 'Option 1',
//           value: 'option-1'
//         },
//         {
//           id: 2,
//           label: 'Option 2',
//           value: 'option-2'
//         },
//         {
//           id: 3,
//           label: 'Option 3',
//           value: 'option-3'
//         }
//       ]
//     }
//   },


// ]

const reelMetaInfo = {
  videoDimensions: {
    height: 580,
    width: 330,
  },
  backGroundColor: '#fff',
  borderRadius: 10,
}



const Shorts = () => {
  const axiosSecure = useAxiosSecure()
  const { isLoading, error, data: data = [], refetch } = useQuery({
    queryKey: ['table-card'],
    cacheTime: 0,
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant/all-restaurant-reels`);
      console.log(res.data)
      return res.data;


    }
  })
  const handleReelLike = ({ id }) => {
    axiosSecure.get(`/restaurant/update-like-count/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const handleReelDisLike = ({ id }) => {
    axiosSecure.get(`/restaurant/update-dislike-count/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  if (isLoading) {
    return <LoadingPage />
  }
  if (error) {
    return <ErrorPage />
  }
  return (
    <div className=''>
      <Reels
        reels={data}
        reelMetaInfo={reelMetaInfo}
        onMenuItemClicked={(event) => console.log("onMenuItemClicked", event)}
        onLikeClicked={(reel) => handleReelLike(reel)}
        onDislikeClicked={(reel) => handleReelDisLike(reel)}
        onCommentClicked={(reel) => console.log("onCommentClicked", reel)}
        onShareClicked={(reel) => console.log("onShareClicked", reel)}
        onAvatarClicked={(reel) => console.log("onAvatarClicked", reel)}
        onScrollEnd={(reel) => console.log('onScrollEnd')}
      />
    </div>
  )
}

export default Shorts
import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (
        <>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 2500,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </>
    );
};

export default ToasterProvider;

// toast('Hello World', {
//     duration: 4000,
//     position: 'bottom-center',
  
//     // Styling
//     style: {},
//     className: '',
  
//     // Custom Icon
//     icon: '👏',
  
//     // Change colors of success/error/loading icon
//     iconTheme: {
//       primary: '#000',
//       secondary: '#fff',
//     },
  
//     // Aria
//     ariaProps: {
//       role: 'status',
//       'aria-live': 'polite',
//     },
//   });
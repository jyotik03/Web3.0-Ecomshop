// const key = process.env.NEXT_PUBLIC_PINATA_KEY
// const secret = process.env.NEXT_PUBLIC_PINATA_SECRET

// const axios = require('axios')
// const FormData = require('form-data')

// export const uploadJSONToIPFS = async(JSONBody) => {

//   const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

//   return axios
//     .post(url, JSONBody, {
//       Headers: {
//         pinata_api_key: key,
//         pinata_secret_api_key: secret,
//       }
//     })
//     .then((response) => {
//       return {
//         success: true,
//         pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       return {
//         success: false,
//         message: error.message,
//       }
//     })
// }

// export const uploadFileToIPFS = async(file) => {

//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

//   let data = new FormData()
//   data.append('file', file)

//   const metadata = JSON.stringify({
//     name: 'testname',
//     keyvalues: {
//       exampleKey: 'exampleValue'
//     }
//   })
//   data.append('pinataMetadata', metadata)

//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//     customPinPolicy: (
//       regions: [
//         {
//           id: 'FRA1',
//           desiredReplicationCount: 1
//         },
//         {
//           id: 'NYC1',
//           desiredReplicationCount: 2
//         }
//       ]
//     )
//   });

//   data.append('pinataOptions', pinataOptions)

//   return axios
//     .post(url, data, {
//       maxBodyLength: 'Infinity',
//       headers: {
//         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//         pinata_api_key: key,
//         pinata_secret_api_key: secret,
//       }
//     })
//     .then((response) => {
//       console.log("image uplodad", response.data.IpfsHash)
//       return {
//         success: true,
//         pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       return {
//         success: false,
//         message: error.message,
//       }
//     })
// }




// require('dotenv').config();
const key = "56a427cd0a68d0985294"
const secret = "d9a42dffc18dc53f01a4a96d8fc49340bd565bc862ccc09ea1ee45452e654b66"

const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONToIPFS = async(JSONBody: {
        title: string; desc: string; price: number; stock: number; img: string; //           id: 'FRA1',
        image: string;
    }) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response: { data: { IpfsHash: string; }; }) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error: { message: any; }) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file: any) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response: { data: { IpfsHash: string; }; }) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error: { message: any; }) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};
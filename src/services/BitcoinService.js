import axios from 'axios';

function getRate(coins){
    return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    .then(function (res) {
        return res;
    })
    .catch(err => {
        console.log('err!!!', err);
    })
}

export default {
    getRate
  };

   
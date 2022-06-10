<template>
  <div class="">
    <div class="">
      <h1 class=" text-5xl font-mono font-bold ">CoinMarket</h1>

      <div>
      <input class="form-control text-light my-7 text-center rounded-md" type="date" v-model="date" />
      <button class="mx-4 px-4 py-1 text-sm font-semibold rounded-md border-2 text-white  hover:bg-white hover:text-gray-600 bg-amber-500" 
      type="submit" v-on:click="searchDate(date)">
        Pesquisar
        </button>
      </div>

      <div class="w-full justify-center flex">  
        <div class="overflow-x-auto rounded-sm sm:rounded-lg">
          <table class="text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                      Icon
                    </th>
                    <th scope="col" class="px-6 py-3">
                       Moeda
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Preço
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Simbolo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Mudança Preço em 24h
                    </th>
                </tr>
            </thead>
            <tbody class="">
                <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                   <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                       <img :src="coins.image" :alt='coins.name' style="width: 2rem" class="me-2" />
                      </th>
                   <th scope="row" class="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                       {{coins.name}}
                    </th>
                    <td class="px-6 py-4 text-green-600">
                       {{coinFormated}}
                    </td>
                    <td class="px-6 py-4">
                       {{simbolo}}
                    </td>
                   <td class="px-6 py-4">
                     <span 
                     :class="[changed24h > 0
                    ? 'text-green-600'
                    : 'text-red-600',
                ]"> 
                       {{changed24h}}
                     </span>
                     
                  </td>
                </tr>         
            </tbody>
         </table>
        </div>
      </div>
      <br>
      <br>
     <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
     <div class="w-full justify-center flex"> 
       <div class="relative overflow-x-auto sm:rounded-lg ">
         <table class="text-sm text-left text-gray-500 dark:text-gray-400">
           <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" class="px-6 py-3">
                     Icon
                   </th>
                   <th scope="col" class="px-6 py-3">
                      Moeda
                   </th>
                   <th scope="col" class="px-6 py-3">
                       Simbolo
                   </th>
                   <th scope="col" class="px-6 py-3">
                       Preço em: {{dateAtualizada}}
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <img :src="bitImage.thumb" :alt="bitInfos.name" style="width: 2rem" class="me-2" />
                     </th>
                  <th scope="row" class="px-6 py-4 font-medium  dark:text-white whitespace-nowrap">
                        {{bitInfos.name}}
                   </th>
                   <td class="px-6 py-4">
                      {{simboloBit}}
                   </td>
                   <td class="px-6 py-4">
                     <span
                     :class="[formated > coinFormated
                       ? 'text-green-600'
                       : 'text-red-600',
                    ]"> 
                     {{formated}} 
                     </span>
                   </td>
               </tr>         
           </tbody>
        </table>
       </div>
     </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import API from '../services/API';

export default {
  name: "Home",
  data() {
    return {
      coins: [],
      history: [],
      bitInfos: [],
      bitImage: [],
      dateAtualizada: "",
      date: "",
      simbolo: null,
      simboloBit: null,
      teste:[],
      formated: null,
      coinFormated: null,
      changed24h: null,
      timerUpdate: "",
    };
  },


 mounted (){
    this.getBitcoin();
    this.timerUpdate = setInterval(this.getBitcoin, 120000);

  },


 methods: {
      getBitcoin(){
        API.get('').then((response) => (
        this.coins = response.data[0],
        this.coinFormated = this.coins.current_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        console.log(this.coins),
        this.changed24h = this.coins.price_change_24h.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}),
        this.simbolo = this.coins.symbol.toUpperCase()
        ))

      },
      searchDate(date){
      date = date.split('-').reverse().join('-'),
      this.dateAtualizada = date,
      axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${date}`)
      .then((response) => (
        this.bitInfos = response.data,
        this.bitImage = response.data.image,
        this.history = response.data.market_data,
        console.log(this.history),
        this.teste = response.data.market_data.current_price,
        console.log(this.teste),
        this.formated = this.teste.brl.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        this.simboloBit = this.coins.symbol.toUpperCase()
        ))
        
      },
       cancelAutoRefresh() {  
      clearInterval(this.timerUpdate);  
    },  

      beforeDestroy() {  
       this.cancelAutoRefresh();  
    },  
  }
  

};

</script>
<script lang="ts" setup>
import { hotels } from '../dataHotels'
import type IHotelsFiltering from './interfaces/IHotelsFiltering'
import type IDate from './interfaces/IDate'
import { type Ref, ref } from 'vue';
let reward: Ref = ref(false);
const totals: number[] = [];
let date: Ref<IDate> = ref({
    day: new Date()
})
let dates: Ref<Array<IDate>> = ref([])
let hotelsFiltering: Ref<Array<IHotelsFiltering>> = ref([])
const addDate = () => {
    dates.value.push({
        day: date.value.day
    })
    date.value.day = new Date()
    getCheapestHotel()
}
const calculateTotalPriceLakewood = () => {
    let sum = ref(0);
    const result = hotels.filter((obj) => {
        return obj.id === 1;
    });

    dates.value.forEach((d) => {
        const day = new Date(d.day)
        if (day.getDay() >= 5 && reward.value) {
            sum.value = result[0].weekendPrice.rewardsCostumer + sum.value

        } else if (day.getDay() >= 5 && !reward.value) {
            sum.value = result[0].weekendPrice.regularCostumer + sum.value

        } else if (day.getDay() < 5 && reward.value) {
            sum.value = result[0].weekdayPrice.rewardsCostumer + sum.value

        } else {
            sum.value = result[0].weekdayPrice.regularCostumer + sum.value

        }

    })
    totals[0] = sum.value


}
const calculateTotalPriceBridgewood = () => {
    let sum = ref(0);
    const result = hotels.filter((obj) => {
        return obj.id === 2;
    });

    dates.value.forEach((d) => {
        const day = new Date(d.day)
        if (day.getDay() >= 5 && reward.value) {
            sum.value = result[0].weekendPrice.rewardsCostumer + sum.value

        } else if (day.getDay() >= 5 && !reward.value) {
            sum.value = result[0].weekendPrice.regularCostumer + sum.value

        } else if (day.getDay() < 5 && reward.value) {
            sum.value = result[0].weekdayPrice.rewardsCostumer + sum.value

        } else {
            sum.value = result[0].weekdayPrice.regularCostumer + sum.value

        }

    })
    totals[1] = sum.value
}
const calculateTotalPriceRidgewood = () => {
    let sum = ref(0);
    const result = hotels.filter((obj) => {
        return obj.id === 3;
    });

    dates.value.forEach((d) => {
        const day = new Date(d.day)
        if (day.getDay() >= 5 && reward.value) {
            sum.value = result[0].weekendPrice.rewardsCostumer + sum.value

        } else if (day.getDay() >= 5 && !reward.value) {
            sum.value = result[0].weekendPrice.regularCostumer + sum.value

        } else if (day.getDay() < 5 && reward.value) {
            sum.value = result[0].weekdayPrice.rewardsCostumer + sum.value

        } else {
            sum.value = result[0].weekdayPrice.regularCostumer + sum.value

        }

    })
    totals[2] = sum.value
}
const getCheapestHotel = () => {
    hotelsFiltering.value.length = 0;
    calculateTotalPriceLakewood();
    calculateTotalPriceBridgewood();
    calculateTotalPriceRidgewood();
    const tie: number[] = [];
    let min = totals[0];
    let minIndex = 0;
    for (let i = 0; i < totals.length; i++) {

        if (totals[i] <= min) {
            minIndex = i
            tie.push(i + 1);
        }

    }
    if (tie.length > 1) {
        const result = hotels.filter((obj) => {
            return obj.id === tie[0] || obj.id == tie[1] || obj.id == tie[2];
        });
        let maxRating = result[0]
        let max = 0;
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if (element.rating > maxRating.rating) {
                max = element.rating
            }
        }
        const res = result.filter((obj) => {
            return obj.rating === max;
        });
        hotelsFiltering.value.push({
            id: res[0].id,
            name: res[0].name,
            picture: res[0].picture,
            rating: res[0].rating,
            stars: res[0].stars,
            weekdayPrice: {
                regularCostumer: res[0].weekdayPrice.regularCostumer,
                rewardsCostumer: res[0].weekdayPrice.rewardsCostumer
            },
            weekendPrice: {
                regularCostumer: res[0].weekendPrice.regularCostumer,
                rewardsCostumer: res[0].weekendPrice.rewardsCostumer
            }
        })
        return hotelsFiltering.value[0].id
    } else {
        const result = hotels.filter((obj) => {
            return obj.id === minIndex + 1;
        });
        hotelsFiltering.value.push({
            id: result[0].id,
            name: result[0].name,
            picture: result[0].picture,
            rating: result[0].rating,
            stars: result[0].stars,
            weekdayPrice: {
                regularCostumer: result[0].weekdayPrice.regularCostumer,
                rewardsCostumer: result[0].weekdayPrice.rewardsCostumer
            },
            weekendPrice: {
                regularCostumer: result[0].weekendPrice.regularCostumer,
                rewardsCostumer: result[0].weekendPrice.rewardsCostumer
            }
        })
        return hotelsFiltering.value[0].id
    }
}

</script>
<template>
    <body>
        <nav>
            <div class="nav-container">
                <div class="toggle">
                    <label id="type-costumer" class="lbl-regular">Tipo de cliente:</label><br><br>
                    <label v-bind:class="{
                        'selected': !reward
                    }" class="lbl-regular">Cliente Regular</label>
                    <label class="switch">
                        <input type="checkbox" v-model="reward">
                        <span class="slider round"></span>
                    </label>
                    <label v-bind:class="{
                        'selected': reward
                    }" class="lbl-regular">Cliente recompensa</label>
                </div>
                <div class="date">
                    <label id="reserve-dates" class="lbl-regular">Fechas a reservar:</label><br><br>
                    <input class="select-date" type="date" v-model="date.day" />
                    <button @click="addDate" icon="fa-solid fa-plus" beat size="sm">
                        +
                    </button>

                </div>
            </div>
        </nav>
        <main id="main" tabindex="-1" class="cards">
            <div id="hotels" class="hotel-grid" v-show="hotelsFiltering.length == 0" v-for="hotel in hotels"
                :key="hotel.id">
                <div id="item-0">
                    <h2>{{ hotel.name }}</h2>
                    <img :src="hotel.picture" alt="" />
                </div>
                <div id="item-1">
                    <p id="stars"> {{ hotel.stars }}</p>
                    <h3>Precios</h3> 
                    <p>Precio cliente regular Fin de Semana: ${{ hotel.weekendPrice.regularCostumer }}</p>
                    <p>Precio cliente regular Lunes a Viernes: ${{ hotel.weekdayPrice.regularCostumer }}</p>
                    <p>Precio cliente recompensa Lunes a Viernes: ${{ hotel.weekdayPrice.rewardsCostumer }}</p>
                    <p>Precio cliente recompensa Fines de Semana: ${{ hotel.weekendPrice.rewardsCostumer }}</p>
                </div>
            </div>
            <div id="hotelsFiltering" class="hotel-grid" v-show="hotelsFiltering.length != 0"
                v-for="hotel in hotelsFiltering" :key="hotel.id">
                <div id="item-0">
                    <h2>{{ hotel.name }}</h2>
                    <img :src="hotel.picture" alt="" />
                </div>
                <div id="item-1">
                    <p id="stars"> {{ hotel.stars }}</p>
                    <h3>Precios</h3> 
                    <p>Precio cliente regular Fin de Semana: ${{ hotel.weekendPrice.regularCostumer }}</p>
                    <p>Precio cliente regular Lunes a Viernes: ${{ hotel.weekdayPrice.regularCostumer }}</p>
                    <p>Precio cliente recompensa Lunes a Viernes: ${{ hotel.weekdayPrice.rewardsCostumer }}</p>
                    <p>Precio cliente recompensa Fines de Semana: ${{ hotel.weekendPrice.rewardsCostumer }}</p>
                </div>
            </div>
        </main>

    </body>
</template>

<style lang="scss" scoped>
$main-color :#2196F3;
$secondary-color : #233042;

#type-costumer {
    color: $secondary-color;
}

h2 {
    color: $main-color;
    font-weight: bolder;
    font-size: 1.5em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}

#stars {
    text-align: right;
}

nav {
    color: $secondary-color;
    background-color: beige;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 90em
}

nav .toggle {
    color: $secondary-color;
    font-size: 1rem;
}

nav .date {
    margin-right: 200px;
}

.cards {
    margin-top: 150px;
    align-items: center;
}

main {
    padding: 1rem;
    display: block;
}

.lbl-regular {
    padding: 10px;
}

button {
    width: 25px;
    height: 25px;
    text-align: start;
    color: #FFF;
    background-color: $main-color;
    font-size: 1rem;
    box-shadow: 2px 2px 10px $secondary-color;
    border-radius: 4px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: $main-color;
}

input:focus+.slider {
    box-shadow: 0 0 1px $main-color;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.row-container {
    text-align: center;
    border-radius: 15px;
    padding: 10px;
    margin: 4px;
    border: 1px solid $main-color;
}



.select-date {
    background-color: $main-color;
    padding: 5px;
    margin: 5px;
    top: 50%;
    left: 50%;
    color: azure;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 5px;
}

.selected {
    color: $main-color;
}

.hotel-grid {
    display: grid;

    grid-template-rows: 13fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    gap: 0px;
    height: 100%;

}

.hotel-grid img {
    inline-size: 100%;
}

#item-0 {

    text-align: center;
    border-radius: 15px;
    padding: 10px;
    margin: 4px;
    border: 1px solid $main-color;
    grid-row-start: 1;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-column-end: 3;

}

#item-1 {

    text-align: center;
    border-radius: 15px;
    padding: 10px;
    margin: 4px;
    border: 1px solid $main-color;
    grid-row-start: 1;
    grid-column-start: 3;

    grid-row-end: 3;
    grid-column-end: 6;

}
#reserve-dates, #type-costumer{
    font-weight: bolder;
}
</style>
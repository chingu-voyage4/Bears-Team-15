import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    collections: [
            {
                collectionName: 'Italian words',
                items: [
                    {q: 'ciotola', a: 'bowl'},
                    {q: 'tazza', a: 'cup'},
                    {q: 'forchetta', a: 'fork'},
                    {q: 'piatto', a: 'plate'},
                    {q: 'scrivania', a: 'desk'},
                    {q: 'tavola', a: 'table'},
                    {q: 'matita', a: 'pencil'},
                    {q: 'penna', a: 'pen'},
                    {q: 'quaderno', a: 'exercise book'},
                    {q: 'diario', a: 'diary'}
                ]
            },
            {
                collectionName: 'European Capital Cities',
                items: [
                    {q: 'England', a: 'London'},
                    {q: 'France', a: 'Paris'},
                    {q: 'Germany', a: 'Berlin'},
                    {q: 'Spain', a: 'Madrid'},
                    {q: 'Italy', a: 'Rome'},
                    {q: 'Scotland', a: 'Edinburgh'},
                    {q: 'Wales', a: 'Cardiff'},
                    {q: 'Northern Ireland', a: 'Belfast'},
                    {q: 'Portugal', a: 'Lisbon'},
                    {q: 'Greece', a: 'Athens'},
                    {q: 'Austria', a: 'Vienna'},
                    {q: 'Switzerland', a: 'Bern'},
                    {q: 'Belgium', a: 'Brussels'},
                    {q: 'Ireland', a: 'Dublin'},
                    {q: 'Netherlands', a: 'Amsterdam'},
                    {q: 'Denmark', a: 'Copenhagen'},
                    {q: 'Poland', a: 'Warsaw'},
                    {q: 'Russia', a: 'Moscow'},
                    {q: 'Ukraine', a: 'Kyiv'},
                    {q: 'Norway', a: 'Oslo'},
                    {q: 'Sweden', a: 'Stockholm'},
                    {q: 'Turkey', a: 'Ankara'},
                    {q: 'Cyprus', a: 'Nicosia'},
                    {q: 'Bulgaria', a: 'Sofia'},
                    {q: 'Romania', a: 'Bucharest'},
                    {q: 'Iceland', a: 'Reykjavík'},
                    {q: 'Luxembourg', a: 'Luxembourg City'}
                ]
            }
        ]
    }
})

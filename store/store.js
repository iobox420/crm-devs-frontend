import { defineStore } from "pinia"
import columns from "./columns.js"
const apartsStore = defineStore("index-page", {
    state: () => ({
        area: [0, 200],
        areaRange: [0, 200],
        price: [0, 6000000],
        priceRange: [0, 6000000],
        floor: [0, 10],
        floorRange: [0, 10],

        rooms: [0, 1, 2, 3, 4],
        roomsRange: [
            {
                value: 0,
                label: "Студия",
            },
            {
                value: 1,
                label: "1 комната",
            },
            {
                value: 2,
                label: "2 комнаты",
            },
            {
                value: 3,
                label: "3 комнаты",
            },
            {
                value: 4,
                label: "4 комнаты",
            },
        ],

        aparts: [],

        page: 1,
        rowsPerPage: 10,
        count: 220,

        sortBy: "rooms",
        orderBy: "asc",
        columns,
        tooltip: false,
    }),

    actions: {
        clearFilters(pay) {
            console.log(pay)
            this.sortBy = "rooms"
            this.orderBy = "asc"
            this.area = this.areaRange
            this.price = this.priceRange
            this.floor = this.floorRange
            this.rooms = [0, 1, 2, 3, 4]
            this.rowsPerPage = 10
            this.page = 1
            this.load()
        },
        setSortByCol(sortedColumn) {
            this.sortBy = sortedColumn
            if (this.orderBy === "asc") {
                this.orderBy = "desc"
            } else {
                this.orderBy = "asc"
            }
            this.load()
        },
        setArea(payload) {
            console.log("setArea", payload)
            this.area = payload
        },
        setPrice(payload) {
            console.log("setPrice", payload)
            this.price.payload
        },
        setFloor(payload) {
            console.log("setfloor", payload)
            this.floor = payload
        },

        async load() {
            try {
                const props = {
                    method: "POST",
                    body: {
                        rowsPerPage: this.rowsPerPage,
                        page: this.page,
                        orderBy: this.orderBy,
                        sortBy: this.sortBy,

                        area: this.area,
                        price: this.price,
                        floor: this.floor,
                        rooms: this.rooms,
                    },
                }
                console.log("load with params", props)
                const aparts = await $fetch("http://localhost:6200/api/aparts", props)
                console.log(aparts)
                console.log("result", aparts)
                this.aparts = aparts.rows
                this.areaRange = aparts.filters.areaRange
                this.priceRange = aparts.filters.priceRange
                this.floorRange = aparts.filters.floorRange
                this.count = aparts.filters.count
                this.maxCount = aparts.filters.maxCount
            } catch (e) {
                debugger
            }
        },
    },
})

export default apartsStore
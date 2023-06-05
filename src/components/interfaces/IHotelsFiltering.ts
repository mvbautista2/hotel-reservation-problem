interface IHotelsFiltering {
    id?: number,
    name?: string,
    picture?:string,
    rating?: number,
    stars?: string,
    weekdayPrice: {
        regularCostumer: number,
        rewardsCostumer: number
    },
    weekendPrice: {
        regularCostumer: number,
        rewardsCostumer: number
    }
}

export type {IHotelsFiltering as default};
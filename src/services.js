export const BASE_URL = 'http://127.0.0.1:8000/api'
export const base_headers = {
    "Content-Type": 'application/json'
}

export const orderErrors = errors => {
    let errArr = []
    for (const errKey in errors) {
        errArr.push([errKey, errors[errKey]])
    }
    return errArr
}


export const serializeSectionFlats = (section) => {
    if(!section) return {}
    const secFalts = section.flats

    const floors = [...new Set(secFalts.map(f => f.floor))].sort().reverse()

    const flatsWithFloors = floors.map(floor => {

        return [floor, secFalts.filter(f => f.floor === floor)]
    })

    const flatTypes = secFalts.filter(f => f.floor === 1)

    return {floors, flatsWithFloors, flatTypes}
}


export const serializeHouseFlats = flats => {
    if(!flats) return
    const sections = [...new Set(flats.map(f => JSON.stringify(f.section)))].map(s => JSON.parse(s))

    const sectionsWithFloorFlats = sections.map(sec => {
        const secFlats = flats.filter(f => f.section.id === sec.id)

        const floors = [...new Set(secFlats.map(f => f.floor))].sort().reverse()

        const flatsWithFloors = floors.map(floor => {

            return [floor, secFlats.filter(f => f.floor === floor)]
        })
        
        return [
            sec,
            flatsWithFloors
        ]
    })


    return sectionsWithFloorFlats
}
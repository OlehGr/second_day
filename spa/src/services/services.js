export const BASE_URL = 'http://127.0.0.1:8000/api'

export const base_headers = {
    'Content-Type': 'application/json;'
}

export const orderErrors = errors => {
    let errorsArr = []
    for (const errorKey in errors) {
        errorsArr.push([errorKey, errors[errorKey]])
    }
    return errorsArr
}

export const serializeFlats = section => {
    if(!section) return {}
    const flats = section.flats
    const floors = [...new Set(flats.map(flat => flat.floor))].sort().reverse()

    const flatsOnFloor = flats.length / floors.length

    const floorsWithFlats = floors.map(floorNumber => [floorNumber, flats.filter(flat => flat.floor === floorNumber)])


    const flatTypes = flats.filter(flat => flat.floor === 1)

    return {floors, flatsOnFloor, floorsWithFlats, flatTypes}
}


export const serializeHouseFlats = flats => {
    if(!flats) return
    const sections = [...new Set(flats.map(flat => JSON.stringify(flat.section)))].map(jsonSection => JSON.parse(jsonSection))

    const sectionsWithFalts = sections.map(section => {
        const sectionFlats = flats.filter(flat => flat.section.id === section.id)
        const floors = [...new Set(sectionFlats.map(flat => flat.floor))].sort().reverse()
        const flatsOnFloor = flats.length / floors.length
        const floorsWithFlats = floors.map(floorNumber => [floorNumber, sectionFlats.filter(flat => flat.floor === floorNumber)])
        
        return [section, floorsWithFlats]
    })

    return sectionsWithFalts

}


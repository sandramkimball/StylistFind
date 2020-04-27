
export function filterFunction(data, filterOpt, searchTerm) {
    let target = searchTerm.toLowerCase()
    const results = data.filter(item=> 
        item.salon.toLowerCase().includes(target) ||
        item.city.toLowerCase().includes(target) ||
        item.first_name.toLowerCase().includes(target) ||
        item.last_name.toLowerCase().includes(target)         
    )
    return results
}


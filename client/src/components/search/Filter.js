
export function filterFunction(data, filterOpt, searchTerm) {
    if(filterOpt === 'stylists' && searchTerm !== null){
        let target = searchTerm.toLowerCase()
        const results = data.filter(item=> 
            item.salon.toLowerCase().includes(target) ||
            item.city.toLowerCase().includes(target) ||
            item.first_name.toLowerCase().includes(target) ||
            item.last_name.toLowerCase().includes(target)         
        )
        return results
    }
    if(filterOpt === 'posts' && searchTerm !== null){
        let target = searchTerm.toLowerCase()
        const results = data.filter(item=>  
            item.comment !== null && item.comment.toLowerCase().includes(target) ||
            item.salon.toLowerCase().includes(target) ||
            item.city.toLowerCase().includes(target) ||
            item.first_name.toLowerCase().includes(target) ||
            item.last_name.toLowerCase().includes(target)         
        )
        return results 
    }
    else {
        return data
    }
}


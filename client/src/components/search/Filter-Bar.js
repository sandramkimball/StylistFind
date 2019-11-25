import React from 'react';
import styled from 'styled-components';

export default function FilterBar(){
    // const [filterOpt, setFilterOpt] = useState('');
    // const [filterResults, setFilterResults] = useState(stylists, salons);
    // const [sortResults, setSortResults] = useState(stylists, salons);
    
    function alphabetical(filterResults){
        return filterResults.sort()
    }

    function price_asc(filterResults){
        return filterResults
    }
    function price_desc(filterResults){
        return filterResults
    }
    function nearest(filterResults){
        return filterResults
    }


    function filterResults(c){
       let x, i;
       x = document.getElementsByClassName('filterDiv');
       if (c == 'all') c = '';
       //trigger "display" css class:
       x.filter(()=> {
           removeClass(x[i], 'show');
           if (x[i].className.indexOf(c) > -1) addClass(x[i], 'show')
       })
    };

    //show filtered elements
    function addClass(element, name){
        let i, arr1, arr2;
        arr1 = element.className.split(' ');
        arr2 = name.split(' ');
        arr1.map((i)=> {
            if( arr1.indexOf(arr2[i]) == -1){
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        })
        element.className = arr1.join(' ');
    }

    //hide unselected elements
    function removeClass(element, name){
        let i, arr1, arr2;
        arr1 = element.className.split(' ');
        arr2 = name.split(' ');
        arr1.map((i)=> {
            if(arr1.indexOf(arr2[i]) > -1){
                arr1.splice(arr1.indexOf(arr2[i]), 1)
            }
        })
        element.className = arr1.join(' ');
    }

    //add 'selected' class to selected radio option
    var filterContainer = document.getElementById('selectedFilter')
    var filters = filterContainer.getElementsByClassName('li')
    filters.map(()=> {
        filters.map().addEventListener('click', function(){
            var current = document.getElementsByClassName('active');
            current[0].className = current[0].className.replace('active', '');
            this.className += ' active';
        })
    });

    return (
        <div>
            <BAR>
            <div className = 'Sort'>
                <h4>Sort By</h4>
                <i class="fas fa-chevron-down"></i>
                <form>
                    <input
                        label='Nearest'
                        type='radio'
                        name='nearest'
                        value={nearest}
                        onClick={filterResults}
                    />
                    <input
                        label='Alphabetical'
                        type='radio'
                        name='alphabetical'
                        value={alphabetical}
                        onClick={filterResults}
                    />
                    <input
                        label='Price (Asc)'
                        type='radio'
                        name='price_asc'
                        value={price_asc}
                        onClick={filterResults}
                    />
                    <input
                        label='Price (Desc)'
                        type='radio'
                        name='price_desc'
                        value={price_desc}
                        onClick={filterResults}
                    />
                </form>
            </div>

            <div className = 'Filter'>
                <h4>Filters</h4>
                <i class="fas fa-chevron-down"></i>
                <form>
                    <input
                        label='Posts Only'
                        type='radio'
                        value='posts-only'
                        onClick={filterResults}
                    />
                    <input
                        label='Reviews Only'
                        type='radio'
                        value='reviews-only'
                        onClick={filterResults}
                    />
                    <h4>Specialty</h4>
                        <input
                            label='Brazilian Blowout'
                            type='radio'
                            value='blowout'
                            onClick={filterResults}
                        />
                        <input
                            label='Color'
                            type='radio'
                            value='color'
                            onClick={filterResults}
                        />
                        <input
                            label='Curly Hair'
                            type='radio'
                            value='curly'
                            onClick={filterResults}
                        />
                        <input
                            label='Perm'
                            type='radio'
                            value='perm'
                            onClick={filterResults}
                        />
                </form>
            </div>
            </BAR>
        </div>
    )
}

let BAR = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: space-between;
    content-align: center;
    border: 1px solid orange;
    input{
        height: 50px;
        font-size: 1rem;
    }
`;
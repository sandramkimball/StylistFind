import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelectMode} from '../../hooks/useSelectMode';

export default function FilterBar(){
    // const [filterOpt, setFilterOpt] = useState('');
    // const [filterResults, setFilterResults] = useState(stylists, salons);
    // const [sortResults, setSortResults] = useState(stylists, salons);
    const [selected, setSelected] = useSelectMode(true || false)

    const toggleMode = e => {
        e.preventDefault();
        setSelected(!selected)
    }

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
    };

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
    };

    //add 'selected' class to selected radio option
    var filterContainer = document.getElementById('selectedFilter')
    var filters = filterContainer.getElementsByTagName('option')
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
            <div className = 'Filters'>
                <div className= 'menu-container'>
                    <select onClick={this.toggleMode} className={this.selected ? 'toggle toggled' : 'toggle'}>
                        <option>Stylists</option>
                        <option>Salons</option>
                    </select>
                    <select onClick={this.toggleMode} className={this.selected ? 'toggle toggled' : 'toggle'}>
                        <option>Posts</option>
                        <option>Reviews</option>
                    </select>
                    <select onClick={this.toggleMode} className={this.selected ? 'toggle toggled' : 'toggle'}>
                        <option>Ethnic</option>
                        <option>Color</option>
                        <option>Blowout</option>
                        <option>Perm</option>
                    </select>
                    <select onClick={this.toggleMode} className={this.selected ? 'toggle toggled' : 'toggle'}>
                        <option>Nearest</option>
                        <option>Price (Asc)</option>
                        <option>Price (Desc)</option>
                        <option>Alphabetical</option>
                    </select>
                </div>


                {/* <form>
                    <i class="fas fa-chevron-down"></i>
                    <h4>Sort By</h4>
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
                <form>
                    <i class="fas fa-chevron-down"></i>
                    <h4>Type</h4>
                    <input
                        label='Salons'
                        type='radio'
                        value='salons-only'
                        onClick={filterResults}
                    />
                    <input
                        label='Stylists'
                        type='radio'
                        value='stylists-only'
                        onClick={filterResults}
                    />
                </form>
                <form>
                    <i class="fas fa-chevron-down"></i>
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
                <form> */}
                    {/* <i class="fas fa-chevron-down"></i>
                    <h4>More</h4>
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
                </form> */}
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




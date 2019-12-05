import React from 'react';
import styled from 'styled-components';
// import {useSelectMode} from '../../hooks/useSelectMode';

export default function FilterBar(){
    // const [filterOpt, setFilterOpt] = useState('');
    // const [filterResults, setFilterResults] = useState(stylists, salons);
    // const [sortResults, setSortResults] = useState(stylists, salons);
    // const [selected, setSelected] = useSelectMode(true || false)

    // const toggleMode = e => {
    //     e.preventDefault();
    //     setSelected(!selected)
    // }

    // function alphabetical(filterResults){
    //     return filterResults.sort()
    // }
    // function price_asc(filterResults){
    //     return filterResults
    // }
    // function price_desc(filterResults){
    //     return filterResults
    // }
    // function nearest(filterResults){
    //     return filterResults
    // }

    // function filterResults(c){
    //    let x, i;
    //    x = document.getElementsByClassName('filterDiv');
    //    if (c == 'all') c = '';
    //    //trigger "display" css class:
    //    x.filter(()=> {
    //        removeClass(x[i], 'show');
    //        if (x[i].className.indexOf(c) > -1) addClass(x[i], 'show')
    //    })
    // };

    //show filtered elements
    // function addClass(element, name){
    //     let i, arr1, arr2;
    //     arr1 = element.className.split(' ');
    //     arr2 = name.split(' ');
    //     arr1.map((i)=> {
    //         if( arr1.indexOf(arr2[i]) == -1){
    //             arr1.splice(arr1.indexOf(arr2[i]), 1);
    //         }
    //     })
    //     element.className = arr1.join(' ');
    // };

    //hide unselected elements
    // function removeClass(element, name){
    //     let i, arr1, arr2;
    //     arr1 = element.className.split(' ');
    //     arr2 = name.split(' ');
    //     arr1.map((i)=> {
    //         if(arr1.indexOf(arr2[i]) > -1){
    //             arr1.splice(arr1.indexOf(arr2[i]), 1)
    //         }
    //     })
    //     element.className = arr1.join(' ');
    // };


    return (
        <div>
            <SIDEBAR>
            <div className = 'Filters'>
                <div className= 'menu-container'>
                    <form>
                    <select>
                        <option>Stylists</option>
                        <option>Salons</option>
                    </select>
                    <select >
                        <option>Posts</option>
                        <option>Reviews</option>
                    </select>
                    <select >
                        <option>Ethnic</option>
                        <option>Color</option>
                        <option>Blowout</option>
                        <option>Perm</option>
                    </select>
                    <select>
                        <option>Nearest</option>
                        <option>Price (Asc)</option>
                        <option>Price (Desc)</option>
                        <option>Alphabetical</option>
                    </select>
                    </form>
                </div>

                {/* <i class="fas fa-chevron-down"></i> */}
                {/* onClick={this.toggleMode} className={this.selected ? 'toggle toggled' : 'toggle'} */}

                   
            </div>
            </SIDEBAR>
        </div>
    )
}

let SIDEBAR = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    max-width: 330px;
    height: 100vh;
    position: fixed;
    justify-content: space-between;
    content-align: center;
    border-right: 2px solid gray;
    form select{
        width: 95%
        height: 35px;
        font-size: 1rem;
        border:none;
        border-bottom: 1px solid gray;
        position: inherit;
    }
    
`;




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
            <div className='menu-container'>
                <p>Search By</p>
                <ul>
                    <li>Stylists</li>
                    <li>Salons</li>
                </ul>

                <p>Show me</p>
                <ul>
                    <li>Posts</li>
                    <li>Reviews</li>
                </ul>
                <p>Specialty</p>
                <ul >
                    <li>Ethnic</li>
                    <li>Color</li>
                    <li>Blowout</li>
                    <li>Perm</li>
                </ul>
                <p>Sort By</p>
                <ul>
                    <li>Nearest</li>
                    <li>Price (Asc)</li>
                    <li>Price (Desc)</li>
                    <li>Alphabetical</li>
                </ul>

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
    justify-content: space-between;
    text-align: center;
    width: 95%;
    margin: 0 auto;
    padding-bottom: 10px;
    p{
        text-align: left;
        font-weight: 600;
        margin: 0;
    }
    ul{
        text-align: left;
        list-style: none;
        margin: 0;
        padding-left: 0
        li:hover{
            cursor: pointer;
            color: red;
            text-decoration: underline;
        }
    }
`;




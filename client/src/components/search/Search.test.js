import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './SearchPage';
import StylistDash from '../stylists/StylistDash';
//import {fireEvent, cleanup} from '@testing-library/react';
import {handleSubmit} from './SearchPage';
import {filterFunction} from './Filter';

const data = [
    stylists[
        {
            first_name: 'Bob', 
            salon: 'Bob Barber', 
            city: 'Bakersfield'
        },
        {
            first_name: 'Lola', 
            salon: 'Loovely Little Salon', 
            city: 'Lakesville'
        }
    ],
    posts[
        {
            first_name: 'Bob', 
            comments: 'Shave beard trim', 
        },
        {
            first_name: 'Lola', 
            comments: 'Cut color hair', 
        }
    ]
    
]

// afterEach(cleanup);

// //UNIT TESTING
test('should return data if no filterOpts or searchTerm', ()=> { 
    const filterOpt='stylists';
    const searchTerm = '';
    const newData = filterFunction(data, filterOpt, searchTerm)
    expect(newData).toBeDefined 
    expect(newData).toBe(data.stylists)
})

// test('should convert data to lowercase', ()=> {
//     const newData = filterFunction(data, filterOpt, searchTerm)
//     expect(newData.first_name).toBeLowerCase();
// })

// test('should make axios call to stylists if filterOpt is stylist', ()=> {
//     const filterOpt = 'stylists'
//     expect(url).toBe('/search')
// })

// test('should make axios call to posts if filterOpt is posts', ()=> {
//     const filterOpt = 'posts'
//     expect(url).toBe('/search/posts')
// })

// test('should throw error if data cannot be retrieved', ()=> {
//     const button = document.querySelector()
//     fireEvent.click(button)
//     expect(isError).toBeTruthy()
// })

// test('should setLoading for while retrieving data', ()=> {
//     expect(isLoading).toBeTruthy()
// })


// //INTEGRATION TESTING
// test('should return stylists if filterOpt is stylists', ()=> {
//     const filterOpt = 'stylists'
//     const newData = handleSubmit()
//     expect(newData.first_name).toBe('Bob')
// })

// test('should return posts if filterOpt is posts', ()=> {
// })

// test('should return stylist if searchTerm is stylist name', ()=> {
//     const searchTerm = 'Bob'

//     expect(newData.first_name).toBe('Bob')
// })

// test('should return posts with comments containing searchTerm', ()=> {
// })

// //END TO END TESTING
// test('should navigate to stylist profile when card is clicked', ()=> {
//     ReactDOM.render(<SearchPage/>)
//     let card = document.querySelector('.stylist-card')
//     fireEvent.click(card)
//     expect(ReactDOM).toBe(<StylistDash/>)
//     ReactDOM.render(<StylistDash/>)
// })
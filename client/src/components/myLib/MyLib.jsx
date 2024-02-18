import { useEffect, useState } from "react";
import axios from 'axios';
import {LibApis} from '../../services/apis'
import './MyLib.css'
const member= 2000;
const MyLib = () => {
    const [books,setBooks]=useState([]);
    
    useEffect(()=>{
        axios.get(LibApis.GET_BOOKS).then(res=>{
            setBooks(res.data)
        });
      
    },[])
  
    return ( <>
    <div>
       <p> Hi User : Member 1, 
        ID: {member}</p>
        <p>Our books</p>
    </div>
   <div className="all-books">
   {
        books.map((eachBook,i)=>{
            return (
           <div  className= 'book-wrapper' key={i}>
            <p>ID: {eachBook.BookID} </p>
             <p>Name:{eachBook.BookName} </p>
             <p> Copies Left: {eachBook.NumberOfCopies} </p>
             <button className="btn"
             onClick={()=>{
                // getBook(eachBook.BookID);
             }}
             >
                GET ONE
             </button>
           </div>
            )
        })
    }
   </div>
    </> );
}
 
export default MyLib;
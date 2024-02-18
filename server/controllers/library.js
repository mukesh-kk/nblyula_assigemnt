
const Books = require('../models/books');
const Members = require('../models/member');
const Checkouts = require('../models/checkout');

const {getDateIsSimpleForm,dayDiffFromrToday} =require('../utils');

async function getBook(req, res){
    

   try {

    const book=  await Books.find().lean();
    if(book){
        return res.status(200).send(book)

    }else{
        throw new Error('Book not found');
    }
    

    
   } catch (error) {
    res.sendStatus(404);
    
   }}
async  function getOverDuesAndFine(req,res){
try {

    const {member_id}=  req.query;
    const checkouts= await  Checkouts.find({member_id:member_id}).lean();

    const  booksNotRetuned=  checkouts.filter(transc=>{
        if(transc.eventtype=='checkout'){
          const idx=  checkouts.findIndex((each=>{
                return (transc.book_id===each.book_id&&
                each.member_id===each.member_id&&
                each.eventtype==='return');
            }))

            if(idx==-1){
                return true;
            }else{
                return false;
            }
        }
    });

    booksWithPenalty=[];

    booksNotRetuned.forEach(unReturned=>{

       let dayDiff= dayDiffFromrToday(unReturned.date);
       dayDiff=Math.round(dayDiff-6);
        if(dayDiff>0){
            booksWithPenalty.push({
               book_id:unReturned.book_id,
               member_id:unReturned.member_id,
               date:unReturned.date,
               penalty:(dayDiff)*50
            })
        }
    })


   res.status(200).send(booksWithPenalty);


} catch (error) {

    res.status(500).send(error.message);

}

   }

  async function  issueBook(req,res){

    try{

        const {member_id,book_id}=req.body;
          const book = await Books.findOne({BookID:book_id}).lean();
          const member = await Members.findOne({MemberID:member_id}).lean();
          if(!book){
            throw new Error('Book not found');
          }
          if(!member){
            throw new Error('Member not found');
          }
           
          if(book.NumberOfCopies<=0){
            throw new Error('Book not available');
          }

           
         const newCheckout= await Checkouts.create({
            eventtype:'checkout',
            book_id:book_id,
            member_id:member_id,
            date: getDateIsSimpleForm(new Date())
          })
          await  Books.findOneAndUpdate({
            BookID:book_id
          },
          {
            $set: {
                NumberOfCopies:book.NumberOfCopies-1
            }
          }
          )
          res.status(200).json(newCheckout)


    }
    catch(error){
        res.status(404).send(error.message);

    }


  }
  async function  returnBook(req,res){
    try {
        
        const {member_id,book_id}=req.body;
          const book = await Books.findOne({BookID:book_id}).lean();
          const member = await Members.findOne({MemberID:member_id}).lean();
          if(!book){
            throw new Error('Book not found');
          }
          if(!member){
            throw new Error('Member not found');
          }
         const transactionsforBook = await Checkouts.find({book_id:book_id,member_id},{eventtype:1,_id:0}).lean();
         const checkoutCount=transactionsforBook.filter(e=>e.eventtype==='checkout').length;
         const returnCount= transactionsforBook.length-checkoutCount;
         let newCheckout={}
         if(checkoutCount>returnCount){

            newCheckout = await Checkouts.create({
                eventtype:'return',
                book_id:book_id,
                member_id:member_id,
                date: getDateIsSimpleForm(new Date())
              })
              await  Books.findOneAndUpdate({
                BookID:book_id
              },
              {
                $set: {
                    NumberOfCopies:book.NumberOfCopies+1
                }
              }
              )
              res.status(200).send(newCheckout)
         }else{
            res.status(422).send('Book not issued to Member');
         }

    

    } catch (error) {
        res.status(404).send(error.message);
    }

  }

module.exports ={getBook,returnBook,issueBook,getOverDuesAndFine}
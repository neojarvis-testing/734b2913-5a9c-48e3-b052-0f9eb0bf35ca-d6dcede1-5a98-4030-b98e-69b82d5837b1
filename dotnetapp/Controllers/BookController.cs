using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BookController : ControllerBase
    {
        private readonly BookService bookService;

        public BookController(BookService ibookService){
        bookService=ibookService;
        }

    [HttpGet]

    public async Task<ActionResult<IEnumerable<Book>>>GetAllBooks(){
        try{
            return Ok(await bookService.GetAllBooks()); 
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }



    [HttpGet("{bookId}")]
    public async Task<ActionResult<Book>>GetBookById(int bookId){
        try{
            var books=await bookService.GetBookById(bookId);
            if(books==null){
                return NotFound("Book not found");
            }
            return Ok(books);
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }



    [HttpPost]
    public async Task<ActionResult>AddBook([FromBody] Book book){
        try{
            var books=await bookService.AddBook(book);
            if(!books) return StatusCode(500,"Failed to add book");
<<<<<<< HEAD
            return Created("",new {Message="Book added successfully"});
=======
            return Created("", new { Message = "Book added successfully" });
>>>>>>> 3294cc7bf06d425386ffebbef0bdb220fd5e1942
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }



    [HttpPut("{bookId}")]
    public async Task<ActionResult>UpdateBook(int bookId, [FromBody] Book book){
        try{
            if(book==null){
                return NotFound("Cannot find any book");
            }
            await bookService.UpdateBook(bookId,book);
            return Ok("Book updated successfully");

        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }


    [HttpDelete("{bookId}")]
    public async Task<ActionResult>DeleteBook(int bookId){
        try{
            var books= await bookService.DeleteBook(bookId);
            if(books==null){
                return NotFound("Cannot find any book");
            }
            return Ok("Book deleted successfully");
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[books]")]
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
            Console.WriteLine(e.Message);
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
            Console.WriteLine(e.Message);
        }
    }



    [HttpPost]
    public async Task<ActionResult>AddBook([FromBody] Book book){
        try{
            var books=bookService.AddBook(book);
            if(!books) return StatusCode(500,"Failed to add book");
            return Created("","Book added successfully");
        }
        catch(Exception e){
            Console.WriteLine(e.Message);
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
            Console.WriteLine(e.Message);
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
            Console.WriteLine(e.Message);
        }
    }

    }
}
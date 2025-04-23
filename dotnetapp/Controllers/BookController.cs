using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;//we used authorize attribute
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BookController : ControllerBase//Methods for returning various HTTP responses, such as Ok(), BadRequest(), NotFound(), and Created().
    {
        private readonly BookService bookService;

        public BookController(BookService ibookService){
        bookService=ibookService;
        }

    [HttpGet]//method responds to this request  //sends to Api
    [Authorize(Roles = "BookRecommender,BookReader")]
    public async Task<ActionResult<IEnumerable<Book>>>GetAllBooks(){//It helps you define what response your API sends back to the client, including HTTP status codes and data.
        try{
            return Ok(await bookService.GetAllBooks()); 
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }



    [HttpGet("{bookId}")]
    [Authorize(Roles = "BookRecommender,BookReader")]
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
    [Authorize(Roles = "BookRecommender")]
    public async Task<ActionResult>AddBook([FromBody] Book book){
        try{
            if (book==null)
            return BadRequest("Invalid book details");

            var books=await bookService.AddBook(book);
            
            if(!books) 
            return BadRequest("A book with this name already exists.");

            return Ok("Book added successfully");
        }
        catch(Exception e){
            return StatusCode(500, e.Message);
        }
    }



    [HttpPut("{bookId}")]
    [Authorize(Roles = "BookRecommender")]
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
    [Authorize(Roles = "BookRecommender")]
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
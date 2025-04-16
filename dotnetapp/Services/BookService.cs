using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class BookService
    {
        private readonly ApplicationDbContext _context;
        public BookService(ApplicationDbContext context)
        {
            _context=context;
        }
        public async Task<bool> AddBook(Book book)
        {
            var checkBook = await _context.Books.FindAsync(book.BookId);
            if (checkBook!=null)
            {
                throw new Exception("Failed to add book");
            }
 
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return true;
        }
 
       public async Task<Book> GetBookById(int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                throw new Exception("Cannot find any book");
            }
            return book;
        }
        public async Task <IEnumerable<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }
        
        public async Task<bool> UpdateBook(int bookId,Book book)
        {
               var books= await _context.Books.FindAsync(bookId);
               if(books==null)
               {
                return false;
               }
                books.Title=book.Title;
                books.Author=book.Author;
                books.Genre=book.Genre;
                books.PublishedDate=book.PublishedDate;
                books.CoverImage=book.CoverImage;
                await _context.SaveChangesAsync();
                return true;
        }
        public async Task<bool> DeleteBook(int bookId)
        {
            var books=await _context.Books.FindAsync(bookId);
            if(books==null)
            {
                return false;
            }
            _context.Books.Remove(books);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}


 

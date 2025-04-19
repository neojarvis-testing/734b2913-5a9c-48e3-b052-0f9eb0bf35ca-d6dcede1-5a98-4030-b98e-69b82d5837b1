using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Book
{
    [Key]
    public int BookId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; }

    [Required]
    [MaxLength(100)]
    public string Author { get; set; }

    [Required]
    [MaxLength(50)]
    public string Genre { get; set; }

    [Required]
    public string PublishedDate { get; set; }

    public string CoverImage { get; set; }

}
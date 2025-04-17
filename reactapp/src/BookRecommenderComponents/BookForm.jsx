import React, {useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

 
const BookForm = ({mode="add"}) => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [publishedDate,setPublishedDate]=useState('');
    const [genre,setGenre]=useState('');
    const [coverPage,setCoverpage]=useState('');
 
    const [titleError,setTitleError]=useState(null);
    const [authorError,setAuthorError]=useState(null);
    const [publishedDateError,setPublishedDateError]=useState(null);
    const [genreError,setGenreError]=useState(null);
    const [coverPageError,setCoverpageError]=useState(null);
    const [formError,setFormError]=useState(null);
 
    const [successMessage, setSuccessMessage]=useState("");
    const [loading,setLoading]=useState(false);
 
 
    useEffect(()=>{
        if(mode === "edit" && id){
            console.log(id);
          setLoading(true);
        axios
            .get(`${API_BASE_URL}/books/${id}`, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }})
            .then((response)=>{
                const bookdata=response.data;
                setTitle(bookdata.Title);
                setAuthor(bookdata.Author);
                setPublishedDate(bookdata.PublishedDate);
                setGenre(bookdata.Genre);
                setCoverpage(bookdata.CoverPage);
                setLoading(false);
            })
            .catch(()=>{
                setFormError("Error fetching book data");
                setLoading(false);
            });
 
        }
    }, [mode, id]);
 
    const handleSubmit=(e)=>{
        e.preventDefault();
 
        setTitleError(false);
        setAuthorError(false);
        setPublishedDateError(false);
        setGenreError(false);
        setCoverpageError(false);
 
        let hasError=false;
        if(!title.trim()){
            setTitleError(true);
            hasError=true;
        }
        if(!author.trim()){
            setAuthor(true);
            hasError=true;
        }
        if(!publishedDate.trim()){
            setPublishedDateError(true);
            hasError=true;
        }
        if(!genre.trim()){
            setGenreError(true);
            hasError=true;
        }
        if(!coverPage.trim()){
            setCoverpageError(true);
            hasError=true;
        }
        if(hasError){
            return;
        }
 
        const bookData={title,author,publishedDate,genre,coverPage};
 
        if(mode === "add"){
            console.log(mode);
 
            axios
                .post(`${API_BASE_URL}/books`,bookData, {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }})
                .then(()=>{
                    setSuccessMessage("Book added successfully!");
                    setTimeout(()=>navigate("/viewbooks"),3000);
                })
                .catch(()=>{
                    setFormError("Error creating book");
                });
        }
        else if(mode === "edit"){
            console.log(mode);
 
            axios
                .put(`${API_BASE_URL}/${id}`, bookData)
                .then(()=>{
                    setSuccessMessage("Book updated successfully");
                    setTimeout(()=>navigate("/viewbooks"), 3000);
                })
                .catch(()=>{
                    setFormError("Error updating book");
                });
            }
        };
 
        const handleBack=()=>{
            navigate("/viewbooks");
        };
 
  return (
            <div>
    
            <div className="container mt-4">
                <h2>{mode==="add" ? "CREATE NEW BOOK" : "EDIT BOOK"}</h2>
                  {formError && <p>{formError}</p>}
                  {loading && <p>Loading....</p>}
                  {!loading && (
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                  <label className="form-label"><b>Title*</b></label>
                  <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  {titleError && <p>Title is required</p>}
            </div>
            <div>
                  <label className="form-label"><b>Author*</b></label>
                  <textarea placeholder="Author" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                  {authorError && <p>Author is required</p>}
            </div>
            <div>
                  <label className="form-label"><b>Published Date*</b></label>   
                  <input type="date" value={publishedDate} onChange={(e)=>setPublishedDate(e.target.value)}/>
                  {publishedDateError && <p>Published Date is required</p>}
            </div>
            <div>
                  <label className="form-label"><b>Genre*</b></label>
                  <input type="number" placeholder="Genre" value={genre} onChange={(e)=>setGenre(e.target.value)}/>
                  {genreError && <p>Genre is required</p>}<br/>
            </div>
            <div>
                  <label className="form-label"><b>Cover Page*</b></label>
                  <input type="number" placeholder="Cover Page" value={coverPage} onChange={(e)=>setCoverpage(e.target.value)}/>
                  {coverPageError && <p>Cover Page  is required</p>}<br/>
            </div>
                  <button type="submit">{mode==="add" ? "Add Book" : "Update Book"}</button>
                  <button type="button"onClick={handleBack}>Back</button>
            </form>
                    )}
            
                    {successMessage && <p>{successMessage}</p>}
            
                        </div>
            </div>
  )
}
 
export default BookForm
 
 
 
 

import React, {useState, useEffect} from 'react';
// import ReactTagInput from '@pathofdev/react-tag-input';
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import { countryList } from '../assets/countryList';

const initialState={
  title:"",
  tags:[],
  category:"",
  description:"",
  country:"",
  city:"",
  imgUrls:[]
}

const categoryOption =[
  "Solo Travel",
  "Finances",
  "Transportation",
  "Work Exchange",
  "Storytime",
  "Food",
  "Safety",
  "Activities",  
]

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  // const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const {title, tags, category, description, country, city} = form;


  useEffect(() => {
    const uploadFile = () => {
      for(let i = 0; i < files.length; i++) {
        console.log("FILES: " +  files );
        console.log("FILE LENGTH: " +  files.length );
        console.log('loop');
        const storageRef = ref(storage, `${files[i].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrls) => {
                toast.info("Image upload to firebase successfully");
                setForm((prev) => ({ ...prev, imgUrls: [...prev.imgUrls, downloadUrls] }));
                console.log("downloadURLs in useEffect" + downloadUrls);
                console.log("FILES in useEffect:" + files);
            });
          }
        );
        
      }

    };

    files && uploadFile();
  }, [files]);


  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleSubmit = async (e) => {
    console.log(country);
    e.preventDefault();
    if (category && tags && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const  onCountryChange  = (e) => {
    setForm({ ...form, country : e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

 
  
  return (
  <div className="blog container-fluid" style={{flex: "1"}}>
      <div className="create-container">
        <div className="inner-container">
          <div className="text-center heading">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="blog-input-container">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-2">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              
            
              <div className="col-12 category-select">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-0 file-input">
                <input
                  type="file"
                  multiple
                  style={{padding:"12px"}}
                  className="form-control"
                  onChange={(e) => 
                    setFiles(e.target.files)
                    // setFiles((prev) => [...prev, e.target.files])
                    // dispatch({type:'updateUrls', payload:e.target.files})
                  }
                />
              </div>
              <div className="col-12 py-2">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-12 category-select">
                <select
                  value={country}
                  onChange={onCountryChange}
                  className="catg-dropdown"
                >
                  <option>Please select country</option>
                  {countryList.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-2 city-text">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="City (optional)"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-2">
                {/* <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={handleTags}
                /> */}
              <TagsInput
                value={tags}
                onChange={handleTags}
                name="tags"
                placeHolder="Choose tags..."
              />
              
                
              </div>
              
              <div className="col-12 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "UPDATE" : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBlog;
import React, { useState } from 'react'

function CreateBlogs(){
  const[title,setTitle]=useState("");
  const[category,setCategory]=useState("");
  const[blogImage,setBlogImmage]=useState("");
  const[blogImagePreview,setBlogImagePreview]=useState("");

  const handleImageChange = async(e)=>{
    console.log(e);
    const file=e.target.files[0];
    const reader = new FileReader();
    reader.readerAsDataURL(file)
    reader.onLOad=()=>{
      setBlogImagePreview(reader.result);
      setBlogImagePreview(file);
    };
  };
  const handleCreateBlog =async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("title",title);
    formData.append("category",category);
    formData.append("about",about);
    formData.append("blogImage",blogImage);


  }
  return (
    <div>CreateBlogs</div>
  )
}

export default CreateBlogs

import React from 'react'

function Updateblog (){
    const{id} = useParams();
    const [title,setTitle]= useState("");
    const[category,setCategory]= useState("");
    const[about,setAbout]= useState("");
    const[blogImage,setBlogImage]= useState("");
    const[blogImagePreview,setBlogImagePreview]= useState("");

    const changePhotoHandler =(e)=>{
        console.log(e);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            setBlogImagePreview(reader.result);
            setBlogImage(file);

        }
    }

  return (
    <div>
      
    </div>
  )
}

export default Updateblog

import React, { useContext, useState } from 'react';
import { SocketIoContext } from '../../scoektIoContext/Socket.Io';
import { LoggedinUserContext } from '../../scoektIoContext/LoggdinUserContext';
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext';
import axios from 'axios';

const MessegeInput = ({ setchats }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [imagesObj, setImagesObj] = useState([]);

  const { socket } = useContext(SocketIoContext);
  const { loggedinUser } = useContext(LoggedinUserContext);
  const { recieverId } = useContext(OtherDataContext);

  // Send message through socket
  const sendMessage = (images = []) => {
    if (recieverId) {
      socket.emit("sendmessage", {
        message,
        images,
        sender: loggedinUser._id,
        reciever: recieverId,
      });

      setMessage('');
      setAttachment([]);
    }
  };

  // Handle image attachments
  const handleAttachment = (evt) => {
    const files = evt.target?.files;
    if (!files) return;
    setImagesObj(files);
    const previewImages = Array.from(files).map(file => URL.createObjectURL(file));
    setAttachment(previewImages);
  };


  // remove selected image handler 
  const removeSelctedImage = (id)=>{
    setAttachment(()=>{
      return attachment.filter((item,index)=> index != id)
    })

    setImagesObj(()=>{
     return Array.from(imagesObj).filter((item,index)=> index != id)
    })
  }


  // Handle message send (with or without images)
  const handleMsg = async () => {
    if (!message && imagesObj.length === 0) return;

    if (imagesObj.length > 0) {
      const formData = new FormData();
      Array.from(imagesObj).forEach((img) => {
        formData.append("images", img);
      });

      try {
        const res = await axios.post(
          "http://localhost:3000/api/chats/upload-images",
          formData,
          { withCredentials: true }
        );

        if (res.data.success) {
          const uploadedImages = res.data.images;

          setchats(prev => [
            ...prev,
            {
              message,
              images: uploadedImages,
              senderId: loggedinUser._id,
              reciever: recieverId,
            },
          ]);

          sendMessage(uploadedImages);
          setImagesObj([]);
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    } else {
      setchats(prev => [
        ...prev,
        {
          message,
          images: [],
          senderId: loggedinUser._id,
          reciever: recieverId,
        },
      ]);

      sendMessage();
    }
  };



  return (
    <div className='h-[50px] w-full flex gap-3 mt-5'>
      {/* Image Previews */}
      {attachment.length > 0 && (
        <div className="md:w-[95%] w-[95%] ms-2 flex gap-2 mb-7 start-0   z-50 md:ms-3 absolute bottom-[50px] flex-wrap p-2 rounded-2xl bg-[#00000013] backdrop-blur-sm">
          {attachment.map((item, index) => (
           <div className="relative" key={index}>
             <img className='md:h-[130px] h-[80px] md:w-[130px] w-[80px] object-contain rounded-2xl' key={index} src={item} alt="preview" />
             <i onClick={()=>removeSelctedImage(index)} className="ri-close-large-line mainBgColor text-white text-steal-600 absolute top-0 right-0 h-[25px] w-[25px] cursor-pointer hover:rotate-12 transition-all flex justify-center items-center rounded-full "></i>
           </div>
          ))}
        </div>
      )}

      {/* Image Upload */}
      <div className='h-full w-[5%] relative flex justify-center items-center'>
        <i className="ri-attachment-line mainColor"></i>
        <input
          onChange={handleAttachment}
          type="file"
          multiple
          className='h-full w-full opacity-0 absolute top-0 cursor-pointer'
        />
      </div>

      {/* Text Input */}
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className='h-full w-[75%] md:w-[90%] bg-slate-200 rounded-3xl outline-none px-3 text-[14px]'
        placeholder='Type a message...'
        type="text"
      />

      {/* Send Button */}
      <i
        onClick={handleMsg}
        className="ri-send-plane-fill h-full w-[50px] rounded-full mainBgColor text-xl text-white flex justify-center items-center cursor-pointer"
      ></i>
    </div>
  );
};

export default MessegeInput;

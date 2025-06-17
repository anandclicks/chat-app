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
        <div className="w-auto flex gap-2 mb-7 ms-3 absolute bottom-[50px] flex-wrap p-2 rounded-2xl bg-[#00000013]">
          {attachment.map((item, index) => (
            <img className='h-[100px] rounded-2xl' key={index} src={item} alt="preview" />
          ))}
        </div>
      )}

      {/* Image Upload */}
      <div className='h-full w-[5%] relative flex justify-center items-center'>
        <i className="ri-attachment-line"></i>
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
        className='h-full w-[95%] bg-slate-200 rounded-3xl outline-none px-3 text-[14px]'
        placeholder='Type a message...'
        type="text"
      />

      {/* Send Button */}
      <i
        onClick={handleMsg}
        className="ri-send-plane-fill h-full w-[50px] rounded-full bg-sky-400 text-xl text-white flex justify-center items-center cursor-pointer"
      ></i>
    </div>
  );
};

export default MessegeInput;

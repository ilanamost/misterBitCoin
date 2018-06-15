import React from 'react';

import './ContactPreview.css'

const imgAvatar = 'http://res.cloudinary.com/ilanamost/image/upload/v1529046117/img_avatar.png';


const ContactPreview = ({contact}) => {
  const avatar = contact.picture || imgAvatar
  
  return (
    <div className="contact-preview">
      <img src={avatar} alt="Person" width="96" height="96" />
      <span className="contact-data">{contact.name}</span>
    </div>
  )
}
export default ContactPreview;

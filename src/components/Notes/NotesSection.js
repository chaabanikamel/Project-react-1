import React from 'react'

function NotesSection(props) {
  return (
    <div className="notes-section">
      {props.children}
    </div>
  )
}

export default NotesSection;
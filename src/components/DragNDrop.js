import React, { useState, useRef } from "react"

const DragNDrop = ({ data }) => {
  const [list, setList] = useState(data)
  const [dragging, setDragging] = useState(false)

  const dragItem = useRef()

  const handleDragStart = (e, params) => {
    console.log("drag starting", params)
    dragItem.current = params
    setDragging(true)
  }

  const getStyles = (params) => {
    const currentItem = dragItem.current
    if (
      currentItem.dndGroupId === params.dndGroupId &&
      currentItem.itemId === params.itemId
    ) {
      return "current dnd-item"
    } else {
      return "dnd-item"
    }
  }

  return (
    <div className="drag-n-drop">
      {list.map((dndGroup, dndGroupId) => (
        <div key={dndGroup.title} className="dnd-group">
          <div className="group-title">{dndGroup.title}</div>
          {dndGroup.items.map((item, itemId) => (
            <div
              draggable
              onDragStart={(e) => {
                handleDragStart(e, { dndGroupId, itemId })
              }}
              key={item}
              className={
                dragging ? getStyles({ dndGroupId, itemId }) : "dnd-item"
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DragNDrop

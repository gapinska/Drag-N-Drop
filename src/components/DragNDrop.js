import React, { useState, useRef } from 'react'

const DragNDrop = ({ data }) => {
	const [ list, setList ] = useState(data)
	const [ dragging, setDragging ] = useState(false)

	const dragItem = useRef()
	const dragNode = useRef()

	const handleDragEnd = () => {
		setDragging(false)
		dragNode.current.removeEventListener('dragend', handleDragEnd)
		dragItem.current = null
		dragNode.current = null
	}

	const handleDragStart = (e, params) => {
		console.log('drag starting', params)
		dragItem.current = params
		dragNode.current = e.target
		dragNode.current.addEventListener('dragend', handleDragEnd)
		setTimeout(() => {
			setDragging(true)
		}, 0)
	}

	const handleDragEnter = (e, targetItem) => {
		const currentItem = dragItem.current
		if (e.target !== dragNode.current) {
			setList((oldList) => {
				let newList = JSON.parse(JSON.stringify(oldList))
				newList[targetItem.dndGroupId].items.splice(
					targetItem.itemId,
					0,
					newList[dragItem.current.dndGroupId].items.splice(dragItem.current.itemId, 1)[0]
				)
				dragItem.current = targetItem
				localStorage.setItem('List', JSON.stringify(newList))
				return newList
			})
		}
	}

	const getStyles = (params) => {
		const currentItem = dragItem.current
		if (currentItem.dndGroupId === params.dndGroupId && currentItem.itemId === params.itemId) {
			return 'current dnd-item'
		} else {
			return 'dnd-item'
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
							onDragEnter={dragging ? (e) => handleDragEnter(e, { dndGroupId, itemId }) : null}
							key={item}
							className={dragging ? getStyles({ dndGroupId, itemId }) : 'dnd-item'}
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

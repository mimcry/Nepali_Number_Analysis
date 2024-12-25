import React, { useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { RotateCcw, Eraser, Pencil } from 'lucide-react'
import axios from 'axios';

const DrawingCanvas = () => {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState(27)
    const [tool, setTool] = useState('brush')
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 })

    const updateCanvasSize = () => {
        const width = Math.min(600, window.innerWidth - 32) // 32px for padding
        setCanvasSize({ width, height: width }) // 4:3 aspect ratio
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
            context.lineCap = 'round'
            context.lineJoin = 'round'
        }
    }, [canvasSize])

    useEffect(() => {
        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)
        return () => window.removeEventListener('resize', updateCanvasSize)
    }, [])

    const startDrawing = (e) => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvasSize.width, canvasSize.height);
            context.beginPath()
            const { x, y } = getCoordinates(e)
            context.moveTo(x, y)
            setIsDrawing(true)
        }
    }

    const draw = (e) => {
        if (!isDrawing) return
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
            const { x, y } = getCoordinates(e)
            context.lineTo(x, y)
            context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
            context.lineWidth = brushSize
            context.stroke()
        }
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
            context.clearRect(0, 0, canvasSize.width, canvasSize.height)
            toast.success('Canvas cleared!')
        }
    }

    const getCoordinates = (e) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        if ('touches' in e) {
            const touch = e.touches[0]
            return {
                x: (touch.clientX - rect.left) * scaleX,
                y: (touch.clientY - rect.top) * scaleY
            }
        } else {
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            }
        }
    }

    const handleCanvasSubmission = () => {
        const canvas = canvasRef.current
        // const link = document.createElement("a")
        // link.download = "canvas-image.jpeg"
        // link.href = canvas?.toDataURL("image/jpeg", 1.0) || 'None'
        // link.click()

        axios.post('http://localhost:8000/api/upload', {
            image: canvas?.toDataURL("image/jpeg", 1.0)
        }, {
            headers: {
                'Content-Type': 'application/json'  // Send as JSON
            }
        }
        ).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        });

    }
    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
                <button
                    className={`px-4 py-2 rounded ${tool === 'brush' ? 'bg-black text-white' : 'bg-white text-black border border-black'} hover:bg-black hover:text-white hover:border-black  hover:scale-110 transform transition-all duration-200 ease-in-out`}
                    onClick={() => setTool('brush')}
                >
                    <Pencil className="h-6 w-6" />
                </button>
                <button
                    className={`px-4 py-2 rounded ${tool === 'eraser' ? 'bg-black text-white' : 'bg-white text-black border border-black'} hover:bg-black hover:text-white hover:border-black  hover:scale-110 transform transition-all duration-200 ease-in-out`}
                    onClick={() => setTool('eraser')}
                >
                    <Eraser className="h-6 w-6" />
                </button>
                <button
                    className="px-4 py-2 rounded bg-white text-black border border-black hover:bg-black hover:text-white hover:border-black  hover:scale-110 transform transition-all duration-200 ease-in-out"
                    onClick={clearCanvas}
                >
                    <RotateCcw className="h-6 w-6" />
                </button>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer hover:text-white hover:border-black hover:scale-110 transform transition-all duration-200 ease-in-out"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCanvasSubmission}
                >
                    Click Me
                </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-md">
                <span className="text-sm font-semibold text-black">Brush Size:</span>
                <input
                    type="range"
                    min="15"
                    max="35"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full max-w-xs custom-range"
                />
                <span className="text-sm font-semibold text-black">{brushSize}px</span>
            </div>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="border border-gray-300 rounded-lg shadow-inner bg-white w-full h-full touch-none"
            />
        </div>
    )
}

export default DrawingCanvas;

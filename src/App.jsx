import { useEffect, useRef, useState } from 'react'
import './App.css'

import * as fs from "./fs/fileSystem"

import dir from "./commands/dir"
import cls from "./commands/cls"
import help from "./commands/help"
import cd from "./commands/cd"
import typeCmd from "./commands/type"
import md from './commands/md'
import ren from './commands/ren'
import del from './commands/del'
import ver from './commands/ver'
import time from './commands/time'
import date from './commands/date'
import echo from './commands/echo'
import copy from './commands/copy'
import move from './commands/move'

function App() {
    const [lines, setLines] = useState([])
    const [input, setInput] = useState("")
    const [cursorPos, setCursorPos] = useState(0)
    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [currentPath, setCurrentPath] = useState(["C"])

    // Available commands in dos
    const commands = {
        help,
        ver,
        time: (args) => time(args),
        date: (args) => date(args),
        dir: (...args) => dir(...args, currentPath), 
        cls,
        cd: (...args) => cd(...args, { currentPath, setCurrentPath }), 
        chdir: (...args) => cd(...args, { currentPath, setCurrentPath }),
        type: (args) => typeCmd(args),
        md: (args) => md(args),
        mkdir: (args) => md(args),
        ren: (args) => ren(args),
        del: (args) => del(args),
        erase: (args) => del(args),
        echo: (args) => echo(args),
        copy: (args) => copy(args),
        move: (args) => move(args),
    }

    const containerRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({behaviour: "smooth"})
        }
    }, [lines, input])

    const handleCommand = () => {
        const trimmed = input.trim()
        if (trimmed === "") return

        const [commandName, ...args] = trimmed.split(" ")
        const cmd = commands[commandName]

        const commandLine = `${fs.getPathString()} ${trimmed}`

        if (!cmd) {
            setLines((prev) => [...prev,
                `${fs.getPathString()} ${input.trim()}`,
                "Bad command or file name"])
        }
        else if (commandName === "cls") {
            cmd(setLines)
        }
        else if (typeof cmd === "function") {
            const output = cmd(args)
            setLines(prev => [
                ...prev,
                commandLine,
                ...(Array.isArray(output) ? output : (output ? [output] : [])),
            ])
        }
        else if (typeof cmd === "string") {
            setLines((prev) => [...prev,
                `${fs.getPathString()} ${input.trim()}`,
                cmd])
        }

        setInput("")
        setHistory(prev => [...prev, input.trim()])
        setHistoryIndex(-1)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleCommand()
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault()
            if (history.length > 0 && historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1
                setHistoryIndex(newIndex)
                setInput(history[history.length - 1 - newIndex])
            }
        }
        else if (e.key === "ArrowDown") {
            e.preventDefault()
            if (history.length > 0 && historyIndex >= 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                if (newIndex < 0) {
                    setInput("")
                } else {
                    setInput(history[history.length - 1 - newIndex])
                }
            }
        }
        else if (e.key === "ArrowLeft") {
            setCursorPos(prev => Math.max(prev - 1, 0))
        } else if (e.key === "ArrowRight") {
            setCursorPos(prev => Math.min(prev + 1, input.length))
        }
    }


    return (
        <div ref={containerRef} className="w-full h-full bg-black text-white rounded-xl flex flex-col pb-10">
            <div
                className="flex-1 overflow-y-auto p-2 whitespace-pre-wrap"
            >
                {lines.map((line, idx) => (
                <div key={idx}>{line}</div>
                ))}
            </div>

            <div className="w-full h-full bg-black text-white rounded-xl flex flex-col">
                <div className="border-t border-white-600 p-2 flex items-center relative">
                    <span className="mr-2">{`${fs.getPathString(currentPath)}`}</span>
                    <span>
                        {input.slice(0, cursorPos)}
                        <span className="bg-white text-black w-2 ml-1 animate-blink">&nbsp;</span>
                        {input.slice(cursorPos)}
                    </span>
                    <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                        setCursorPos(e.target.selectionStart)
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-white opacity-0"
                    autoFocus
                    />
                </div>
            </div>
        </div>
    )
}

export default App

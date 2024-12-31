"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    RefreshCcw,
    Trash2
} from "lucide-react"

export default function CollapsibleDemo({ exerciseName = "No exercise", type = "No type", onMarkChange, onDelete, id = "66b54131080cf3f1113ff254" }) {
    const [isMarked, setIsMarked] = React.useState(false)

    const setMarked = () => {
        const newMarkedState = !isMarked;
        setIsMarked(newMarkedState);
        console.log("marked" + exerciseName + newMarkedState);
        onMarkChange(exerciseName, newMarkedState);
    }

    const deleteExercise = async () => {
        console.log("delete" + exerciseName)

        const response = await fetch('http://104.248.200.63:3020/database/shifts/deleteExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, exerciseName }),
        });

        // If the delete request was successful, call the onDelete function
        if (response.ok) {
            onDelete(exerciseName);
        }
    }

    return (
        <Card className="w-[500px] h-[70px] flex flex-row items-center justify-between">
            <Link href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(exerciseName)}`}
                target="_blank"
                rel="noopener noreferrer">
                <h2 className="text-2xl font-bold">{exerciseName}</h2>
            </Link>

            <div className="flex flex-row items-center justify-between">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {/* FIXME HYDRATION ERROR IF NOT SET TO asChild */}
                            <Button
                                variant="outline"
                                style={{
                                    backgroundColor: isMarked ? 'gray' : 'white',
                                    color: isMarked ? 'white' : 'black'
                                }}
                                onClick={setMarked}
                            >
                                <RefreshCcw />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>ReCreate</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" onClick={deleteExercise}><Trash2 /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Card>
    )
}

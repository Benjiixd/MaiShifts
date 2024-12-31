//"use client"

import * as React from "react"
import { ChevronsUpDown, Pen, Plus, X } from "lucide-react"
import { CornerRightDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Pencil,
    ListRestart,
    Trash2
} from "lucide-react"

export default function WorkoutCard({ workoutName = "no name", exercises = ["error"], workoutType = "No type", id, onDelete }) {
    const [isOpen, setIsOpen] = React.useState(false)
    console.log("WORKOUT TYPE: ", workoutType)
    const deleteWorkout = async () => {
        console.log("delete", id);
        try {
            const response = await fetch('http://104.248.200.63:3020/database/shifts/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.status === 200) {
                console.log('Workout deleted successfully');
                onDelete(id)
            }

            // Parse the JSON from the response
            const data = await response.json();

            // Log the id from the response data
            console.log("ID from response:", data.id);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-4 px-4">
            <Card className="w-[800px] h-[70px] flex flex-row items-center justify-between">
                <CollapsibleTrigger>
                    <h2 className=" text-2xl font-bold">{workoutName} </h2>
                    <h2 className="text-1xl font-bold">{workoutType.join(' / ')}</h2>
                </CollapsibleTrigger>
                <div className=" flex flex-row items-center justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline"><Pencil></Pencil></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" onClick={deleteWorkout}><Trash2></Trash2></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </Card>
        </div>
    )
}

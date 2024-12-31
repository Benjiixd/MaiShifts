//"use client"


import React, { useState } from 'react';
import { ChevronsUpDown, Pen, Plus, X } from "lucide-react"

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
import { SquarePlus } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Checkboxes from '@/components/checkboxes';
import { PopoverClose } from "@radix-ui/react-popover";
import { send } from 'process';



export default function AddWorkout({sendAdd}) {

    function handleFormSubmit(data) {
        // handle the form data here
        console.log(data);
        let stringToSend = ""
        stringToSend = "(" + data.items.join("/") + ", " + data.amount + ")";
        console.log(stringToSend);
        sendAdd(stringToSend, data)
    }
    return (
        <div className="flex items-center justify-center space-x-4 px-4">
            <Card className="w-[800px] h-[70px] flex flex-row items-center justify-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[100%] h-[100%] bg-green-500 hover:bg-green-400">+</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <Checkboxes onFormSubmit={handleFormSubmit}></Checkboxes>
                    </PopoverContent>
                    
                </Popover>
                
            </Card>
        </div>
    )
}

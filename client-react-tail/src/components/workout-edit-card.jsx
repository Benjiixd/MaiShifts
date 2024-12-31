//"use client"

import * as React from "react"
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
    Trash2,
    RefreshCcw
} from "lucide-react"

export default function WorkoutEditCard({ sendRecreate, isActive }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const cardStyle = isActive ? "bg-green-500" : "bg-red-500";
    return (

        <Card className="w-[500px] h-[70px] flex flex-row items-center justify-center">
            
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant="outline" className={`w-[400px] ${cardStyle}`} onClick={sendRecreate}><RefreshCcw></RefreshCcw></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>ReCreate</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            
        </Card>
    )
}

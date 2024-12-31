"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { PopoverClose } from "@radix-ui/react-popover";



const items = [
    {
        id: "chest",
        label: "Chest",
    },
    {
        id: "triceps",
        label: "Triceps",
    },
    {
        id: "biceps",
        label: "Biceps",
    },
    {
        id: "shoulders",
        label: "Shoulders",
    },
    {
        id: "back",
        label: "Back",
    },
    {
        id: "legs",
        label: "Legs",
    },
    {
        id: "abs",
        label: "Abs",
    },
]

const FormSchema = z.object({
    name: z.string().nonempty("Name is required"),
    amount: z.string().nonempty("amount is required"),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

export default function Checkboxes({ onFormSubmit}) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
        },
        mode: 'all', // validate all fields on every change
    })

    function onSubmit(data) {
        console.log(JSON.stringify(data, null, 2))
        onFormSubmit(data)
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Create shift</FormLabel>
                                <FormDescription>
                                    Customize your shift
                                </FormDescription>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    defaultValue="new workout"
                                    className="col-span-2 h-8"
                                    {...form.register('name')} // register the input with react-hook-form
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    defaultValue="5"
                                    className="col-span-2 h-8"
                                    {...form.register('amount')} // register the input with react-hook-form
                                />
                            </div>
                            {items.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >   <FormLabel className="font-normal">
                                                    {item.label}
                                                </FormLabel>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PopoverClose asChild>
                    <Button type="submit" disabled={!form.formState.isValid}>
                        Submit
                    </Button>
                </PopoverClose>
                
            </form>
        </Form>
    )
}

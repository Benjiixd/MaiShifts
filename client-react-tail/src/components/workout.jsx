"use client";

import * as React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import WorkoutCard from "@/components/workout-card";
import ExcerciseCard from "@/components/excercise-card";
import WorkoutEditCard from "@/components/workout-edit-card"; // Ensure this import is correct
import ExplanationCard from "@/components/explanation-card"; // Ensure this import is correct

export default function Workout({ name = "No name", type = "No type", exercises = ["error"], id = "no id", onDeleteWorkout, explanation = "No explanation" }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [exerciseList, setExerciseList] = React.useState(exercises.map(exercise => ({
        name: exercise,
        state: false
    })));
    const [activeMarker, setActiveMarker] = React.useState(false);
    const [currentExplanation, setCurrentExplanation] = React.useState(explanation);

    React.useEffect(() => {
        setCurrentExplanation(explanation);
    }, [explanation]);

    const thisWorkout = {
        name: name,
        muscleGroups: type,
        exercises: exercises,
        id: id,
        explanation: currentExplanation
    }

    // This function updates the state of a single exercise and the active marker
    const getChanges = (name, state) => {
        const newExerciseList = exerciseList.map(exercise => {
            if (exercise.name === name) {
                return { ...exercise, state: state };
            }
            return exercise;
        });
        setExerciseList(newExerciseList);
        setActiveMarker(newExerciseList.some(exercise => exercise.state));
        console.log("Exercise List", newExerciseList);
    };

    // Function to delete an exercise from the list
    const deleteExercise = (exerciseName) => {
        const updatedExerciseList = exerciseList.filter(exercise => exercise.name !== exerciseName);
        setExerciseList(updatedExerciseList);
    };

    const changeShift = async () => {
        console.log(id)
        console.log("Shift Changed", exerciseList);
        const stringToSend = ("Current Exercises: [" + exerciseList.map(exercise => exercise.name).join(', ') + "] Exercises to change: [" + exerciseList.filter(exercise => exercise.state).map(exercise => exercise.name).join(', ') + "] ShiftTargets: (" + type + ")");
        console.log(stringToSend);

        // Generate or fetch new exercises
        const newExercises = await generateNewExercises(stringToSend); // Await the result of generateNewExercises

        // Update exerciseList with new exercises
        setExerciseList(newExercises.exercises.map(exercise => ({
            name: exercise,
            state: false
        })));

        // Update the explanation state
        setCurrentExplanation(newExercises.explanation);

        const response = await fetch('http://104.248.200.63:3020/database/shifts/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                newExercises: newExercises.exercises,
                newExplanation: newExercises.explanation
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    // Function to generate or fetch new exercises
    const generateNewExercises = async (stringToSend) => {
        const response = await fetch('http://104.248.200.63:3001/chatgpt/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stringToSend }),
        });
        const data = await response.json();
        console.log(data);

        // Assuming the response follows the provided structure
        // { 'main muscle groups': 'back, biceps', amount: 2, currentExercises: [ 'Bent Over Barbell Row', 'T-Bar Row', 'Bicep Curl with Barbell', 'Concentration Curl', 'Preacher Curl' ], explanation: '...' }
        console.log("DATAAAAA");
        console.log(data);
        return data;
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
        >
            <div className="flex items-center justify-center space-x-4 px-4">
                <WorkoutCard workoutName={name} workoutType={type} id={id} onDelete={onDeleteWorkout} />
            </div>
            <CollapsibleContent className="flex flex-col items-center justify-center">
                {exerciseList.map((exercise, index) => (
                    <ExcerciseCard
                        onMarkChange={(exerciseName, state) => getChanges(exerciseName, state)}
                        onDelete={deleteExercise}
                        key={index}
                        exerciseName={exercise.name}
                        type={type}
                        id={id} // assuming type here is the target muscle group
                    />
                ))}
                <ExplanationCard explanation={currentExplanation} />
                <WorkoutEditCard sendRecreate={changeShift} isActive={activeMarker} />
            </CollapsibleContent>
        </Collapsible>
    );
}

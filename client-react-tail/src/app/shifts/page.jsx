"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import Workout from "@/components/workout";
import AddWorkout from "@/components/AddWorkout";
import exp from 'constants';

export default function Page() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        const cookies = parseCookies();
        const user = cookies["auth-status"];
        console.log("USER", user);

        if (user === "no-token") {
            console.log("NO TOKEN");
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(user);
        console.log(parsedUser.username);

        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`http://104.248.200.63:3020/database/shifts?user=${parsedUser.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched Workouts:', data);

                const fetchedWorkouts = data.map(workout => ({
                    name: workout.name,
                    type: workout.muscleGroups,
                    exercises: workout.exercises,
                    id: workout.id,
                    explanation: workout.explanation
                }));

                setWorkouts(fetchedWorkouts);
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            } finally {
                setLoading(false); // Set loading to false when fetching is done
            }
        };

        fetchWorkouts();
    }, [router]);

    const handleDeleteWorkout = (id) => {
        console.log("DELETE FROM PAGE", id);
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
    };

    const addNew = async (stringToSend, obj) => {
        console.log(stringToSend);

        const response = await fetch('http://104.248.200.63:3001/chatgpt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stringToSend }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        const name = obj.name;
        const items = obj.items;
        const exercises = data.exercises;
        const explanation = data.explanation;

        console.log("OBJECT TO USE");
        console.log(name);
        console.log(items);
        console.log(exercises);

        const cookies = parseCookies();
        const user = cookies["auth-status"];
        console.log("USER", user);
        const parsedUser = JSON.parse(user);
        console.log(parsedUser.username);

        const newWorkout = await fetch('http://104.248.200.63:3020/database/shifts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, muscleGroups: items, exercises, owner: parsedUser.username, explanation }),
        });

        console.log(newWorkout);

        const data2 = await newWorkout.json();
        console.log(data2);

        setWorkouts(prevWorkouts => [...prevWorkouts, { name, type: items, exercises, id: data2.id, explanation }]);
    };

    return (
        <main className="relative flex h-[770px] w-screen flex-col items-center">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pointer-events-auto">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            )}
            {!loading && workouts.map((workout) => (
                <Workout key={workout.id} name={workout.name} type={workout.type} exercises={workout.exercises} id={workout.id} onDeleteWorkout={handleDeleteWorkout} explanation={workout.explanation} />
            ))}
            {!loading && <AddWorkout sendAdd={addNew} />}
        </main>

    );
}

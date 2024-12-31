import * as React from "react";
import { Card } from "@/components/ui/card";

export default function ExplanationCard({ explanation = "hello world" }) {
    const [currentExplanation, setCurrentExplanation] = React.useState(explanation);

    React.useEffect(() => {
        setCurrentExplanation(explanation);
    }, [explanation]);

    return (
        <Card className="w-[500px] flex flex-row items-center justify-center">
            <p>{currentExplanation}</p>
        </Card>
    );
}

import { Progress } from "./progress"

export function ProgressContainer() {
    return (
        <div className="container p-10 bg-white backdrop-blur-sm shadow-sm dark:bg-gray-950 min-h-180 flex content-center justify-center">
            <Progress data-state="loading" />
        </div>
    )
}
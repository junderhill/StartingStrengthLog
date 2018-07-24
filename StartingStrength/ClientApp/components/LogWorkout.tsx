import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface Workout {
    workoutState: WorkoutState;
    selectedExercise: Exercise;
    weight: number;
    reps: number[];
}

enum WorkoutState {
    ChooseExercise,
    InputWeight,
    Set1Reps,
    Set2Reps,
    Set3Reps
}
enum Exercise {
    Squat,
    Press,
    Bench,
    Row,
    Deadlift
}

export class LogWorkout extends React.Component<RouteComponentProps<{}>, Workout> {
    constructor() {
        super();
        this.clearModel();
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.saveWorkout = this.saveWorkout.bind(this);
    }

    public render() {
        switch (this.state.workoutState) {
            case WorkoutState.ChooseExercise:
                return this.renderExerciseSelection();
            case WorkoutState.InputWeight:
                return this.renderWeightInput();
            case WorkoutState.Set1Reps:
            case WorkoutState.Set2Reps:
            case WorkoutState.Set3Reps:
                return this.renderRepsInput();
        }
    }

    renderPageTitle(): any {
        var title: string = "";
        switch (this.state.workoutState) {
            case WorkoutState.ChooseExercise:
                title = "Exercise";
                break;
            case WorkoutState.InputWeight:
                title = "Work Set Weight";
                break;
            case WorkoutState.Set1Reps:
                title = "First Set Reps";
                break;
            case WorkoutState.Set2Reps:
                title = "Second Set Reps";
                break;
            case WorkoutState.Set3Reps:
                title = "Third Set Reps";
                break;
        }
        return (<h1>{title}</h1>);
    }

    selectExercise(exercise: Exercise) {
        this.setState({
            selectedExercise: exercise,
            workoutState: WorkoutState.InputWeight,
        });
    }

    setReps(reps: number) {

        let currentReps = this.state.reps;
        currentReps.push(reps);
        this.setState({
            reps: currentReps
        });

        if (this.state.selectedExercise === Exercise.Deadlift) {
            this.saveWorkout();
        } else {
            switch (this.state.workoutState) {
                case WorkoutState.Set1Reps:
                    this.setState({ workoutState: WorkoutState.Set2Reps });
                    break;
                case WorkoutState.Set2Reps:
                    this.setState({ workoutState: WorkoutState.Set3Reps });
                    break;
                case WorkoutState.Set3Reps:
                    this.saveWorkout();
                    break;
            }
        }
    }

    renderExerciseSelection(): any {
        return (<div>
            {this.renderPageTitle()}
            <div className="form form-inline">
                <div className="form-group">
                    <button className="btn btn-lg btn-block" onClick={() => { this.selectExercise(Exercise.Squat) }}>Squat</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-block" onClick={() => { this.selectExercise(Exercise.Press) }}>Press</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-block" onClick={() => { this.selectExercise(Exercise.Bench) }}>Bench Press</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-block" onClick={() => { this.selectExercise(Exercise.Row) }}>Row</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-block" onClick={() => { this.selectExercise(Exercise.Deadlift) }}>Deadlift</button>
                </div>
            </div>
        </div>);
    }

    handleWeightChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        this.setState({ weight: Number(e.currentTarget.value) });
    }

    renderWeightInput(): any {
        return <div>
            {this.renderPageTitle()}
            <form className="form form-inline">
                <label>Weight (KG):
                    <input
                        className="form-control"
                        name="weight"
                        type="text"
                        value={this.state.weight}
                        onChange={this.handleWeightChange} />
                </label>
            </form>
            <button className="btn form-control btn-lg btn-block" onClick={() => { this.setState({ workoutState: WorkoutState.Set1Reps }) }}>Next</button>
        </div>;
    }

    renderRepsInput(): any {
        return <div className="form form-inline">
            {this.renderPageTitle()}

            <div className="form-group">
                <button className="btn btn-lg btn-info btn-block" onClick={() => { this.setReps(5) }}>5</button>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-info btn-block" onClick={() => { this.setReps(4) }}>4</button>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-info btn-block" onClick={() => { this.setReps(3) }}>3</button>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-info btn-block" onClick={() => { this.setReps(2) }}>2</button>
            </div>
            <div className="form-group">
                <button className="btn btn-lg btn-info btn-block" onClick={() => { this.setReps(1) }}>1</button>
            </div>

        </div>;
    }


    saveWorkout() {
        fetch('api/Workout/Log',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Exercise: this.state.selectedExercise.toString(),
                    Weight: this.state.weight,
                    Reps: this.state.reps
                })
            })
            .then(response => {
                this.clearModel();
            });
    }

    clearModel() {
        this.state = {
            selectedExercise: Exercise.Squat,
            workoutState: WorkoutState.ChooseExercise,
            weight: 20.0,
            reps: []
        };
    }

}

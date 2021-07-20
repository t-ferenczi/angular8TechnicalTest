export class Task {
    id: number;
    label: string;
    description:  string;
    category: string;
    done: string | false;

    constructor(task: any) {
        this.id = task.id;
        this.label = task.label || '';
        this.description = task.description || '';
        this.category = task.category || '';
        this.done = task.done || false;
        }
}

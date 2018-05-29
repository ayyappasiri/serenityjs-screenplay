import { Task, PerformsTasks, Open, step } from 'serenity-js/protractor';
import { AddATodoItem } from './add_a_todo_item';
import { browser } from 'protractor';

export class Start implements Task {

    static withATodoListContaining(items: string[]) {
        return new Start(items);
    }

    @step('{0} starts with a Todo List containing #items')
    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Open.browserOn('examples/angularjs/'),
            ...this.addAll(this.items)
        );
    }

    constructor(private items: string[]) {

    }

    private addAll(items: string[]): Task[] {
        return items.map(item => AddATodoItem.called(item));
    }
}
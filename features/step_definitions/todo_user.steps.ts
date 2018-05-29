import { Actor, BrowseTheWeb }  from 'serenity-js/protractor';
import { protractor }           from 'protractor';
import { Start }                from '../../spec/screenplay/tasks/start';
import { listOf }               from '../../spec/text';
import { AddATodoItem } from '../../spec/screenplay/tasks/add_a_todo_item';
import { TodoList } from '../../spec/screenplay/components/todo_list';
import { expect } from '../../spec/expect';
import { serenity } from 'serenity-js';

export = function todoUserSteps() {

    // let actor : Actor;
    let stage = serenity.callToStageFor({
        actor: (name) => Actor.named(name).whoCan(BrowseTheWeb.using(protractor.browser))
    });

    this.setDefaultTimeout(30 * 1000);  // The todomvc.com website can sometimes be a bit slow to load, so we tell
                                        // Cucumber to give it up to 30 seconds to get ready.

    this.Given(/^.*that (.*) has a todo list containing (.*)$/, function (actorName: string, items: string) {
        // actor = Actor.named(actorName).whoCan(BrowseTheWeb.using(protractor.browser));

        return stage.theActorCalled(actorName).attemptsTo(
            Start.withATodoListContaining(listOf(items))
        );
    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, function (itemName: string) {
        return stage.theActorInTheSpotlight().attemptsTo(
            AddATodoItem.called(itemName)
        );
    });

    this.Then(/^.* todo list should contain (.*?)$/, function (items: string){
        return expect(stage.theActorInTheSpotlight().toSee(TodoList.Items_Displayed)).eventually.deep.equal(listOf(items));
    });
};
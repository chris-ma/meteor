Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
      tasks: function(){
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    });
  Template.task.events({
    "click .toggle-checked": function() {
      Tasks.update(this._id, {$set: {checked: ! this.checked } });
    },
    "click .delete": function() {
      Tasks.remove(this._id)
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {

      var text = event.task.text.value;
      Tasks.insert({
          Text: text,
          createdAt: new Date ()
      });
        //clears form
      event.target.text.value = "";
        //prevent default form submit
      return false;
    }
  });
}

ConversationGuide = new Mongo.Collection('conversationGuide');

ConversationGuide.allow({
	insert: function (content, value) {
		return true;
	},
	update: function (content, value) {
		return true;
	},
	remove: function (content, value) {
		return true;
	},
});

if(Meteor.isClient){
	//Meteor.subscribe('convGuide');
}

if (Meteor.isClient) {

Meteor.subscribe('convGuide');

Template.cmspage.rendered = function(){
  $('img').each(function(){
    var source = "https://bmodnn-dev-cms.galepartners.com" + $(this).attr('src');
    $(this).attr('src', source);
   
  });

   var htmlJST=Template["MeteorHTML"].renderFunction();
    var htmmlStr=HTML.toHTML(htmlJST);
    console.log(htmmlStr);
    $('chequing-component').replaceWith(htmmlStr);

}


Template.cmspage.helpers({
  cms_page : function(){
    var contentJson = ConversationGuide.findOne({});
    return _.unescape(contentJson.content);
 }
});


}

if (Meteor.isServer) {
  Meteor.publish('convGuide', function(){
    return ConversationGuide.find({});
  });

  Meteor.startup(function () {
    // code to run on server at startup

        var url = "https://bmodnn-dev-cms.galepartners.com/en/json-api-0.1/serve-json/invest_lets_talk/";
        var response = HTTP.get(url, {rejectUnauthorized: false});
        console.log("Retrieve Conversation Guide English: " + response.statusCode);
        var content = JSON.parse(response.content);
        console.log(content);
        var convGuide_temp = content.dnnConversationGuide.response.document;
        var convGuide = convGuide_temp.split("\\n").join("");
        console.log(convGuide);

        ConversationGuide.remove({});
        ConversationGuide.insert({'content': convGuide});
              

  });
}

Router.route('/cmspage', function() {
   this.render('cmspage');
});

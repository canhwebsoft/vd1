var Theater = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
};
Theater.Models.Movie = Backbone.Model.extend({});
Theater.Collections.Movies = Backbone.Collection.extend({
    model: Theater.Models.Movie,
    url: "js/data/movies.json",
    initialize: function(){
        console.log("Movies initialize");
    }
});
Theater.Templates.movie = _.template($("#tmplt-Movie").html());
Theater.Views.Movie = Backbone.View.extend({
    tagName: "li",
    template: Theater.Templates.movie,
  
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        //return this.template(this.model.toJSON()); 
        //Correction
        return $(this.el).append(this.template(this.model.toJSON())) ;
    }
});
Theater.Templates.movies = _.template($("#tmplt-Movies").html());
Theater.Views.Movies = Backbone.View.extend({
	el: $("#mainContainer"),
	template: Theater.Templates.movies,
    initialize: function () {
        //this.listenTo(this, "render", "addOne", "addAll");
        this.listenTo(this.collection,"reset", this.render);
        this.listenTo(this.collection,"add", this.addOne);
        this.listenTo(this.collection, 'all', this.render);
    },
    render: function(){
        console.log("render");
        //console.log(this.collection.length);
		console.log(this.el);
		$(this.el).html(this.template());
		this.addAll();
    },
  
    addAll: function () {
        console.log("addAll");
        this.collection.each(this.addOne);
    },
  
    addOne: function (model) {
        console.log("addOne");
		view = new Theater.Views.Movie({ model: model });
		$("ol", this.el).append(view.render());
    }
});

Theater.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"
    },
  
    defaultRoute: function () {
        console.log("defaultRoute");
		Theater.movies = new Theater.Collections.Movies();
        new Theater.Views.Movies({ collection: Theater.movies }); 
        Theater.movies.fetch();
        console.log(Theater.movies.length)
    }
});
 
var appRouter = new Theater.Router();
Backbone.history.start();

//This is a hack for demonstration purposes
$("#butAddItem").click(null, function () {
    var movie = new Theater.Models.Movie(
        {
            "Id": "BVP3s",
            "Name": "Lord of the Rings ",
            "AverageRating": 4.3,
            "ReleaseYear": 2003,
            "Url": "http://www.netflix.com/.....",
            "Rating": "PG-13"
        }
    );
  
    Theater.movies.add(movie);
    console.log(Theater.movies.length)
})